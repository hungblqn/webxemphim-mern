import React, { useState, useEffect } from 'react'
import { ServerAddress } from '../../../../config'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { MdOutlineAddBox } from 'react-icons/md'
import { BsInfoCircle } from 'react-icons/bs'
import { FaPlusCircle } from 'react-icons/fa'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineDelete } from 'react-icons/md'
import MovieCard from '../../../components/MovieCard'

const ListEpisodeOfMovie = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [episodes, setEpisodes] = useState([]);
    useEffect(() => {
        axios.get(`${ServerAddress}/episode/movie/${id}`)
            .then((result) => {
                console.log(result.data);
                setEpisodes(result.data.data);
            })
            .catch((error) => {
                alert("Đã xảy ra lỗi");
                console.log(error);
            })
    }, [])

    const DeleteEpisode = (id) => {
        axios.delete(`${ServerAddress}/episode/${id}`)
        .then(() => {
            setEpisodes(episodes.filter(episode => episode._id !== id))
        })
        .catch((error) => {
            alert("Xoá thất bại");
            console.log(error);
        })
    }

    return (
        <div className='p-4 overflow-auto bg-gray-100'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8 font-semibold'>Danh sách tập phim</h1>
                <Link to={`/movie/addepisode/${id}`} target='_blank'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <div className='overflow-x-auto overflow-y-auto'>
                    <table className='w-full border-separate border-spacing-2'>
                        <thead>
                            <tr>
                                <th className='border border-slate-600 rounded-md'>STT</th>
                                <th className='border border-slate-600 rounded-md'>Tập</th>
                                <th className='border border-slate-600 rounded-md'>Đường dẫn</th>
                                <th className='border border-slate-600 rounded-md'>Url tập phim</th>
                                <th className='border border-slate-600 rounded-md'>Xử lý</th>
                            </tr>
                        </thead>
                        <tbody>
                            {episodes.map((episode, index) => (
                                <tr key={episode._id} className='h-8'>
                                    <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{episode.episodeNumber}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{episode.path}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{episode.episodeUrl}</td>

                                    <td className='border border-slate-700 rounded-md text-center'>
                                        <div className='flex justify-center gap-x-4'>
                                            <Link to={`/episode/edit/${episode._id}`} target='_blank'>
                                                <AiOutlineEdit className='text-2xl text-yellow-800' />
                                            </Link>
                                            <button onClick={() => DeleteEpisode(episode._id)}>
                                                <MdOutlineDelete className='text-2xl text-red-800' />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ListEpisodeOfMovie