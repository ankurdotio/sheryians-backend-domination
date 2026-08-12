import { Request, Response } from "express";
import { uploadFile } from "../services/storage.service.js"
import { createAlbum } from "../DAO/album.dao.js"


export const uploadSongController = async (req: Request, res: Response) => {


    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    const url = await uploadFile(file.buffer, file.originalname, "spotify/songs");

    res.status(200).json({ message: "File uploaded successfully.", url });

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