import AccountPrisma from "../database/models/AccountPrisma";
import * as entities from "../entities";
import * as types from "../types";
import JuridicalAccountService from "./JuridicalAccountService";
import PersonalAccountService from "./PersonalAccountService";
import { BadRequestError } from "../erros";

export default class AccountService {
  private _model: AccountPrisma;

  constructor() {
    this._model = new AccountPrisma();
  }

  public async List(): Promise<AccountSequelize[]> {
    const accounts = await this._model.findAll();
    return accounts;
  }

  public async Find(id: string): Promise<AccountSequelize | null> {
    const account = await this._model.findByPk(id);
    return account;
  }

  public async Create(
    account: types.Account,
  ): Promise<entities.JuridicalAccount | entities.PersonAccount | Error> {
    switch (account.accountType) {
      case 1:
        return await new PersonalAccountService(this._model).CreatePersonal(
          account,
        );
      case 2:
        return await new JuridicalAccountService(this._model).CreateJuridical(
          account,
        );
      default:
        throw new BadRequestError("Tipo de conta inválido");
    }
  }

  public async Update(
    updateAccount: Account,
    loggedAccount: LoggedAccount,
  ): Promise<void | Error> {
    switch (updateAccount.accountType) {
      case 1:
        return await new PersonalAccountService(this._model).UpdatePersonal(
          updateAccount,
          loggedAccount,
        );
      case 2:
        return await new JuridicalAccountService(this._model).UpdateJuridical(
          updateAccount,
          loggedAccount,
        );
      default:
        throw new BadRequestError("Tipo de conta inválido");
    }
  }
}
