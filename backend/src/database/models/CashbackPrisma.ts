import { PrismaClient } from "@prisma/client";
import prisma from "../prismaClient";
import { CashbackModel } from "./model";
import Cashback from "../../types/Cashback";

class CashbackPrisma implements CashbackModel<Cashback> {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = prisma;
  }
  create(cashbackData: Cashback): Promise<Cashback> {
    const newCashback = {
      ...cashbackData,
    };

    return this.prismaClient.cashback.create({
      data: newCashback,
    });
  }
}

export default CashbackPrisma;
