import express from "express";

import { Comment } from "../models/commentModel.js";

const router = express.Router();

//Get all comment
router.get('/', async(request, response) => {
    try{
        const comments = await Comment.find({});
        if(!comments) return response.send('no data');
        return response.status(200).json({count: comments.length, data: comments});
    }
    catch(error){
        console.log(error);
        return response.status(500).send({message: error.message})
    }
})
//get all comment of movie
router.get('/get-comment-in-movie/:movie', async (request, response) => {
    try{
        const { movie } = request.params;
        const comments = await Comment.find({movie: movie}).populate('account');
        if(!comments) return response.send('no data');
        return response.status(200).json({count: comments.length, data: comments});
    }
    catch(error){
        console.log(error);
        return response.status(500).send({message: error.message});
    }
})

//post new comment
router.post('/', async(request, response) => {
    try{
        if(!request.body.content || !request.body.account || !request.body.movie){
            return response.status(400).send({
                message: 'Send all required fields: content, account, episode'
            })
        }
        const newComment = {
            content: request.body.content,
            account: request.body.account,
            movie: request.body.movie
        }
        const comment = await Comment.create(newComment);
        return response.status(201).send(comment);
    }
    catch(error){
        console.log(error);
        return response.status(500).send({message: error.message});
    }
})

//put comment
router.put('/:id', async(request, response) => {
    try{
        if(!request.body.content || !request.body.account || !request.body.movie){
            return response.status(400).send({
                message: 'Send all required fields: content, account, movie'
            })
        }
        const { id } = request.params;
        const data = {
            content: request.body.content,
            account: request.body.account,
            movie: request.body.movie
        };
        const result = await Comment.findByIdAndUpdate(id, data);

        if (!result) return response.status(404).json({ message: "Comment not found" });
        return response.status(200).send({ message: "Comment updated successfully" });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
// Edit comment with commentId
router.put('/user-edit-comment/:id', async(request, response) => {
    try{
        if(!request.body.content){
            return response.status(400).send({
                message: 'please send content to edit'
            })
        }
        const { id } = request.params;
        const comment = await Comment.findById(id);
        if(!comment) return response.status(404).json({message: "Comment not found"});
        comment.content = request.body.content;
        const result = await comment.save();
        if(!result) return response.status(500).send('error');
        return response.status(200).send('edit comment successfully');
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})


// delete comment
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Comment.findByIdAndDelete(id);

        if (!result) return response.status(404).json({ message: "Comment not found" });
        return response.status(200).send({ message: "Comment deleted successfully" });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});



export default router