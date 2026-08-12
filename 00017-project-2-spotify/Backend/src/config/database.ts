/**
 * MongoDB connection helpers.
 */
import mongoose from "mongoose";
import { env } from "./env.js";

/**
 * Connects to MongoDB using the configured URI.
 */
export async function connectDatabase(): Promise<void> {
  await mongoose.connect(env.MONGODB_URI);
}
