import express from 'express';
import { ReportComment } from '../models/reportCommentModel.js';

const router = express.Router();

//Lấy tất cả tố cáo bình luận
router.get('/', async (request, response) => {
    try {
        const reports = await ReportComment.find({}).populate('comment');
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

// Người dùng tố cáo bình luận
router.post('/', async (request, response) => {
    try {
        if (!request.body.comment || !request.body.reasons || !request.body.detail) {
            return response.status(400).send({
                message: 'Send all required fields: comment, reasons, detail'
            })
        }
        const newReportComment = {
            comment: request.body.comment,
            reasons: request.body.reasons,
            detail: request.body.detail
        }
        const reportComment = await ReportComment.create(newReportComment);
        return response.status(201).send('Report comment successfully');
    }
    catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
})

// Xoá tố cáo bình luận
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await ReportComment.findByIdAndDelete(id);
        if(!result) return response.status(400).send('failed');
        return response.status(200).send("deleted successfully");
    }
    catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
})

export default router;
