import { Response, Request } from "express";
import prisma from "../database/prismaClient";

export class AccountController {
  async create(req: Request, res: Response) {
    const { name, email, password, identifier } = req.body;

    const account = await prisma.account.create({
      data: {
        name,
        email,
        password,
        identifier,
        role: "CUSTOMER",
        status: false,
      },
    });

    res.status(201).json(account);
  }
}
