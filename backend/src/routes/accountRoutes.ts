import { Router } from "express";
import { AccountController } from "../controllers/AccountController";

const accountController = new AccountController();

const accountRoutes = Router();

accountRoutes.post("/account", accountController.create);

export default accountRoutes;
