import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
import { ServerAddress } from '../../../../config';

const AddEpisode = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movie, setMovie] = useState([]);

    //Lấy dữ liệu bộ phim hiện tại
    useEffect(() => {
        axios.get(`${ServerAddress}/movie/${id}`)
            .then((result) => {
                console.log(result);
                setMovie(result.data);
            })
            .catch((error) => {
                alert("Kiểm tra console để xem lỗi");
                console.log(error);
            })
    }, [])
    const [episodeNumber, setEpisodeNumber] = useState();
    const [path, setPath] = useState('');
    const [episodeUrl, setEpisodeUrl] = useState('');

    const AddNewEpisode = () => {
        const data = {
            movie: id,
            episodeNumber: episodeNumber,
            path: path,
            episodeUrl: episodeUrl
        }
        axios.post(`${ServerAddress}/episode`, data)
            .then(() => {
                alert("done");
                window.close();
            })
            .catch((error) => {
                alert('Đã xảy ra lỗi');
                console.log(error);
            })
    }

    const handleEpisodeNumberChange = (e) => {
        const newEpisodeNumber = e.target.value;
        setEpisodeNumber(e.target.value);
        setPath("tap-"+newEpisodeNumber);
    }

    return (
        <div style={{ paddingLeft: '20%', paddingRight: '20%' }}>
            <h1 className='text-3xl my-8 font-semibold'>Thêm tập</h1>
            <p className='font-bold'>Tên phim</p>
            <input readOnly type='text' value={movie.title} className='w-full bg-gray-200 border-gray-500 border-2' />
            <p className='font-bold'>Tập phim</p>
            <input value={episodeNumber} onChange={handleEpisodeNumberChange} type='text' className='w-full border-gray-500 border-2' />
            <p className='font-bold'>Đường dẫn phim</p>
            <input value={path} onChange={(e) => setPath(e.target.value)} type='text' className='w-full border-gray-500 border-2' />
            <p className='font-bold'>URL Phim</p>
            <input value={episodeUrl} onChange={(e) => setEpisodeUrl(e.target.value)} type='text' className='w-full border-gray-500 border-2' />

            <br />
            <button onClick={() => AddNewEpisode()} class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Thêm tập phim
            </button>
        </div>
    )
}

export default AddEpisode