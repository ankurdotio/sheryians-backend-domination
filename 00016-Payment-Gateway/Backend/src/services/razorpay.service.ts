import Razorpay from "razorpay";
import config from "../config/config.js";


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
