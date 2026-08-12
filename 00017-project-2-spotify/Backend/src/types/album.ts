import type { AlbumDocumentType } from "../models/album.model.js";

export type AlbumDocument = AlbumDocumentType;

export interface CreateAlbumRequest {
    title: string;
    user: string;
    poster: string;
}