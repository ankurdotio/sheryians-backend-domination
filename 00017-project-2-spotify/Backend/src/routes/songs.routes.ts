import { Router } from "express";
import {
    uploadSongController,
    createAlbumController,
    createPlaylistController,
    getSampleSongsController,
    addSongToPlaylistController,
    getSampleAlbumController,
    getAlbumByIdController,
    getPlaylistsController,
    getPlaylistsByIdController
} from "../controller/songs.controller.js";
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
     * @route GET /api/songs/album
     */
    router.get('/album', authMiddleware, getSampleAlbumController)

    /**
     * @route GET /api/songs/album/:albumId
     */
    router.get('/album/:albumId', authMiddleware, getAlbumByIdController)


    /**
     * @route POST /api/songs/playlist
     */
    router.post("/playlist", authMiddleware, createPlaylistController);

    /**
     * @route PATCH /api/songs/playlist/:playlistId/add-song/:songId
     */
    router.patch("/playlist/:playlistId/add-song/:songId", authMiddleware, addSongToPlaylistController)

    /**
     * @route GET /api/songs/playlist
     */
    router.get("/playlist", authMiddleware, getPlaylistsController)

    /**
     * @router GET /api/songs/playlist/:playlistId
     */
    router.get("/playlist/:playlistId", authMiddleware, getPlaylistsByIdController)

    return router;

}

export { registerSongsRoutes };
