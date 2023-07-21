import { exec } from "child_process";

console.log("[RUN DEV]: START");

console.log("[RUN DEV] Running frontend...");

try {
  const commandFrontend = "cd frontend && yarn dev";
  exec(commandFrontend, { encoding: "utf8" });
  console.log("[RUN DEV] Running development frontend.");
} catch (error) {
  console.log(error);
}

console.log("[RUN DEV] Running backend...");

try {
  const commandBackend = "cd backend && yarn dev";
  exec(commandBackend, { encoding: "utf8" });
  console.log("[RUN DEV] Running development backend.");
} catch (error) {
  console.log(error);
}

console.log("========================================");
console.log("[RUN DEV]: RUNNING DEV");
