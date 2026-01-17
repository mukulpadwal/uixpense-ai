import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { workflow } from "./graph.ts";
import type { StreamMessage } from "./types.ts";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.post("/chat", async (req: Request, res: Response) => {
  const { userQuery } = req.body;

  // 1. Set Special Headers
  res.writeHead(200, {
    "content-type": "text/event-stream",
  });

  const response = await workflow.stream(
    {
      messages: [
        {
          role: "user",
          content: userQuery,
        },
      ],
    },
    {
      configurable: {
        thread_id: "1",
      },
      streamMode: ["messages"],
    },
  );

  for await (const [eventType, chunk] of response) {
    let message: StreamMessage = {} as StreamMessage;

    const messageType = chunk[0].type;

    if (messageType === "ai") {
      message = {
        type: "ai",
        payload: {
          text: chunk[0].content as string,
        },
      };
    }

    // 2. Send data in special format
    res.write(`event: ${eventType}\n`);
    res.write(`data: ${JSON.stringify(message)}`);
    res.write("\n\n");
  }

  res.end();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
