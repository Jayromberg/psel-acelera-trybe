export interface CustomerUseCases<T> {
  create(data: T): Promise<T>;
  pay(id: string, data: T): Promise<T>;
  PaymentsList(id: string): Promise<T>;
}

export interface AdminUseCases<T> extends CustomerUseCases<T> {
  findAccountById(id: string): Promise<T | null>;
  listAllAccount(): Promise<T[]>;
  update(id: string, data: T): Promise<T>;
  delete(id: string): Promise<void>;
}
