import supertest from "supertest";
import { v4 as uuid } from "uuid";
import db from "../../src/database/prismaClient";
import AccountPrisma from "../../src/database/models/AccountPrisma";
import TransactionPrisma from "../../src/database/models/TransactionPrisma";
import CashbackPrisma from "../../src/database/models/CashbackPrisma";
import AuthService from "../../src/services/AuthService";
import App from "../../src/app";

jest.mock("@prisma/client", () => {
  const originalModule = jest.requireActual("@prisma/client");

  return {
    ...originalModule,
    PrismaClient: jest.fn(() => ({
      $connect: jest.fn(),
      $transaction: jest.fn(),
    })),
  };
});

describe("#POST /accounts/:accountId/transactions", function () {
  const app = new App().start(3999);

  afterAll(() => {
    app.close();
    jest.clearAllMocks();
  });

  test("deve ser possível registrar uma transação com sucesso", async function () {
    const userId = uuid();
    const transactionId = uuid();
    const userMock = { id: userId, name: "John", email: "j@mail.com" };

    AuthService.prototype.validateToken = jest
      .fn()
      .mockReturnValueOnce(userMock);
    AccountPrisma.prototype.findByPk = jest
      .fn()
      .mockReturnValueOnce(userMock)
      .mockReturnValueOnce(userMock);
    TransactionPrisma.prototype.create = jest.fn().mockReturnValueOnce({
      id: transactionId,
      accountId: userId,
      amount: 100,
      date: new Date(),
    });
    CashbackPrisma.prototype.create = jest.fn().mockReturnValueOnce({
      id: uuid(),
      accountId: userId,
      rate: 0.1,
      transactionId,
    });

    (db.$transaction as jest.Mock).mockImplementation(async (callback) => {
      return callback(db);
    });

    const response = await supertest(app)
      .post(`/accounts/${userId}/transactions`)
      .send({ amount: 100 })
      .set("Authorization", "fake_token");

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("transactionId");
    expect(response.body).toHaveProperty("accountId");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("value");
    expect(response.body).toHaveProperty("cashback");
    jest.clearAllMocks();
  });

  test("não deve ser possível realizar uma transação em contas diferentes", async function () {
    const userId = uuid();
    const anotherUserId = uuid();
    const userMock = { id: userId, name: "John", email: "j@mail.com" };

    AuthService.prototype.validateToken = jest
      .fn()
      .mockReturnValueOnce(userMock);
    AccountPrisma.prototype.findByPk = jest
      .fn()
      .mockReturnValueOnce(userMock)
      .mockReturnValueOnce(userMock);

    (db.$transaction as jest.Mock).mockImplementation(async (callback) => {
      return callback(db);
    });

    const response = await supertest(app)
      .post(`/accounts/${anotherUserId}/transactions`)
      .send({ amount: 100 })
      .set("Authorization", "fake_token");

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "Você não pode acessar as transações de outro usuário",
    );
    jest.clearAllMocks();
  });

  test("não deve ser possível realizar uma transação em uma conta inexistente", async function () {
    const userId = uuid();
    const userMock = { id: userId, name: "John", email: "j@mail.com" };

    AuthService.prototype.validateToken = jest
      .fn()
      .mockReturnValueOnce(userMock);
    AccountPrisma.prototype.findByPk = jest.fn().mockReturnValueOnce(undefined);

    (db.$transaction as jest.Mock).mockImplementation(async (callback) => {
      return callback(db);
    });

    const response = await supertest(app)
      .post(`/accounts/${userId}/transactions`)
      .send({ amount: 100 })
      .set("Authorization", "fake_token");

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Conta não encontrada");
  });

  test("não deve ser possível realizar uma transação sem um token", async function () {
    const userId = uuid();

    const response = await supertest(app)
      .post(`/accounts/${userId}/transactions`)
      .send({ amount: 100 });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Token não encontrado");
  });

  test("não deve ser possível realizar uma transação com um valor inválido", async function () {
    const userId = uuid();
    const userMock = { id: userId, name: "John", email: "j@mail.com" };

    AuthService.prototype.validateToken = jest
      .fn()
      .mockReturnValueOnce(userMock);
    AccountPrisma.prototype.findByPk = jest
      .fn()
      .mockReturnValueOnce(userMock)
      .mockReturnValueOnce(userMock);

    (db.$transaction as jest.Mock).mockImplementation(async (callback) => {
      return callback(db);
    });

    const response = await supertest(app)
      .post(`/accounts/${userId}/transactions`)
      .send({ amount: -100 })
      .set("Authorization", "fake_token");

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Valor da transação inválido");
  });
});
