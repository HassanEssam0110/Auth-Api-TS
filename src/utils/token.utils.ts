import jwt, { Secret, SignOptions, JwtPayload } from "jsonwebtoken";
import CONFIG from "../config/config";
import { AppError } from "./app-error.utiles";
import { HttpStatus } from "./http-status.utils";

/**
 * Generates a JWT token using the provided payload.
 *
 * @param {Object} payload - The payload to embed in the JWT.
 * @param {string} payload.userId - The user's unique ID.
 * @param {string} payload.role - The user's role.
 * @returns {string} The signed JWT token.
 *
 * @throws {Error} If JWT_SECRET or JWT_EXPIRES_IN is not defined.
 *
 * @example
 * const token = generateToken({ userId: "123", role: "admin" });
 */
const generateToken = (payload: { userId: string; role: string }): string => {
  const JWT_SECRET: Secret = CONFIG.JWT_SECRET;
  const expiresIn = CONFIG.JWT_EXPIRES_IN as SignOptions["expiresIn"];

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
  return token;
};

/**
 * @desc Verifies a JWT token asynchronously.
 * @param token - The JWT token to verify
 * @returns Promise resolving to decoded JwtPayload
 * @throws AppError if the token is invalid or expired
 */
const verifyToken = (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    const { INVALID_TOKEN } = HttpStatus;

    jwt.verify(token, CONFIG.JWT_SECRET as Secret, (error, payload) => {
      if (error || !payload) {
        return reject(new AppError(INVALID_TOKEN.code, INVALID_TOKEN.message));
      } else {
        resolve(payload as JwtPayload);
      }
    });
  });
};

export { generateToken, verifyToken };
