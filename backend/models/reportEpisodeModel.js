import mongoose from 'mongoose';

const reportEpisodeSchema = mongoose.Schema(
    {
        episode: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Episode',
            required: true
        },
        reasons: [{
            type: String,
            required: true
        }],
        detail: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const ReportEpisode = mongoose.model('ReportEpisode', reportEpisodeSchema);