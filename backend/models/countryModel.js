import mongoose from 'mongoose';

const countrySchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true
        },
        path:{
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
)

export const Country = mongoose.model('Country', countrySchema);