import { Router } from "express";
import { LoginController } from "../controllers";

const router = Router();
const loginController = new LoginController();
router.post("/login", (req, res) => loginController.Login(req, res));

export default router;
