import userModel from "../models/user.model.js";
import { hash, compare, generateAccessToken, verifyAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/auth.utils.js"
import config from "../config/config.js";
import sessionModel from "../models/session.model.js";



/**
 * @route POST /api/register
 * @description Register a new user
 * @param {string} username - The username of the user
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @returns {object} 201 - User created successfully
 * @returns {object} 400 - Bad request (validation errors)
 * @returns {object} 500 - Internal server error
 */
export const registerUser = async (req, res) => {

    const { username, email, password } = req.body;

    const errors = [];

    if (!username || username.trim() === "" || username.length < 3) {
        errors.push({
            message: "Username must be at least 3 characters long",
            path: "username"
        });
    }

    if (!email || email.trim() === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push({
            message: "Invalid email format",
            path: "email"
        });
    }

    if (!password || password.trim() === "" || password.length < 6) {
        errors.push({
            message: "Password must be at least 6 characters long",
            path: "password"
        });
    }


    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const existingUser = await userModel.findOne({ $or: [ { username }, { email } ] });

    if (existingUser) {
        return res.status(400).json({
            errors: [ {
                message: "Username or email already exists",
            } ]
        });
    }

    const hashedPassword = await hash(password);

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    })

    const accessToken = generateAccessToken({ id: user._id, username: user.username });
    const refreshToken = generateRefreshToken({ id: user._id, username: user.username });

    const hashedRefreshToken = await hash(refreshToken);

    await sessionModel.create({
        user: user._id,
        refreshToken: hashedRefreshToken
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: config.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    });

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
        accessToken
    });

}


/**
 * @route POST /api/login
 * @description Login a user
 * @param {string} username - The username of the user
 * @param {string} password - The password of the user
 * @returns {object} 200 - User logged in successfully
 * @returns {object} 400 - Bad request (validation errors)
 * @returns {object} 401 - Unauthorized (invalid credentials)
 * @returns {object} 500 - Internal server error
 */
export const loginUser = async (req, res) => {

    const { username, password } = req.body;

    const errors = [];

    if (!username || username.trim() === "" || username.length < 3) {
        errors.push({
            message: "Username must be at least 3 characters long",
            path: "username"
        });
    }

    if (!password || password.trim() === "" || password.length < 6) {
        errors.push({
            message: "Password must be at least 6 characters long",
            path: "password"
        });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const user = await userModel.findOne({ username }).select("+password");

    if (!user) {
        return res.status(401).json({
            errors: [ {
                message: "Invalid username or password",
            } ]
        });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            errors: [ {
                message: "Invalid username or password",
            } ]
        });
    }

    const accessToken = generateAccessToken({ id: user._id, username: user.username });
    const refreshToken = generateRefreshToken({ id: user._id, username: user.username });

    const hashedRefreshToken = await hash(refreshToken);

    await sessionModel.findOneAndUpdate({
        user: user._id
    }, {
        refreshToken: hashedRefreshToken
    }, { upsert: true });


    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: config.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    });

    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
        accessToken
    });
}



/**
 * @route POST /api/auth/logout
 * @description Logout a user
 * @returns {object} 200 - User logged out successfully
 * @returns {object} 500 - Internal server error
 */
export const logoutUser = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({
                errors: [ {
                    message: "Refresh token not found",
                } ]
            });
        }

        const decoded = verifyRefreshToken(refreshToken);

        const { id } = decoded;

        const session = await sessionModel.findOne({ user: id });

        if (!session) {
            return res.status(400).json({
                errors: [ {
                    message: "Session not found",
                } ]
            });
        }

        await sessionModel.findOneAndDelete({ user: id });

        return res.status(200).json({
            message: "User logged out successfully"
        });

    } catch (error) {
        return res.status(401).json({
            errors: [ {
                message: "Invalid refresh token",
            } ]
        });
    }

}


/**
 * @route POST /api/auth/refresh-token
 * @description Refresh access token and refresh token using refresh token
 * @returns {object} 200 - New access token generated successfully
 * @returns {object} 400 - Bad request (validation errors)
 * @returns {object} 401 - Unauthorized (invalid credentials)
 * @returns {object} 500 - Internal server error
 */
export const refreshTokenController = async (req, res) => {

    try {


        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({
                errors: [ {
                    message: "Refresh token not found",
                } ]
            });
        }

        const decoded = verifyRefreshToken(refreshToken);
        const { id } = decoded;

        const session = await sessionModel.findOne({ user: id });

        if (!session) {
            return res.status(400).json({
                errors: [ {
                    message: "Session not found",
                } ]
            });
        }

        const isRefreshTokenValid = await compare(refreshToken, session.refreshToken);

        if (!isRefreshTokenValid) {

            await sessionModel.findOneAndDelete({ user: id });

            return res.status(401).json({
                errors: [ {
                    message: "Invalid refresh token",
                } ]
            });
        }

        const accessToken = generateAccessToken({ id: decoded.id, username: decoded.username });
        const newRefreshToken = generateRefreshToken({ id: decoded.id, username: decoded.username });

        const hashedNewRefreshToken = await hash(newRefreshToken);

        await sessionModel.findOneAndUpdate({ user: id }, { refreshToken: hashedNewRefreshToken });

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
        });

        return res.status(200).json({
            message: "New access token generated successfully",
            accessToken
        });

    } catch (error) {
        return res.status(401).json({
            errors: [ {
                message: "Invalid refresh token",
            } ]
        });
    }



}