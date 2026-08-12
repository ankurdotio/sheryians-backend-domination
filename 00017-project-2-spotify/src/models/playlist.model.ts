import mongoose, { InferSchemaType, Types } from "mongoose";


const playlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
    }]
},{
    timestamps: true
})

export type PlaylistDocumentType = InferSchemaType<typeof playlistSchema> & { _id: Types.ObjectId };

export const Playlist = mongoose.model<PlaylistDocumentType>("Playlist", playlistSchema);
