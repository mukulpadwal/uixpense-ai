import {
  MemorySaver,
  MessagesAnnotation,
  StateGraph,
} from "@langchain/langgraph";
import type { LangGraphRunnableConfig } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { AIMessage, ToolMessage } from "langchain";

import initDB from "./db.js";
import initTools from "./tools.js";
import llm from "./llm.js";
import type { StreamMessage } from "./types.js";

const database = initDB("./expenses.db");
const tools = initTools(database);

const toolNode = new ToolNode(tools);

const callModel = async (state: typeof MessagesAnnotation.State) => {
  const llmWithTools = llm.bindTools(tools);

  const response = await llmWithTools.invoke([
    {
      role: "system",
      content: `
        You are a helpful assistant that can help the user manage their expenses.
        Current DateTime information: ${new Date().toISOString()}

        The user can use the following tools:
        - add_expense: Use this tool to add new expense by user. Using the content deduce the category and description yourself to send as a parameter to the tool.
        - get_expenses: Use this tool to get all expenses from the database for a given date range. If no explicit date range is provided, try to deduce it from the context else use the last 7 days as default.
        - generate_expense_chart: Use this tool to help the user visualize the expenses data for a given date range grouped by date, week, month or year. If groupBy value is not explicitly mentioned by the user use month by default
      `,
    },
    ...state.messages,
  ]);

  return { messages: [response] };
};

const callModelRouter = (
  state: typeof MessagesAnnotation.State,
  config: LangGraphRunnableConfig,
) => {
  const messages = state.messages;
  const lastMessage = messages.at(-1) as AIMessage;

  if (lastMessage.tool_calls?.length) {
    // Stream custom event to notify toolCall:start
    const message: StreamMessage = {
      type: "toolCall:start",
      payload: {
        name: lastMessage.tool_calls[0].name,
        args: lastMessage.tool_calls[0].args,
      },
    };

    config.writer?.(message);

    return "tools";
  }

  return "__end__";
};

const toolsRouter = (state: typeof MessagesAnnotation.State) => {
  const messages = state.messages;
  const lastMessage = messages.at(-1) as ToolMessage;

  const result = JSON.parse(lastMessage.content as string);

  if (result.type === "chartData") {
    return "__end__";
  }

  return "callModel";
};

const graph = new StateGraph(MessagesAnnotation)
  .addNode("callModel", callModel)
  .addNode("tools", toolNode)
  .addEdge("__start__", "callModel")
  .addConditionalEdges("callModel", callModelRouter, {
    __end__: "__end__",
    tools: "tools",
  })
  .addConditionalEdges("tools", toolsRouter, {
    callModel: "callModel",
    __end__: "__end__",
  });

export const workflow = graph.compile({
  checkpointer: new MemorySaver(),
});
