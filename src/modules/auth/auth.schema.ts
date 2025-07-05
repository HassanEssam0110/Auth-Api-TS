import * as z from "zod/v4";
import { generateSlug, validationRules } from "../../utils/index.utils";

const registerSchema = {
  body: z
    .object({
      name: validationRules.user_name,
      email: validationRules.email,
      password: validationRules.password,
      repeat_password: validationRules.repeat_password,
    })
    .refine((data) => data.password === data.repeat_password, {
      message: "Passwords do not match",
      path: ["repeat_password"],
    })
    .transform((data) => ({ ...data, slug: generateSlug(data.name) })),
};

const loginSchema = {
  body: z.object({
    email: validationRules.email,
    password: validationRules.password,
  }),
};

export { registerSchema, loginSchema };
