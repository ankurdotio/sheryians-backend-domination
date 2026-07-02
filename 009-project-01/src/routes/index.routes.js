import { Router } from 'express';
import authRouter from './auth.routes.js';
import postRouter from './post.routes.js';

const router = Router();

// –––––– use the authRouter for all routes starting with /api/auth
router.use('/auth', authRouter);

// –––––– use the postRouter for all routes starting with /api/posts
router.use('/posts', postRouter);


export default router;