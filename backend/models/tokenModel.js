import mongoose from "mongoose";

const tokenSchema = mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        expired: {
            type: Boolean,
            required: true,
            default: false
        },
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
            required: true
        }
    }
);

export const Token = mongoose.model('Token', tokenSchema);