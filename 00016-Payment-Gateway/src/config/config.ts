import { config } from "dotenv";

config();


if(!process.env.RAZORPAY_API_KEY_ID ){
    throw new Error("RAZORPAY_API_KEY_ID is not defined in the environment variables");
}

if(!process.env.RAZORPAY_API_KEY_SECRET ){
    throw new Error("RAZORPAY_API_KEY_SECRET is not defined in the environment variables");
}


const _config = {
    RAZORPAY_API_KEY_ID: process.env.RAZORPAY_API_KEY_ID,
    RAZORPAY_API_KEY_SECRET: process.env.RAZORPAY_API_KEY_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
    MONGO_URI: process.env.MONGO_URI,
}


export default Object.freeze(_config);