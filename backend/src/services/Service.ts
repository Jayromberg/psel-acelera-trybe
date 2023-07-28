import { CustomerModel, PaymentModel } from "../models/model";
import { MethodDoesntExistError } from "../erros";

abstract class Service<T> {
  protected model: CustomerModel<T> | PaymentModel<T>;
  constructor(model: CustomerModel<T> | PaymentModel<T>) {
    this.model = model;
  }

  protected async create(data: T): Promise<T> {
    const customerModel = this.model as CustomerModel<T>;
    if (!customerModel.create) {
      throw new MethodDoesntExistError("create");
    }
    const response = await customerModel.create(data);
    return response;
  }

  protected async findAccountById(id: string): Promise<T | null> {
    const customerModel = this.model as CustomerModel<T>;
    if (!customerModel.findAccountById) {
      throw new MethodDoesntExistError("findAccountById");
    }
    return customerModel.findAccountById(id);
  }

  protected async update(id: string, data: Partial<T>): Promise<Partial<T>> {
    const customerModel = this.model as CustomerModel<T>;
    if (!customerModel.updateAccount) {
      throw new MethodDoesntExistError("update");
    }
    return customerModel.updateAccount(id, data);
  }

  protected async delete(id: string): Promise<void> {
    const customerModel = this.model as CustomerModel<T>;
    if (!customerModel.delete) {
      throw new MethodDoesntExistError("delete");
    }
    return customerModel.delete(id);
  }

  protected async getPaymentsList(customerId: string): Promise<T[]> {
    const paymentModel = this.model as PaymentModel<T>;
    if (!paymentModel.getPaymentsList) {
      throw new MethodDoesntExistError("getPaymentsList");
    }
    return paymentModel.getPaymentsList(customerId);
  }

  protected async findPaymentById(
    customerId: string,
    paymentId: string,
  ): Promise<T | null> {
    const model = this.model as PaymentModel<T>;
    if (model.findPaymentById === undefined) {
      throw new MethodDoesntExistError("findPaymentById");
    }
    return model.findPaymentById(customerId, paymentId);
  }
}

export default Service;
