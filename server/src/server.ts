import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get("/chat", (req: Request, res: Response) => {
  // 1. Set Special Headers
  res.writeHead(200, {
    "content-type": "text/event-stream",
  });

  // 2. Send data in special format
  res.write("event: ping\n");
  res.write("data: Pong");
  res.write("\n\n");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
