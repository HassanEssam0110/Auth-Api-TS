import * as z from "zod/v4";
import { generateSlug, validationRules } from "../../utils/index.utils";

const updateMeSchema = {
  body: z
    .object({
      name: validationRules.user_name.optional(),
      email: validationRules.email.optional(),
    })
    .transform((data) => ({
      ...data,
      ...(data.name && { slug: generateSlug(data.name) }),
    })),
};

const changeMePasswordSchema = {
  body: z
    .object({
      current_password: validationRules.password,
      password: validationRules.password,
      repeat_password: validationRules.repeat_password,
    })
    .refine((data) => data.password === data.repeat_password, {
      message: "Passwords do not match",
      path: ["repeat_password"],
    }),
};

export { updateMeSchema, changeMePasswordSchema };
