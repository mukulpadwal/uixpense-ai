import "dotenv/config";

import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

import type { StreamMessage } from "./types.js";
import { workflow } from "./graph.js";

/**
 * chat:1 Access to fetch at 'https://uixpense-ai.onrender.com/chat' from origin 'https://uixpense-ai.vercel.app' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. index-CG1d2VzF.js:13  POST https://uixpense-ai.onrender.com/chat net::ERR_FAILED C @ index-CG1d2VzF.js:13 (anonymous) @ index-CG1d2VzF.js:13 Q8 @ index-CG1d2VzF.js:13 f @ index-CG1d2VzF.js:158 d @ index-CG1d2VzF.js:158 NA @ index-CG1d2VzF.js:8 (anonymous) @ index-CG1d2VzF.js:8 $_ @ index-CG1d2VzF.js:8 Gy @ index-CG1d2VzF.js:8 ag @ index-CG1d2VzF.js:9 bB @ index-CG1d2VzF.js:9
 */

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  limit: 10, // Limit each IP to 10 requests per `window` (here, per 60 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
});

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};


const app = express();
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
  if (req.method === "OPTIONS") return next();
  return limiter(req, res, next);
})

const PORT = process.env.PORT || 8080;

app.get("/health", (_: Request, res: Response) => {
  res.status(200).send("ok");
});

app.post("/chat", async (req: Request, res: Response) => {
  const { userQuery } = req.body;

  // 1. Set Special Headers
  res.status(200);
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

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
