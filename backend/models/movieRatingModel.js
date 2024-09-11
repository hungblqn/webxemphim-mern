import mongoose from "mongoose";

const movieRatingSchema = mongoose.Schema(
    {
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'movie',
            required: true
        },
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'account',
            required: true
        },
        point: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const MovieRating = mongoose.model('MovieRating', movieRatingSchema); 
