import mongoose, { InferSchemaType, Types } from "mongoose";


const albumSchema = new mongoose.Schema({
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
    poster: {
        type: String,
        required: true,
        trim: true
    }
},
    {
        timestamps: true
    }
);

export type AlbumDocumentType = InferSchemaType<typeof albumSchema> & { _id: Types.ObjectId };

export const Album = mongoose.model<AlbumDocumentType>("Album", albumSchema);