import { IAccount } from "./account.interface";

export type IAccess = Pick<Required<IAccount>, "token" | "password">;
