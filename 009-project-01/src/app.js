import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import router from './routes/index.routes.js';


const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public')); // Serve static files from the 'public' directory


// Routes
app.use('/api', router);

export default app;