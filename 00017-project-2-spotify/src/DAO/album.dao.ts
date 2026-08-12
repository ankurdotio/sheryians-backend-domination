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