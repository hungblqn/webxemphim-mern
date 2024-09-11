import mongoose from 'mongoose';

const reportCommentSchema = mongoose.Schema(
    {
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
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

export const ReportComment = mongoose.model('ReportComment', reportCommentSchema);