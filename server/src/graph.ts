import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import initDB from "./db.ts";
import initTools from "./tools.ts";
import llm from "./llm.ts";
import { AIMessage } from "langchain";

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
        ${tools.map((tool) => tool.name).join(", ")}
      `,
    },
    ...state.messages,
  ]);

  return { messages: [response] };
};

const callModelRouter = (state: typeof MessagesAnnotation.State) => {
  const messages = state.messages;
  const lastMessage = messages.at(-1) as AIMessage;

  if (lastMessage.tool_calls?.length) {
    return "toolNode";
  }

  return "__end__";
};

const graph = new StateGraph(MessagesAnnotation)
  .addNode("callModel", callModel)
  .addNode("toolNode", toolNode)
  .addEdge("__start__", "callModel")
  .addConditionalEdges("callModel", callModelRouter, {
    __end__: "__end__",
    toolNode: "toolNode",
  });
