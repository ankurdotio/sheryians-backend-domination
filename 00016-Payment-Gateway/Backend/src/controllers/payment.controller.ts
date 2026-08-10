import type { Request, Response } from "express";
import { getAuthenticatedUser } from "../middlewares/auth.middleware.js";
import { getProductById } from "../dao/product.dao.js";
import { createRazorpayOrder, verifyRazorpayPayment } from "../services/razorpay.service.js";
import { createPayment,makeStatusPaid } from "../dao/payment.dao.js"

import type {
    CreateOrderRequestBody,
    VerifyPaymentRequestBody,
} from "../types/payment/payment.types.js";




export const createOrder = async (
    req: Request<Record<string, never>, unknown, CreateOrderRequestBody>,
    res: Response
) => {
    const user = getAuthenticatedUser(req);
    const productId = req.body.productId;

    if (!productId) {
        return res.status(400).json({
            message: "productId is required",
        });
    }

    const product = await getProductById(productId);

    if (!product) {
        return res.status(404).json({
            message: "Product not found",
        });
    }

    const order = await createRazorpayOrder(product.price, product.currency);

    const payment = await createPayment({
        status: "created",
        user: user.id,
        product: product._id,
        orderId: order.id,
        amount: `${product.price}`,
        currency: product.currency,
    })


    return res.status(201).json({
        message: "Order created successfully",
        order: {
            id: order.id,
            amount: order.amount,
            currency: order.currency,
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
    
    const isValid = verifyRazorpayPayment(orderId, paymentId, signature);

    if(!isValid) {
        return res.status(400).json({
            message: "Invalid payment signature",
        });
    }

    const payment = makeStatusPaid(orderId, paymentId, signature);

    if(!payment) {
        return res.status(404).json({
            message: "Payment not found",
        });
    }

    // write logics like sending email, updating order status, etc. here

    return res.status(200).json({
        message: "Payment verified successfully",
        payment: payment,
    });

};