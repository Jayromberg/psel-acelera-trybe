import db from "../database/prismaClient";
import AccountPrisma from "../database/models/AccountPrisma";
import { NotAuthorizedError } from "../erros";
import { decodeToken } from "../utils/tokenTools";

export default class AuthService {
  private _accountModel: AccountPrisma;

  constructor() {
    this._accountModel = new AccountPrisma(db);
  }

  public async validateToken(token: string) {
    const decodedToken = decodeToken(token);
    const account = await this._accountModel.findByPk(decodedToken.id);
    if (!account) throw new NotAuthorizedError("Não autorizado");
    return decodedToken;
  }
}
