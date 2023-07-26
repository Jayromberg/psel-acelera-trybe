export interface CustomerModel<T> {
  create(data: T): Promise<T>;
  findAccountById(id: string): Promise<T | null>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

export interface PaymentModel<T> {
  pay(customerId: string, data: T): Promise<T>;
  paymentsList(customerId: string): Promise<T[]>;
  findPaymentById(id: string): Promise<T | null>;
}
