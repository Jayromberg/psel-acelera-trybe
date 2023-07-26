import { Response, Request } from "express";
import { accountSchema } from "./schemas/accountSchema";
import AccountServices from "../services/AccountServices";
import { NotFoundError } from "../erros";

export const create = async (req: Request, res: Response) => {
  const data = accountSchema.parse(req.body);
  const accountServices = new AccountServices();
  const account = await accountServices.create(data);
  res.status(201).json(account);
};

export const update = async (req: Request, res: Response) => {
  if (!req.body.token) {
    throw new NotFoundError("Token not found");
  }
  const data = accountSchema.partial().parse(req.body);
  const accountServices = new AccountServices();
  const account = await accountServices.update(req.body.token, data);
  res.status(200).json(account);
};
