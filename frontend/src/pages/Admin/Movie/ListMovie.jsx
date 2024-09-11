import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner1 from '../../../components/Spinner'
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfo, BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { FaPlusCircle } from "react-icons/fa";
import { ServerAddress } from '../../../../config';
import ReactPaginate from 'react-paginate';

import { Spinner } from 'flowbite-react';


const ListMovie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(10); // Số lượng item trên mỗi trang
  const [pageCount, setPageCount] = useState(0);
  const [forcePage, setForcePage] = useState(0);

  //Lấy movie từ database và cập nhật lại khi perPage hoặc offset thay đổi
  useEffect(() => {
    if(filterTitle === ''){
      setLoading(true);
      axios
      .get(`${ServerAddress}/movie`)
      .then((response) => {
        const data = response.data.data;
        const slice = data.slice(offset, offset + perPage);
        setMovies(slice);
        setPageCount(Math.ceil(data.length / perPage));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    }
  }, [offset, perPage]);

  const GetAllMovieData = () => {
    setLoading(true);
      axios
      .get(`${ServerAddress}/movie`)
      .then((response) => {
        const data = response.data.data;
        const slice = data.slice(offset, offset + perPage);
        setMovies(slice);
        setPageCount(Math.ceil(data.length / perPage));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setForcePage(selectedPage);
    setOffset(selectedPage * perPage);
  };

  const DeleteMovie = (id) => {
    axios
      .delete(`${ServerAddress}/movie/${id}`)
      .then(() => {
        setMovies(movies.filter(movie => movie._id !== id));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }

  const DeleteAllMovie = () => {
    const confirmDelete = window.confirm('Bạn chắc chắn muốn xoá tất cả phim chứ? Một khi xoá thì không thể hoàn tác!');
    
    if (confirmDelete) {
      console.log('delete all movies');
      axios
        .delete(`${ServerAddress}/movie`)
        .then(() => {
          alert('All movies have been deleted.');
          setMovies([]);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      console.log('Deletion canceled');
    }
  };

  const [filterTitle, setFilterTitle] = useState('');
  // Lọc phim mỗi lần nhập
  /*useEffect(() => {
    setLoading(true);
    if(filterTitle !== ''){
      axios.get(`${ServerAddress}/movie/search/${filterTitle}`)
      .then((result) => {
        console.log(filterTitle);
        const data = result.data.data;
        const slice = data.slice(offset, offset + perPage);
        setMovies(slice);
        setPageCount(Math.ceil(data.length / perPage));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setMovies([]);
        setPageCount(0);
        setLoading(false);
      })
    }
    else{
      GetAllMovieData();
    }
  }, [filterTitle, offset, perPage])*/
  const [filtering, setFiltering] = useState(false);
  const FilterMovie = () => {
    setFiltering(true);
    setLoading(true);
    if(filterTitle !== ''){
      axios.get(`${ServerAddress}/movie/search/${filterTitle}`)
      .then((result) => {
        console.log(filterTitle);
        const data = result.data.data;
        const slice = data.slice(offset, offset + perPage);
        setMovies(slice);
        setPageCount(Math.ceil(data.length / perPage));
        setLoading(false);
        setFiltering(false);
      })
      .catch((error) => {
        console.log(error);
        setMovies([]);
        setPageCount(0);
        setLoading(false);
        setFiltering(false);
      })
    }
    else{
      GetAllMovieData();
      setFiltering(false);
    }
  }

  return (
    <div className='p-4 overflow-auto bg-gray-100'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8 font-semibold'>Danh sách phim</h1>
        <button onClick={DeleteAllMovie} className='bg-blue-500 text-white px-4 py-2 font-bold text-2xl'>Xoá tất cả phim</button>

      </div>
      <p>Số phần tử/trang</p>
      <select value={perPage} onChange={(e) => setPerPage(e.target.value)} className='ml-2 p-1 rounded'>
        <option>5</option>
        <option>10</option>
        <option>20</option>
        <option>50</option>
      </select>
      <input onChange={(e) => setFilterTitle(e.target.value)} value={filterTitle} className='px-4 py-1 border-black border ml-5' placeholder='Lọc phim...' />
      <button onClick={() => FilterMovie()} className='bg-blue-500 px-4 py-1 text-white border-black border'>
        {filtering ? <Spinner/> : "Lọc"}
      </button>
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
      {loading ? (
        <Spinner1 />
      ) : (
        <>
          <div className='overflow-x-auto overflow-y-auto'>
            <table className='w-full border-separate border-spacing-2'>
              <thead>
                <tr>
                  <th className='border border-slate-600 rounded-md'>STT</th>
                  <th className='border border-slate-600 rounded-md'>Tên phim</th>
                  <th className='border border-slate-600 rounded-md'>Số tập phim</th>
                  <th className='border border-slate-600 rounded-md'>Thời lượng phim</th>
                  <th className='border border-slate-600 rounded-md'>Tên tiếng anh</th>
                  <th className='border border-slate-600 rounded-md'>Đường dẫn</th>
                  <th className='border border-slate-600 rounded-md'>Mô tả phim</th>
                  <th className='border border-slate-600 rounded-md'>Đạo diễn</th>
                  <th className='border border-slate-600 rounded-md'>Tag phim</th>
                  <th className='border border-slate-600 rounded-md'>Thuộc</th>
                  <th className='border border-slate-600 rounded-md'>Quốc gia</th>
                  <th className='border border-slate-600 rounded-md'>Poster</th>
                  <th className='border border-slate-600 rounded-md'>Xử lý</th>

                </tr>
              </thead>
              <tbody>
                {movies.map((movie, index) => (
                  <tr key={movie._id} className='h-8'>
                    <td className='border border-slate-700 rounded-md text-center'>{index + perPage * forcePage + 1}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{movie.title}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{movie.numberOfEpisode}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{movie.duration}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{movie.englishTitle}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{movie.path}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{movie.description.slice(0, 30)}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{movie.director}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{movie.tag}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{movie.series}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{movie.country}</td>
                    <td className='border border-slate-700 rounded-md text-center'><img src={movie.poster} /></td>

                    <td className='border border-slate-700 rounded-md text-center'>
                      <div className='flex justify-center gap-x-4'>
                        <Link to={`/movie/listepisode/${movie._id}`} target='_blank'>
                          <BsInfoCircle className='text-2xl text-green-800' />
                        </Link>
                        <Link to={`/movie/addepisode/${movie._id}`} target='_blank'>
                          <FaPlusCircle className='text-2xl text-blue-800' />
                        </Link>
                        <Link to={`/movie/edit/${movie._id}`} target='_blank'>
                          <AiOutlineEdit className='text-2xl text-yellow-800' />
                        </Link>
                        <button onClick={() => DeleteMovie(movie._id)}>
                          <MdOutlineDelete className='text-2xl text-red-800' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
        </>
      )}
    </div>
  )
}

export default ListMovie