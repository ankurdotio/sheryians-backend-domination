import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { buildAuthToken } from "../utils/auth.util.js";
import { createUser, getPublicUser, getUserByEmail } from "../dao/user.dao.js";
import type {
    CreateUserInput,
    LoginRequestBody,
    RegisterRequestBody,
} from "../types/user/user.types.js";

export const register = async (
    req: Request<Record<string, never>, unknown, RegisterRequestBody>,
    res: Response
) => {
    const { name, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "email and password are required",
        });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (await getUserByEmail(normalizedEmail)) {
        return res.status(409).json({
            message: "User already exists",
        });
    }

    const userData: CreateUserInput = {
        id: randomUUID(),
        name: name?.trim() || "Anonymous",
        email: normalizedEmail,
        passwordHash: await bcrypt.hash(password, 10),
    };

    const user = await createUser(userData);

    return res.status(201).json({
        message: "User registered successfully",
        token: buildAuthToken(user),
        user: getPublicUser(user),
    });
};

export const login = async (
    req: Request<Record<string, never>, unknown, LoginRequestBody>,
    res: Response
) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "email and password are required",
        });
    }

    const user = await getUserByEmail(email.trim().toLowerCase());

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials",
        });
    }

    const matches = await bcrypt.compare(password, user.passwordHash);

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