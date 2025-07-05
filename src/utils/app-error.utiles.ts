class AppError extends Error {
  public status: string;
  public statusCode: number;
  public errors?: unknown[];
  public readonly isOperational: boolean;

  constructor(statusCode: number, message: string, errors?: unknown[]) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.isOperational = true;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export { AppError };
