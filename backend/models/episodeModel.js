import mongoose from "mongoose";

const episodeSchema = mongoose.Schema(
    {
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
            required: true
        },
        episodeNumber: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        },
        episodeUrl: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Episode = mongoose.model('Episode', episodeSchema);