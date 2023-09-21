import { Prisma, PrismaClient } from "@prisma/client";
import { AccountModel } from "./model";
import Account from "../../types/Account";

class AccountPrisma implements AccountModel<Account> {
  private _prismaClient: PrismaClient;

  constructor(db: PrismaClient) {
    this._prismaClient = db;
  }

  create(accountData: Omit<Account, "id" | "active">): Promise<Account> {
    const { name, email, password, documentNumber, accountType } = accountData;

    return this._prismaClient.account.create({
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
    const accounts = this._prismaClient.account.findMany();
    return accounts;
  }

  findByPk(id: string): Promise<Account | null> {
    const account = this._prismaClient.account.findUnique({ where: { id } });
    return account;
  }

  findOne(query: Prisma.AccountWhereUniqueInput): Promise<Account | null> {
    return this._prismaClient.account.findUnique({
      where: query,
    });
  }

  update(id: string, newData: Partial<Account>): Promise<Account> {
    const { name, email, password } = newData;

    return this._prismaClient.account.update({
      where: { id },
      data: { name, email, password },
    });
  }

  async delete(id: string): Promise<void> {
    await this._prismaClient.account.update({
      where: { id },
      data: { active: false },
    });
  }
}

export default AccountPrisma;
