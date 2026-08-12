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


/**
 * Retrieves 20 sample song documents.
 */
export async function getSampleSongs(): Promise<SongDocument[]> {

    const songs = await Song.aggregate([
        {
            '$sample': {
                'size': 20
            }
        }
    ])

    return songs;

}

/**
 * Retrieves a song document by its ID
 */

export async function getSongById(songId: string): Promise<SongDocument | null> {
    const song = await Song.findById(songId);
    return song;
}
