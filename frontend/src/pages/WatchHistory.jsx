import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ServerAddress } from '../../config'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { GetAccountData } from '../scripts/Authentication'

const WatchHistory = () => {
    axios.defaults.withCredentials = true;

    const navigate = useNavigate();
    const [accountId, setAccountId] = useState('');
    const [watchedMovies, setWatchedMovies] = useState([]);
    //Lấy thông tin tài khoản (token)
    useEffect(() => {
        GetAccountData()
            .then(data => {
                if (data.data === "token is missing") {
                    navigate('/');
                }
                else {
                    setAccountId(data.data.data.id);
                }
            })
            .catch(error => {
                console.log(error);
                // Xử lý lỗi nếu cần
            });
    }, [])
    const GetData = () => {
        axios.get(`${ServerAddress}/watchHistory/get-by-account/${accountId}`)
            .then((result) => {
                console.log(result);
                setWatchedMovies(result.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    // Lấy thông tin các bộ phim ưa thích
    useEffect(() => {
        if (accountId) {
            GetData();
        }
    }, [accountId])


    const [newMovies, setNewMovies] = useState([]);
    useEffect(() => {
        axios.get(`${ServerAddress}/movie`)
            .then((result) => {
                console.log(result);
                setNewMovies(result.data.data.slice(0, 10));
            })
            .catch((error) => {
                alert('error');
                console.log(error);
            })
    }, [])

    const removeWatchHistoryMovie = (account, movie) => {
        const data = {
            account: account,
            movie: movie
        }
        axios.post(`${ServerAddress}/watchHistory/delete-movie`, data)
            .then((result) => {
                console.log(result);
                alert("Xoá phim khỏi lịch sử xem phim thành công.")
                GetData();
            })
            .catch((error) => {
                alert('error');
                console.log(error);
            })
    }

    return (
        <div className='bg-black '>
            <Header />
            <main>
                <div>
                    <div className='w-[1200px] p-3 mt-3 mb-3 h-full mx-auto bg-[#414141]'>
                        <span className='ml-5 text-[#ffc23d] font-bold text-3xl'>Lịch sử xem phim</span>
                        <div className='flex'>
                            <div className='mt-5 w-[69%] h-full grid grid-cols-5 overflow-hidden p-5 rounded-lg'>
                                {watchedMovies.map((movie, index) => (
                                    <div key={index} className='relative'>
                                        <a href={`/phim/${movie.movie.path}`} className='inline-block ml-3 relative'>
                                            <img className="w-[140px] h-[180px] object-cover" src={movie.movie.poster} alt="Movie" />
                                            
                                            <span className='text-white'>{movie.movie.title.length >= 16 ? movie.movie.title.slice(0, 16) + "..." : movie.movie.title}</span>
                                        </a>
                                        <span onClick={() => removeWatchHistoryMovie(accountId, movie.movie._id)} className='absolute top-0 font-bold right-0 w-8 h-8 mr-1 mt-1 bg-red-600 rounded-full flex items-center justify-center text-white cursor-pointer'>
                                                X
                                            </span>
                                    </div>
                                ))}
                            </div>


                            <div className='mt-5 w-[30%] ml-5'>
                                <img className='w-[353px] h-[400px]'
                                    src='xemphimtructuyen.png' />

                                {/*Hiển thị*/}
                                <div className='bg-[#434242] ml-3 mt-3 rounded-xl pt-3 pb-3'>
                                    <div className='text-center text-[#ffc23d] font-bold text-3xl'>
                                        <span>Phim mới</span><br />
                                    </div>

                                    {/*Hiển thị*/}
                                    {newMovies
                                        .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
                                        .map((movie, index) => (
                                            <div key={index} className='bg-[#525151] hover:bg-[#646161]'>
                                                <a href={`/phim/${movie.path}`}>
                                                    <div className='flex'>
                                                        <img
                                                            src={movie.poster}
                                                            width="60"
                                                            height="100"
                                                            className="object-cover"
                                                            alt={movie.title}
                                                        />
                                                        <div className="flex flex-col">
                                                            <span className='text-white'>{movie.title}</span><br />
                                                            <span className='text-white'>{movie.releaseYear}</span>
                                                        </div>
                                                    </div>
                                                </a>
                                                <hr />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default WatchHistory