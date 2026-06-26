import express from 'express';
import indexRoutes from './routes/index.routes.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", indexRoutes);

export default app;