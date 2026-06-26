import mongoose from "mongoose";


export async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/authentication")
        console.log("Connected to the database");
    } catch (err) {
        console.error("Error connecting to the database:", err);
        process.exit(1);
    }
}