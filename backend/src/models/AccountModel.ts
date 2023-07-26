import { PrismaClient } from "@prisma/client";
import prisma from "../database/prismaClient";
import { IAccount } from "../interfaces";
import { CustomerModel } from "./model";

class AccountModel implements CustomerModel<IAccount> {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = prisma;
  }

  create(data: IAccount): Promise<IAccount> {
    const { name, email, password, identifier } = data;

    return this.prismaClient.account.create({
      data: {
        name,
        email,
        password,
        identifier,
      },
    });
  }

  findAccountById(id: string): Promise<IAccount | null> {
    return this.prismaClient.account.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, data: IAccount): Promise<IAccount> {
    const { name, email, password } = data;

    return this.prismaClient.account.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
      },
    });
  }

  async delete(id: string): Promise<void> {
    this.prismaClient.account.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}

export default AccountModel;
