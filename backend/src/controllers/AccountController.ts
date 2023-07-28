import { Response, Request } from "express";
import * as schema from "./schemas";
import AccountService from "../services/AccountServices";
import { NotFoundError } from "../erros";

export const create = async (req: Request, res: Response) => {
  const requestData = schema.accountSchema.parse(req.body);
  const accountService = new AccountService();
  const createdAccount = await accountService.createAccount(requestData);
  res.status(201).json(createdAccount);
};

export const update = async (req: Request, res: Response) => {
  const updatedData = schema.updateAccountSchema.parse(req.body);
  const accountService = new AccountService();
  const updatedAccount = await accountService.updateAccount(updatedData);
  res.status(200).json(updatedAccount);
};
