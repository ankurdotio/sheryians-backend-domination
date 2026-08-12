import { Request, Response } from "express";
import { uploadFile } from "../services/storage.service.js"
import { createAlbum, getAlbumByIdAndArtistId } from "../DAO/album.dao.js"
import { createSong } from "../DAO/song.dao.js"
import id3 from "node-id3";


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