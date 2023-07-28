import { CustomerModel } from "../models/model";
import AccountModel from "../models/AccountModel";
import Service from "./Service";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { verifyToken, JwtPayload, generateToken } from "../utils/jwt";
import { NotFoundError } from "../erros";
import { IAccess } from "../interfaces/access.interface";
import {
  IAccount,
  ICreateAccount,
  IDeleteAccount,
  IUpdateAccount,
} from "../interfaces/account.interface";

class AccountService extends Service<IAccount> {
  private id: string = "not found";

  constructor(model: CustomerModel<IAccount> = new AccountModel()) {
    super(model);
  }

  private validateToken(token: string) {
    const { id } = verifyToken(token) as JwtPayload;
    this.id = id;
  }

  private async validateAccess(data: IAccess) {
    this.validateToken(data.token);
    const accountData = await super.findAccountById(this.id);
    if (!accountData) {
      throw new NotFoundError("Account not found");
    }
    await comparePassword(data.password, accountData.password);
  }

  async createAccount(data: ICreateAccount): Promise<{ token: string }> {
    const hashedPassword = await hashPassword(data.password);
    const response = await super.create({ ...data, password: hashedPassword });
    const token = generateToken(response);
    return { token };
  }

  async updateAccount(data: IUpdateAccount): Promise<Partial<IAccount>> {
    this.validateToken(data.token);
    if (data.password) {
      const hashedPassword = await hashPassword(data.password);
      data.password = hashedPassword;
    }
    const updatedAccount = await super.update(this.id, data);
    const { name, email, identifier, updatedAt } = updatedAccount;
    return { name, email, identifier, updatedAt };
  }

  async deleteAccount(data: IDeleteAccount): Promise<void> {
    await this.validateAccess(data);
    super.delete(this.id);
  }
}

export default AccountService;
