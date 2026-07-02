import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import multer from 'multer';
import { createPost, getPosts, getUserPosts, addComment, addCommentReply, getComments, getReplies, likePost } from '../controllers/post.controller.js';



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
router.get("/:userId", authenticate, getUserPosts);


/**
 * @route   POST /api/posts/comment/:postId
 * @desc    Add a comment to a specific post
 * @access  Private
 */
router.post("/comment/:postId", authenticate, addComment)



/**
 * @route   POST /api/posts/comment/:postId/:commentId
 * @desc    Add a reply to a specific comment on a post
 * @access  Private
 */
router.post("/comment/:postId/:commentId", authenticate, addCommentReply) // Assuming the user is attached to the request object by the authentication middleware


/**
 * @route  GET /api/posts/comment/:postId
 * @desc   Get all comments of a specific post
 * @access Private
 */
router.get("/comment/:postId", authenticate, getComments)


/**
 * @route   GET /api/posts/comment/:postId/:commentId
 * @desc    Get all replies of a specific comment on a post
 * @access  Private
 */
router.get("/comment/:postId/:commentId", authenticate, getReplies) // Assuming the user is attached to the request object by the authentication middleware



/**
 * @route POST /api/posts/like/:postId
 * @desc  Like a specific post
 * @access Private
 */
router.post("/like/:postId", authenticate, likePost);


export default router;