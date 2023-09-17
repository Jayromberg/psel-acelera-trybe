export interface AccountModel<T> {
  create(data: T): Promise<T>;
  findByPk(id: string): Promise<T | null>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

export interface TransactionModel<T> {
  create(customerId: string, data: T): Promise<T>;
  findMany(customerId: string): Promise<T[]>;
  findByPk(customerId: string, paymentId: string): Promise<T | null>;
}

export interface CashbackModel<T> {
  create(data: T): Promise<T>;
}
