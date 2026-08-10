import { PaymentModel } from "../models/payment.schema.js"
import type { PaymentInput, PaymentData } from "../types/payment/payment.types.js";


export const createPayment = async (paymentData: PaymentInput): Promise<PaymentData> => {

    const createdPayment = await PaymentModel.create(paymentData);

    return createdPayment
}

export const makeStatusPaid = async (orderId: string, paymentId: string, signature: string): Promise<PaymentData | null> => {

    const payment = await PaymentModel.findOneAndUpdate({
        orderId: orderId,
    },{
        status: "paid",
        paymentId: paymentId,
        signature: signature,
    },{
        new: true,
    })

    return payment;
 }