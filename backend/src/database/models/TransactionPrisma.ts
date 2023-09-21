import { PrismaClient } from "@prisma/client";
import { TransactionModel } from "./model";
import Transaction from "../../types/Transaction";

class TransactionPrisma implements TransactionModel<Transaction> {
  private _prismaClient: PrismaClient;

  constructor(db: PrismaClient) {
    this._prismaClient = db;
  }

  async create(transactionData: Omit<Transaction, "id">): Promise<Transaction> {
    return this._prismaClient.transaction.create({ data: transactionData });
  }

  async findMany(accountId: string): Promise<Transaction[]> {
    const payments = await this._prismaClient.transaction.findMany({
      where: {
        accountId,
      },
      include: {
        cashback: {
          select: {
            rate: true,
          },
        },
      },
    });

    return payments;
  }

  async findByPk(accountId: string, id: string): Promise<Transaction | null> {
    const payment = await this._prismaClient.transaction.findUnique({
      where: {
        id,
        accountId,
      },
      include: {
        cashback: {
          select: {
            rate: true,
          },
        },
      },
    });

    return payment;
  }
}

export default TransactionPrisma;
