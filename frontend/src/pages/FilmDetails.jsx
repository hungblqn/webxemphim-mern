import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MovieCard from '../components/MovieCard'

const FilmDetails = () => {
    return (
        <div className='bg-black'>
            <Header />
            <div style={{ transform: 'scale(1)', paddingLeft: '10%', paddingRight: '10%' }} className='bg-black'>
                <div className='bg-[#434242] rounded-2xl pt-3 mt-3 pb-3'>
                    <div className='flex ml-3 text-white'>
                        Trang chủ / Thể loại / Xem phim [tên phim]
                    </div>
                </div>


                <div className='flex'>
                    <div className='w-[75%] h-full'>
                        <div className='bg-[#434242] flex h-full mt-3 rounded-xl pt-3 pb-3'>
                            <div className='relative ml-3 text-white'>
                                <img
                                    src="https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg"
                                    width="375"
                                    height="200"
                                    className="rounded-3xl justify-center grid h-80 object-cover"
                                    alt="movie.title"
                                />
                                <button className="absolute w-full rounded-b-2xl bg-red-500 bottom-0 px-6 py-3 text-white text-lg font-semibold">Xem phim</button>
                            </div>
                            <div className='ml-3 text-white'>
                                <span className='inline-block font-bold text-2xl'>Tên phim</span><br />
                                <span className='inline-block pt-7'>Thể loại: </span><br />
                                <span className='inline-block pt-7'>Thời lượng: </span><br />
                                <span className='inline-block pt-7'>Đạo diễn: </span><br />
                                <span className='inline-block pt-7'>Năm sản xuất: </span><br />
                                <span className='inline-block pt-7'>Diễn viên: </span><br />
                            </div>
                        </div>
                        <div className='bg-[#434242] flex h-full mt-3 rounded-xl pt-3 pb-3'>
                            <div className='justify-center ml-3 mr-3' style={{ width: '100%', height: 'auto', minHeight: '100px' }}>
                                <div className='text-center text-[#ffc23d] font-bold text-3xl'>
                                    <span>Nội dung phim</span><br/>
                                </div>
                                <div className='text-white'>
                                    <span>
                                    Spider-Man: Across The Spider-Verse - Người Nhện: Du Hành Vũ Trụ Nhện là một bộ phim hoạt hình siêu anh hùng của Mỹ năm 2023. Phần tiếp theo của Spider-Man: Into the Spider-Verse (2018), lấy bối cảnh trong đa vũ trụ chung của thế giới được gọi là Spider-Verse. Bộ phim được đạo diễn bởi Joaquim Dos Santos, Kemp Powers, và Justin K. Thompson. Trong phim Miles tham gia vào một cuộc phiêu lưu với Gwen Stacy|Spider-Woman xuyên vũ trụ, nơi cậu gặp một nhóm Người Nhện được gọi là Spider-Society, dẫn đầu bởi Miguel O' Hara|Spider-Man 2099, nhưng xung đột với họ về việc xử lý một mối đe dọa mới. Miles buộc phải đọ sức với các Người Nhện khác và phải xác định lại ý nghĩa của việc trở thành một người hùng để có thể cứu những người cậu yêu thương nhất.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='bg-[#434242] flex h-full mt-3 rounded-xl pt-3 pb-3'>
                            <div className='justify-center ml-3 mr-3' style={{ width: '100%', height: 'auto', minHeight: '500px' }}>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/cqGjhVJWtEg"
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                ></iframe>
                            </div>
                        </div>

                    </div>

                    <div className='bg-[#434242] w-[25%] h-full ml-3 mt-3 rounded-xl pt-3 pb-3'>
                        <div className='text-center text-[#ffc23d] font-bold text-3xl'>
                            <span>Phim mới</span><br />
                        </div>
                        {/*Hiển thị*/}
                        <hr />
                        <div className='flex'>
                            <img
                                src="https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg"
                                width="50"
                                height="50"
                                className="object-cover"
                                alt="movie.title"
                            />
                            <div>
                                <span className='text-2xl text-white'>Tên phim</span><br />
                                <span className='text-white'>2024</span>
                            </div>
                        </div>
                        <hr />
                        <div className='flex'>
                            <img
                                src="https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg"
                                width="50"
                                height="50"
                                className="object-cover"
                                alt="movie.title"
                            />
                            <div>
                                <span className='text-2xl text-white'>Tên phim</span><br />
                                <span className='text-white'>2024</span>
                            </div>
                        </div>
                        <hr />
                        <div className='flex'>
                            <img
                                src="https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg"
                                width="50"
                                height="50"
                                className="object-cover"
                                alt="movie.title"
                            />
                            <div>
                                <span className='text-2xl text-white'>Tên phim</span><br />
                                <span className='text-white'>2024</span>
                            </div>
                        </div>
                        <hr />
                        <div className='flex'>
                            <img
                                src="https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg"
                                width="50"
                                height="50"
                                className="object-cover"
                                alt="movie.title"
                            />
                            <div>
                                <span className='text-2xl text-white'>Tên phim</span><br />
                                <span className='text-white'>2024</span>
                            </div>
                        </div>
                        <hr />
                        <div className='flex'>
                            <img
                                src="https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg"
                                width="50"
                                height="50"
                                className="object-cover"
                                alt="movie.title"
                            />
                            <div>
                                <span className='text-2xl text-white'>Tên phim</span><br />
                                <span className='text-white'>2024</span>
                            </div>
                        </div>
                        <hr />
                        <div className='flex'>
                            <img
                                src="https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg"
                                width="50"
                                height="50"
                                className="object-cover"
                                alt="movie.title"
                            />
                            <div>
                                <span className='text-2xl text-white'>Tên phim</span><br />
                                <span className='text-white'>2024</span>
                            </div>
                        </div>
                        <hr />
                        <div className='flex'>
                            <img
                                src="https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg"
                                width="50"
                                height="50"
                                className="object-cover"
                                alt="movie.title"
                            />
                            <div>
                                <span className='text-2xl text-white'>Tên phim</span><br />
                                <span className='text-white'>2024</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default FilmDetails