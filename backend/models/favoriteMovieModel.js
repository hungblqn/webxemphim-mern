import mongoose from 'mongoose';

const favoriteMovieSchema = mongoose.Schema(
    {
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
            required: true
        },
        movie:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
            required: true,
        },
    },
    {
        timestamps: true
    }
)

export const FavoriteMovie = mongoose.model('FavoriteMovie', favoriteMovieSchema);