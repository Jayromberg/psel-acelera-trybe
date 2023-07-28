/* eslint-disable no-useless-escape */
import { z } from "zod";

const regexIdentifier = /^(?!(\d)\1{10})\d{9}\-\d{2}$|^\d{8}\/\d{4}\-\d{2}$/;

const accountSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(5),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }).min(5),
  identifier: z
    .string({ required_error: "CPF or CNPJ is required" })
    .regex(regexIdentifier, { message: "CPF or CNPJ is invalid " }),
});

export default accountSchema;
