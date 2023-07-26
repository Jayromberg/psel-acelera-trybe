import { Model, PaymentModel } from "../models/model";
import { FunctionDoesntExistError } from "../erros";

abstract class Service<T> {
  protected model: Model<T> | PaymentModel<T>;
  constructor(model: Model<T> | PaymentModel<T>) {
    this.model = model;
  }

  async create(data: T): Promise<T> {
    return this.model.create(data);
  }

  async findAccountById(id: string): Promise<T | null> {
    const model = this.model as Model<T>;
    if (model.findAccountById === undefined) {
      throw new Error("Method not implemented.");
    }
    return model.findAccountById(id);
  }
}

export default Service;
