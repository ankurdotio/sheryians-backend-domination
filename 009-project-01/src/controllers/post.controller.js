import Post from '../models/post.model.js';



/**
 * @route   POST /api/posts
 * @desc    Create a new post
 * @access  Private
 */
export const createPost = async (req, res) => {

    const user = req.user; // Assuming the user is attached to the request object by the authentication middleware
    const caption = req.body.caption;
    const files = req.files; // Assuming files are attached to the request object by a file upload middleware


    console.log("User:", user);
    console.log("Caption:", caption);
    console.log("Files:", files);

    const media = files.map(file => {
        return {
            url: `/uploads/${file.filename}`, // Assuming the files are served from the 'public/uploads' directory
            mediaType: file.mimetype.startsWith('image/') ? 'image' : 'video' // Determine media type based on MIME type
        }
    })

    const post = await Post.create({
        user: user.id, // Assuming the user object has an _id property
        caption: caption,
        media: media
    })

    res.status(201).json({
        message: 'Post created successfully',
        data: {
            post
        }
    });
}


/**
 * @route   GET /api/posts
 * @desc    Get all posts of logged in user
 * @access  Private
 */
export const getPosts = async (req, res) => {

    const user = req.user; // Assuming the user is attached to the request object by the authentication middleware

    const posts = await Post.find({ user: user.id })

    res.status(200).json({
        message: 'Posts fetched successfully',
        data: {
            posts
        }
    });

}


/**
 * @route   GET /api/posts/:userId
 * @desc    Get all posts of a specific user
 * @access  Public
 */
export const getUserPosts = async (req, res) => {

    const userId = req.params.userId;

    const posts = await Post.find({ user: userId }).populate("user", "_id username")

    res.status(200).json({
        message: 'Posts fetched successfully',
        data: {
            posts
        }
    });

}