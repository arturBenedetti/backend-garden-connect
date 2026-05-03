import type { Request, Response, NextFunction } from "express";
import "express-async-errors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import rootRouter from "./routers/router";
import { getZodErrorMessage, getErrorStatusCode } from "./middlewares/error.handler";
import { openApiSpec } from "./docs/openapi";

const app = express();

app.use(express.json());

app.get("/openapi.json", (_req: Request, res: Response) => {
  res.json(openApiSpec);
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(openApiSpec, {
    customSiteTitle: "Garden Connect API",
  })
);

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
