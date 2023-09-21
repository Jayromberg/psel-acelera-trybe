import { Request, Response } from "express";
import LoginService from "../services/LoginService";
import ILogin from "../types/Login";
import * as schemas from "./schemas";

export default class LoginController {
  constructor(private _loginService = new LoginService()) {}

  public async Login(req: Request, res: Response) {
    schemas.loginSchema.parse(req.body as ILogin);
    const token = await this._loginService.Login(req.body);
    return res.status(200).json({ token });
  }
}
