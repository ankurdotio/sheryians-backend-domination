export type CreateOrderRequestBody = {
    amount?: number;
    currency?: string;
    productId?: string;
};

export type VerifyPaymentRequestBody = {
    orderId?: string;
    paymentId?: string;
    signature?: string;
};