import { Song } from "../models/song.model.js";
import type { CreateSongRequest, SongDocument } from "../types/song.js"



/**
 * Creates a new song document.
 */
export async function createSong(input: CreateSongRequest): Promise<SongDocument> {

    const song = await Song.create({
        artist: input.artist,
        album: input.album,
        title: input.title,
        url: input.url,
        poster: input.poster
    })

    return song

}