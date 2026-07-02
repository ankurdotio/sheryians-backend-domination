import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import multer from 'multer';
import { createPost, getPosts, getUserPosts } from '../controllers/post.controller.js';



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Specify the filename for the uploaded file
    }
})

const upload = multer({ storage: storage });

const router = Router();


/**
 * @route   POST /api/posts
 * @desc    Create a new post
 * @access  Private
 */
router.post("/", authenticate, upload.array('files', 10), createPost); // Assuming 'files' is the field name for uploaded files in the request


/**
 * @route   GET /api/posts
 * @desc    Get all posts of logged in user
 * @access  Public
 */
router.get("/", authenticate, getPosts); // Assuming the user is attached to the request object by the authentication middleware


/**
 * @route   GET /api/posts/:userId
 * @desc    Get all posts of a specific user
 * @access  Public
 */
router.get("/:userId", getUserPosts);



export default router;