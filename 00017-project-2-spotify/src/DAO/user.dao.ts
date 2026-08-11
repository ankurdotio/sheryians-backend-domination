/**
 * Data access layer for user persistence.
 */
import { User, type UserDocumentType } from "../models/user.model.js";
import type { UserDocument } from "../types/user.js";

function toUserDocument(user: UserDocumentType): UserDocument {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    passwordHash: user.passwordHash,
    refreshTokenHash: user.refreshTokenHash ?? null,
    createdAt: user.createdAt as Date,
    updatedAt: user.updatedAt as Date,
    userType: user.userType as "user" | "artist"
  };
}

/**
 * Finds a user by email.
 */
export async function findUserByEmail(email: string): Promise<UserDocument | null> {
  const user = await User.findOne({ email }).lean<UserDocumentType>().exec();
  return user ? toUserDocument(user) : null;
}

/**
 * Finds a user by id.
 */
export async function findUserById(id: string): Promise<UserDocument | null> {
  const user = await User.findById(id).lean<UserDocumentType>().exec();
  return user ? toUserDocument(user) : null;
}

/**
 * Creates a new user document.
 */
export async function createUser(input: { name: string; email: string; passwordHash: string }): Promise<UserDocument> {
  const created = await User.create({
    name: input.name,
    email: input.email,
    passwordHash: input.passwordHash,
  });

  return toUserDocument(created.toObject() as UserDocumentType);
}

/**
 * Updates a user's refresh token hash.
 */
export async function setRefreshTokenHash(userId: string, hash: string | null): Promise<void> {
  await User.findByIdAndUpdate(userId, { refreshTokenHash: hash }).exec();
}
