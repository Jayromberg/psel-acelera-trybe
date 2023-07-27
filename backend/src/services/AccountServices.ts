import { IAccount } from "../interfaces";
import { CustomerModel } from "../models/model";
import AccountModel from "../models/AccountModel";
import Service from "./Service";

class AccountService extends Service<IAccount> {
  constructor(model: CustomerModel<IAccount> = new AccountModel()) {
    super(model);
  }

  async create(data: IAccount): Promise<{ token: string }> {
    return super.create(data);
  }

  async update(
    token: string,
    data: Partial<IAccount>,
  ): Promise<Partial<IAccount>> {
    const { name, email, identifier, updatedAt } = await super.update(
      token,
      data,
    );
    return { name, email, identifier, updatedAt };
  }
}

export default AccountService;
