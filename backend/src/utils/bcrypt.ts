import * as bcrypt from "bcrypt";
import { MissingError, AccessDeniedError } from "../erros";

export async function hashPassword(password: string) {
  if (!password) {
    throw new MissingError("Password is missing");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function comparePassword(password: string, hash: string) {
  const isPasswordValid = await bcrypt.compare(password, hash);

  if (!isPasswordValid) {
    throw new AccessDeniedError("Password is invalid");
  }
}
