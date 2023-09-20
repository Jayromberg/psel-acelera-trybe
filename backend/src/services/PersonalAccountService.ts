import AccountPrisma from "../database/models/AccountPrisma";
import * as entities from "../entities";
import * as types from "../types";
import { BadRequestError, NotFoundError } from "../erros";
import { encrypt, decrypt } from "../utils/crypt.ts";

export default class PersonalAccountService {
  constructor(private _model: AccountPrisma) {}

  public async CreatePersonal(
    account: types.Account,
  ): Promise<entities.PersonAccount | Error> {
    const newAccount = new entities.PersonAccount(
      account.name,
      account.email,
      account.password,
      account.documentNumber,
    );

    const emailAlreadyRegistered = await this._model.findOne({
      email: account.email,
    });

    if (emailAlreadyRegistered)
      throw new BadRequestError("Email já cadastrado");

    const CPFAlreadyRegistered = await this._model.findOne({
      documentNumber: account.documentNumber,
    });

    if (CPFAlreadyRegistered) throw new BadRequestError("CPF já cadastrado");

    const encryptedPassword = encrypt(account.password);
    newAccount.password = encryptedPassword;

    await this._model.create({
      name: newAccount.name,
      email: newAccount.email,
      password: newAccount.password,
      documentNumber: newAccount.CPF,
      accountType: types.AccountsType.PERSONAL,
    });

    return newAccount;
  }

  public async UpdatePersonal(
    updateAccount: types.Account,
    loggedAccount: types.LoggedAccount,
  ): Promise<void | Error> {
    const accountDatabase = await this._model.findByPk(updateAccount.id);

    if (!accountDatabase) throw new NotFoundError("Conta não encontrada");

    if (accountDatabase.id !== loggedAccount.id) {
      throw new BadRequestError(
        "Você não pode alterar os dados de outra conta",
      );
    }

    if (updateAccount.password !== decrypt(accountDatabase.password)) {
      const encryptedPassword = encrypt(updateAccount.password);
      updateAccount.password = encryptedPassword;
    }

    this.validateUpdateAccount(updateAccount, accountDatabase);

    await this._model.update(updateAccount.id, {
      name: updateAccount.name,
      email: updateAccount.email,
      password: updateAccount.password,
    });
  }

  private validateUpdateAccount(
    updateAccount: types.Account,
    accountDatabase: types.Account,
  ) {
    if (accountDatabase.documentNumber !== updateAccount.documentNumber) {
      throw new BadRequestError("CPF não pode ser alterado");
    }
    if (+accountDatabase.accountType !== +updateAccount.accountType) {
      throw new BadRequestError("Tipo de conta não pode ser alterado");
    }
  }
}
