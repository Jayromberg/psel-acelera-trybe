import { execSync } from "child_process";

console.log("[ESLINT]: START");

console.log("[ESLINT FRONTEND]: Running frontend's eslint...");

try {
  const commandFrontend = "cd frontend && yarn lint";
  const outputFrontend = execSync(commandFrontend, { encoding: "utf8" });
  console.log(outputFrontend);
} catch (error) {
  console.log(error);
} finally {
  console.log("[ESLINT FRONTEND]: Finished running frontend's eslint.");
}

console.log("[ESLINT BACKEND]: Running backend's eslint...");

try {
  const commandBackend = "cd backend && yarn lint";
  const outputBackend = execSync(commandBackend, { encoding: "utf8" });
  console.log(outputBackend);
} catch (error) {
  console.log(error);
} finally {
  console.log("[ESLINT BACKEND]: Finished running backend's eslint.");
}

console.log("========================================");
console.log("[ESLINT]: FINISHED");
