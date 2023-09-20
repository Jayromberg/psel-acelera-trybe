import { Prisma } from "@prisma/client";
import db from "../prismaClient";
import { AccountModel } from "./model";
import Account from "../../types/Account";

class AccountPrisma implements AccountModel<Account> {
  constructor(private prismaClient = db) {}

  create(accountData: Omit<Account, "id" | "active">): Promise<Account> {
    const { name, email, password, documentNumber, accountType } = accountData;

    return this.prismaClient.account.create({
      data: {
        name,
        email,
        password,
        documentNumber,
        accountType,
      },
    });
  }

  findAll(): Promise<Account[]> {
    const accounts = this.prismaClient.account.findMany();
    return accounts;
  }

  findByPk(id: string): Promise<Account | null> {
    const account = this.prismaClient.account.findUnique({ where: { id } });
    return account;
  }

  findOne(query: Prisma.AccountWhereUniqueInput): Promise<Account | null> {
    return this.prismaClient.account.findUnique({
      where: query,
    });
  }

  update(id: string, newData: Partial<Account>): Promise<Account> {
    const { name, email, password } = newData;

    return this.prismaClient.account.update({
      where: { id },
      data: { name, email, password },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaClient.account.update({
      where: { id },
      data: { active: false },
    });
  }
}

export default AccountPrisma;
