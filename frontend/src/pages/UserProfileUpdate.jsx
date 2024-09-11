import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ServerAddress } from '../../config'

import Header from '../components/Header'
import Footer from '../components/Footer'

import { GetAccountData } from '../scripts/Authentication'

const UserProfileUpdate = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [role, setRole] = useState('no role');
    const [account, setAccount] = useState([]);
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [avatar, setAvatar] = useState('');
    const [updateFlag, setUpdateFlag] = useState(false);
    //Xử lý xem người dùng đăng nhập chưa
    useEffect(() => {
        GetAccountData()
            .then(data => {
                console.log(data)
                if (data.data === "token is missing") {
                    navigate('/');
                }
                else {
                    setRole(data.data.data.role);
                    //Lấy dữ liệu cho tài khoản
                    axios.get(`${ServerAddress}/account/${data.data.data.id}`)
                        .then((result) => {
                            setAccount(result.data.data);
                            setGender(result.data.data.gender);
                            setAvatar(result.data.data.avatar);
                        })
                        .catch((error) => {
                            alert('error');
                            console.log(error);
                        })
                }
            })
            .catch(error => {
                console.log(error);
                // Xử lý lỗi nếu cần
            });
    }, [updateFlag])

    const [newMovies, setNewMovies] = useState([]);
    useEffect(() => {
        axios.get(`${ServerAddress}/movie`)
            .then((result) => {
                console.log(result);
                setNewMovies(result.data.data.slice(0, 10));
            })
            .catch((error) => {
                alert('error');
                console.log(error);
            })
    }, [])


    if (role === 'no role') return null;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result); // Set the Base64-encoded string to the state
            };
            reader.readAsDataURL(file);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed in JavaScript
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const UpdateAccount = () => {
        let avatarData;
        if (avatar !== '') {
            avatarData = avatar;
        }
        if (password === '') {
            const data = {
                email: account.email,
                username: account.username,
                password: account.password,
                gender: gender,
                role: account.role,
                verified: true,
                avatar: avatarData
            }
            console.log(data);
            //giữ mật khẩu cũ
            axios.put(`${ServerAddress}/account/keepPasswordEdit/${account._id}`, data)
                .then((result) => {
                    console.log(result);
                    setUpdateFlag(!updateFlag);
                    setPassword('');
                    alert('Cập nhật tài khoản thành công!')
                })
                .catch((error) => {
                    alert('error');
                    console.log(error);
                })
        }
        else {
            const data = {
                email: account.email,
                username: account.username,
                password: password,
                gender: gender,
                role: account.role,
                verified: true,
                avatar: avatarData
            }
            //đổi mật khẩu
            axios.put(`${ServerAddress}/account/normalEdit/${account._id}`, data)
                .then((result) => {
                    console.log(result);
                    setUpdateFlag(!updateFlag);
                    setPassword('');
                    alert('Cập nhật tài khoản thành công!')
                })
                .catch((error) => {
                    alert('error');
                    console.log(error);
                })
        }
    }

    return (
        <div className='bg-black '>
            <Header />
            <main>
                <div>
                    <div className='w-[1200px] p-3 mt-3 mb-3 h-full mx-auto bg-[#414141]'>
                        <div className='flex'>
                            <div className='mt-5 w-[69%] bg-[#8a8c8c] h-full flex overflow-hidden p-5'>
                                <div className='w-[20%] mr-5'>
                                    <div className='flex flex-col items-center'>
                                        <img
                                            src={account.avatar === '' ?
                                                (account.gender === 'Nam' ? 'default-avatar-male.jpg' : 'default-avatar-female.svg')
                                                : account.avatar}
                                            className='w-[100px] h-[100px] rounded-full object-cover mb-3'
                                        />
                                        <div className='font-bold text-lg'>{account.username}</div>
                                        Ngày tham gia
                                        <div className='text-sm text-gray-700'>{formatDate(account.createdAt)}</div>
                                    </div>
                                </div>
                                <div className='w-[80%]'>
                                    <h2 className='text-xl font-semibold mb-4'>Thông tin tài khoản</h2>
                                    <div className='mb-4'>
                                        <label className='block font-medium mb-1'>Email:</label>
                                        <input type='email' value={account.email} disabled className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                                    </div>
                                    <div className='mb-4'>
                                        <label className='block font-medium mb-1'>Tên hiển thị:</label>
                                        <input type='text' value={account.username} disabled className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                                    </div>
                                    <div className='mb-4'>
                                        <label className='block font-medium mb-1'>Giới tính:</label>
                                        <select value={gender} onChange={(e) => setGender(e.target.value)} className='flex items-center'>
                                            <option>Nam</option>
                                            <option>Nữ</option>
                                            <option>Không xác định</option>
                                        </select>
                                    </div>
                                    <div className='mb-4'>
                                        <label className='block font-medium mb-1'>Mật khẩu:</label>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Bỏ trống nếu không muốn đổi' className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                                    </div>
                                    <div className='mb-4'>
                                        <label className='block font-medium mb-1'>Avatar:</label>
                                        <input type='file' onChange={handleImageChange} className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                                    </div>
                                    <div className='text-sm mb-4'>Vui lòng chọn ảnh nhỏ hơn 1MB</div>
                                    <button onClick={() => UpdateAccount()} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>Cập nhật</button>
                                </div>
                            </div>


                            <div className='mt-5 w-[30%] ml-5'>
                                <img className='w-[353px] h-[400px]'
                                    src='xemphimtructuyen.png' />

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

export default UserProfileUpdate