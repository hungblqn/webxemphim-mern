import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ServerAddress } from '../../config'
import BackButton from '../components/BackButton'

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    axios.defaults.withCredentials = true;

    const PerformLogin = () => {
        axios.post(`${ServerAddress}/account/login`, {email, password})
        .then((result) => {
            console.log(result);
            if(result.data.message === "Account not found"){
                alert("Tài khoản không tồn tại");
                return;
            }
            if(result.data.Status === "Success"){
                alert("Đăng nhập thành công!");
                navigate('/');
            }
            else{
                alert('Sai mật khẩu!')
                return;
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div class="bg-gray-500 min-h-screen flex flex-col">
            <BackButton />
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-gray-300 px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Login</h1>

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" />

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Mật khẩu" />

                    <button
                        onClick={() => PerformLogin()}
                        type="submit"
                        class="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                    >Đăng nhập</button>

                    {/*<div class="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div> */}
                </div>

                <div class="text-white mt-6">
                    Chưa có tài khoản?
                    <a class="no-underline border-b border-blue text-blue" href="../signup/">
                        Đăng ký
                    </a>.
                </div>
            </div>
        </div>
    )
}

export default Login