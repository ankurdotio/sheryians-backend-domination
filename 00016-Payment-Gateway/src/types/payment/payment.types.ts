import type { PaymentSchema } from "../../models/payment.schema.js";



export type PaymentInput = Omit<PaymentSchema, "createdAt" | "updatedAt" | "signature" | "paymentId" | "user"> & {
    user: string;
};

export type PaymentData = PaymentSchema;

export type CreateOrderRequestBody = {
    productId?: string;
};

export type VerifyPaymentRequestBody = {
    orderId?: string;
    paymentId?: string;
    signature?: string;
};