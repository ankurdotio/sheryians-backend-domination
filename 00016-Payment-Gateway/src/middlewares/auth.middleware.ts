import type { NextFunction, Request, Response } from "express";
import { getPublicUser, getUserByEmail } from "../dao/user.dao.js";
import { verifyAuthToken } from "../utils/auth.util.js";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authorization header with Bearer token is required",
        });
    }

    const token = authHeader.slice(7);
    const payload = verifyAuthToken(token);

    if (!payload) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }

    const user = await getUserByEmail(payload.email);

    if (!user || user.id !== payload.sub) {
        return res.status(401).json({
            message: "User no longer exists",
        });
    }

    req.user = getPublicUser(user);
    next();
};

export const getAuthenticatedUser = (req: Request) => {
    if (!req.user) {
        throw new Error("Authenticated user is not available on the request");
    }

    return req.user;
};