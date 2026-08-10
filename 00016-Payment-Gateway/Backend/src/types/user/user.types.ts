import type { UserSchema } from "../../models/user.schema.js";

export type StoredUser = UserSchema;

export type PublicUserFields = "passwordHash" | "createdAt" | "updatedAt";
export type AuthenticatedUser = Omit<StoredUser, PublicUserFields | "_id"> ;

export type CreateUserInput = Omit<StoredUser, "createdAt" | "updatedAt"> &
    Partial<Pick<StoredUser, "id">>;

export type TokenPayload = Pick<StoredUser, "email" | "name"> & {
    sub: StoredUser["id"];
};

export type UserPatch = Partial<Omit<StoredUser, "id" | "createdAt" | "updatedAt">>;

export type RegisterRequestBody = {
    name?: string;
    email?: string;
    password?: string;
};

export type LoginRequestBody = {
    email?: string;
    password?: string;
};