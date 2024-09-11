import React, {useEffect, useState} from 'react'
import { MdStar, MdStarRate } from 'react-icons/md';
import axios from 'axios';
import { ServerAddress } from '../../config';

const MovieCard2 = ({ movie, index }) => {
    const [rates, setRates] = useState([]);
    const [sumRate, setSumRate] = useState(0);

    const [lastEpisode, setLastEpisode] = useState();

    useEffect(() => {
        axios.get(`${ServerAddress}/episode/get-last-episode/${movie._id}`)
        .then((result) => {
            setLastEpisode(result.data.episodeNumber);
        })
    }, [])

    useEffect(() => {
        axios.get(`${ServerAddress}/movieRating/${movie._id}`)
            .then((result) => {
                setRates(result.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    
    useEffect(() => {
        if (rates.length > 0) {
            let sum = 0;
            for (let i = 0; i < rates.length; i++) {
                sum += rates[i].point;
            }
            // Tính điểm trung bình chính xác bằng cách chia tổng điểm cho số lượng đánh giá
            setSumRate(sum / rates.length);
        } else {
            // Nếu không có đánh giá nào, đặt sumRate là 0
            setSumRate(0);
        }
    }, [rates])

    

    return (
        <a href={`/phim/${movie.path}`} key={index} className='ml-5 relative'>
            <img className='w-[140px] h-[200px] object-cover'
                src={movie.poster} />
            {sumRate !== 0 && (
                <div className='absolute top-0 left-0 w-12 h-8 mt-1 ml-1 bg-opacity-70 bg-black rounded-full flex items-center justify-center text-white'>
                {sumRate.toFixed(1)}<MdStarRate className='text-yellow-200'/>
                </div>
            )}
            <span className='absolute top-0 font-bold right-0 w-20 h-8 mr-1 mt-1 bg-red-600 bg-opacity-90 rounded-full flex items-center justify-center text-white'>
                TẬP {lastEpisode}
            </span>
            <div className='text-center text-white'>{movie.title.length >= 16 ? movie.title.slice(0, 16) + "..." : movie.title}</div>
            <div className='text-center text-white'>Lượt xem: {movie.view}</div>
        </a>
    )
}

export default MovieCard2