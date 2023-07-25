import { PrismaClient } from "@prisma/client";
import prisma from "../database/prismaClient";
import { IAccount } from "../interfaces";
import { Model } from "./model";

class CustomerModel implements Model<IAccount> {
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
        isActive: true,
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
  listAllAccount(): Promise<IAccount[]> {
    return this.prismaClient.account.findMany();
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

export default CustomerModel;
