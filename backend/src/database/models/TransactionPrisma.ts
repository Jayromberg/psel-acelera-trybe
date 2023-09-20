import db from "../prismaClient";
import { TransactionModel } from "./model";
import Transaction from "../../types/Transaction";

class TransactionPrisma implements TransactionModel<Transaction> {
  constructor(private prismaClient = db) {}

  async create(
    accountId: string,
    transactionData: Transaction,
  ): Promise<Transaction> {
    const { date, amount } = transactionData;
    const transaction = { accountId, date, amount };
    return this.prismaClient.transaction.create({ data: transaction });
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
