import { z } from "zod";
import accountSchema from "./createAccountSchema";

const updateAccountSchema = accountSchema
  .omit({
    identifier: true,
  })
  .extend({
    token: z.string(),
  })
  .partial({
    email: true,
    name: true,
    password: true,
  });

export default updateAccountSchema;