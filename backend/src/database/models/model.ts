export interface AccountModel<T> {
  create(accountData: T): Promise<T>;
  findByPk(accountId: string): Promise<T | null>;
  update(accountId: string, accountData: Partial<T>): Promise<T>;
  delete(accountId: string): Promise<void>;
}

export interface TransactionModel<T> {
  create(accountId: string, transactionData: T): Promise<T>;
  findMany(accountId: string): Promise<T[]>;
  findByPk(accountId: string, transactionId: string): Promise<T | null>;
}

export interface CashbackModel<T> {
  create(cashbackData: T): Promise<T>;
}
