import express from 'express';
import { Episode } from '../models/episodeModel.js';

import { ReportEpisode } from '../models/reportEpisodeModel.js';

const router = express.Router();

//Lấy tất cả dữ liệu của tập phim
router.get('/', async (request, response) => {
    try{
        const episodes = await Episode.find({});
        return response.status(200).json({
            count: episodes.length,
            data: episodes
        });
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});
//Lấy dữ liệu tập phim với id
router.get('/:id', async(request, response) => {
    try{
        const {id} = request.params;
        const episode = await Episode.findById(id);
        return response.status(200).send({episode : episode});
    }
    catch(error) {
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
})
//Lấy tất cả tập phim với id movie
router.get('/movie/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const episodes = await Episode.find({movie: id});
        return response.status(200).json({
            count: episodes.length,
            data: episodes
        })
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
})

//Lấy tập phim cuối cùng với id movie
router.get('/get-last-episode/:id', async(request,response) => {
    try{
        const { id } = request.params;
        // Tìm tất cả các tập phim của một bộ phim với id được cung cấp
        const episodes = await Episode.find({ movie: id })
                                    .sort({ createdAt: -1 }) // Sắp xếp theo createdAt giảm dần
                                    .limit(1); // Chỉ lấy một kết quả đầu tiên
        
        // Nếu không có tập phim nào được tìm thấy
        if (episodes.length === 0) {
            return response.status(404).send({ message: "Không tìm thấy tập phim nào." });
        }

        // Trả về tập phim duy nhất với createdAt gần nhất
        return response.status(200).send(episodes[0]);
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
})

//Lấy tập phim với path tập phim và id movie
router.get('/path/:path/:id', async (request, response) => {
    try{
        const { id, path } = request.params;
        const episode = await Episode.findOne({path: path, movie: id});
        return response.status(200).json(episode);
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
})

//Thêm tập phim mới
router.post('/', async(request, response) => {
    try{
        if(!request.body.movie || 
           !request.body.episodeNumber ||
           !request.body.path ||
           !request.body.episodeUrl){
            return response.status(400).send({
                message: 'Send all required fields: movie, episodeNumber, path, episodeUrl'
            });
        }
        const newEpisode = {
            movie: request.body.movie,
            episodeNumber: request.body.episodeNumber,
            path: request.body.path,
            episodeUrl: request.body.episodeUrl
        }
        const episode = await Episode.create(newEpisode);
        return response.status(201).send(episode);
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});
//Sửa tập phim
router.put('/:id', async(request, response) => {
    try{
        if(!request.body.episodeNumber || !request.body.episodeUrl || !request.body.path){
            return response.status(400).send({
                message: 'Send all required fields: episodeNumber, path, episodeUrl'
            });
        }
        const { id } = request.params;
        const episode = await Episode.findById(id);

        episode.episodeNumber = request.body.episodeNumber;
        episode.path = request.body.path;
        episode.episodeUrl = request.body.episodeUrl;
        const result = await episode.save();

        if (!result) return response.status(404).json({ message: "Update episode failed" });
        return response.status(200).send({ message: "Episode updated successfully" });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
// Xoá tập phim với id tập phim
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        
        await ReportEpisode.deleteMany({episode: id});
        const result = await Episode.findByIdAndDelete(id);
        

        if (!result) return response.status(404).json({ message: "Episode not found" });
        return response.status(200).send({ message: "Episode deleted successfully" });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
