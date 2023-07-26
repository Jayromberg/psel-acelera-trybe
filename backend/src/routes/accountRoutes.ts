import { Router } from "express";
import { create, update } from "../controllers/AccountController";

const accountRoutes = Router();

accountRoutes.post("/account", create);
accountRoutes.patch("/account", update);

export default accountRoutes;
