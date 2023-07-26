export class BaseError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

export class FunctionDoesntExistError extends BaseError {
  constructor(functionName: string) {
    super(404, `Function ${functionName} is invalid`);
  }
}
