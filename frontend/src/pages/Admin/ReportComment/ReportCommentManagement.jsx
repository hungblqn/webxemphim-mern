import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { MdOutlineAddBox } from 'react-icons/md'
import { MdOutlineDelete } from 'react-icons/md'
import { ServerAddress } from '../../../../config'
import Spinner from '../../../components/Spinner'
import ReactPaginate from 'react-paginate'

const ReportCommentManagement = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(10); // Số lượng item trên mỗi trang
    const [pageCount, setPageCount] = useState(0);
    const [forcePage, setForcePage] = useState(0);
    //Tự động lấy dữ liệu
    useEffect(() => {
        setLoading(true);
        axios.get(`${ServerAddress}/reportComment`)
            .then((response) => {
                const data = response.data.data;
                const slice = data.slice(offset, offset + perPage);
                setReports(slice);
                setPageCount(Math.ceil(data.length / perPage));
            })
            .catch((error) => {
                alert('error');
                console.log(error);
            })
        setLoading(false);
    }, [offset, perPage])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setForcePage(selectedPage);
        setOffset(selectedPage * perPage);
    };

    const DeleteReport = (id) => {
        axios.delete(`${ServerAddress}/reportComment/${id}`)
            .then((result) => {
                console.log(result);
                setReports(reports.filter(report => report._id !== id));
            })
            .catch((error) => {
                alert('error');
                console.log(error);
            })
    }

    const DeleteComment = (commentId) => {
        axios.delete(`${ServerAddress}/comment/${commentId}`)
            .then(() => {
                DeleteReport(reportId);
            })
    }

    return (
        <div className='p-4 overflow-auto bg-gray-100'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8 font-semibold'>Tố cáo bình luận</h1>
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
                                    <th className='border border-slate-600 rounded-md'>Nội dung bình luận</th>
                                    <th className='border border-slate-600 rounded-md max-md:hidden'>lý do</th>
                                    <th className='border border-slate-600 rounded-md max-md:hidden'>chi tiết</th>
                                    <th className='border border-slate-600 rounded-md'>Xử lý</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report, index) => (
                                    <tr key={report._id} className='h-8'>
                                        <td className='border border-slate-700 rounded-md text-center'>{index + perPage * forcePage + 1}</td>
                                        <td className='border border-slate-700 rounded-md text-center'>{report.comment.content}</td>
                                        <td className='border border-slate-700 rounded-md text-center'>
                                            {report.reasons.map((reason, index) => (
                                                <p key={index}>{reason}</p>
                                            ))}
                                        </td>
                                        <td className='border border-slate-700 rounded-md text-center'>{report.detail}</td>
                                        <td className='border border-slate-700 rounded-md text-center'>
                                            <div className='flex justify-center gap-x-4'>
                                                <button onClick={() => {
                                                    DeleteComment(report.comment._id)
                                                    DeleteReport(report._id)
                                                }} className='px-2 bg-blue-500 text-white font-bold'>Xoá bình luận</button>
                                                <button onClick={() => DeleteReport(report._id)}>
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

export default ReportCommentManagement