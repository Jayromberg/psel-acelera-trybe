import { PrismaClient } from "@prisma/client";
import prisma from "../prismaClient";
import { ITransaction } from "../../interfaces";
import { TransactionModel } from "./model";

class TransactionPrisma implements TransactionModel<ITransaction> {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = prisma;
  }

  async create(
    customerId: string,
    transactionData: ITransaction,
  ): Promise<ITransaction> {
    const { date, value } = transactionData;
    const transaction = { customerId, date, value };
    return this.prismaClient.transaction.create({ data: transaction });
  }

  async findMany(customerId: string): Promise<ITransaction[]> {
    const payments = await this.prismaClient.transaction.findMany({
      where: {
        customerId,
      },
      include: {
        cashback: {
          select: {
            cashback: true,
          },
        },
      },
    });

    return payments;
  }

  async findByPk(customerId: string, id: string): Promise<ITransaction | null> {
    const payment = await this.prismaClient.transaction.findUnique({
      where: {
        id,
        customerId,
      },
      include: {
        cashback: {
          select: {
            cashback: true,
          },
        },
      },
    });

    return payment;
  }
}

export default TransactionPrisma;
