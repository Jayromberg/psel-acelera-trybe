export interface SimpleModel<T> {
  create(data: T): Promise<T>;
}

export interface Model<T> extends SimpleModel<T> {
  findAccountById(id: string): Promise<T | null>;
  listAllAccount(): Promise<T[]>;
  update(id: string, data: T): Promise<T>;
  delete(id: string): Promise<void>;
}

export interface PaymentModel<T> extends SimpleModel<T> {
  PaymentsList(): Promise<T[]>;
  findPaymentById(id: string): Promise<T | null>;
}
