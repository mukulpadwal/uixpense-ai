import { MessagesAnnotation } from "@langchain/langgraph";
import initDB from "./db.ts";

const database = initDB("./expenses.db");

async function callModel(state: typeof MessagesAnnotation.State) {
  return state;
}
