import mongoose from "mongoose";

const watchHistorySchema = mongoose.Schema(
    {
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
            required: true
        },
        episode: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Episode',
            required: true
        },
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const WatchHistory = mongoose.model('WatchHistory', watchHistorySchema); 