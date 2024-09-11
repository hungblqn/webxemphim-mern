import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../../../components/Spinner'
import { Link } from 'react-router-dom'
import { MdOutlineDelete, MdOutlineAddBox } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import { ServerAddress } from '../../../../config'

const ListAccount = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);

    const GetAccounts = () => {
        setLoading(true); // Bắt đầu loading
        axios.get(`${ServerAddress}/account`)
        .then((result) => {
            console.log(result);
            setAccounts(result.data.accounts);
            setLoading(false); // Kết thúc loading khi dữ liệu được trả về
        })
        .catch((error) => {
            alert('error')
            console.log(error);
            setLoading(false); // Kết thúc loading nếu có lỗi xảy ra
        })
    }

    // Tự động lấy accounts
    useEffect(() => {
        GetAccounts();
    }, []); // Đặt dependency array trống để chỉ gọi API một lần sau khi component được render

    const DeleteAccount = (id) => {
        //Xoá tài khoản với id tài khoản
        axios.delete(`${ServerAddress}/account/${id}`)
        .then(() => {
            GetAccounts();
        })
        .catch((error) => {
            alert('error');
            console.log(error);
        })
    }

    return (
        <div className='p-4 overflow-auto bg-gray-100'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8 font-semibold'>Danh sách tài khoản</h1>
                <Link to='/products/create'>
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
                                <th className='border border-slate-600 rounded-md'>Tên hiển thị</th>
                                <th className='border border-slate-600 rounded-md'>Email</th>
                                <th className='border border-slate-600 rounded-md max-md:hidden'>password</th>
                                <th className='border border-slate-600 rounded-md max-md:hidden'>role</th>
                                <th className='border border-slate-600 rounded-md max-md:hidden'>verified</th>
                                <th className='border border-slate-600 rounded-md'>Xử lý</th>

                            </tr>
                        </thead>
                        <tbody>
                        {accounts.map((account, index) => (
                                <tr key={account._id} className='h-8'>
                                    <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{account.username}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{account.email}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{account.password}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{account.role}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{account.verified ?? true ? 'True' : 'False'}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        <div className='flex justify-center gap-x-4'>
                                            <Link to={`/account/edit/${account._id}`} target='_blank'>
                                                <AiOutlineEdit className='text-2xl text-yellow-800' />
                                            </Link>
                                            <button onClick={() => DeleteAccount(account._id)}>
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

export default ListAccount