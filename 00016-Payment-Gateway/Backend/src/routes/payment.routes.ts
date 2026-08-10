import { Router } from "express";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();


/**
 * @route POST /api/v1/payments/order
 */
router.post("/order", requireAuth, createOrder);


/**
 * @route POST /api/v1/payments/verify
 */
router.post("/verify", requireAuth, verifyPayment);

export default router;