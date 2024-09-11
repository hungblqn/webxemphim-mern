import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ServerAddress } from '../../config';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';
import { GetAccountData } from '../scripts/Authentication.js';
import RateMovieModal from '../components/RateMovieModal.jsx';

import { MdStar } from 'react-icons/md';

import LoadingScreen from './LoadingScreen.jsx';

const MovieDetails = () => {
    axios.defaults.withCredentials = true;

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { path } = useParams();
    const [movie, setMovie] = useState([]);
    const [episodes, setEpisodes] = useState([]);

    const [newMovies, setNewMovies] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get(`${ServerAddress}/movie`)
            .then((result) => {
                console.log(result);
                setNewMovies(result.data.data.slice(0, 10));
                setLoading(false);
            })
            .catch((error) => {
                alert('error');
                console.log(error);
                setLoading(false);
            })
    }, []);

    

    //Lấy dữ liệu phim với path phim
    useEffect(() => {
        setLoading(true);
        axios.get(`${ServerAddress}/movie/path/${path}`)
            .then((result) => {
                console.log(result.data);
                if (result.data === null) {
                    navigate('/');
                }
                setMovie(result.data);
                axios.get(`${ServerAddress}/episode/movie/${result.data._id}`)
                    .then((result) => {
                        console.log(result.data);
                        setEpisodes(result.data.data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        alert("Đã xảy ra lỗi");
                        console.log(error);
                        setLoading(false);
                    });
                
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [path, navigate]);


    const [rates, setRates] = useState([]);
    const [sumRate, setSumRate] = useState(0);

    useEffect(() => {
        if(movie){
            axios.get(`${ServerAddress}/movieRating/${movie._id}`)
            .then((result) => {
                setRates(result.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [movie])

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

    //Check tài khoản đã đăng nhập chưa
    const [role, setRole] = useState('');
    const [accountId, setAccountId] = useState('');
    useEffect(() => {
        setLoading(true);
        // Gọi hàm GetAccountRole để lấy vai trò tài khoản
        GetAccountData()
            .then(data => {
                if (data.data === "token is missing") {
                    setRole("no role");
                } else {
                    setRole(data.data.data.role);
                    setAccountId(data.data.data.id);
                }
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setRole("no role"); // Fallback role in case of error
                setLoading(false);
            });
    }, []);

    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        if (role !== "no role" && movie && movie.title) {
            const data = {
                account: accountId,
                movie: movie._id
            };
            console.log(data);
            axios.post(`${ServerAddress}/favoriteMovie/check-if-favorite`, data)
                .then((result) => {
                    console.log(result);
                    if (result.data.message === "favorite") {
                        setFavorite(true);
                    }
                })
                .catch((error) => {
                    alert('error');
                    console.log(error);
                });
        }
    }, [movie, accountId, role]);

    const handleLikeMovie = () => {
        const data = {
            account: accountId,
            movie: movie._id
        };
        console.log(data);
        axios.post(`${ServerAddress}/favoriteMovie`, data)
            .then((result) => {
                console.log(result);
                if (result.data.message === "remove favorite movie") {
                    setFavorite(false);
                } else {
                    setFavorite(true);
                }
            })
            .catch((error) => {
                alert('error');
                console.log(error);
            });
    };

    const [showRateMovieModal, setShowRateMovieModal] = useState(false);

    const handleRateMovie = () => {
        setShowRateMovieModal(true);
    };
    const handleCloseRateMovieModal = () => {
        setShowRateMovieModal(false);
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className='bg-black'>
            <Header />
            <div className='bg-black w-[1200px] mx-auto'>
                <div className='bg-[#434242] rounded-2xl pt-3 mt-3 pb-3'>
                    <div className='flex ml-3 text-white'>
                        Trang chủ / Chi tiết phim / {movie.title}
                    </div>
                </div>

                <div className='flex'>
                    <div className='w-[75%] h-full'>
                        <div className='bg-[#434242] flex h-full mt-3 rounded-xl pt-3 pb-3'>
                            <div className='relative h-full ml-3 text-white'>
                                <img
                                    src={movie.poster}
                                    width="375"
                                    height="200"
                                    className="rounded-3xl justify-center grid h-80 object-cover"
                                    alt="movie.title"
                                />
                                {role !== "no role" && (
                                    <button onClick={handleRateMovie} className="absolute w-full bg-yellow-400 top-[200px] px-6 py-3 text-white text-lg font-semibold">
                                        Đánh giá phim
                                    </button>
                                )}
                                {role !== "no role" && (
                                    <button onClick={handleLikeMovie} className="absolute w-full bg-blue-500 top-[250px] px-6 py-3 text-white text-lg font-semibold">
                                        {favorite ? "Bỏ thích phim" : "Thích phim"}
                                    </button>
                                )}
                                <Link to={`/xem-phim/${path}/${episodes.length > 0 ? episodes[0].path : ''}`}>
                                    <button className="absolute w-full rounded-b-2xl bg-red-500 top-[300px] px-6 py-3 text-white text-lg font-semibold">
                                        Xem phim
                                    </button>
                                </Link>
                            </div>
                            <div className='ml-3 text-white'>
                                <span className='inline-block text-yellow-300 font-bold text-2xl'>{movie.title}</span><br />
                                <span className='inline-block text-yellow-200'>{movie.englishTitle}</span><br />
                                <span className='inline-block pt-3'>Trạng thái: Tập {episodes.length}</span><br />
                                <span className='inline-block pt-3'>Số tập: {movie.numberOfEpisode}</span><br />
                                <span className='inline-block pt-3'>Thời lượng: {movie.duration}</span><br />
                                <span className='inline-block pt-3'>Năm phát hành: {movie.releaseYear}</span><br />
                                <span className='inline-block pt-3'>Chất lượng: {movie.quality}</span><br />
                                <span className='inline-block pt-3'>
                                    Thể loại: {movie.genres && movie.genres.length > 0 ? movie.genres.join(', ') : 'Đang cập nhật...'}
                                </span><br />
                                <span className='inline-block pt-3'>Đạo diễn: {movie.director && movie.director.length > 0 ? movie.director.join(', ') : "Đang cập nhật..."}</span><br />
                                <span className='inline-block max-w-[500px] pt-3'>Diễn viên: {movie.actor && movie.actor.length > 0 ? movie.actor.join(', ') : "Đang cập nhật..."}</span><br />
                                <span className='inline-block pt-3'>Quốc gia: {movie.country && movie.country.length > 0 ? movie.country.join(', ') : "Đang cập nhật..."}</span><br />
                                <span className=' pt-3 flex'>Điểm đánh giá: {sumRate}/5 <MdStar className='mt-[6px] text-yellow-300'/> ({rates.length} lượt đánh giá)</span>
                            </div>
                        </div>
                        <div className='bg-[#434242] flex h-full mt-3 rounded-xl pt-3 pb-3'>
                            <div className='justify-center ml-3 mr-3' style={{ width: '100%', height: 'auto', minHeight: '100px' }}>
                                <div className='text-center text-[#ffc23d] font-bold text-3xl'>
                                    <span>Nội dung phim</span><br />
                                </div>
                                <div className='text-white'>
                                    <span>
                                        {movie.description}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='bg-[#434242] flex h-full mt-3 mb-3 rounded-xl pt-3 pb-3'>
                            {movie.trailer_url ? (
                                <div className='justify-center ml-3 mr-3' style={{ width: '100%', height: 'auto', minHeight: '500px' }}>
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={movie.trailer_url}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen={true}
                                    ></iframe>
                                </div>
                            ) : (
                                <div className=''>
                                    <p className='mt-3 text-white text-2xl'>Trailer đang cập nhật...</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='bg-[#434242] w-[25%] h-full ml-3 mt-3 rounded-xl pt-3 pb-3'>
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
            <RateMovieModal isOpen={showRateMovieModal} onClose={handleCloseRateMovieModal} currentAccountId={accountId} currentMovieId={movie._id} />
            <Footer />
        </div>
    );
};

export default MovieDetails;
