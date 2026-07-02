import Post from '../models/post.model.js';
import Comment from '../models/comment.model.js';
import Like from '../models/like.model.js';


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


/**
 * @route   POST /api/posts/comment/:postId
 * @desc    Add a comment to a specific post
 * @access  Private
 */
export const addComment = async (req, res) => {
    const { content } = req.body;

    const user = req.user; // Assuming the user is attached to the request object by the authentication middleware
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    const comment = await Comment.create({
        user: user.id,
        post: postId,
        content: content
    })

    res.status(201).json({
        message: 'Comment added successfully',
        data: {
            comment
        }
    })

}



/**
 * @route   POST /api/posts/comment/:postId/:commentId
 * @desc    Add a reply to a specific comment on a post
 * @access  Private
 */
export const addCommentReply = async (req, res) => {
    const { content } = req.body;

    const user = req.user; // Assuming the user is attached to the request object by the authentication middleware
    const postId = req.params.postId;
    const parentCommentId = req.params.commentId;

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    const parentComment = await Comment.findOne({
        _id: parentCommentId,
        post: postId
    })

    if (!parentComment) {
        return res.status(404).json({ message: 'Parent comment not found' });
    }

    const comment = await Comment.create({
        user: user.id,
        post: postId,
        content: content,
        parentComment: parentCommentId
    })

    res.status(201).json({
        message: 'Reply added successfully',
        data: {
            comment
        }
    })

}



/**
 * @route  GET /api/posts/comment/:postId
 * @desc   Get all comments of a specific post
 * @access Private
 */
export const getComments = async (req, res) => {

    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    const comments = await Comment.find({
        post: postId,
        parentComment: null // Fetch only top-level comments
    })

    res.status(200).json({
        message: 'Comments fetched successfully',
        data: {
            comments
        }
    })

}

/**
 * @route  GET /api/posts/comment/:postId/:commentId
 * @desc   Get all replies of a specific comment on a post
 * @access Private
 */
export const getReplies = async (req, res) => {

    const postId = req.params.postId;
    const parentCommentId = req.params.commentId;

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    const parentComment = await Comment.findOne({
        _id: parentCommentId,
        post: postId
    })

    if (!parentComment) {
        return res.status(404).json({ message: 'Parent comment not found' });
    }

    const replies = await Comment.find({
        post: postId,
        parentComment: parentCommentId
    })

    res.status(200).json({
        message: 'Replies fetched successfully',
        data: {
            replies
        }
    })

}


/**
 * @route POST /api/posts/like/:postId
 * @desc  Like a specific post
 * @access Private
 */
export const likePost = async (req, res) => {

    const user = req.user; // Assuming the user is attached to the request object by the authentication middleware
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    const isAlreadyLiked = await Like.findOne({
        user: user.id,
        post: postId
    })



    if (isAlreadyLiked) {
        await Like.findByIdAndDelete(isAlreadyLiked._id);

        return res.status(200).json({
            message: 'Post unliked successfully',
            data: {
                isLiked: false,
                likeId: isAlreadyLiked._id,
            }
        })
    }

    const like = await Like.create({
        user: user.id,
        post: postId
    })

    res.status(201).json({
        message: 'Post liked successfully',
        data: {
            isLiked: true,
            likeId: like._id,
        }
    })

}