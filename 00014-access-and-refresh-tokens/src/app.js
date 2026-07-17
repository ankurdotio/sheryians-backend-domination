import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index.routes.js';


const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());


/**
 * Routes
 */
app.use('/api', indexRouter);

export default app;