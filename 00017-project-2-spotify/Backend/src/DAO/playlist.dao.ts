import { Playlist } from "../models/playlist.model.js"
import type { PlaylistDocument, CreatePlaylistRequest } from "../types/playlist.js"


/**
 * Creates a new playlist document.
 * @param input - The input data for creating the playlist.
 * @returns The created playlist document.
 */
export async function createPlaylist(input: CreatePlaylistRequest): Promise<PlaylistDocument> { 

    const playlist  = await Playlist.create({
        user: input.user,
        title: input.title,
        songs: input.songs
    })

    return playlist
}

/**
 * Add a song to a playlist.
 * @param playlistId - The ID of the playlist to which the song will be added.
 * @param songId - The ID of the song to be added to the playlist.
 */
export async function addSongToPlaylist(playlistId: string, songId: string): Promise<void> {
    await Playlist.findByIdAndUpdate(playlistId, { $push: { songs: songId } });
}


/**
 * Retrieves all the playlists for a specific user.
 * @param userId - The ID of the user whose playlists are to be retrieved.
 * @returns An array of playlist documents belonging to the specified user.
 */
export async function getPlaylistsByUserId(userId: string): Promise<PlaylistDocument[]> {
    const playlists = await Playlist.find({ user: userId });
    return playlists
}


/**
 * Retrieves a playlist document by its ID.
 * @param playlistId - The ID of the playlist to be retrieved.
 * @returns The playlist document if found, otherwise null.
 */
export async function getPlaylistById(playlistId: string): Promise<PlaylistDocument | null> {

    const playlist = await Playlist.findById(playlistId).populate("songs");

    return playlist
}


/**
 * Retrieves a playlist document by its ID and the associated user's ID.
 * @param playlistId - The ID of the playlist to be retrieved.
 * @param userId - The ID of the user associated with the playlist.
 * @returns The playlist document if found, otherwise null.
 */
export async function getPlaylistByIdAndUserId(playlistId: string, userId: string): Promise<PlaylistDocument | null> {

    const playlist = await Playlist.findOne({ _id: playlistId, user: userId })

    return playlist
    
}