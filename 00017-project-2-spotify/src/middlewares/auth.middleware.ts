/**
 * Authentication middleware for protecting routes.
 */
import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/token.util.js";
import type { AuthPayload } from "../types/user.js";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

/**
 * Verifies an access token from the Authorization header.
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const header = req.get("authorization");
  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized." });
    return;
  }

  const token = header.slice(7);
  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized." });
  }
}
