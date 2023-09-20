import db from "../prismaClient";
import { TransactionModel } from "./model";
import Transaction from "../../types/Transaction";

class TransactionPrisma implements TransactionModel<Transaction> {
  constructor(private prismaClient = db) {}

  async create(transactionData: Omit<Transaction, "id">): Promise<Transaction> {
    return this.prismaClient.transaction.create({ data: transactionData });
  }

  async findMany(accountId: string): Promise<Transaction[]> {
    const payments = await this.prismaClient.transaction.findMany({
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
    const payment = await this.prismaClient.transaction.findUnique({
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
