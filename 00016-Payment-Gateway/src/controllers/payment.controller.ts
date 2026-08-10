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
    
};


export const verifyPayment = (
	req: Request<Record<string, never>, unknown, VerifyPaymentRequestBody>,
    res: Response
) => {
	const user = getAuthenticatedUser(req);


};