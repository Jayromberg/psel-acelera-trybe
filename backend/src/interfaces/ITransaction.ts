interface ITransaction {
  id?: string;
  customerId: string;
  date: Date;
  value: number;
  cratedAt?: Date;
  updatedAt?: Date;
}

export default ITransaction;
