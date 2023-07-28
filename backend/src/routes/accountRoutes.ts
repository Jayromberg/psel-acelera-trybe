import { Router } from "express";
import {
  createAccount,
  updateAccount,
  deleteAccount,
} from "../controllers/AccountController";

const accountRoutes = Router();

accountRoutes.post("/account", createAccount);
accountRoutes.patch("/account", updateAccount);
accountRoutes.delete("/account", deleteAccount);

export default accountRoutes;
