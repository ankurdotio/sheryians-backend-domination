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
 * Retrieves 20 sample song documents.(max 20)
 * @param n - The number of sample songs to retrieve (default is 20).
 * @returns An array of sample song documents.
 */
export async function getSampleSongs(n: number = 20): Promise<SongDocument[]> {

    const numberOfSongs = n > 20 ? 20 : n;


    const songs = await Song.aggregate([
        {
            '$sample': {
                'size': numberOfSongs
            },
        },
        {
            "$lookup": {
                "from": "users",
                "localField": "artist",
                "foreignField": "_id",
                "as": "artist"
            }
        },
        {
            "$unwind": "$artist"
        },
        {
            "$lookup": {
                "from": "albums",
                "localField": "album",
                "foreignField": "_id",
                "as": "album"
            }
        },
        {
            "$unwind": "$album"
        },
        {
            "$project": {
                "_id": 1,
                "title": 1,
                "url": 1,
                "poster": 1,
                "artist": "$artist.name",
                "album": "$album.title"
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
