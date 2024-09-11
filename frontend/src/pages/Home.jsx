import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ServerAddress } from '../../config'

import Header from '../components/Header'
import Footer from '../components/Footer'


import ResponsiveMovieCarousel from '../components/ResponsiveMovieCarousel'
import MovieSimpleSlider from '../components/MovieSimpleSlider'

import MovieCard2 from '../components/MovieCard2'

import LoadingScreen from './LoadingScreen'

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [newMovies, setNewMovies] = useState([]);
  const [singleMovies, setSingleMovies] = useState([]);
  const [seriesMovies, setSeriesMovies] = useState([]);

  //Lấy phim bộ
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${ServerAddress}/movie/phim-bo`)
      .then((response) => {
        setSeriesMovies(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  //Lấy phim lẻ
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${ServerAddress}/movie/phim-le`)
      .then((response) => {
        setSingleMovies(response.data.data)
        console.log(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get(`${ServerAddress}/movie`)
      .then((result) => {
        const sortedMovies = result.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNewMovies(sortedMovies.slice(0, 10));
        setLoading(false);
      })
      .catch((error) => {
        alert('error');
        console.log(error);
        setLoading(false);
      })
  }, [])
  if (loading) {
    return <LoadingScreen />
  }
  return (
    <div className='bg-black '>
      <Header />
      <main>
        <div>
          <div className='w-[1200px] p-3 mt-3 mb-3 h-full mx-auto bg-[#414141]'>
            {/*Movie slider */}
            <ResponsiveMovieCarousel movies={newMovies} />
            <div className='flex'>
              <div className='mt-5 w-[69%] h-full overflow-hidden'>
                {/*Big movie slider */}
                <MovieSimpleSlider movies={newMovies} />
                {/*Phim lẻ */}
                <div className='mt-5'>
                  <span className='text-3xl text-white font-bold'>Phim lẻ</span>
                  <div className='grid-cols-5 grid'>
                    {singleMovies.slice(0, 10).map((movie, index) => (
                      <a href={`/phim/${movie.path}`} key={index} className='ml-5'>
                        <img className='w-[140px] h-[200px] object-cover'
                          src={movie.poster} />
                        <div className='text-center text-white'>{movie.title.length >= 16 ? movie.title.slice(0, 16) + "..." : movie.title}</div>
                        <div className='text-center text-white'>Lượt xem: {movie.view}</div>
                      </a>
                    ))}
                  </div>
                  <a href='/phim-le' className='ml-5 px-[345px] bg-blue-400'>Xem thêm</a>
                </div>
                {/*Phim bộ */}
                <div>
                  <span className='text-3xl text-white font-bold'>Phim bộ</span>
                  <div className='grid-cols-5 grid'>
                    {seriesMovies.slice(0, 10).map((movie, index) => (
                      <a href={`/phim/${movie.path}`} key={index} className='ml-5'>
                        <img className='w-[140px] h-[200px] object-cover'
                          src={movie.poster} />
                        <div className='text-center text-white'>{movie.title.length >= 16 ? movie.title.slice(0, 16) + "..." : movie.title}</div>
                        <div className='text-center text-white'>Lượt xem: {movie.view}</div>
                      </a>
                    ))}
                  </div>
                  <a href='/phim-bo' className='ml-5 px-[345px] bg-blue-400'>Xem thêm</a>
                </div>
              </div>

              <div className='mt-5 w-[30%] ml-5'>
                <img className='w-[353px] object-cover h-[400px]'
                  src='xemphimtructuyen.png' />

                {/*Hiển thị*/}
                <div className='bg-[#434242] ml-3 mt-3 rounded-xl pt-3 pb-3'>
                  <div className='text-center text-[#ffc23d] font-bold text-3xl'>
                    <span>Phim mới</span><br />
                  </div>

                  {/*Hiển thị*/}
                  {newMovies
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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

export default Home