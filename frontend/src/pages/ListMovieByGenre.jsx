import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ServerAddress } from '../../config'
import BackButton from '../components/BackButton'
import { useNavigate, useParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import MovieCardTest from '../components/MovieCardTest'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ReactPaginate from 'react-paginate'
import { Spinner } from 'flowbite-react'

import MovieCard2 from '../components/MovieCard2'

const ListMovieByGenre = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(20); // Số lượng item trên mỗi trang
  const [pageCount, setPageCount] = useState(0);
  const [forcePage, setForcePage] = useState(0);

  const { genre } = useParams();

  const [genreName, setGenreName] = useState('');

  useEffect(() => {
    axios.get(`${ServerAddress}/genre/get-by-path/${genre}`)
    .then((result) => {
      setGenreName(result.data.name);
    })
  }, [])

  //Lấy phim từ database
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${ServerAddress}/movie/the-loai/${genre}`)
      .then((response) => {
        setLoading(true);
        const data = response.data;
        const slice = data.slice(offset, offset + perPage);
        setMovies(slice);
        setPageCount(Math.ceil(data.length / perPage));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [offset, perPage]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setForcePage(selectedPage);
    setOffset(selectedPage * perPage);
  };

  const [newMovies, setNewMovies] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios.get(`${ServerAddress}/movie`)
      .then((result) => {
        console.log(result);
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

  return (
    <div className='bg-black '>
      <Header />
      <main>
        <div>
          <div className='w-[1200px] p-3 mt-3 mb-3 h-full mx-auto bg-[#414141]'>
            <div className='flex'>
              <div className=' w-[69%] h-full overflow-hidden'>
                <div>
                  <span className='text-3xl ml-4 text-white font-bold'>Phim {genreName}</span>
                  <div className='grid-cols-5 grid'>
                    {movies.map((movie, index) => (
                      <MovieCard2 movie={movie} index={index}/>
                    ))}

                  </div>
                  <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'flex justify-center mt-8'}
                    pageClassName={'mx-1 px-3 py-2 bg-gray-300 rounded-lg'}
                    previousClassName={'mx-1 px-3 py-2 bg-gray-300 rounded-lg'}
                    nextClassName={'mx-1 px-3 py-2 bg-gray-300 rounded-lg'}
                    breakClassName={'mx-1 px-3 py-2 bg-gray-300 rounded-lg'}
                    activeClassName={'bg-blue-500 text-white active'}
                    forcePage={forcePage}
                  />
                </div>
              </div>

              <div className='mt-5 w-[30%] ml-5'>
                <img className='w-[353px] object-cover h-[400px]'
                  src='/xemphimtructuyen.png' />

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

export default ListMovieByGenre