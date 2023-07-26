import { IAccount } from "../interfaces";
import { SimpleModel } from "../models/model";
import CustomerModel from "../models/CustomerModel";
import Service from "./Service";

class AccountServices extends Service<IAccount> {
  constructor(model: SimpleModel<IAccount> = new CustomerModel()) {
    super(model);
  }

  async create(data: IAccount): Promise<IAccount> {
    return super.create(data);
  }

  async update(id: string, data: IAccount): Promise<IAccount> {
    return super.update(id, data);
  }
}

export default AccountServices;
