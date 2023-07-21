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
