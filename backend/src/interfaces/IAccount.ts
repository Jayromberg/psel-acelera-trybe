interface IAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  identifier: string;
  role?: string;
  status?: boolean;
  createsAt?: Date;
  updatedAt?: Date;
}

export default IAccount;
