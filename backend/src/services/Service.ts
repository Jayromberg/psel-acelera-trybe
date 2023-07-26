import { CustomerModel, PaymentModel } from "../models/model";
import { MethodDoesntExistError } from "../erros";

abstract class Service<T> {
  protected model: CustomerModel<T> | PaymentModel<T>;
  constructor(model: CustomerModel<T> | PaymentModel<T>) {
    this.model = model;
  }

  async create(data: T): Promise<T> {
    const model = this.model as CustomerModel<T>;
    if (model.create === undefined) {
      throw new MethodDoesntExistError("create");
    }
    return model.create(data);
  }

  async findAccountById(id: string): Promise<T | null> {
    const model = this.model as CustomerModel<T>;
    if (model.findAccountById === undefined) {
      throw new MethodDoesntExistError("findAccountById");
    }
    return model.findAccountById(id);
  }

  async update(data: Partial<T>): Promise<T> {
    const model = this.model as CustomerModel<T>;
    if (model.update === undefined) {
      throw new MethodDoesntExistError("update");
    }
    const id = "clkjyd7sq0000pi4nyd3o68qi";
    return model.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const model = this.model as CustomerModel<T>;
    if (model.delete === undefined) {
      throw new MethodDoesntExistError("delete");
    }
    return model.delete(id);
  }

  async paymentsList(customerId: string): Promise<T[]> {
    const model = this.model as PaymentModel<T>;
    if (model.paymentsList === undefined) {
      throw new MethodDoesntExistError("PaymentsList");
    }
    return model.paymentsList(customerId);
  }

  async findPaymentById(id: string): Promise<T | null> {
    const model = this.model as PaymentModel<T>;
    if (model.findPaymentById === undefined) {
      throw new MethodDoesntExistError("findPaymentById");
    }
    return model.findPaymentById(id);
  }
}

export default Service;
