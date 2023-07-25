import dotenv from "dotenv";
import path from "path";
import app from "./app";
import prisma from "./database/prismaClient";

const filePath = path.join(__dirname, "../../.env");

dotenv.config({ path: filePath });

const PORT = process.env.API_PORT ? Number(process.env.API_PORT) : 3999;

prisma
  .$connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((error) => {
    console.log("Connection with database generated an error:\r\n");
    console.error(error);
    console.log("\r\nServer initialization cancelled");
    process.exit(0);
  });
