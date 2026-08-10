import { randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import type { Request, Response } from "express";
import {
    buildAuthToken,
    getPublicUser,
    getUserByEmail,
    saveUser,
} from "../middlewares/auth.middleware.js";
import type { CreateUserInput } from "../types/user/user.types.js";

const hashPassword = (password: string, salt: string) => {
    return scryptSync(password, salt, 64).toString("hex");
};

export const register = (req: Request, res: Response) => {
    const { name, email, password } = req.body as {
        name?: string;
        email?: string;
        password?: string;
    };

    if (!email || !password) {
        return res.status(400).json({
            message: "email and password are required",
        });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (getUserByEmail(normalizedEmail)) {
        return res.status(409).json({
            message: "User already exists",
        });
    }

    const salt = randomUUID();
    const userData: CreateUserInput = {
        id: randomUUID(),
        name: name?.trim() || "Anonymous",
        email: normalizedEmail,
        passwordHash: hashPassword(password, salt),
        salt,
    };

    const user = saveUser(userData);

    return res.status(201).json({
        message: "User registered successfully",
        token: buildAuthToken(user),
        user: getPublicUser(user),
    });
};

export const login = (req: Request, res: Response) => {
    const { email, password } = req.body as {
        email?: string;
        password?: string;
    };

    if (!email || !password) {
        return res.status(400).json({
            message: "email and password are required",
        });
    }

    const user = getUserByEmail(email.trim().toLowerCase());

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials",
        });
    }

    const incomingHash = hashPassword(password, user.salt);
    const matches = timingSafeEqual(
        Buffer.from(incomingHash, "hex"),
        Buffer.from(user.passwordHash, "hex")
    );

    if (!matches) {
        return res.status(401).json({
            message: "Invalid credentials",
        });
    }

    return res.status(200).json({
        message: "Login successful",
        token: buildAuthToken(user),
        user: getPublicUser(user),
    });
};