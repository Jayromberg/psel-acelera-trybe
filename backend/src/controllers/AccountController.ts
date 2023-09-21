import { Request, Response } from "express";
import AccountService from "../services/AccountService";
import LoggedAccount from "../types/LoggedAccount";
import * as schemas from "./schemas";

export default class AccountController {
  constructor(private _accountService = new AccountService()) {}

  public async CreateAccount(req: Request, res: Response) {
    schemas.accountSchema.parse(req.body);
    await this._accountService.Create(req.body);
    return res.status(201).json({ message: "Conta criada" });
  }

  public async UpdateAccount(req: Request, res: Response) {
    const loggedAccount = req.body.user as LoggedAccount;
    const { accountId } = req.params;

    delete req.body.user;

    schemas.accountSchema.parse(req.body);

    await this._accountService.Update(
      { id: accountId, ...req.body },
      loggedAccount,
    );

    return res.status(200).json({ message: "Conta editada" });
  }
}
