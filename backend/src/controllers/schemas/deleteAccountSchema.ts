import { z } from "zod";
import accountSchema from "./createAccountSchema";

const deleteAccountSchema = accountSchema
  .omit({
    name: true,
    email: true,
    identifier: true,
  })
  .extend({
    token: z.string({ required_error: "Token is required" }),
  });

export default deleteAccountSchema;
