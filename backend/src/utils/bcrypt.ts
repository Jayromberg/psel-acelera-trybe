import * as bcrypt from "bcrypt";
import { MissingError } from "../erros";
import { IAccount } from "../interfaces";

export async function hashPassword<T extends IAccount>({ password }: T) {
  if (!password) {
    throw new MissingError("Password is missing");
  }

  const bcryptSalt = 10;
  return await bcrypt.hash(password, bcryptSalt);
}

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
