export class BaseError extends Error {
  statusCode: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = status;
  }
}

export class MethodDoesntExistError extends BaseError {
  constructor(Method: string) {
    const statusCode = 404;
    super(statusCode, `Method ${Method} is invalid`);
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string) {
    const statusCode = 400;
    super(statusCode, message);
  }
}
