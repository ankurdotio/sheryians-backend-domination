import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { validateRegister } from "../middlewares/auth.middleware.js";

const router = Router();


/**
 * POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post("/register", validateRegister, authController.register);

export default router;