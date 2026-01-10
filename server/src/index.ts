import { workflow } from "./graph.ts";

const main = async () => {
  const response = await workflow.invoke(
    {
      messages: [
        {
          role: "user",
          content: "Can yu help me visualize how much have I spent group by date.",
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
