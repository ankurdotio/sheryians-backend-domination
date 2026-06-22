import { Router } from "express";
import * as notesController from "../controllers/notes.controller.js";

/**
 * /api/notes
 */
const notesRouter = Router();


/**
 * POST /api/notes
 * @argument req.body.title String
 * @argument req.body.description String
 * @returns 201 {message: "Note created successfully"}
 */

notesRouter.post("/", notesController.createNote)


export default notesRouter;