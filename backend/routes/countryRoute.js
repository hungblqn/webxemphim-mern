import express from 'express';
import { Country } from '../models/countryModel.js'

const router = express.Router();

//Lấy tất cả dữ liệu của quốc gia
router.get('/', async (request, response) => {
    try{
        const countries = await Country.find({});
        return response.status(200).json({
            count: countries.length,
            data: countries
        });
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});
// Lấy quốc gia với id quốc gia
router.get('/:id', async(request, response) => {
    try{
        const { id } = request.params;
        const country = await Country.findById(id);
        return response.status(200).send(country);
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({message:error.message})
    }
})

// Lấy quốc gia với id quốc gia
router.get('/get-by-path/:path', async(request, response) => {
    try{
        const { path } = request.params;
        const country = await Country.findOne({path: path});
        return response.status(200).send(country);
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({message:error.message})
    }
})

//Thêm quốc gia mới
router.post('/', async(request, response) => {
    try{
        if(!request.body.name || !request.body.path){
            return response.status(400).send({
                message: 'Send all required fields: name,path'
            });
        }
        const newCountry = {
            name: request.body.name,
            path: request.body.path
        }
        const country = await Country.create(newCountry);
        return response.status(201).send(country);
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});
//Sửa quốc gia
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
        const result = await Country.findByIdAndUpdate(id, data);

        if (!result) return response.status(404).json({ message: "Country not found" });
        return response.status(200).send({ message: "Country updated successfully" });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
// Xoá quốc gia
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Country.findByIdAndDelete(id);

        if (!result) return response.status(404).json({ message: "Country not found" });
        return response.status(200).send({ message: "Country deleted successfully" });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
