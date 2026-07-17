import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";


const authRouter = Router();


/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @param {string} username - The username of the user
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @returns {object} 201 - User created successfully
 * @returns {object} 400 - Bad request (validation errors)
 * @returns {object} 500 - Internal server error
 */
authRouter.post("/register", authController.registerUser);



/**
 * @route POST /api/auth/login
 * @description Login a user
 * @param {string} username - The username of the user
 * @param {string} password - The password of the user
 * @returns {object} 200 - User logged in successfully
 * @returns {object} 400 - Bad request (validation errors)
 * @returns {object} 401 - Unauthorized (invalid credentials)
 * @returns {object} 500 - Internal server error
 */
authRouter.post("/login", authController.loginUser);



/**
 * @route POST /api/auth/logout
 * @description Logout a user
 * @param {string} refreshToken - The refresh token of the user
 * @returns {object} 200 - User logged out successfully
 * @returns {object} 400 - Bad request (validation errors)
 * @returns {object} 401 - Unauthorized (invalid credentials)
 * @returns {object} 500 - Internal server error
 */

authRouter.post("/logout", authController.logoutUser);


/**
 * @route POST /api/auth/refresh-token
 * @description Refresh the access token using the refresh token
 * @param {string} refreshToken - The refresh token of the user
 * @returns {object} 200 - New access token generated successfully
 * @returns {object} 400 - Bad request (validation errors)
 * @returns {object} 401 - Unauthorized (invalid credentials)
 * @returns {object} 500 - Internal server error
 */
authRouter.post("/refresh-token", authController.refreshTokenController);



export default authRouter;