import express from 'express';
import { MovieRating } from '../models/movieRatingModel.js';

const router = express.Router();

//Lấy tất cả rate phim
router.get('/', async (request, response) => {
    try {
        const reports = await MovieRating.find({});
        return response.status(200).json({
            count: reports.length,
            data: reports
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

// Lấy rate phim với movie ID
router.get('/:movie', async (request, response) => {
    try {
        const { movie } = request.params;
        const rating = await MovieRating.find({movie: movie});
        if(!rating) return response.status(404).send("rating doesnt exist");
        return response.status(200).json(rating);
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

// Thêm đánh giá
router.post('/', async (request, response) => {
    try {
        if (!request.body.movie || !request.body.account || !request.body.point) {
            return response.status(400).send({
                message: 'Send all required fields: movie, account, point'
            })
        }
        const newRating = {
            movie: request.body.movie,
            account: request.body.account,
            point: request.body.point
        }
        const rating = await MovieRating.findOne({movie: request.body.movie, account: request.body.account});
        if(!rating){
            await MovieRating.create(newRating);
            return response.status(201).send('rating added successfully');
        }
        else{
            rating.point = newRating.point;
            await rating.save();
            return response.status(201).send('rating updated successfully');
        }
    }
    catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
})

export default router;