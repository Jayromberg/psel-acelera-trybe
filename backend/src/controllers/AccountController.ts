import { Response, Request } from "express";
import * as schema from "./schemas";
import AccountService from "../services/AccountService";

export const createAccount = async (req: Request, res: Response) => {
  const requestData = schema.accountSchema.parse(req.body);
  const accountService = new AccountService();
  const createdAccount = await accountService.createAccount(requestData);
  res.status(201).json(createdAccount);
};

export const updateAccount = async (req: Request, res: Response) => {
  const updatedData = schema.updateAccountSchema.parse(req.body);
  const accountService = new AccountService();
  const updatedAccount = await accountService.updateAccount(updatedData);
  res.status(200).json(updatedAccount);
};

export const deleteAccount = async (req: Request, res: Response) => {
  const deleteData = schema.deleteAccountSchema.parse(req.body);
  const accountService = new AccountService();
  const deletedAccount = await accountService.deleteAccount(deleteData);
  res.status(200).json(deletedAccount);
};
