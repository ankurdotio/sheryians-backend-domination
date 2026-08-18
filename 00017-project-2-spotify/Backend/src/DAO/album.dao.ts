import { Album } from "../models/album.model.js";
import type { CreateAlbumRequest, AlbumDocument } from "../types/album.js";
import type { SongDocument } from "../types/song.js";
import mongoose from "mongoose";

/**
 * Creates a new album document.
 */
export async function createAlbum(input: CreateAlbumRequest): Promise<AlbumDocument> {

    const album = await Album.create({
        title: input.title,
        user: input.user,
        poster: input.poster
    })


    return album
}


/**
 * Retrieves an album document by its ID and the associated artist's ID.
 */
export async function getAlbumByIdAndArtistId(albumId: string, artistId: string): Promise<AlbumDocument | null> {

    const album = await Album.findOne({ _id: albumId, user: artistId });

    return album
}


/**
 * Retrieves 20 sample album documents.(max 20)
 * @param n - The number of sample albums to retrieve (default is 20).
 * @returns An array of sample album documents.
 */
export async function getSampleAlbums(n: number = 20): Promise<(AlbumDocument & { artist: string })[]> {

    const numberOfAlbums = n > 20 ? 20 : n;

    const albums = await Album.aggregate([
        {
            '$sample': {
                'size': numberOfAlbums
            },
        },
        {
            "$lookup": {
                "from": "users",
                "localField": "user",
                "foreignField": "_id",
                "as": "artist"
            }
        },
        {
            "$unwind": "$artist"
        },
        {
            "$project": {
                "_id": 1,
                "title": 1,
                "poster": 1,
                "artist": "$artist.name",
                "user": 1
            }
        }
    ])

    return albums;

}


/**
 * Retrieves an album document by its ID.
 * @param albumId - The ID of the album to retrieve.
 * @returns The album document if found, otherwise null.
 */
export async function getAlbumById(albumId: string): Promise<{ _id: string; artist: string; title: string; poster: string; tracks: SongDocument[] } | null> {

    const album = await Album.aggregate([
        {
            "$match": {
                "_id": new mongoose.Types.ObjectId(albumId)
            }
        },
        {
            "$lookup": {
                "from": "songs",
                "localField": "_id",
                "foreignField": "album",
                "as": "tracks"
            }
        },
        {
            "$lookup": {
                "from": "users",
                "localField": "user",
                "foreignField": "_id",
                "as": "artist"
            }
        },
        {
            "$unwind": "$artist"
        },
        {
            "$project": {
                "_id": 1,
                "title": 1,
                "poster": 1,
                "artist": "$artist.name",
                "tracks": 1
            } 
        }
    ])

    return album.length > 0 ? album[0] : null;
}

