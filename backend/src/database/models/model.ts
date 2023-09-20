import { Prisma } from "@prisma/client";

export interface AccountModel<T> {
  create(accountData: Omit<T, "id" | "active">): Promise<T>;
  findAll(): Promise<T[]>;
  findByPk(accountId: string): Promise<T | null>;
  findOne(query: Prisma.AccountWhereUniqueInput): Promise<T | null>;
  update(accountId: string, accountData: Partial<T>): Promise<T>;
  delete(accountId: string): Promise<void>;
}

export interface TransactionModel<T> {
  create(transactionData: Omit<T, "id">): Promise<T>;
  findMany(accountId: string): Promise<T[]>;
  findByPk(accountId: string, transactionId: string): Promise<T | null>;
}

export interface CashbackModel<T> {
  create(cashbackData: Omit<T, "id">): Promise<T>;
}
