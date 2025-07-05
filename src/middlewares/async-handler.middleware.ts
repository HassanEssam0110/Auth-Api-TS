import { Request, Response, NextFunction } from "express";

/**
 * Wraps an asynchronous Express route handler and forwards any errors
 * to the next middleware (typically the global error handler).
 *
 * This utility helps avoid repetitive try/catch blocks in async route handlers.
 *
 * @template T - The expected return type of the async handler (default is `any`)
 * @param fn - An asynchronous Express route handler function
 * @returns A new Express-compatible function that catches errors and calls `next(err)`
 *
 * @example
 * router.get("/items", asyncHandler(async (req, res, next) => {
 *   const items = await Item.find();
 *   res.json(items);
 * }));
 */
const asynchandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export { asynchandler };
