/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { BaseError } from "../erros";
import { ZodError } from "zod";

function httpError(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues[0].message });
  }
  const { statusCode, message } = err as BaseError;
  console.error(err);
  res.status(statusCode || 500).json({ message });
}

export default httpError;
