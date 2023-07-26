import { JwtPayload } from "jsonwebtoken";
import { CustomerModel, PaymentModel } from "../models/model";
import { MethodDoesntExistError } from "../erros";
import { generateToken, verifyToken } from "../utils/jwt";

abstract class Service<T> {
  protected model: CustomerModel<T> | PaymentModel<T>;
  constructor(model: CustomerModel<T> | PaymentModel<T>) {
    this.model = model;
  }

  async create(data: T): Promise<{ token: string }> {
    const model = this.model as CustomerModel<T>;
    if (model.create === undefined) {
      throw new MethodDoesntExistError("create");
    }
    const response = await model.create(data);
    return { token: generateToken<T>(response) };
  }

  async findAccountById(id: string): Promise<T | null> {
    const model = this.model as CustomerModel<T>;
    if (model.findAccountById === undefined) {
      throw new MethodDoesntExistError("findAccountById");
    }
    return model.findAccountById(id);
  }

  async update(token: string, data: Partial<T>): Promise<Partial<T>> {
    const model = this.model as CustomerModel<T>;
    if (model.update === undefined) {
      throw new MethodDoesntExistError("update");
    }
    const { id } = verifyToken(token) as JwtPayload;
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
