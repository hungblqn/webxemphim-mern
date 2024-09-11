import mongoose from 'mongoose';

const accountSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required:true
        },
        gender:{
            type: String,
            required: true
        },
        role:{
            type: String,
            required: true,
            default: "user"
        },
        verified:{
            type: Boolean,
            default: false
        },
        avatar:{
            type: String,
            default: ''
        }
    },
    {
        timestamps:true
    }
);

export const Account = mongoose.model('Account', accountSchema );