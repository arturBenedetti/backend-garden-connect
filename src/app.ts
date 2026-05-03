import type { Request, Response, NextFunction } from "express";
import "express-async-errors";
import express from "express";
import rootRouter from "./routers/router";
import { getZodErrorMessage, getErrorStatusCode } from "./middlewares/error.handler";
import { openApiSpec } from "./docs/openapi";
import { serveSwaggerUi } from "./docs/swagger-ui.route";

const app = express();

app.use(express.json());

app.get("/openapi.json", (_req: Request, res: Response) => {
  res.json(openApiSpec);
});

/** CDN-based UI: swagger-ui-express static files are unreliable on Vercel serverless. */
app.get(["/api-docs", "/api-docs/"], serveSwaggerUi("/openapi.json"));

app.use(rootRouter);

app.use("/health", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World");
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const message = getZodErrorMessage(error);
  const status = getErrorStatusCode(error);

  res.status(status).json({ message });
});

export default app;
