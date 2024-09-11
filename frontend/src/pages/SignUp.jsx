import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import axios from 'axios'
import { ServerAddress } from '../../config'
import { Spinner } from 'flowbite-react'

const SignUp = () => {
    //Khai báo biến cho tài khoản
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('Nam');

    const [loading, setLoading] = useState(false);

    const CreateNewAccount = () => {
        if (password !== confirmPassword) {
            alert("Mật khẩu không trùng khớp");
            return;
        }
        const data = {
            username: username,
            email: email,
            password: password,
            gender: gender,
            role: "user",
            verified: false
        }
        setLoading(true);
        axios.post(`${ServerAddress}/account`, data)
            .then((result) => {
                console.log(result);
                if(result.data.message === 'email is already in use.'){
                    alert('Email đã được sử dụng!');
                    setLoading(false);
                }
                if(result.data === "account created successfully"){
                    alert('Link xác thực đã được gửi về email của bạn.');
                    setLoading(false);
                }
            })
            .catch((error) => {
                alert('error');
                console.log(error);
                setLoading(false);
            })
    }

    return (
        <div className="bg-gray-500 min-h-screen flex flex-col">
            <BackButton />
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-gray-300 px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Đăng ký</h1>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="username"
                        placeholder="Tên hiển thị" />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" />

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Mật khẩu" />
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Xác nhận mật khẩu" />

                    <select value={gender} onChange={(e) => setGender(e.target.value)} className='w-full mb-4 rounded'>
                        <option>Nam</option>
                        <option>Nữ</option>
                        <option>Không muốn tiết lộ</option>
                    </select>

                    <button
                        onClick={() => CreateNewAccount()}
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                    >{loading ? (<div>Đang xử lý... <Spinner/></div>) : "Tạo tài khoản"}</button>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        Bằng cách đăng ký, bạn đồng ý với các<br/>
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Điều khoản Dịch vụ
                        </a> và{' '}
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Chính sách Bảo mật.
                        </a>
                    </div>
                </div>

                <div className="text-white mt-6">
                    Đã có tài khoản?
                    <a className="no-underline border-b border-blue text-blue" href="../login/">
                        Đăng nhập
                    </a>.
                </div>
            </div>
        </div>
    )
}

export default SignUp