import * as jwt from "jsonwebtoken";

export function generateToken<T>(payload: Partial<T>) {
  return jwt.sign(payload, process.env.JWT_SECRET);
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
