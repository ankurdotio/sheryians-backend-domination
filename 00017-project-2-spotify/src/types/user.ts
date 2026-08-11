/**
 * Central user type definitions for the application.
 */
import type { UserDocumentType } from "../models/user.model.js";

/**
 * Inferred user document shape from the Mongoose schema.
 */
export type UserDocument = UserDocumentType;

/**
 * Safe public user profile shape for API responses.
 */
export interface UserInfo {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Request body shape for user registration.
 */
export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

/**
 * Request body shape for user login.
 */
export interface LoginUserRequest {
  email: string;
  password: string;
}

/**
 * JWT payload used for authentication.
 */
export interface AuthPayload {
  id: string;
  email: string;
  name: string;
}
