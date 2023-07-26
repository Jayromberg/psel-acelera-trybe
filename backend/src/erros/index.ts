export class BaseError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

export class MethodDoesntExistError extends BaseError {
  constructor(Method: string) {
    super(404, `Method ${Method} is invalid`);
  }
}
