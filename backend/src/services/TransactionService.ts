import db from "../database/prismaClient";
import CashbackPrisma from "../database/models/CashbackPrisma";
import TransactionPrisma from "../database/models/TransactionPrisma";
import * as entities from "../entities";
import * as types from "../types";
import { ForbiddenError, NotFoundError } from "../erros";
import AccountService from "./AccountService";
import CashbackService from "./CashbackService";

export default class TransactionService {
  private _transactionModel: TransactionPrisma;
  private _cashbackModel: CashbackPrisma;
  private _accountService: AccountService;
  private _cashbackService: CashbackService;

  constructor() {
    this._transactionModel = new TransactionPrisma(db);
    this._cashbackModel = new CashbackPrisma(db);
    this._accountService = new AccountService();
    this._cashbackService = new CashbackService();
  }

  public async create(
    accountId: string,
    amount: number,
    loggedUser: types.LoggedAccount,
  ) {
    await db.$transaction(async () => {
      await this.UserExists(accountId);
      await this.ThisUserTransaction(accountId, loggedUser.id);

      const newTransaction = new entities.Transaction(accountId, amount);

      const transaction = await this._transactionModel.create({
        accountId: newTransaction.accountId,
        amount: newTransaction.value,
        date: new Date(),
      });

      newTransaction.id = transaction.id;

      const cashbackConfig = await this._cashbackService.create(amount);

      const newCashback = new entities.Cashback(
        accountId,
        transaction.id,
        cashbackConfig.rate,
      );

      const cashback = await this._cashbackModel.create({
        accountId: newCashback.accountId,
        transactionId: newCashback.transactionId,
        rate: newCashback.rate,
      });

      newCashback.id = cashback.id;

      const result = {
        transactionId: newTransaction.id,
        accountId,
        date: transaction.date,
        value: newTransaction.value,
        cashback: newCashback.rate,
      };

      return result;
    });
  }

  public async listByAccount(
    accountId: string,
    loggedUser: types.LoggedAccount,
  ) {
    await this.UserExists(accountId);
    await this.ThisUserTransaction(accountId, loggedUser.id);

    const transactions = await this._transactionModel.findMany(accountId);

    return transactions;
  }

  private async UserExists(accountId: string): Promise<types.Account> {
    const user = await this._accountService.Find(accountId);
    if (!user) throw new NotFoundError("Conta não encontrada");
    return user;
  }

  private async ThisUserTransaction(accountId: string, loggedUserId: string) {
    if (accountId !== loggedUserId)
      throw new ForbiddenError(
        "Você não pode acessar as transações de outro usuário",
      );
  }
}
