import type { Request, Response, NextFunction } from "express";
import "express-async-errors";
import express from "express";
import rootRouter from "./routers/router";
import { getZodErrorMessage } from "./middlewares/error.handler";

const app = express();

app.use(express.json());

app.use(rootRouter);

app.use("/health", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World");
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const message = getZodErrorMessage(error);
  const status =
    error?.name === "ZodError" || error instanceof Error ? 400 : 500;

  if (error?.name === "ZodError") {
    return res.status(status).json({ message });
  }

  res.status(500).json({ message });
});

export default app;
