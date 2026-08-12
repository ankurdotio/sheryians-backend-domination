import type { PlaylistDocumentType } from "../models/playlist.model.js"

export type PlaylistDocument = PlaylistDocumentType

export interface CreatePlaylistRequest {
    user: string;
    title: string;
    songs: string[];
}