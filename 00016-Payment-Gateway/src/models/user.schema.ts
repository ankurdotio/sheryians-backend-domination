import type { InferSchemaType } from "mongoose";
import { Schema, model, models } from "mongoose";

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

export type UserSchema = InferSchemaType<typeof userSchema>;

export const UserModel = models.User || model("User", userSchema);