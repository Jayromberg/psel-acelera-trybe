import { Express } from "express";
import httpError from "../middlewares/httpErrors";
import accountRoutes from "./accountRoutes";

export default (app: Express) => {
  app.use(accountRoutes, httpError);
};
