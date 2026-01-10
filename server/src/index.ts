import { workflow } from "./graph.ts";

const main = async () => {
  const response = await workflow.invoke(
    {
      messages: [
        {
          role: "user",
          content: "How much have I spent in total?",
        },
      ],
    },
    {
      configurable: { thread_id: "1" },
    },
  );

  console.log(JSON.stringify(response, null, 2));
};

main();
