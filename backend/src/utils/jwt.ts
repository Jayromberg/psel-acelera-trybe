import jwt from "jsonwebtoken";
import { IAccount } from "../interfaces";

export function generateToken<T extends IAccount>(payloadData: Partial<T>) {
  const { id, email, name } = payloadData;
  const payload = { id, email, name };
  const secret = process.env.JWT_SECRET;

  return jwt.sign(payload, secret);
}

export function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET;
  return jwt.verify(token, secret);
}

export type JwtPayload = jwt.JwtPayload;
