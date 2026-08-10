import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import type {
    AuthenticatedRequest,
    AuthenticatedUser,
    CreateUserInput,
    StoredUser,
    TokenPayload,
    UserLookup,
} from "../types/user/user.types.js";

const users: UserLookup = new Map();
const secret = process.env.AUTH_SECRET ?? "development-auth-secret";

const encode = (value: string) => Buffer.from(value).toString("base64url");
const decode = (value: string) => Buffer.from(value, "base64url").toString("utf8");

const sign = (payload: string) => {
    return createHmac("sha256", secret).update(payload).digest("base64url");
};

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
    const payload = encode(
        JSON.stringify({
            sub: user.id,
            email: user.email,
            name: user.name,
        } satisfies TokenPayload)
    );

    const signature = sign(payload);
    return `${payload}.${signature}`;
};

const verifyAuthToken = (token: string): TokenPayload | null => {
    const [payload, signature] = token.split(".");

    if (!payload || !signature) {
        return null;
    }

    const expectedSignature = sign(payload);
    const providedBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (providedBuffer.length !== expectedBuffer.length) {
        return null;
    }

    if (!timingSafeEqual(providedBuffer, expectedBuffer)) {
        return null;
    }

    try {
        return JSON.parse(decode(payload)) as TokenPayload;
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

    (req as AuthenticatedRequest).user = getPublicUser(user);
    next();
};

export const getAuthenticatedUser = (req: Request) => {
    return (req as AuthenticatedRequest).user;
};