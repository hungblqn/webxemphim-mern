import express from 'express';
import { ReportEpisode } from '../models/reportEpisodeModel.js';

const router = express.Router();

router.get('/', async(request, response) => {
    try {
        const reports = await ReportEpisode.find({}).populate({
            path: 'episode',
            populate: {
              path: 'movie'
            }
          });
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

// Người dùng báo lỗi tập phim
router.post('/', async(request, response) => {
    try{
        if(!request.body.episode || !request.body.reasons || !request.body.detail){
            return response.status(400).send({
                message: 'Send all required fields: comment, reasons, detail'
            })
        }
        const newReportEpisode = {
            episode: request.body.episode,
            reasons: request.body.reasons,
            detail: request.body.detail
        }
        const reportEpisode = await ReportEpisode.create(newReportEpisode);
        if(!reportEpisode) return response.status(400).send("failed");
        return response.status(201).send('Report comment successfully');
    }
    catch(error){
        console.log(error);
        return response.status(500).send({message: error.message});
    }
})

// Xoá bao loi tap phim
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await ReportEpisode.findByIdAndDelete(id);
        if(!result) return response.status(400).send('failed');
        return response.status(200).send("deleted successfully");
    }
    catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
})


export default router;