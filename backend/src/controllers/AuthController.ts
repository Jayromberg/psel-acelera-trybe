import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../erros";
import AuthService from "../services/AuthService";

export default class AuthController {
  constructor(private _authService = new AuthService()) {}

  public async validateToken(req: Request, _res: Response, next: NextFunction) {
    const token = req.headers["authorization"];
    if (!token) throw new NotAuthorizedError("Token não encontrado");
    const payload = await this._authService.validateToken(token);
    req.body.user = payload;
    next();
  }
}
