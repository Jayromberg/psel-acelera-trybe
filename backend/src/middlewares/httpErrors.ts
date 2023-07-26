import { Request, Response } from "express";
import { BaseError } from "../erros";

const httpError = (err: Error, _req: Request, res: Response) => {
  const { status, message } = err as BaseError;
  res.status(status || 500).json({ message });
};

export default httpError;
