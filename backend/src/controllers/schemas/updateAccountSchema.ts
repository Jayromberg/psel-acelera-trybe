import { z } from "zod";
import accountSchema from "./accountSchema";

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
  });

export default updateAccountSchema;
