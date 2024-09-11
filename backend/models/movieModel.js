import mongoose from 'mongoose';

const movieSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        numberOfEpisode: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        englishTitle: {
            type: String,
            required: true
        },
        releaseYear: {
            type: Number,
            required: true
        },
        trailer_url: {
            type: String
        },
        path: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            required: true
        },
        director: [{
            type: String
        }],
        actor: [{
            type: String
        }],
        genres: [{
            type: String,
            ref: 'Genre'
        }],
        quality: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        series: {
            type: String,
            required: true
        },
        country: [{
            type: String,
            ref: 'Country',
            required: true
        }],
        poster: {
            type: String,
            required: true
        },
        view: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

export const Movie = mongoose.model('Movie', movieSchema);