import { Express } from "express";
import accountRoutes from "./accountRoutes";

export default (app: Express) => {
  app.use(accountRoutes);
};
