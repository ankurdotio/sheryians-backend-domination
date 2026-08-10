import { Router } from "express";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/order", requireAuth, createOrder);

router.post("/verify", requireAuth, verifyPayment);

export default router;