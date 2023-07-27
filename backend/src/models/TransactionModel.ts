import { PrismaClient } from "@prisma/client";
import prisma from "../database/prismaClient";
import { ITransaction } from "../interfaces";
import { PaymentModel } from "./model";

class CustomerModel implements PaymentModel<ITransaction> {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = prisma;
  }

  async pay(
    customerId: string,
    transactionData: ITransaction,
  ): Promise<ITransaction> {
    const { date, value } = transactionData;
    const transaction = { customerId, date, value };
    return this.prismaClient.transaction.create({ data: transaction });
  }

  async getPaymentsList(customerId: string): Promise<ITransaction[]> {
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

  async findPaymentById(
    customerId: string,
    id: string,
  ): Promise<ITransaction | null> {
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

export default CustomerModel;
