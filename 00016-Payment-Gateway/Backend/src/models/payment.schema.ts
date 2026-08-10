import { Schema, model } from "mongoose";
import type { InferSchemaType } from "mongoose";


const paymentSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    paymentId: {
        type: String,
    },
    signature: {
        type: String,
    },
    status: {
        type: String,
        enum: ["created", "paid", "failed"],
        default: "created",
    },
    amount:{
        type: String,
        required: true,
    },
    currency:{
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

export type PaymentSchema = InferSchemaType<typeof paymentSchema>;

export const PaymentModel = model("Payment", paymentSchema);


