import { BadRequestError } from "../../erros";

export default class Password {
  private password: string;

  private constructor(password: string) {
    this.password = password;
  }

  public equals(password: Password): boolean {
    return this.password === password.value;
  }

  public static fromString(password: string) {
    Password.validateLength(password);
    return new Password(password);
  }

  private static validateLength(password: string): BadRequestError | void {
    if (password.length < 6)
      throw new BadRequestError("Senha precisa ter no mínimo 6 caracteres");
    if (password.length > 64)
      throw new BadRequestError("Senha precisa ter no máximo 64 caracteres");
  }

  public get value(): string {
    return this.password;
  }
}
