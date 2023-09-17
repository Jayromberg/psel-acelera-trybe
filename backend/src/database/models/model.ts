export interface CustomerModel<T> {
  create(data: T): Promise<T>;
  findByPk(id: string): Promise<T | null>;
  updateAccount(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

export interface PaymentModel<T> {
  pay(customerId: string, data: T): Promise<T>;
  getPaymentsList(customerId: string): Promise<T[]>;
  findPaymentById(customerId: string, paymentId: string): Promise<T | null>;
}
