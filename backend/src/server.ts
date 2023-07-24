import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

const filePath = path.join(__dirname, "../../.env");

dotenv.config({ path: filePath });

const app: Express = express();
const PORT = process.env.API_PORT ? Number(process.env.API_PORT) : 3999;
console.log(PORT);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World Docker!");
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
