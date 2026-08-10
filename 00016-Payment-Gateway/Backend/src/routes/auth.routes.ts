import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = Router();


/**
 * @route POST /api/v1/auth/register
 */
router.post("/register", register);


/**
 * @route POST /api/v1/auth/login
 */
router.post("/login", login);

export default router;