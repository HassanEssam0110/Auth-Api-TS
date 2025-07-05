import * as z from "zod/v4";
import { generateSlug, validationRules } from "../../utils/index.utils";

const createUserSchema = {
  body: z
    .object({
      name: validationRules.user_name,
      email: validationRules.email,
      password: validationRules.password,
      role: validationRules.role,
    })
    .transform((data) => ({ ...data, slug: generateSlug(data.name) })),
};

const updateUserSchema = {
  params: z.object({
    id: validationRules.objectIdSchema,
  }),
  body: z
    .object({
      name: validationRules.user_name.optional(),
      email: validationRules.email.optional(),
      password: validationRules.password.optional(),
      role: validationRules.role.optional(),
    })
    .transform((data) => ({
      ...data,
      ...(data.name && { slug: generateSlug(data.name) }),
    })),
};

const deleteUserSchema = {
  params: z.object({
    id: validationRules.objectIdSchema,
  }),
};

const getUserSchema = {
  params: z.object({
    id: validationRules.objectIdSchema,
  }),
};

export { getUserSchema, createUserSchema, updateUserSchema, deleteUserSchema };
