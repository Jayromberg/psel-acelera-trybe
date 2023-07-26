import { Response, Request } from "express";
import { accountSchema } from "./schemas/accountSchema";
import AccountServices from "../services/AccountServices";

export const create = async (req: Request, res: Response) => {
  const data = accountSchema.parse(req.body);
  const accountServices = new AccountServices();
  const account = await accountServices.create(data);
  res.status(201).json(account);
};
