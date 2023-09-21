import db from "../database/prismaClient";
import AccountPrisma from "../database/models/AccountPrisma";
import { BadRequestError } from "../erros";
import Login from "../types/Login";
import { decrypt } from "../utils/crypt";
import { generateToken } from "../utils/tokenTools";

export default class LoginService {
  private _model: AccountPrisma;

  constructor() {
    this._model = new AccountPrisma(db);
  }

  public async Login(data: Login) {
    const account = await this._model.findOne({
      email: data.email,
    });

    if (!account) {
      throw new BadRequestError("Email ou senha inválidos");
    }

    const decodedPassword = decrypt(account.password);

    if (data.password !== decodedPassword) {
      throw new BadRequestError("Email ou senha inválidos");
    }

    const newToken = generateToken({
      id: account.id,
      name: account.name,
      email: account.email,
    });
    return newToken;
  }
}
