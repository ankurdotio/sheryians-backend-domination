/**
 * Mongoose user schema and model.
 */
import mongoose, { InferSchemaType, Types } from "mongoose";

/**
 * User schema for persistence and authentication.
 */
export const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    refreshTokenHash: { type: String, default: null },
  },
  { timestamps: true },
);

/**
 * Inferred document shape for the Mongoose user model.
 */
export type UserDocumentType = InferSchemaType<typeof userSchema> & { _id: Types.ObjectId };

/**
 * User model for database access.
 */
export const User = mongoose.model<UserDocumentType>("User", userSchema);
