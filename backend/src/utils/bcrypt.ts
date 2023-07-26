import * as bcrypt from "bcrypt";

const bcryptSalt = 10;

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, bcryptSalt);
}

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
