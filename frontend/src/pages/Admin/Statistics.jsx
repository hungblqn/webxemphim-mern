import React, { useState, useEffect } from 'react'
import { FaFilm } from 'react-icons/fa'
import { HiMenu } from 'react-icons/hi'
import { BiWorld } from 'react-icons/bi'
import { ServerAddress } from '../../../config'
import axios from 'axios'

const Statistics = () => {
  const [movieCount, setMovieCount] = useState([]);
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios.get(`${ServerAddress}/movie/count`)
      .then((result) => {
        setMovieCount(result.data.count);
      })
      .catch((error) => {
        alert('error');
        console.log(error);
      })
    axios.get(`${ServerAddress}/genre`)
      .then((result) => {
        setGenres(result.data)
      })
      .catch((error) => {
        alert('error');
        console.log(error);
      })
    axios.get(`${ServerAddress}/country`)
      .then((result) => {
        setCountries(result.data)
      })
      .catch((error) => {
        alert('error');
        console.log(error);
      })
  }, [])
  return (
    <div>
      <div className='grid grid-cols-3 gap-4'>
        <div className='bg-white flex pl-5 py-5 text-center'>
          <div className="w-36 h-36 bg-purple-600 flex items-center justify-center rounded-full">
            <FaFilm className='top-1/2 size-16 text-white' />
          </div>
          <div>
            <p className='text-bold text-4xl pl-5'>{movieCount}</p>
            <p className='pt-12 pl-5'>Bộ phim</p>
          </div>
        </div>
        <div className='bg-white flex pl-5 py-5 text-center'>
          <div className="w-36 h-36 bg-green-300 flex items-center justify-center rounded-full">
            <HiMenu className='top-1/2 size-16 text-white' />
          </div>
          <div>
            <p className='text-bold text-4xl pl-5'>{genres.count}</p>
            <p className='pt-12 pl-5'>Thể loại phim</p>
          </div>
        </div>
        <div className='bg-white flex pl-5 py-5 text-center'>
          <div className="w-36 h-36 bg-red-500 flex items-center justify-center rounded-full">
            <BiWorld className='top-1/2 size-16 text-white' />
          </div>
          <div>
            <p className='text-bold text-4xl pl-5'>{countries.count}</p>
            <p className='pt-12 pl-5'>Quốc gia phím</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics