import { Request, Response } from "express";
import TransactionService from "../services/TransactionService";
import LoggedAccount from "../types/LoggedAccount";
import * as schemas from "./schemas";

export default class TransactionController {
  constructor(private _transactionService = new TransactionService()) {}

  public async CreateTransaction(req: Request, res: Response) {
    const { accountId } = req.params;
    const { amount } = req.body;
    const loggedUser: LoggedAccount = req.body.user;

    schemas.transactionSchema.parse({ amount });
    const transaction = await this._transactionService.create(
      accountId,
      amount,
      loggedUser,
    );
    return res.status(201).json(transaction);
  }

  public async UserTransactions(req: Request, res: Response) {
    const { accountId } = req.params;
    const loggedUser: LoggedAccount = req.body.user;

    const transactions = await this._transactionService.listByAccount(
      accountId,
      loggedUser,
    );
    return res.status(200).json(transactions);
  }
}
