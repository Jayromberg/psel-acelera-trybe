import { Router } from "express";
import { AccountController } from "../controllers/AccountController";

const accountController = new AccountController();

const router = Router();

router.post("/account", accountController.create);

export { router };
