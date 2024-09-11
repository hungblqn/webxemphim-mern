import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ServerAddress } from '../../../../config';

const EditAccount = () => {
    const { id } = useParams();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hashedPassword, setHashedPassword] = useState('');
    const [role, setRole] = useState('admin');
    const [gender, setGender] = useState('Nam');
    const [verified, setVerified] = useState(true);

    //Lấy dữ liệu cho tài khoản bằng id tài khoản
    useEffect(() => {
        axios.get(`${ServerAddress}/account/${id}`)
            .then((result) => {
                console.log(result.data);
                setUsername(result.data.data.username);
                setEmail(result.data.data.email);
                setHashedPassword(result.data.data.password);
                setRole(result.data.data.role);
                setGender(result.data.data.gender);
                setVerified(result.data.data.verified);
            })
            .catch((error) => {
                alert("error");
                console.log(error);
            })
    }, [])

    const handleEditAccount = () => {
        if (!username || !email || !role || !gender || !verified) {
            alert("vui lòng điền đầy đủ thông tin")
            return;
        }
        let passwordData = "";
        if (!password) passwordData = hashedPassword;
        else passwordData = password;
        const data = {
            username: username,
            email: email,
            password: passwordData,
            role: role,
            gender: gender,
            verified: verified
        }
        console.log(data);
        if(!password){
            axios.put(`${ServerAddress}/account/keepPasswordEdit/${id}`,data)
            .then((result) => {
                console.log(result);
                if(result.data.message === "Account updated successfully"){
                    alert('done');
                    window.close();
                }
            })
            .catch((error) => {
                alert("error");
                console.log(error);
            })
        }
        else{
            axios.put(`${ServerAddress}/account/normalEdit/${id}`,data)
            .then((result) => {
                console.log(result);
                if(result.data.message === "Account updated successfully"){
                    alert('done');
                    window.close();
                }
            })
            .catch((error) => {
                alert("error");
                console.log(error);
            })
        }
    }
    return (
        <div className='ml-[10%] mr-[10%]'>
            <h1 className='text-3xl my-8 font-semibold'>Sửa tài khoản</h1>
            <p className='font-bold'>Tên hiển thị</p>
            <input value={username} onChange={(e) => { setUsername(e.target.value) }} type='text' className='w-full border-gray-500 border-2' />
            <p className='font-bold'>Email</p>
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type='text' className='w-full border-gray-500 border-2' />
            <p className='font-bold'>Mật khẩu</p>
            <input value={password} placeholder='Bỏ trống nếu không muốn đổi mật khẩu' onChange={(e) => { setPassword(e.target.value) }} type='text' className='w-full border-gray-500 border-2' />
            <p className='font-bold'>Vai trò</p>
            <select value={role} onChange={(e) => { setRole(e.target.value) }} type='text' className='w-full border-gray-500 border-2' >
                <option>admin</option>
                <option>user</option>
            </select>
            <p className='font-bold'>Giới tính</p>
            <select value={gender} onChange={(e) => { setGender(e.target.value) }} type='text' className='w-full border-gray-500 border-2' >
                <option>Nam</option>
                <option>Nữ</option>
            </select>
            <p className='font-bold'>Xác thực tài khoản</p>
            <select value={verified} onChange={(e) => { setVerified(e.target.value) }} type='text' className='w-full border-gray-500 border-2' >
                <option>true</option>
                <option>false</option>
            </select>

            <br />
            <button onClick={() => handleEditAccount()} class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sửa tài khoản
            </button>
        </div>
    )
}

export default EditAccount