interface IBaseInterface {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITransaction extends IBaseInterface {
  customerId: string;
  date: Date;
  value: number;
}

export interface ICashback extends IBaseInterface {
  transactionId: string;
  cashback: number;
}

export interface IAccount extends IBaseInterface {
  name: string;
  email: string;
  password: string;
  identifier: string;
  isActive?: boolean;
}
