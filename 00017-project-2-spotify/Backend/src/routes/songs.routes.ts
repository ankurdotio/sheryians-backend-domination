import { Router } from "express";
import { uploadSongController, createAlbumController, createPlaylistController, getSampleSongsController, addSongToPlaylistController } from "../controller/songs.controller.js";
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
     * @route GET /api/songs
     */
    router.get("/", authMiddleware, getSampleSongsController)

    /**
     * @route POST /api/songs/album
     */
    router.post("/album", authMiddleware, protectedToArtistMiddleware, upload.single("poster"), createAlbumController);


    /**
     * @route POST /api/songs/playlist
     */
    router.post("/playlist", authMiddleware, createPlaylistController);

    /**
     * @route PATCH /api/songs/playlist/:playlistId/add-song/:songId
     */
    router.patch("/playlist/:playlistId/add-song/:songId", authMiddleware, addSongToPlaylistController)

    return router;

}

export { registerSongsRoutes };
