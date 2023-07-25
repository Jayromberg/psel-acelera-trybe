interface ICashback {
  id?: string;
  transactionId: string;
  cashback: number;
  cratedAt?: Date;
  updatedAt?: Date;
}

export default ICashback;
