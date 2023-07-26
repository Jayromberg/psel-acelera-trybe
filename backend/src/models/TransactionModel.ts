import { PrismaClient } from "@prisma/client";
import prisma from "../database/prismaClient";
import { ITransaction } from "../interfaces";
import { PaymentModel } from "./model";

class CustomerModel implements PaymentModel<ITransaction> {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = prisma;
  }

  pay(customerId: string, data: ITransaction): Promise<ITransaction> {
    const { date, value } = data;

    return this.prismaClient.transaction.create({
      data: {
        customerId,
        date,
        value,
      },
    });
  }

  paymentsList(customerId: string): Promise<ITransaction[]> {
    return this.prismaClient.transaction.findMany({
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
  }

  findPaymentById(id: string): Promise<ITransaction | null> {
    return this.prismaClient.transaction.findUnique({
      where: {
        id,
      },
      include: {
        cashback: {
          select: {
            cashback: true,
          },
        },
      },
    });
  }
}

export default CustomerModel;
