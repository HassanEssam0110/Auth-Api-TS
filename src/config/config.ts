import { config } from "dotenv";

config();

const keys = [
  "PORT",
  "NODE_ENV",
  "DB_URI",
  "SALT_ROUNDS",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "JWT_CUSTOM_PREFIX",
] as const;

const validateEnv = (keys: readonly string[]): void => {
  let errors: string[] = [];
  for (const key of keys) {
    if (!process.env[key]) errors.push(key);
  }

  if (errors.length > 0) {
    throw new Error(`Missing environment variables: ${errors.join(", ")}`);
  }
};

validateEnv(keys);

/**
 * @desc Environment variables
 * */
const CONFIG = {
  PORT: Number(process.env.PORT),
  NODE_ENV: process.env.NODE_ENV?.trim() ?? "development",
  DB_URI: process.env.DB_URI?.trim() ?? "",
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
  JWT_SECRET: process.env.JWT_SECRET?.trim() ?? "",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN?.trim() ?? "1d",
  JWT_CUSTOM_PREFIX: process.env.JWT_CUSTOM_PREFIX?.trim() ?? "Bearer",
};

export default CONFIG;
