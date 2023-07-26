import { IAccount } from "../interfaces";
import { CustomerModel } from "../models/model";
import AccountModel from "../models/AccountModel";
import Service from "./Service";

class AccountServices extends Service<IAccount> {
  constructor(model: CustomerModel<IAccount> = new AccountModel()) {
    super(model);
  }

  async create(data: IAccount): Promise<IAccount> {
    return super.create(data);
  }

  async update(data: Partial<IAccount>): Promise<IAccount> {
    return super.update(data);
  }
}

export default AccountServices;
