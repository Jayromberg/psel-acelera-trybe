import { NextFunction, Request, Response, Router } from "express";
import {
  AccountController,
  AuthController,
  TransactionController,
} from "../controllers";

const router = Router();
const accountController = new AccountController();
const transactionController = new TransactionController();
const authController = new AuthController();

const authMiddleware = (req: Request, res: Response, next: NextFunction) =>
  authController.validateToken(req, res, next);

router.post("/accounts", (req: Request, res: Response) =>
  accountController.CreateAccount(req, res),
);

router.post(
  "/accounts/:accountId/transactions",
  authMiddleware,
  (req: Request, res: Response) =>
    transactionController.CreateTransaction(req, res),
);

router.get(
  "/accounts/:accountId/transactions",
  authMiddleware,
  (req: Request, res: Response) =>
    transactionController.UserTransactions(req, res),
);

router.put(
  "/accounts/:accountId",
  authMiddleware,
  (req: Request, res: Response) => accountController.UpdateAccount(req, res),
);

export default router;
