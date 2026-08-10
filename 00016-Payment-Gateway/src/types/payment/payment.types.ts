export type CreateOrderRequestBody = {
    amount?: number;
    currency?: string;
    receipt?: string;
};

export type VerifyPaymentRequestBody = {
    orderId?: string;
    paymentId?: string;
    signature?: string;
};