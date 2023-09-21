import { Express } from "express";
import httpError from "../middlewares/httpErrors";
import accountRoutes from "./accountRoutes";
import loginRoutes from "./loginRoute";

export default (app: Express) => {
  app.use(accountRoutes, loginRoutes, httpError);
};
