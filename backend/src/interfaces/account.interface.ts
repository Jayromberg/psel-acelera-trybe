import { IBaseInterface } from "./base.interface";

export interface IAccount extends IBaseInterface {
  name: string;
  email: string;
  password: string;
  identifier: string;
  isActive?: boolean;
}

export interface IUpdateAccount {
  name?: string;
  password?: string;
  email?: string;
  token: string;
}

export type ICreateAccount = Omit<IAccount, "token">;

export type IDeleteAccount = Pick<Required<IAccount>, "token" | "password">;
