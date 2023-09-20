import jwt from "jsonwebtoken";
import { NotFoundError } from "../erros";

const SECRET_KEY = process.env.JWT_SECRET;

type payloadType = {
  id: string;
  name: string;
  email: string;
};

const jwtConfig: jwt.SignOptions = {
  expiresIn: "30m",
  algorithm: "HS256",
};

export const generateToken = (payload: object) => {
  const token = jwt.sign(payload, SECRET_KEY, jwtConfig);
  return token;
};

export const decodeToken = (token: string): payloadType => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded as payloadType;
  } catch (err) {
    throw new NotFoundError("Not authorized");
  }
};
