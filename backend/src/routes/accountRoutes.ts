import { Router } from "express";
import { create } from "../controllers/AccountController";

const accountRoutes = Router();

accountRoutes.post("/account", create);

export default accountRoutes;
