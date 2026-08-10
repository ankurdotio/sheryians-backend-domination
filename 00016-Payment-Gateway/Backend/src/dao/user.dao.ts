import { UserModel } from "../models/user.schema.js";
import type {
    AuthenticatedUser,
    CreateUserInput,
    StoredUser,
} from "../types/user/user.types.js";
import type { Types } from "mongoose";

const toStoredUser = (user: {
    _id: Types.ObjectId;
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}): StoredUser => {
    return {
        _id: user._id,
        id: user.id,
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};

export const createUser = async (user: CreateUserInput): Promise<StoredUser> => {
    const createdUser = await UserModel.create({
        id: user.id,
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash,
    });

    return toStoredUser(createdUser);
};

export const getUserByEmail = async (email: string): Promise<StoredUser | null> => {
    const user = await UserModel.findOne({
        email: email,
    })

    if (!user) {
        return null;
    }

    return toStoredUser(user);
};

export const getPublicUser = (user: StoredUser): AuthenticatedUser => {

    console.log("user._id", user);

    return {
        id: `${user._id}`,
        name: user.name,
        email: user.email,
    };
};