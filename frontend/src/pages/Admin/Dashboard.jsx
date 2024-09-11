import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { MdOutlineExpandMore } from "react-icons/md";

import { GetAccountData } from '../../scripts/Authentication';



import Statistics from './Statistics';

import ListGenre from './Genre/ListGenre';
import AddGenre from './Genre/AddGenre';

import ListCountry from './Country/ListCountry';
import AddCountry from './Country/AddCountry';

import ListMovie from './Movie/ListMovie';
import AddMovie from './Movie/AddMovie';
import AddMovieWithAPI from './Movie/AddMovieWithAPI';
import AddAllMovieWithAPI from './Movie/AddAllMovieWithAPI';

import ListAccount from './Account/ListAccount';
import AddAccount from './Account/AddAccount';

import ReportCommentManagement from './ReportComment/ReportCommentManagement';
import ReportEpisodeManagement from './ReportEpisode/ReportEpisodeManagement';

import { LogOut } from '../../scripts/Authentication';

const Dashboard = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const [role, setRole] = useState('');

    const [success, setSuccess] = useState();
    const [selectedTab, setSelectedTab] = useState('statistics');

    const changeSelectedTab = (newTab) => {
        setSelectedTab(newTab);
    }

    // Quản lý thể loại
    const [expandGenreManagement, setExpandGenreManagement] = useState(false);

    const ExpandGenreManagement = () => {
        if (expandGenreManagement) setExpandGenreManagement(false);
        else setExpandGenreManagement(true);
    }


    // Quản lý quốc gia
    const [expandCountryManagement, setExpandCountryManagement] = useState(false);

    const ExpandCountryManagement = () => {
        if (expandCountryManagement) setExpandCountryManagement(false);
        else setExpandCountryManagement(true);
    }


    //Mở rộng quản lý phim
    const [expandFilmManagement, setExpandFilmManagement] = useState(false);

    const ExpandFilmManagement = () => {
        if (expandFilmManagement) setExpandFilmManagement(false);
        else setExpandFilmManagement(true);
    }

    //Mở rộng quản lý tài khoản
    const [expandAccountManagement, setExpandAccountManagement] = useState(false);
    const ExpandAccountManagement = () => {
        if (expandAccountManagement) setExpandAccountManagement(false);
        else setExpandAccountManagement(true);
    }
    
    //Quản lý tố cáo bình luận & báo cáo tập phim


    useEffect(() => {
        GetAccountData()
            .then(data => {
                if(data.data === 'token is missing') navigate('/');
                else{
                    setRole(data.data.data.role);
                }
            })
            .catch(error => {
                console.log(error);
                // Xử lý lỗi nếu cần
            });
    }, [])
    // Nếu role không phải admin thì không hiển thị page
    if(role !== 'admin'){
        return null;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="bg-gray-800 text-white w-64 h-2000 p-4 overflow-auto">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <ul className="mt-1">
                    <li
                        className={`mt-1 py-2 hover:bg-gray-700 cursor-pointer ${selectedTab === 'statistics' ? 'bg-gray-700' : ''
                            }`}
                        onClick={() => setSelectedTab('statistics')}
                    >
                        Thống kê số liệu
                    </li>
                    <li
                        className={`flex mt-1 py-2 hover:bg-gray-700 cursor-pointer ${selectedTab === 'genreManagement' ? 'bg-gray-700' : ''
                            }`}
                        onClick={() => ExpandGenreManagement()}
                    >
                        Thể loại phim <MdOutlineExpandMore className='mt-2' />
                    </li>
                    {expandGenreManagement && (
                        <div>
                            <li
                                className={`py-2 hover:bg-gray-700 cursor-pointer ${selectedTab === 'listGenre' ? 'bg-gray-700' : ''
                                    }`}
                                onClick={() => setSelectedTab('listGenre')}
                            >
                                <span className='ml-6'>Danh sách thể loại</span>
                            </li>
                            <li
                                className={`py-2 hover:bg-gray-700 cursor-pointer ${selectedTab === 'addGenre' ? 'bg-gray-700' : ''
                                    }`}
                                onClick={() => setSelectedTab('addGenre')}
                            >
                                <span className='ml-6'>Thêm thể loại</span>
                            </li>
                        </div>

                    )}
                    <li
                        className={`flex mt-1 py-2 hover:bg-gray-700 cursor-pointer `}
                        onClick={() => ExpandCountryManagement()}
                    >
                        Quốc gia phim <MdOutlineExpandMore className='mt-2' />
                    </li>
                    {expandCountryManagement && (
                        <div>
                            <li
                                className={`py-2 hover:bg-gray-700 cursor-pointer ${selectedTab === 'listCountry' ? 'bg-gray-700' : ''
                                    }`}
                                onClick={() => setSelectedTab('listCountry')}
                            >
                                <span className='ml-6'>Danh sách quốc gia</span>
                            </li>
                            <li
                                className={`py-2 hover:bg-gray-700 cursor-pointer ${selectedTab === 'addCountry' ? 'bg-gray-700' : ''
                                    }`}
                                onClick={() => setSelectedTab('addCountry')}
                            >
                                <span className='ml-6'>Thêm quốc gia</span>
                            </li>
                        </div>

                    )}
                    <li
                        className={`mt-1 py-2 flex hover:bg-gray-700 cursor-pointer`}
                        onClick={() => ExpandFilmManagement()}
                    >
                        Quản lý phim <MdOutlineExpandMore className='mt-2' />
                    </li>
                    {expandFilmManagement && (
                        <div>
                            <li
                                className={`py-2 hover:bg-gray-700 cursor-pointer ${selectedTab === 'listMovie' ? 'bg-gray-700' : ''
                                    }`}
                                onClick={() => setSelectedTab('listMovie')}
                            >
                                <span className='ml-6'>Danh sách phim</span>
                            </li>
                            <li
                                className={`py-2 hover:bg-gray-700 cursor-pointer ${selectedTab === 'addMovie' ? 'bg-gray-700' : ''
                                    }`}
                                onClick={() => setSelectedTab('addMovie')}
                            >
                                <span className='ml-6'>Thêm phim</span>
                            </li>
                            <li
                                className={`py-2 hover:bg-gray-700 cursor-pointer ${selectedTab === 'addMovieWithAPI' ? 'bg-gray-700' : ''
                                    }`}
                                onClick={() => setSelectedTab('addMovieWithAPI')}
                            >
                                <span className='ml-6'>Thêm phim với API</span>
                            </li>
                            <li
                                className={`py-2 hover:bg-gray-700 cursor-pointer ${selectedTab === 'addAllMovieWithAPI' ? 'bg-gray-700' : ''
                                    }`}
                                onClick={() => setSelectedTab('addAllMovieWithAPI')}
                            >
                                <span className='ml-6'>Thêm tất cả phim với API</span>
                            </li>
                        </div>

                    )}
                    <li
                        className={`mt-1 py-2 flex hover:bg-gray-700 cursor-pointer`}
                        onClick={() => ExpandAccountManagement()}
                    >
                        Quản lý tài khoản <MdOutlineExpandMore className='mt-2' />
                    </li>
                    {expandAccountManagement && (
                        <div>
                            <li
                                className={`py-2 hover:bg-gray-700 cursor-pointer ${selectedTab === 'listAccount' ? 'bg-gray-700' : ''
                                    }`}
                                onClick={() => setSelectedTab('listAccount')}
                            >
                                <span className='ml-6'>Danh sách tài khoản</span>
                            </li>
                            <li
                                className={`py-2 hover:bg-gray-700 cursor-pointer ${selectedTab === 'addAccount' ? 'bg-gray-700' : ''
                                    }`}
                                onClick={() => setSelectedTab('addAccount')}
                            >
                                <span className='ml-6'>Thêm tài khoản</span>
                            </li>
                        </div>

                    )}
                    <li
                        className={`mt-1 py-2 flex hover:bg-gray-700 cursor-pointer ${selectedTab === 'reportComment' ? 'bg-gray-700' : ''}`}
                        onClick={() => setSelectedTab('reportComment')}
                    >
                        Quản lý tố cáo bình luận
                    </li>
                    <li
                        className={`mt-1 py-2 flex hover:bg-gray-700 cursor-pointer ${selectedTab === 'reportEpisode' ? 'bg-gray-700' : ''}`}
                        onClick={() => setSelectedTab('reportEpisode')}
                    >
                        Quản lý báo lỗi tập phim
                    </li>

                    <li
                        className={`mt-64 py-2 hover:bg-gray-700 cursor-pointer`}
                        onClick={() => navigate('/')}
                    >
                        Trang chủ
                    </li>
                    <li
                        className={`py-2 hover:bg-gray-700 cursor-pointer`}
                        onClick={() => LogOut()}
                    >
                        Đăng xuất
                    </li>
                    {/* Add more sidebar items as needed */}
                </ul>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-8 overflow-auto">
                <h1 className="text-3xl font-bold mb-8 min-h-3000">Dashboard Overview</h1>

                {/*Phân tích số liệu*/}
                {selectedTab === 'statistics' && <Statistics />}
                {/*Quản lý thể loại */}
                {selectedTab === 'listGenre' && <ListGenre />}
                {selectedTab === 'addGenre' && <AddGenre />}
                {/*Quản lý quốc gia */}
                {selectedTab === 'listCountry' && <ListCountry />}
                {selectedTab === 'addCountry' && <AddCountry />}

                {/*Quản lý phim */}
                {selectedTab === 'listMovie' && <ListMovie />}
                {selectedTab === 'addMovie' && <AddMovie />}
                {selectedTab === 'addMovieWithAPI' && <AddMovieWithAPI />}
                {selectedTab === 'addAllMovieWithAPI' && <AddAllMovieWithAPI />}

                {/*Quản lý tài khoản */}
                {selectedTab === 'listAccount' && <ListAccount />}
                {selectedTab === 'addAccount' && <AddAccount changeSelectedTab={changeSelectedTab} />}
                {/*Quản lý tổ cáo bình luận & báo cáo lỗi tập phim */}
                {selectedTab === 'reportComment' && <ReportCommentManagement/> }
                {selectedTab === 'reportEpisode' && <ReportEpisodeManagement/> }                    
                {/* Add more content for other sidebar items as needed */}
            </main>
        </div>
    )
}

export default Dashboard