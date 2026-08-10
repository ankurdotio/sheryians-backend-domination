import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import type {
    AuthenticatedUser,
    CreateUserInput,
    StoredUser,
    TokenPayload,
    UserLookup,
} from "../types/user/user.types.js";

const users: UserLookup = new Map();
const secret = process.env.AUTH_SECRET ?? "development-auth-secret";

export const saveUser = (user: CreateUserInput) => {
    const now = new Date();
    const storedUser: StoredUser = {
        ...user,
        id: user.id ?? crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
    };

    users.set(storedUser.email, storedUser);
    return storedUser;
};

export const getUserByEmail = (email: string) => {
    return users.get(email);
};

export const getPublicUser = (user: StoredUser): AuthenticatedUser => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
    };
};

export const buildAuthToken = (user: StoredUser) => {
    return jwt.sign(
        {
            sub: user.id,
            email: user.email,
            name: user.name,
        } satisfies TokenPayload,
        secret,
        {
            expiresIn: "1d",
        }
    );
};

const verifyAuthToken = (token: string): TokenPayload | null => {
    try {
        const decoded = jwt.verify(token, secret);

        if (typeof decoded !== "object" || decoded === null) {
            return null;
        }

        const { sub, email, name } = decoded;

        if (typeof sub !== "string" || typeof email !== "string" || typeof name !== "string") {
            return null;
        }

        return {
            sub,
            email,
            name,
        };
    } catch {
        return null;
    }
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
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

    const user = getUserByEmail(payload.email);

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