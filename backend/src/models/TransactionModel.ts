import { PrismaClient } from "@prisma/client";
import prisma from "../database/prismaClient";
import { ITransaction } from "../interfaces";
import { PaymentModel } from "./model";

class CustomerModel implements PaymentModel<ITransaction> {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = prisma;
  }

  create(data: ITransaction): Promise<ITransaction> {
    const { customerId, date, value } = data;

    return this.prismaClient.transaction.create({
      data: {
        customerId,
        date,
        value,
      },
    });
  }

  PaymentsList(): Promise<ITransaction[]> {
    return this.prismaClient.transaction.findMany();
  }

  findPaymentById(id: string): Promise<ITransaction | null> {
    return this.prismaClient.transaction.findUnique({
      where: {
        id,
      },
    });
  }
}

export default CustomerModel;
