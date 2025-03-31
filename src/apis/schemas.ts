import { z } from "zod";

export const loginschema = z.object({
  name: z
    .string({ required_error: "name is reqired" })
    .min(4, { message: "name is reqired" })
    .trim(),
  password: z
    .string({ required_error: "password is reqired" })
    .min(6, { message: "password is reqired" }),
});

export type LoginSchema = typeof loginschema;
