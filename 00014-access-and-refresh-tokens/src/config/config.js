import { config } from "dotenv";
config();


if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the environment variables");
}

if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined in the environment variables");
}

if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error("REFRESH_TOKEN_SECRET is not defined in the environment variables");
}

if (!process.env.ACCESS_TOKEN_EXPIRY) {
    throw new Error("ACCESS_TOKEN_EXPIRY is not defined in the environment variables");
}

if (!process.env.REFRESH_TOKEN_EXPIRY) {
    throw new Error("REFRESH_TOKEN_EXPIRY is not defined in the environment variables");
}

if (!process.env.NODE_ENV) {
    throw new Error("NODE_ENV is not defined in the environment variables");
}

const _config = {
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
    NODE_ENV: process.env.NODE_ENV
}


export default Object.freeze(_config);