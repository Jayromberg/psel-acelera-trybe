import { IAccount, IUpdateAccount } from "../interfaces";
import { CustomerModel } from "../models/model";
import AccountModel from "../models/AccountModel";
import Service from "./Service";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { verifyToken, JwtPayload, generateToken } from "../utils/jwt";
import { NotFoundError } from "../erros";

class AccountService extends Service<IAccount> {
  private id: string;

  constructor(model: CustomerModel<IAccount> = new AccountModel()) {
    super(model);
    this.id = "not found";
  }

  private async validateAccess(data: IUpdateAccount) {
    const { token } = data;
    const { id } = verifyToken(token) as JwtPayload;
    const accountData = await super.findAccountById(id);
    if (!accountData) {
      throw new NotFoundError("Account not found");
    }
    await comparePassword(data.password, accountData.password);
    this.id = id;
  }

  async createAccount(data: IAccount): Promise<{ token: string }> {
    const hashedPassword = await hashPassword(data.password);
    const response = await super.create({ ...data, password: hashedPassword });
    const token = generateToken(response);
    return { token };
  }

  async updateAccount(data: IUpdateAccount): Promise<Partial<IAccount>> {
    await this.validateAccess(data);
    const { name, email, identifier, updatedAt } = await super.update(
      this.id,
      data,
    );
    return { name, email, identifier, updatedAt };
  }

  async deleteAccount(data: IUpdateAccount): Promise<void> {
    await this.validateAccess(data);
    super.delete(this.id);
  }
}

export default AccountService;
