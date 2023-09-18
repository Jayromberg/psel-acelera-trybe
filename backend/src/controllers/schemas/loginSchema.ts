import { z } from "zod";

const loginSchema = z
  .object({
    email: z.string(),
    password: z.string(),
  })
  .required()
  .strict();

export default loginSchema;
