import { Request, Response, NextFunction } from "express";
import z from "zod/v4";
import { AppError, HttpStatus } from "../utils/index.utils";

// Schema definition
type SchemaGroup = {
  body?: z.ZodType;
  query?: z.ZodType;
  params?: z.ZodType;
  headers?: z.ZodType;
};
const tartgets = ["body", "params", "query", "headers"] as const;

/**
 * @desc Validation middleware using Zod.
 * @param {SchemaGroup} schema
 * @returns {(req: Request, _res: Response, next: NextFunction) => void}
 * @example
 * const schema = {
 *   body: z.object({
 *     name: z.string().min(3).max(100).trim(),
 *     description: z.string().min(3).max(100).trim(),
 *     quantity: z.number().min(1).positive(),
 *   }),
 *   params: z.object({
 *     id: z.string().refine((val) => ObjectId.isValid(val), {
 *       message: "Invalid MongoDB ObjectId",
 *     }),
 *   }),
 * };
 *
 * app.post("/items/:id", validate(schema), (req, res, next) => {
 *   // req.body and req.params are now validated and parsed
 * });
 */
const validate = (schema: SchemaGroup) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const errors: { path: string; issues: { [key: string]: string } }[] = [];

    for (const key of tartgets) {
      if (req[key] && schema[key]) {
        const result = schema[key].safeParse(req[key]);

        if (!result.success) {
          const flattened = z.flattenError(result.error);
          errors.push({ path: key, issues: flattened.fieldErrors });
        } else {
          // assign parsed (and validated) data
          (req as any)[key] = result.data;
        }
      }
    }

    return errors.length > 0
      ? next(
          new AppError(
            HttpStatus.VALIDATION_ERROR.code,
            HttpStatus.VALIDATION_ERROR.message,
            errors
          )
        )
      : next();
  };
};

export { validate };
