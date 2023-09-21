import { PrismaClient } from "@prisma/client";
import { CashbackModel } from "./model";
import Cashback from "../../types/Cashback";

class CashbackPrisma implements CashbackModel<Cashback> {
  private _prismaClient: PrismaClient;

  constructor(db: PrismaClient) {
    this._prismaClient = db;
  }

  create(cashbackData: Omit<Cashback, "id">): Promise<Cashback> {
    const newCashback = {
      ...cashbackData,
    };

    return this._prismaClient.cashback.create({
      data: newCashback,
    });
  }
}

export default CashbackPrisma;
