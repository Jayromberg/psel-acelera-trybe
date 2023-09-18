import { BadRequestError } from "../../erros";

export default class Name {
  private name: string;

  private constructor(name: string) {
    this.name = name;
  }

  public equals(name: Name): boolean {
    return this.name === name.value;
  }

  public static fromString(name: string) {
    Name.validateLength(name);
    return new Name(name);
  }

  private static validateLength(name: string): BadRequestError | void {
    if (name.length < 2)
      throw new BadRequestError("Nome precisa ter pelo menos 2 caracteres");
    if (name.length > 64)
      throw new BadRequestError("Nome precisa ter no máximo 64 caracteres");
  }

  public get value(): string {
    return this.name;
  }
}
