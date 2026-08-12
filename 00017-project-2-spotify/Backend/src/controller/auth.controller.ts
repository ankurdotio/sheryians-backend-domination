/**
 * Authentication controller with register, login, refresh, logout, and me handlers.
 */
import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail, findUserById, setRefreshTokenHash } from "../DAO/user.dao.js";
import { env } from "../config/env.js";
import type { LoginUserRequest, RegisterUserRequest, UserInfo } from "../types/user.js";
import { HttpError } from "../utils/http-error.js";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../utils/token.util.js";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validateRegisterBody(body: unknown): RegisterUserRequest {
  if (typeof body !== "object" || body === null) {
    throw new HttpError(400, "Request body must be an object.");
  }

  const candidate = body as Record<string, unknown>;
  const name = candidate.name;
  const email = candidate.email;
  const password = candidate.password;
  const userType = candidate.userType;

  if (!isNonEmptyString(name)) {
    throw new HttpError(400, "Name is required.");
  }

  if (!isNonEmptyString(email)) {
    throw new HttpError(400, "Email is required.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    throw new HttpError(400, "Email format is invalid.");
  }

  if (!isNonEmptyString(password) || password.trim().length < 8) {
    throw new HttpError(400, "Password must be at least 8 characters long.");
  }

  if (userType !== undefined && userType !== "user" && userType !== "artist") {
    throw new HttpError(400, "User type must be either 'user' or 'artist' if provided.");
  }

  return { name: name.trim(), email: email.trim().toLowerCase(), password, userType: userType ?? "user" };
}

function validateLoginBody(body: unknown): LoginUserRequest {
  if (typeof body !== "object" || body === null) {
    throw new HttpError(400, "Request body must be an object.");
  }

  const candidate = body as Record<string, unknown>;
  const email = candidate.email;
  const password = candidate.password;

  if (!isNonEmptyString(email)) {
    throw new HttpError(400, "Email is required.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    throw new HttpError(400, "Email format is invalid.");
  }

  if (!isNonEmptyString(password)) {
    throw new HttpError(400, "Password is required.");
  }

  return { email: email.trim().toLowerCase(), password };
}

function toUserInfo(user: { id: string; name: string; email: string; createdAt: Date; updatedAt: Date; userType: "user" | "artist" }): UserInfo {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    userType: user.userType
  };
}

function getRefreshCookieOptions() {
  const isProduction = env.NODE_ENV === "production";
  return {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: isProduction,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}

/**
 * Registers a new user and issues tokens.
 */
export async function registerHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = validateRegisterBody(req.body);
    const existing = await findUserByEmail(data.email);

    if (existing) {
      throw new HttpError(409, "Email already registered.");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await createUser({ name: data.name, email: data.email, passwordHash, userType: data.userType ?? "user" });

    const accessToken = createAccessToken({ id: user._id.toString(), email: user.email, name: user.name, userType: user.userType });
    const refreshToken = createRefreshToken({ id: user._id.toString(), email: user.email, name: user.name, userType: user.userType });
    const refreshHash = await bcrypt.hash(refreshToken, 10);

    await setRefreshTokenHash(user._id.toString(), refreshHash);

    res.status(201);
    res.setHeader("Authorization", `Bearer ${accessToken}`);
    res.cookie("refreshToken", refreshToken, getRefreshCookieOptions());
    res.json({
      message: "User registered successfully.",
      user: toUserInfo({ id: user._id.toString(), name: user.name, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt, userType: user.userType }),
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Logs in an existing user and issues tokens.
 */
export async function loginHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = validateLoginBody(req.body);
    const user = await findUserByEmail(data.email);

    if (!user) {
      throw new HttpError(401, "Invalid email or password.");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new HttpError(401, "Invalid email or password.");
    }

    const accessToken = createAccessToken({ id: user._id.toString(), email: user.email, name: user.name, userType: user.userType });
    const refreshToken = createRefreshToken({ id: user._id.toString(), email: user.email, name: user.name, userType: user.userType });
    const refreshHash = await bcrypt.hash(refreshToken, 10);

    await setRefreshTokenHash(user._id.toString(), refreshHash);

    res.setHeader("Authorization", `Bearer ${accessToken}`);
    res.cookie("refreshToken", refreshToken, getRefreshCookieOptions());
    res.json({
      message: "Logged in successfully.",
      user: toUserInfo({ id: user._id.toString(), name: user.name, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt, userType: user.userType }),
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Refreshes access and refresh tokens using the cookie-based refresh token.
 */
export async function refreshHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const refreshToken = req.cookies.refreshToken as string | undefined;
    if (!refreshToken) {
      throw new HttpError(401, "Refresh token missing.");
    }

    const payload = verifyRefreshToken(refreshToken);
    const user = await findUserById(payload.id);
    if (!user || !user.refreshTokenHash) {
      throw new HttpError(401, "Refresh token invalid.");
    }

    const isTokenValid = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!isTokenValid) {
      throw new HttpError(401, "Refresh token invalid.");
    }

    const newAccessToken = createAccessToken({ id: user._id.toString(), email: user.email, name: user.name, userType: user.userType });
    const newRefreshToken = createRefreshToken({ id: user._id.toString(), email: user.email, name: user.name, userType: user.userType });
    const newRefreshHash = await bcrypt.hash(newRefreshToken, 10);

    await setRefreshTokenHash(user._id.toString(), newRefreshHash);

    res.setHeader("Authorization", `Bearer ${newAccessToken}`);
    res.cookie("refreshToken", newRefreshToken, getRefreshCookieOptions());
    res.json({
      message: "Tokens refreshed successfully.",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Logs out the current user and clears the refresh token.
 */
export async function logoutHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const refreshToken = req.cookies.refreshToken as string | undefined;
    if (refreshToken) {
      try {
        const payload = verifyRefreshToken(refreshToken);
        await setRefreshTokenHash(payload.id, null);
      } catch {
        // ignore invalid refresh token and still clear the cookie
      }
    }

    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "strict", secure: env.NODE_ENV === "production" });
    res.json({ message: "Logged out successfully." });
  } catch (error) {
    next(error);
  }
}

/**
 * Returns the authenticated user's profile.
 */
export async function meHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = req.user;



    if (!user) {
      throw new HttpError(401, "Unauthorized.");
    }

    const profile = await findUserById(user.id);
    if (!profile) {
      throw new HttpError(401, "Unauthorized.");
    }

    res.json({ user: toUserInfo({ id: profile._id.toString(), name: profile.name, email: profile.email, createdAt: profile.createdAt, updatedAt: profile.updatedAt, userType: profile.userType }) });
  } catch (error) {
    next(error);
  }
}
