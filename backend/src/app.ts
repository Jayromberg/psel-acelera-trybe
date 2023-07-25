import express, { Express, Request, Response } from "express";
import routes from "./routes";

const app: Express = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

routes(app);

export default app;
