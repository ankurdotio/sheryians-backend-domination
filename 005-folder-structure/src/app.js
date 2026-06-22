/**
 * server create krna
 * server config krna
 */

import express from "express";
import morgan from "morgan";
import indexRouter from "./routes/index.routes.js"


const app = express(); // new server instance create hua


app.use(express.json());
app.use(morgan("dev"));


app.use('/api', indexRouter);


export default app;