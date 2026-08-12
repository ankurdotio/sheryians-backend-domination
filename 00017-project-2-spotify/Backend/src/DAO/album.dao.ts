import { Album } from "../models/album.model.js";
import type { CreateAlbumRequest, AlbumDocument } from "../types/album.js";

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