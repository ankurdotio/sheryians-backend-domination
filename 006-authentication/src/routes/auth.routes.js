import { Router } from "express";
import * as authController from "../controller/auth.controller.js";

const authRoutes = Router();


/**
 * POST /api/auth/register
 * @summary Register a new user
 * @tags Authentication
 */
authRoutes.post("/register",authController.registerUser);


/**
 * GET /api/auth/me
 * @summary Get the current logged-in user
 * @tags Authentication
 */
authRoutes.get("/me", authController.getCurrentUser);


export default authRoutes;