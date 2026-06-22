import { Router } from "express";
import notesRouter from "./notes.routes.js";


/**
 * /api
 */
const indexRouter = Router();


/**
 * /api/notes
 */
indexRouter.use("/notes", notesRouter);



/**
 * /api/auth
 */
// indexRouter.use("/auth", authRouter);


export default indexRouter;