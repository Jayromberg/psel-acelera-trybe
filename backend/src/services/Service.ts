import { CustomerModel, PaymentModel } from "../models/model";
import { MethodDoesntExistError } from "../erros";
import { hashPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";
import { IAccount } from "../interfaces";

abstract class Service<T> {
  protected model: CustomerModel<T> | PaymentModel<T>;
  constructor(model: CustomerModel<T> | PaymentModel<T>) {
    this.model = model;
  }

  async create<T extends IAccount>(data: T): Promise<{ token: string }> {
    const model = this.model as unknown as CustomerModel<T>;

    if (!model.create) {
      throw new MethodDoesntExistError("create");
    }

    const hashedPassword = await hashPassword(data.password);
    const response = await model.create({ ...data, password: hashedPassword });
    const token = generateToken<T>(response);
    return { token };
  }

  async findAccountById(id: string): Promise<T | null> {
    const customerModel = this.model as CustomerModel<T>;

    if (!customerModel.findAccountById) {
      throw new MethodDoesntExistError("findAccountById");
    }

    return customerModel.findAccountById(id);
  }

  async update(id: string, data: Partial<T>): Promise<Partial<T>> {
    const customerModel = this.model as CustomerModel<T>;

    if (!customerModel.updateAccount) {
      throw new MethodDoesntExistError("update");
    }

    return customerModel.updateAccount(id, data);
  }

  async delete(id: string): Promise<void> {
    const customerModel = this.model as CustomerModel<T>;

    if (!customerModel.delete) {
      throw new MethodDoesntExistError("delete");
    }

    return customerModel.delete(id);
  }

  async getPaymentsList(customerId: string): Promise<T[]> {
    const paymentModel = this.model as PaymentModel<T>;

    if (!paymentModel.getPaymentsList) {
      throw new MethodDoesntExistError("getPaymentsList");
    }

    return paymentModel.getPaymentsList(customerId);
  }

  async findPaymentById(
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
