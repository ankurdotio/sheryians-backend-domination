import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [ true, 'User is required' ]
    },
    media: [ {
        url: {
            type: String,
            required: [ true, 'Media URL is required' ]
        },
        mediaType: {
            type: String,
            enum: [ 'image', 'video' ],
            required: [ true, 'Media type is required' ]
        }
    } ],
    caption: {
        type: String,
        trim: true,
        maxlength: [ 2200, 'Caption cannot exceed 2200 characters' ]
    }
})

const postModel = mongoose.model("posts", postSchema);

export default postModel;
