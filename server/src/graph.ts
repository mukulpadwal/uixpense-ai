import { MessagesAnnotation } from "@langchain/langgraph";

async function callModel(state: typeof MessagesAnnotation.State) {
  return state;
}
