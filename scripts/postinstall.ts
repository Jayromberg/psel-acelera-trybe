import { execSync } from "child_process";

console.log("[INSTALL]: START");

console.log("[INSTALL FRONTEND]: Installing frontend's dependencies...");

try {
  const commandFrontend = "cd frontend && yarn install";
  execSync(commandFrontend, { encoding: "utf8" });
} catch (error) {
  console.log(error);
} finally {
  console.log(
    "[INSTALL FRONTEND]: Finished installing frontend's dependencies.",
  );
}

console.log("[INSTALL BACKEND]: Installing backend's dependencies...");

try {
  const commandBackend = "cd backend && yarn install";
  execSync(commandBackend, { encoding: "utf8" });
} catch (error) {
  console.log(error);
} finally {
  console.log("[INSTALL BACKEND]: Finished installing backend's dependencies.");
}

console.log("========================================");
console.log("[INSTALL]: FINISHED");
