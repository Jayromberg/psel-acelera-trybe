import AccountPrisma from "../database/models/AccountPrisma";
import * as entities from "../entities";
import * as types from "../types";
import { BadRequestError, NotFoundError } from "../erros";
import { encrypt, decrypt } from "../utils/crypt.ts";

export default class JuridicalAccountService {
  constructor(private _model: AccountPrisma) {}

  public async CreateJuridical(
    account: types.Account,
  ): Promise<entities.JuridicalAccount> {
    const newAccount = new entities.JuridicalAccount(
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

    const CNPJAlreadyRegistered = await this._model.findOne({
      documentNumber: account.documentNumber,
    });

    if (CNPJAlreadyRegistered) throw new BadRequestError("CNPJ já cadastrado");

    const encryptedPassword = encrypt(account.password);
    newAccount.password = encryptedPassword;

    await this._model.create({
      name: newAccount.name,
      email: newAccount.email,
      password: newAccount.password,
      documentNumber: newAccount.CNPJ,
      accountType: types.AccountsType.JURIDICAL,
    });

    return newAccount;
  }

  public async UpdateJuridical(
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
    if (updateAccount.password !== decrypt(accountDatabase.password)) {
      const encryptedPassword = encrypt(updateAccount.password);
      updateAccount.password = encryptedPassword;
    }
    if (accountDatabase.documentNumber !== updateAccount.documentNumber) {
      throw new BadRequestError("CPF não pode ser alterado");
    }
    if (accountDatabase.accountType !== updateAccount.accountType) {
      throw new BadRequestError("Tipo de conta não pode ser alterado");
    }
  }
}
