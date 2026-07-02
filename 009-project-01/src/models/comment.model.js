import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [ true, 'User is required' ]
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
        required: [ true, 'Post is required' ]
    },
    content: {
        type: String,
        trim: true,
        maxlength: [ 500, 'Comment cannot exceed 500 characters' ]
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments',
        default: null
    }
}, {
    timestamps: true
})


const commentModel = mongoose.model("comments", commentSchema);

export default commentModel;