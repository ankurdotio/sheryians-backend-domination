import bcrypt from "bcryptjs";
import config from "../config/config.js";
import jwt from "jsonwebtoken";


/**
 * @description Hash a plain text string using bcryptjs
 * @param {string} plainText - The plain text string to be hashed
 * @returns {Promise<string>} - The hashed string
 */
export const hash = async (plainText) => {
    return await bcrypt.hash(plainText, 10);
}


/**
 * @description Compare a plain text string with a hashed string using bcryptjs
 * @param {string} plainText - The plain text string to be compared
 * @param {string} hashed - The hashed string to compare against
 * @returns {Promise<boolean>} - True if the strings match, false otherwise
 */
export const compare = async (plainText, hashed) => {
    return await bcrypt.compare(plainText, hashed);
}

/**
 * @description Generate new access token
 * @param {object} payload - The payload to be included in the token
 * @returns {string} - The generated access token
 */
export const generateAccessToken = (payload) => {
    return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, { expiresIn: config.ACCESS_TOKEN_EXPIRY });
}

/**
 * @description Generate new refresh token
 * @param {object} payload - The payload to be included in the token
 * @returns {string} - The generated refresh token
 */
export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, config.REFRESH_TOKEN_SECRET, { expiresIn: config.REFRESH_TOKEN_EXPIRY });
}


/**
 * @description Verify the access token
 * @param {string} token - The access token to be verified
 * @returns {object} - The decoded payload if the token is valid
 * @throws {Error} - If the token is invalid or expired
 */
export const verifyAccessToken = (token) => {
    return jwt.verify(token, config.ACCESS_TOKEN_SECRET);
}


/**
 * @description Verify the refresh token
 * @param {string} token - The refresh token to be verified
 * @returns {object} - The decoded payload if the token is valid
 * @throws {Error} - If the token is invalid or expired
 */
export const verifyRefreshToken = (token) => {
    return jwt.verify(token, config.REFRESH_TOKEN_SECRET);
}
