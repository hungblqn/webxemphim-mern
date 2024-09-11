import express from 'express';
import { Genre } from '../models/genreModel.js'

const router = express.Router();

//Lấy tất cả dữ liệu của thể loại
router.get('/', async (request, response) => {
    try{
        const genres = await Genre.find({});
        return response.status(200).json({
            count: genres.length,
            data: genres
        });
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});
// Lấy thể loại với id thể loại
router.get('/:id', async(request, response) => {
    try{
        const { id } = request.params;
        const genre = await Genre.findById(id);
        return response.status(200).send(genre);
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({message:error.message})
    }
})

// Lấy thể loại với path thể loại
router.get('/get-by-path/:path', async(request, response) => {
    try{
        const { path } = request.params;
        const genre = await Genre.findOne({path: path});
        return response.status(200).send(genre);
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({message:error.message})
    }
})


//Thêm thể loại mới
router.post('/', async(request, response) => {
    try{
        if(!request.body.name || !request.body.path){
            return response.status(400).send({
                message: 'Send all required fields: name,path'
            });
        }
        const newGenre = {
            name: request.body.name,
            path: request.body.path
        }
        const genre = await Genre.create(newGenre);
        return response.status(201).send(genre);
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});
//Sửa thể loại
router.put('/:id', async(request, response) => {
    try{
        if(!request.body.name || !request.body.path){
            return response.status(400).send({
                message: 'Send all required fields: name,path'
            });
        }
        const { id } = request.params;
        const data = {
            name: request.body.name,
            path: request.body.path
        };
        const result = await Genre.findByIdAndUpdate(id, data);

        if (!result) return response.status(404).json({ message: "Genre not found" });
        return response.status(200).send({ message: "Genre updated successfully" });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
// Xoá thể loại
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Genre.findByIdAndDelete(id);

        if (!result) return response.status(404).json({ message: "Genre not found" });
        return response.status(200).send({ message: "Genre deleted successfully" });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
