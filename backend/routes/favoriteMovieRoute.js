import express from "express";
import { FavoriteMovie } from "../models/favoriteMovieModel.js";
import { Account } from "../models/accountModel.js";
import { Movie } from "../models/movieModel.js";

const router = express.Router();

//Get all data
router.get('/', async (request, response) => {
    try {
        const data = await FavoriteMovie.find({});
        return response.status(200).json({
            count: data.length,
            data: data
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

router.get('/get-data/:account', async (request, response) => {
    try {
        const { account } = request.params; // Sử dụng destructuring để truy cập account và movie từ request.body
        const data = await FavoriteMovie.find({ account: account }).populate('movie').populate('account');
        return response.status(200).json({ data });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// get data with account and movie
router.post('/check-if-favorite', async (request, response) => {
    try {
        const { account, movie } = request.body; // Sử dụng destructuring để truy cập account và movie từ request.body
        if (!account || !movie) {
            return response.status(400).send({
                message: 'Send all required fields: account, movie'
            });
        }
        const result = await FavoriteMovie.findOne({ account: account, movie: movie });
        if (result) {
            return response.status(200).send({
                message: 'favorite'
            });
        }
        return response.status(200).send({
            message: 'not favorite'
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Perform user action
router.post('/', async (request, response) => {
    try {
        const { account, movie } = request.body; // Sử dụng destructuring để truy cập account và movie từ request.body
        if (!account || !movie) {
            return response.status(400).send({
                message: 'Send all required fields: account, movie'
            });
        }
        const data = {
            account: account,
            movie: movie
        }
        const result = await FavoriteMovie.findOne({ account: account, movie: movie });
        if (result) {
            const success = await FavoriteMovie.findOneAndDelete({ account: account, movie: movie });
            if (success) {
                return response.status(200).send({
                    message: 'remove favorite movie'
                });
            }
        }
        else {
            const success = await FavoriteMovie.create(data);
            if (success) {
                return response.status(200).send({
                    message: 'add favorite movie'
                });
            }
        }
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Delete movie
router.post('/delete-movie', async (request, response) => {
    try {
        const { account, movie } = request.body;
        const result = await FavoriteMovie.findOneAndDelete({ account: account, movie: movie });
        if (result) return response.status(200).send('Delete completed');
        return response.status(404).send('Movie not found');
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}); 

export default router;