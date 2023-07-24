import { exec } from "child_process";
import dotenv from "dotenv";

dotenv.config();

const WEB_PORT = process.env.WEB_PORT ? Number(process.env.WEB_PORT) : 3499;
const API_PORT = process.env.API_PORT ? Number(process.env.API_PORT) : 3999;

console.log("[RUN DEV]: START");

console.log("[RUN DEV] Running frontend...");

try {
  const commandFrontend = `cd frontend && yarn dev -p ${WEB_PORT}`;
  exec(commandFrontend, { encoding: "utf8" });
  console.log(`[RUN DEV] Running development frontend in port ${WEB_PORT}.`);
  console.log(`http://localhost:${WEB_PORT}`);
} catch (error) {
  console.log(error);
}

console.log("[RUN DEV] Running backend...");

try {
  const commandBackend = `cd backend && yarn dev -p ${API_PORT}`;
  exec(commandBackend, { encoding: "utf8" });
  console.log(`[RUN DEV] Running development backend in port ${API_PORT}.`);
  console.log(`http://localhost:${API_PORT}`);
} catch (error) {
  console.log(error);
}

console.log("========================================");
console.log("[RUN DEV]: RUNNING DEV");
