import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
    {
        content:{
            type: String,
            required: true
        },
        account:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
            required: true
        },
        movie:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Comment = mongoose.model('Comment', commentSchema);