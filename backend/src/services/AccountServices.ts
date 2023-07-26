import { IAccount } from "../interfaces";
import { CustomerModel } from "../models/model";
import AccountModel from "../models/AccountModel";
import Service from "./Service";
import { hashPassword } from "../utils/bcrypt";

class AccountServices extends Service<IAccount> {
  constructor(model: CustomerModel<IAccount> = new AccountModel()) {
    super(model);
  }

  async create(data: IAccount): Promise<IAccount> {
    data.password = await hashPassword(data.password);
    return super.create(data);
  }

  async update(data: Partial<IAccount>): Promise<IAccount> {
    return super.update(data);
  }
}

export default AccountServices;
