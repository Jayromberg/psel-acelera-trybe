import express, { Express, Request, Response } from "express";
import { router } from "./routes";

const app: Express = express();

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World Docker!");
});

app.use(router);

export default app;
