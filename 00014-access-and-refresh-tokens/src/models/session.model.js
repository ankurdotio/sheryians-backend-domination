import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const sessionModel = mongoose.model("sessions", sessionSchema);

export default sessionModel;