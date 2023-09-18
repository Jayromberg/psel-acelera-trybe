import { z } from "zod";

const accountSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    documentNumber: z.string(),
    password: z.string(),
    accountType: z.number(),
  })
  .required()
  .strict();

export default accountSchema;
