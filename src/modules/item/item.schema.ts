import * as z from "zod/v4";
import { generateSlug, validationRules } from "../../utils/index.utils";

const createItemSchema = {
  body: z
    .object({
      name: validationRules.item_name,
      description: validationRules.description,
      quantity: validationRules.quantity,
    })
    .transform((data) => ({ ...data, slug: generateSlug(data.name) })),
};

const updateItemSchema = {
  params: z.object({
    id: validationRules.objectIdSchema,
  }),
  body: z
    .object({
      name: validationRules.item_name.optional(),
      description: validationRules.description.optional(),
      quantity: validationRules.quantity.optional(),
    })
    .transform((data) => ({
      ...data,
      ...(data.name && { slug: generateSlug(data.name) }),
    })),
};

const getItemSchema = {
  params: z.object({
    id: validationRules.objectIdSchema,
  }),
};

const deleteItemSchema = {
  params: z.object({
    id: validationRules.objectIdSchema,
  }),
};

export { createItemSchema, updateItemSchema, getItemSchema, deleteItemSchema };
