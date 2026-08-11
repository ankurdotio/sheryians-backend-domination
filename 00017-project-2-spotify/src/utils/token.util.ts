/**
 * JWT helpers for access and refresh tokens.
 */
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { AuthPayload } from "../types/user.js";

/**
 * Pair of signed tokens issued together.
 */
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * Creates an access token for the given payload.
 */
export function createAccessToken(payload: AuthPayload): string {
  return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"],
  });
}

/**
 * Creates a refresh token for the given payload.
 */
export function createRefreshToken(payload: AuthPayload): string {
  return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"],
  });
}

/**
 * Verifies an access token.
 */
export function verifyAccessToken(token: string): AuthPayload {
  return jwt.verify(token, env.ACCESS_TOKEN_SECRET) as AuthPayload;
}

/**
 * Verifies a refresh token.
 */
export function verifyRefreshToken(token: string): AuthPayload {
  return jwt.verify(token, env.REFRESH_TOKEN_SECRET) as AuthPayload;
}
