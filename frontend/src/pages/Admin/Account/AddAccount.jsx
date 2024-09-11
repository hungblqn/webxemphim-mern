import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { ServerAddress } from '../../../../config';

const AddAccount = ({ changeSelectedTab }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin');
    const [gender, setGender] = useState('Nam');
    const [verified, setVerified] = useState(true);

    const handleAddAccount = () => {
        const data = {
            username: username,
            email: email,
            password: password,
            role: role,
            gender: gender,
            verified: verified
        }
        console.log(data);
        axios.post(`${ServerAddress}/account/admin/create`, data)
        .then((result) => {
            alert('done');
            changeSelectedTab('listAccount');
        })
        .catch((error) => {
            console.log(error);
            return;
        })
    }
    return (
        <div>
            <h1 className='text-3xl my-8 font-semibold'>Thêm tài khoản</h1>
            <p className='font-bold'>Tên hiển thị</p>
            <input value={username} onChange={(e) => {setUsername(e.target.value)}} type='text' className='w-full border-gray-500 border-2' />
            <p className='font-bold'>Email</p>
            <input value={email} onChange={(e) => {setEmail(e.target.value)}} type='text' className='w-full border-gray-500 border-2' />
            <p className='font-bold'>Mật khẩu</p>
            <input value={password} onChange={(e) => {setPassword(e.target.value)}} type='text' className='w-full border-gray-500 border-2' />
            <p className='font-bold'>Vai trò</p>
            <select value={role} onChange={(e) => {setRole(e.target.value)}} type='text' className='w-full border-gray-500 border-2' >
                <option>admin</option>
                <option>user</option>
            </select>
            <p className='font-bold'>Giới tính</p>
            <select value={gender} onChange={(e) => {setGender(e.target.value)}} type='text' className='w-full border-gray-500 border-2' >
                <option>Nam</option>
                <option>Nữ</option>
            </select>
            <p className='font-bold'>Xác thực tài khoản</p>
            <select value={verified} onChange={(e) => {setVerified(e.target.value)}} type='text' className='w-full border-gray-500 border-2' >
                <option>true</option>
                <option>false</option>
            </select>

            <br />
            <button onClick={() => handleAddAccount()} class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Thêm tài khoản
            </button>
        </div>
    )
}

export default AddAccount