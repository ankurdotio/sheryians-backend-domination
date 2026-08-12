import mongoose, { InferSchemaType, Types } from "mongoose";


const songSchema = new mongoose.Schema({
    artist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    album:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
    url:{
        type: String,
        required: true,
        trim: true
    },
    poster:{
        type: String,
        required: true,
        trim: true
    }
})

export type SongDocumentType = InferSchemaType<typeof songSchema> & { _id: Types.ObjectId };

export const Song = mongoose.model<SongDocumentType>("Song", songSchema);