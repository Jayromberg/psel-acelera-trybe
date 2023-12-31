import dotenv from "dotenv";
import "express-async-errors";
import path from "path";
import App from "./app";
import prisma from "./database/prismaClient";

const filePath = path.join(__dirname, "../../.env");

dotenv.config({ path: filePath });

const PORT = process.env.API_PORT ? Number(process.env.API_PORT) : 3999;

const app = new App();

prisma
  .$connect()
  .then(() => {
    app.start(PORT);
  })
  .catch((error) => {
    console.log("Connection with database generated an error:\r\n");
    console.error(error);
    console.log("\r\nServer initialization cancelled");
    process.exit(0);
  });
