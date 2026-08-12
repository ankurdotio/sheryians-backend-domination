import { Router } from "express";
import { uploadSongController, createAlbumController } from "../controller/songs.controller.js";
import { authMiddleware, protectedToArtistMiddleware } from "../middlewares/auth.middleware.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });


function registerSongsRoutes(): Router {

    const router = Router();


    /**
     * @route POST /api/songs
     */
    router.post("/", authMiddleware, protectedToArtistMiddleware, upload.single("song"), uploadSongController);


    /**
     * @route POST /api/songs/album
     */
    router.post("/album", authMiddleware, protectedToArtistMiddleware, upload.single("poster"), createAlbumController);

    return router;

}

export { registerSongsRoutes };
