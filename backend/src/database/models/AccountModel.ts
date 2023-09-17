import { PrismaClient } from "@prisma/client";
import db from "../prismaClient";
import { IAccount } from "../../interfaces";
import { CustomerModel } from "./model";

class AccountModel implements CustomerModel<IAccount> {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = db;
  }

  create(accountData: IAccount): Promise<IAccount> {
    const { name, email, password, documentNumber } = accountData;

    return this.prismaClient.account.create({
      data: {
        name,
        email,
        password,
        documentNumber,
      },
    });
  }

  findByPk(id: string): Promise<IAccount | null> {
    const account = this.prismaClient.account.findUnique({ where: { id } });
    return account;
  }

  updateAccount(id: string, newData: IAccount): Promise<IAccount> {
    const { name, email, password } = newData;

    return this.prismaClient.account.update({
      where: { id },
      data: { name, email, password },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaClient.account.update({
      where: { id },
      data: { isActive: false },
    });
  }
}

export default AccountModel;
