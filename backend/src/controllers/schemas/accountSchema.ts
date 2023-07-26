/* eslint-disable no-useless-escape */
import { z } from "zod";

const regexIdentifier = /^(?!(\d)\1{10})\d{9}\-\d{2}$|^\d{8}\/\d{4}\-\d{2}$/;

export const accountSchema = z.object({
  name: z.string({ required_error: "Obrigatório nome" }).min(5),
  email: z.string({ required_error: "Obrigatório email" }).email(),
  password: z.string({ required_error: "Obrigatório senha" }).min(5),
  identifier: z
    .string({ required_error: "Obrigatório CPF ou CNPJ" })
    .regex(regexIdentifier, { message: "CPF ou CNPJ inválido" }),
});
