import { PaymentModel } from "../models/payment.schema.js"
import type { PaymentInput, PaymentData } from "../types/payment/payment.types.js";


export const createPayment = async (paymentData: PaymentInput): Promise<PaymentData> => {

    const createdPayment = await PaymentModel.create(paymentData);

    return createdPayment
}