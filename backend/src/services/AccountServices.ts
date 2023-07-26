import { IAccount } from "../interfaces";
import { SimpleModel } from "../models/model";
import CustomerModel from "../models/CustomerModel";
import Service from "./Service";

class AccountServices extends Service<IAccount> {
  protected model: SimpleModel<IAccount>;

  constructor(model: SimpleModel<IAccount>) {
    super(model);
    this.model = new CustomerModel();
  }

  async create(data: IAccount): Promise<IAccount> {
    return super.create(data);
  }

  async update(id: string, data: IAccount): Promise<IAccount> {
    return super.update(id, data);
  }
}

export default AccountServices;
