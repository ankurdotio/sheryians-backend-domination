/**
 * Centralized error handling middleware.
 */
import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/http-error.js";

/**
 * Handles application errors and returns a consistent response.
 */
export function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction): void {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  if (err instanceof Error) {
    res.status(500).json({ message: err.message });
    return;
  }

  res.status(500).json({ message: "Internal server error." });
}
