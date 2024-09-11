import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
import { ServerAddress } from '../../../../config';

const EditEpisode = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [episodeNumber, setEpisodeNumber] = useState();
    const [path, setPath] = useState();
    const [episodeUrl, setEpisodeUrl] = useState();

    useEffect(() => {
        axios.get(`${ServerAddress}/episode/${id}`)
        .then((result) => {
            console.log(result);
            setEpisodeNumber(result.data.episode.episodeNumber);
            setPath(result.data.episode.path);
            setEpisodeUrl(result.data.episode.episodeUrl);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    const EditEpisode = () => {
        const data = {
            episodeNumber: episodeNumber,
            path: path,
            episodeUrl: episodeUrl
        }
        axios.put(`${ServerAddress}/episode/${id}`, data)
            .then(() => {
                alert("Cập nhật dữ liệu tập phim thành công!");
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
            <h1 className='text-3xl my-8 font-semibold'>Sửa tập phim</h1>
            <p className='font-bold'>Tập phim</p>
            <input value={episodeNumber} onChange={handleEpisodeNumberChange} type='text' className='w-full border-gray-500 border-2' />
            <p className='font-bold'>Đường dẫn phim</p>
            <input value={path} onChange={(e) => setPath(e.target.value)} type='text' className='w-full border-gray-500 border-2' />
            <p className='font-bold'>URL Phim</p>
            <input value={episodeUrl} onChange={(e) => setEpisodeUrl(e.target.value)} type='text' className='w-full border-gray-500 border-2' />

            <br />
            <button onClick={() => EditEpisode()} class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sửa tập phim
            </button>
        </div>
    )
}

export default EditEpisode