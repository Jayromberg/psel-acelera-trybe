import { IAccount } from "../interfaces";
import { CustomerModel } from "../models/model";
import AccountModel from "../models/AccountModel";
import Service from "./Service";
import { comparePassword } from "../utils/bcrypt";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { MissingError, NotFoundError } from "../erros";

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
    if (!data.password) {
      throw new MissingError("Password is missing");
    }

    const { id } = verifyToken(token) as JwtPayload;
    const accountData = await super.findAccountById(id);

    if (!accountData) {
      throw new NotFoundError("Account not found");
    }

    await comparePassword(data.password, accountData.password);

    const { name, email, identifier, updatedAt } = await super.update(id, data);

    return { name, email, identifier, updatedAt };
  }
}

export default AccountService;
