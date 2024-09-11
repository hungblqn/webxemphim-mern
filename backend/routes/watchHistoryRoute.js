import express from 'express';
import { WatchHistory } from '../models/watchHistoryModel.js';

const router = express.Router();

//Lấy tất cả dữ liệu từ account
router.get('/get-by-account/:account', async (request, response) => {
    try {
        const { account } = request.params;
        const result = await WatchHistory.find({account: account}).populate('account').populate('episode').populate('movie');
        if(!result) return response.status(400).send("No history");
        return response.status(200).send(result);
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

//Thêm dữ liệu
router.post('/', async (request, response) => {
    try {
        if(!request.body.account || !request.body.episode || !request.body.movie){
            return response.status(400).send({
                message: 'Send all required fields: account, episode, movie'
            })
        }
        const existHistory = await WatchHistory.findOne({account: request.body.account, movie: request.body.movie})
        // Nếu đã tồn tại thì sửa
        if(existHistory) {
            existHistory.episode = request.body.episode;
            existHistory.updatedAt = Date.now();
            const result = await existHistory.save();
            if(!result) return response.status(400).send("failed");
            return response.status(201).send("History updated successfully");
        }
        //Nếu không tồn tại thì thêm vào
        else{
            const data = {
                account: request.body.account,
                episode: request.body.episode,
                movie: request.body.movie
            }
            const newData = await WatchHistory.create(data);
            if(!newData) return response.status(400).send("failed");
            return response.status(201).send('New watch history added successfully');
        }
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

//Xoá dữ liệu
router.post('/delete-movie', async(request, response) => {
    try{
        const { account, movie } = request.body;
        const result = await WatchHistory.findOneAndDelete({ account: account, movie: movie });
        if (result) return response.status(200).send('Delete completed');
        return response.status(404).send('Movie not found');
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

export default router;