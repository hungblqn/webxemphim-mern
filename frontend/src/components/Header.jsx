import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { ServerAddress } from '../../config';
import { useNavigate, Link } from 'react-router-dom'
import { MdOutlineExpandMore } from "react-icons/md";
import { GetAccountData, LogOut } from '../scripts/Authentication';

const Header = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [role, setRole] = useState('no role');

  const [expandOptions, setExpandOptions] = useState(false);

  const [expandGenre, setExpandGenre] = useState(false);
  const [expandCountry, setExpandCountry] = useState(false);

  const [expandOption, setExpandOption] = useState(false);

  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  //Lấy tất cả dữ liệu thể loại và quốc gia
  useEffect(() => {
    axios.get(`${ServerAddress}/genre`)
      .then((result) => {
        setGenres(result.data.data);
      })
      .catch((error) => {
        alert('error');
        console.log(error);
      })

    axios.get(`${ServerAddress}/country`)
      .then((result) => {
        setCountries(result.data.data);
      })
      .catch((error) => {
        alert('error');
        console.log(error);
      })

    // Gọi hàm GetAccountRole để lấy vai trò tài khoản
    GetAccountData()
      .then(data => {
        console.log(data)
        if (data.data === "token is missing") {
          setRole("no role");
        }
        else {
          setRole(data.data.data.role);
        }
      })
      .catch(error => {
        console.log(error);
        // Xử lý lỗi nếu cần
      });

  }, [])

  return (
    <header className="bg-[#434242] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-semibold">
          <button onClick={() => navigate('/')} className='mr-6 hover:bg-black cursor-pointer p-4'>TRANG CHỦ</button>
          <button onClick={() => navigate('/search')} className='mr-6 hover:bg-black cursor-pointer p-4'>TÌM KIẾM</button>
          <Link to='/phim-le'>
            <button className='mr-6 hover:bg-black cursor-pointer p-4'>
              PHIM LẺ
            </button>
          </Link>
          <Link to='/phim-bo'>
            <button onClick={() => navigate('/')} className='mr-6 hover:bg-black cursor-pointer p-4'>
              PHIM BỘ
            </button>
          </Link>

          <button
            onMouseEnter={() => setExpandGenre(true)}
            onMouseLeave={() => setExpandGenre(false)}
            onClick={() => navigate('/')} className='mr-6 inline-flex hover:bg-black cursor-pointer p-4'>
            THỂ LOẠI
            <MdOutlineExpandMore className='mt-1' />
          </button>
          {expandGenre && (
            <div onMouseEnter={() => setExpandGenre(true)} onMouseLeave={() => setExpandGenre(false)} className='relative inline-block text-left '>
              <div className="absolute right-[-223px] z-10 mt-2 w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className='grid grid-cols-3 bg-[#464646]'>
                  {genres.map((genre, index) => (
                    <a href={`/the-loai/${genre.path}`} key={index} className="text-white whitespace-nowrap hover:bg-black block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">
                      {genre.name}
                    </a>
                  ))}</div>
              </div>
            </div>
          )}
          <button
            onMouseEnter={() => setExpandCountry(true)}
            onMouseLeave={() => setExpandCountry(false)}
            onClick={() => navigate('/')}
            className='mr-6 inline-flex hover:bg-black cursor-pointer p-4'>
            QUỐC GIA
            <MdOutlineExpandMore className='mt-1' />
          </button>
          {expandCountry && (
            <div onMouseEnter={() => setExpandCountry(true)} onMouseLeave={() => setExpandCountry(false)} className='relative inline-block text-left '>
              <div className="absolute right-[-211px] z-10 mt-2 w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="grid grid-cols-3 bg-[#464646]" role="none">
                  {countries.map((country, index) => (
                    <a href={`/quoc-gia/${country.path}`} key={index} className="text-white whitespace-nowrap hover:bg-black block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">
                      {country.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
          {role !== "no role" && (
            <button
              onMouseEnter={() => setExpandOption(true)}
              onMouseLeave={() => setExpandOption(false)}
              className='mr-6 inline-flex hover:bg-black cursor-pointer p-4'>
              TUỲ CHỌN
              <MdOutlineExpandMore className='mt-1' />
            </button>
          )}
          {expandOption && (
            <div onMouseEnter={() => setExpandOption(true)} onMouseLeave={() => setExpandOption(false)} className='relative inline-block text-left '>
              <div className="absolute right-[16px] z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="grid grid-cols-1 bg-[#464646]" role="none">
                  {role === "admin" && (
                    <a href={`/admin`} className="text-white text-center whitespace-nowrap hover:bg-black block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">
                      ADMIN PAGE
                    </a>
                  )}
                  {role !== "no role" && (
                    <div className='text-center'>
                      <a href='/cap-nhat-ho-so' className="text-white  whitespace-nowrap hover:bg-black block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">
                        CẬP NHẬT HỒ SƠ
                      </a>
                      <a href='/lich-su-xem-phim' className="text-white  whitespace-nowrap hover:bg-black block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">
                        LỊCH SỬ XEM PHIM
                      </a>
                      <a href='/phim-yeu-thich' className="text-white  whitespace-nowrap hover:bg-black block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">
                        PHIM YÊU THÍCH
                      </a>
                      <button onClick={() => LogOut()} className="text-white whitespace-nowrap w-full hover:bg-black block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">
                        ĐĂNG XUẤT
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {role === "no role" && (
            <span>
              <button onClick={() => navigate('/signup')} className="mr-6 inline-flex hover:bg-black cursor-pointer p-4">ĐĂNG KÝ</button>
              <button onClick={() => navigate('/login')} className="mr-6 inline-flex hover:bg-black cursor-pointer p-4">ĐĂNG NHẬP</button>
            </span>
          )}
        </div>
        <div className='text-center'>
          <h1 className="justify-center flex items-center text-white mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl dark:text-white">
          </h1>
        </div>
        <nav className="space-x-4 text-xl font-semibold">

        </nav>

      </div>
    </header>
  )
}

export default Header