import type { InferSchemaType, Types } from "mongoose";
import { Schema, model } from "mongoose";

export const userSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export type UserSchema = InferSchemaType<typeof userSchema> & {
    _id: Types.ObjectId; // Include the _id field in the UserSchema type
};

export const UserModel = model("User", userSchema);