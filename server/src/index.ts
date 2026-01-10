import { workflow } from "./graph.ts";

const main = async () => {
  const response = await workflow.invoke(
    {
      messages: [
        {
          role: "user",
          content: "I bought an macBook worth 200000 INR.",
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
