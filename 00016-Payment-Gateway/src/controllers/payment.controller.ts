import type { Request, Response } from "express";
import { getAuthenticatedUser } from "../middlewares/auth.middleware.js";
import type {
    CreateOrderRequestBody,
    VerifyPaymentRequestBody,
} from "../types/payment/payment.types.js";



export const createOrder = (
	req: Request<Record<string, never>, unknown, CreateOrderRequestBody>,
    res: Response
) => {
	const user = getAuthenticatedUser(req);
	const { amount, currency = "INR", receipt } = req.body;

	if (!amount || amount <= 0) {
		return res.status(400).json({
			message: "A valid amount is required",
		});
	}

	return res.status(201).json({
		message: "Order created successfully",
		order: {
			id: `order_${Date.now()}`,
			amount,
			currency,
			receipt: receipt ?? `rcpt_${Date.now()}`,
			createdBy: user,
			status: "created",
		},
	});
};


export const verifyPayment = (
	req: Request<Record<string, never>, unknown, VerifyPaymentRequestBody>,
    res: Response
) => {
	const user = getAuthenticatedUser(req);
	const { orderId, paymentId, signature } = req.body;

	if (!orderId || !paymentId || !signature) {
		return res.status(400).json({
			message: "orderId, paymentId, and signature are required",
		});
	}

	return res.status(200).json({
		message: "Payment verified successfully",
		payment: {
			orderId,
			paymentId,
			signature,
			verifiedBy: user,
			verified: true,
		},
	});
};