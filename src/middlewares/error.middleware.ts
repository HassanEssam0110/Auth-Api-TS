import { Express, Request, Response, NextFunction } from "express";
import { AppError, HttpStatus } from "../utils/index.utils";
import CONFIG from "../config/config";

const sendErrorDev = (err: AppError, res: Response): void => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    errors: err.errors,
    isOperational: err.isOperational,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, res: Response): void => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      errors: err.errors,
    });
  } else {
    console.log("ERROR", err);
    res.status(HttpStatus.SERVER_ERROR.code).json({
      status: "error",
      message: HttpStatus.SERVER_ERROR.message,
    });
  }
};

/* ------------------ 404 Not Found Handler ------------------ */
const notFound = (req: Request, _res: Response, next: NextFunction): void => {
  next(
    new AppError(
      HttpStatus.NOT_FOUND_Route.code,
      HttpStatus.NOT_FOUND_Route.message
    )
  );
};

/* ------------------ Global Error Handler ------------------ */
// Handles any errors passed to `next(err)` or thrown in async routes
const globalErrorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {

  const appError =
    err instanceof AppError
      ? err
      : new AppError(
          HttpStatus.SERVER_ERROR.code,
          err.message
        );

  if (CONFIG.NODE_ENV === "production") sendErrorProd(appError, res);
  else sendErrorDev(appError, res);
};

/* ------------------ Mount Error Handlers ------------------ */
/**
 * @desc  Mounts both the 404 and global error-handling middleware
 */
const setupErrorHandlers = (app: Express): void => {
  app.use(notFound);
  app.use(globalErrorHandler);
};

export { setupErrorHandlers };
