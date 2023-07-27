import { Response, Request } from "express";
import { accountSchema } from "./schemas/accountSchema";
import AccountService from "../services/AccountServices";
import { NotFoundError } from "../erros";

export const create = async (req: Request, res: Response) => {
  const requestData = accountSchema.parse(req.body);
  const accountService = new AccountService();
  const createdAccount = await accountService.create(requestData);
  res.status(201).json(createdAccount);
};

export const update = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    throw new NotFoundError("Token not found");
  }

  const updatedData = accountSchema.partial().parse(req.body);
  const accountService = new AccountService();
  const updatedAccount = await accountService.update(token, updatedData);

  res.status(200).json(updatedAccount);
};
