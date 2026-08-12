/**
 * Environment variable loader with strict validation.
 */

import dotenv from "dotenv";

dotenv.config();

/**
 * Typed environment configuration shape for the application.
 */
export interface AppEnv {
  PORT: number;
  MONGODB_URI: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRY: string;
  REFRESH_TOKEN_EXPIRY: string;
  NODE_ENV: "development" | "production" | "test";
  IMAGEKIT_PRIVATE_KEY: string;
}

function getRequiredEnv(key: keyof AppEnv): string {
  const value = process.env[key];
  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  throw new Error(`Missing required environment variable: ${key}`);
}

function parseNodeEnv(value: string): AppEnv["NODE_ENV"] {
  if (value === "development" || value === "production" || value === "test") {
    return value;
  }

  return "development";
}

/**
 * Typed environment configuration loaded from process.env.
 */
export const env: AppEnv = {
  PORT: Number(getRequiredEnv("PORT")),
  MONGODB_URI: getRequiredEnv("MONGODB_URI"),
  ACCESS_TOKEN_SECRET: getRequiredEnv("ACCESS_TOKEN_SECRET"),
  REFRESH_TOKEN_SECRET: getRequiredEnv("REFRESH_TOKEN_SECRET"),
  ACCESS_TOKEN_EXPIRY: getRequiredEnv("ACCESS_TOKEN_EXPIRY"),
  REFRESH_TOKEN_EXPIRY: getRequiredEnv("REFRESH_TOKEN_EXPIRY"),
  NODE_ENV: parseNodeEnv(getRequiredEnv("NODE_ENV")),
  IMAGEKIT_PRIVATE_KEY: getRequiredEnv("IMAGEKIT_PRIVATE_KEY"),
};
