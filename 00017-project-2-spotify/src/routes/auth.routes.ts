/**
 * Authentication routes.
 */
import { Router } from "express";
import {
  loginHandler,
  logoutHandler,
  meHandler,
  refreshHandler,
  registerHandler,
} from "../controller/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

/**
 * Registers authentication routes.
 * Method: POST /api/auth/register
 * Request body shape: { name: string, email: string, password: string }
 * Response shape: { message: string, user: UserInfo, accessToken: string, refreshToken: string }
 */
export function registerAuthRoutes(): Router {
  const router = Router();

  router.post("/register", registerHandler);
  router.post("/login", loginHandler);
  router.post("/refresh", refreshHandler);
  router.post("/logout", logoutHandler);
  router.get("/me", authMiddleware, meHandler);

  return router;
}
