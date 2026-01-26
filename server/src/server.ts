import "dotenv/config";

import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

import type { StreamMessage } from "./types.js";
import { workflow } from "./graph.js";

const app = express();

const clientOrigin = process.env.CLIENT_ORIGIN;

app.use(cors({
  origin: clientOrigin,
  credentials: true,
}));

app.options(/.*/, cors());

app.use(express.json());

const chatLimiter = rateLimit({
  windowMs: Number(process.env.CHAT_WINDOW_MIN) * 60 * 1000,
  max: Number(process.env.CHAT_LIMIT),
  standardHeaders: true,
  legacyHeaders: false,
});

const PORT = process.env.PORT || 8080;

app.get("/health", (_: Request, res: Response) => {
  res.status(200).send("ok");
});

app.post("/chat/init", chatLimiter, (req, res) => {
  res.json({ ok: true });
});

app.post("/chat/stream", async (req: Request, res: Response) => {
  const { userQuery } = req.body;

  // 1. Set Special Headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", clientOrigin as string);
  res.flushHeaders();

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
      streamMode: ["messages", "custom"],
    },
  );

  for await (const [eventType, chunk] of response) {
    let message: StreamMessage = {} as StreamMessage;

    if (eventType === "custom") {
      message = chunk;
    } else if (eventType === "messages") {
      if (chunk[0].content === "") continue;

      const messageType = chunk[0].type;

      if (messageType === "ai") {
        message = {
          type: "ai",
          payload: {
            text: chunk[0].content as string,
          },
        };
      } else if (messageType === "tool") {
        message = {
          type: "tool",
          payload: {
            name: chunk[0].name as string,
            result: JSON.parse(chunk[0].content as string),
          },
        };
      }
    }

    // 2. Send data in special format
    res.write(`event: ${eventType}\n`);
    res.write(`data: ${JSON.stringify(message)}`);
    res.write("\n\n");
  }

  res.end();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
