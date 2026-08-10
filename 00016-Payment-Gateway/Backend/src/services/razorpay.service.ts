import Razorpay from "razorpay";
import config from "../config/config.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js"


const razorpayInstance = new Razorpay({
    key_id: config.RAZORPAY_API_KEY_ID,
    key_secret: config.RAZORPAY_API_KEY_SECRET,
})


type RazorpayOrder = {
    id: string;
    amount: string;
    currency: string;
}

export async function createRazorpayOrder(amount: number, currency: string): Promise<RazorpayOrder> {

    const options = {
        amount: amount * 100, // Amount in paise
        currency: currency,
    }

    const order = await razorpayInstance.orders.create(options);


    return {
        id: order.id,
        amount: `${order.amount}`,
        currency: order.currency,
    };
}

export async function verifyRazorpayPayment(orderId: string, paymentId: string, signature: string): Promise<boolean> {

    const isValid = await validatePaymentVerification({
        order_id: orderId,
        payment_id: paymentId
    }, signature, config.RAZORPAY_API_KEY_SECRET);

    return isValid;
}
