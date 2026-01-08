import { MessagesAnnotation } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import initDB from "./db.ts";
import initTools from "./tools.ts";
import llm from "./llm.ts";

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