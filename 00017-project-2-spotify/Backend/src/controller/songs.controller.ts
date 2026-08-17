import { Request, Response } from "express";
import { uploadFile } from "../services/storage.service.js"
import { createAlbum, getAlbumByIdAndArtistId } from "../DAO/album.dao.js"
import { addSongToPlaylist, createPlaylist, getPlaylistById, getPlaylistsByUserId, getPlaylistByIdAndUserId } from "../DAO/playlist.dao.js"
import { createSong, getSampleSongs, getSongById } from "../DAO/song.dao.js"
import id3 from "node-id3";



/**
 * Controller to handle the upload of a song file. It reads the ID3 tags from the uploaded file, uploads the song and its poster to storage, and creates a new song document in the database.
 */
export const uploadSongController = async (req: Request, res: Response) => {


    const file = req.file;
    const { album } = req.body;
    const user = req.user;

    if (!file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    const isAlbumValid = await getAlbumByIdAndArtistId(album, user!.id);

    if (!isAlbumValid) {
        return res.status(400).json({ message: "Invalid album ID or you do not have permission to upload to this album." });
    }

    const tags = id3.read(file.buffer);

    console.log("ID3 Tags:", tags);

    const url = await uploadFile(file.buffer, file.originalname, "spotify/songs");
    const posterUrl = await uploadFile((typeof tags.image === "object" ? tags.image.imageBuffer : Buffer.from([])), `${tags.title || "default"}.jpg`, "spotify/songs/posters");


    const song = await createSong({
        artist: user!.id,
        album: album,
        title: tags.title || file.originalname,
        url: url,
        poster: posterUrl
    })

    res.status(200).json({
        message: "File uploaded successfully.", data: {
            song
        }
    });

}


/**
 * Controller to get 20 sample songs from the database.
 */
export const getSampleSongsController = async (req: Request, res: Response) => {

    const numberOfSongs = req.query.n ?? 20;
    
    const songs = await getSampleSongs(Number(numberOfSongs));

    res.status(200).json({
        message: "Sample songs retrieved successfully.", data: {
            songs
        }
    });
}

/**
 * Controller to handle the creation of a new album. It uploads the album poster to storage and creates a new album document in the database.
 */
export const createAlbumController = async (req: Request, res: Response) => {

    const poster = req.file;
    const { title } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({ message: "Title is required and must be a non-empty string." });
    }

    if (!poster) {
        return res.status(400).json({ message: "No poster uploaded." });
    }

    const posterUrl = await uploadFile(poster.buffer, poster.originalname, "spotify/albums");


    const album = await createAlbum({
        title: title.trim(),
        user: req.user!.id,
        poster: posterUrl
    })

    return res.status(201).json({
        message: "Album created successfully.",
        data: {
            album
        }
    });

}


/**
 * Controller to handle the creation of new playlist. It creates a new playlist document in the database.
 */
export const createPlaylistController = async (req: Request, res: Response) => {

    const { title } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({ message: "Title is required and must be a non-empty string." });
    }

    const playlist = await createPlaylist({
        title: title.trim(),
        user: req.user!.id,
        songs: []
    })

    return res.status(201).json({
        message: "Playlist created successfully.",
        data: {
            playlist
        }
    });

}

/**
 * Controller to add a song to a playlist.
 */
export const addSongToPlaylistController = async (req: Request, res: Response) => {

    const { playlistId, songId } = req.params;
    const user = req.user

    if (!playlistId || !songId) {
        return res.status(400).json({ message: "Playlist ID and Song ID are required." });
    }

    const playlist = await getPlaylistByIdAndUserId(typeof playlistId === "string" ? playlistId : playlistId[0], user!.id);

    if (!playlist) {
        return res.status(404).json({ message: "Playlist not found or you do not have permission to modify this playlist." });
    }

    const song = await getSongById(typeof songId === "string" ? songId : songId[0]);

    if (!song) {
        return res.status(404).json({ message: "Song not found." });
    }

    await addSongToPlaylist(playlist._id.toString(), song._id.toString());

    return res.status(200).json({
        message: "Song added to playlist successfully.",
        data: {
            playlistId: playlist._id,
            songId: song._id
        }
    });
}