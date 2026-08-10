import jwt from "jsonwebtoken";
import type { StoredUser, TokenPayload } from "../types/user/user.types.js";

const secret = process.env.AUTH_SECRET ?? "development-auth-secret";

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

export const verifyAuthToken = (token: string): TokenPayload | null => {
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