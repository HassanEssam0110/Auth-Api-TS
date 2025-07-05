import bcrypt from "bcrypt";
import CONFIG from "../config/config";

/**
 * Hashes a plain-text password using bcrypt.
 *
 * @param {string} password - The plain-text password to hash.
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 */
const hashPassword = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, CONFIG.SALT_ROUNDS);
  return hash;
};

/**
 * Compares a plain-text password with a hashed password.
 *
 * @param {string} password - The plain-text password to verify.
 * @param {string} hashedPassword - The previously hashed password.
 * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match, otherwise false.
 */
const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};

export { hashPassword, comparePassword };
