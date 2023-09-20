import db from "../prismaClient";
import { CashbackModel } from "./model";
import Cashback from "../../types/Cashback";

class CashbackPrisma implements CashbackModel<Cashback> {
  constructor(private prismaClient = db) {}

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
