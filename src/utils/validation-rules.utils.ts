import * as z from "zod/v4";
import { Types } from "mongoose";
import { SYSTEM_ROLES } from "./system-roles.utils";

const validationRules = {
  /* ---------------- Mongo ID -------------*/
  objectIdSchema: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ID format",
  }),

  /* ---------------- User -------------*/
  user_name: z
    .string()
    .min(6, { message: "Name must be at least 6 chars" })
    .max(30, { message: "Name can't exceed 30 chars" })
    .trim(),
  email: z.email({ message: "Invalid email format" }),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/, {
      message: "Min 8 chars, mix of upper, lower, number & symbol",
    })
    .trim(),
  repeat_password: z.string().trim(),
  role: z.enum(Object.values(SYSTEM_ROLES)),

  /* ---------------- Item -------------*/
  item_name: z
    .string()
    .min(3, { message: "Name must be at least 3 chars" })
    .max(100, { message: "Name can't exceed 100 chars" })
    .trim(),
  description: z
    .string()
    .min(5, { message: "Desc must be at least 5 chars" })
    .max(200, { message: "Desc can't exceed 200 chars" })
    .trim(),
  quantity: z
    .number()
    .min(1, { message: "Qty must be at least 1" })
    .positive({ message: "Qty must be positive" }),
} as const;

export { validationRules };
