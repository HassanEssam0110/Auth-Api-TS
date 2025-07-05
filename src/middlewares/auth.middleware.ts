import { Request, Response, NextFunction } from "express";
import { asynchandler } from "./async-handler.middleware";
import { AppError, HttpStatus, verifyToken } from "../utils/index.utils";
import { User } from "../database/models/index.models";
import CONFIG from "../config/config";

/**
 * @desc    Middleware to authenticate users based on JWT token.
 * @method  All (used globally on protected routes)
 * @access  Private
 *
 * @param req - Express request object (expects `Authorization` header with token).
 * @param _res - Express response object (unused).
 * @param next - Express next function to pass control to the next middleware.
 *
 * @throws {AppError} If token is missing, invalid, expired, user not found, or password was changed after token was issued.
 *
 * @example
 * // Usage in a protected route
 * router.get('/profile', auth, getProfile);
 */
const auth = asynchandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const { UNAUTHORIZED } = HttpStatus;
    const authHeader = (req.headers?.authorization || "").trim();

    // Check if token exists and prefix is valid
    const [prefix, token] = authHeader.split(" ");
    if (prefix !== CONFIG.JWT_CUSTOM_PREFIX || !token) {
      return next(new AppError(UNAUTHORIZED.code, UNAUTHORIZED.message));
    }

    // Check if token is valid
    const decoded = await verifyToken(token);
    if (!decoded || !decoded.userId) {
      return next(new AppError(UNAUTHORIZED.code, UNAUTHORIZED.message));
    }

    // Find user by ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      return next(new AppError(UNAUTHORIZED.code, UNAUTHORIZED.message));
    }

    // Check if user changed password after the token was issued
    if (
      user.passwordChangedAt &&
      decoded.iat &&
      user.passwordChangedAfter(decoded.iat)
    ) {
      return next(new AppError(UNAUTHORIZED.code, UNAUTHORIZED.message));
    }

    // Attach user to request
    req.currentUser = user;
    next();
  }
);

/**
 * Middleware to restrict access based on user roles.
 *
 * @param roles - Allowed roles (e.g., ['admin', 'user']).
 * @returns Middleware that denies access if the user doesn't match the role.
 */
const allowTo = (...roles: ReadonlyArray<string>) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.currentUser || !roles.includes(req.currentUser.role)) {
      return next(
        new AppError(HttpStatus.FORBIDDEN.code, HttpStatus.FORBIDDEN.message)
      );
    }

    next();
  };
};

export { auth, allowTo };
