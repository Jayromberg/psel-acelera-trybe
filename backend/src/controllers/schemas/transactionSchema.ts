import { z } from "zod";

const transactionSchema = z
  .object({
    amount: z.number(),
  })
  .required()
  .strict();

export default transactionSchema;
