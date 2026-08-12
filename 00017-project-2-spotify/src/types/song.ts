import type { SongDocumentType } from "../models/song.model.js"


export type SongDocument = SongDocumentType


export interface CreateSongRequest {
    artist: string;
    album: string;
    title: string;
    url: string;
    poster: string;
}
