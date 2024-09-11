import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../../../components/Spinner'
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfo, BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { ServerAddress } from '../../../../config';
import ReactPaginate from 'react-paginate';

const ListCountry = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(10); // Số lượng item trên mỗi trang
  const [pageCount, setPageCount] = useState(0);
  const [forcePage, setForcePage] = useState(0);


  //Lấy thể loại từ database
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${ServerAddress}/country`)
      .then((response) => {
        const data = response.data.data;
        const slice = data.slice(offset, offset + perPage);
        setCountries(slice);
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

  const DeleteCountry = (id) => {
    axios
      .delete(`${ServerAddress}/country/${id}`)
      .then(() => {
        setCountries(countries.filter(country => country._id !== id));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }

  return (
    <div className='p-4 overflow-auto bg-gray-100'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8 font-semibold'>Danh sách quốc gia</h1>
        <Link to='/products/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      <p>Số phần tử/trang</p>
      <select value={perPage} onChange={(e) => setPerPage(e.target.value)} className='ml-2 p-1 rounded'>
        <option>5</option>
        <option>10</option>
        <option>20</option>
        <option>50</option>
      </select>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className='overflow-x-auto overflow-y-auto'>
            <table className='w-full border-separate border-spacing-2'>
              <thead>
                <tr>
                  <th className='border border-slate-600 rounded-md'>STT</th>
                  <th className='border border-slate-600 rounded-md'>Tên quốc gia</th>
                  <th className='border border-slate-600 rounded-md max-md:hidden'>Đường dẫn</th>
                  <th className='border border-slate-600 rounded-md'>Xử lý</th>

                </tr>
              </thead>
              <tbody>
                {countries.map((country, index) => (
                  <tr key={country._id} className='h-8'>
                    <td className='border border-slate-700 rounded-md text-center'>{index + perPage * forcePage + 1}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{country.name}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{country.path}</td>

                    <td className='border border-slate-700 rounded-md text-center'>
                      <div className='flex justify-center gap-x-4'>
                        <Link to={`/country/edit/${country._id}`} target='_blank'>
                          <AiOutlineEdit className='text-2xl text-yellow-800' />
                        </Link>
                        <button onClick={() => DeleteCountry(country._id)}>
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

export default ListCountry