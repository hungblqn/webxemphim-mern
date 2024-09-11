import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ServerAddress } from '../../config'
import { Spinner } from 'flowbite-react'
import DisplayMovieModal from '../components/DisplayMovieModal'

const SearchMovie = () => {

    //search movie with title - tìm kiếm phim với tiêu đề
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);

    const [openModal, setOpenModal] = useState(false);

    const closeModal = () => {
        setOpenModal(false);
    }

    const handleSearchMovie = () => {
        if (!title) {
            alert("Vui lòng điền dữ liệu!");
            return;
        }
        setLoading(true);
        console.log(title);
        //Thực hiện gọi API
        axios.get(`${ServerAddress}/movie/search/${title}`)
            .then((result) => {
                console.log(result);
                setMovies(result.data.data.slice(0,10));
                setOpenModal(true);
                setLoading(false);
            })
            .catch((error) => {
                alert('Không tìm thấy phim');
                console.log(error);
                setLoading(false);
            })
    }

    return (
        <div >
            <Header />
            <div className="relative">
                <img src="bg.jpg" alt="Background" />
                <div className="absolute inset-0 bg-black opacity-80"></div>
                <div className="absolute top-[50px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative flex">
                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="text-2xl rounded-l-md h-[70px] w-[800px] px-6 py-3 outline-none bg-white text-black placeholder-gray-500  flex-grow" placeholder="Nhập tên phim..." />
                        <button onClick={handleSearchMovie} className="bg-blue-500 text-white font-bold text-2xl rounded-r-md px-6 py-3">
                            {!loading ? "Tìm" : <Spinner />}
                        </button>
                    </div>
                </div>

            </div>
            <DisplayMovieModal isOpen={openModal} onClose={closeModal} movies={movies}/>
            <Footer />
            
        </div>
    )
}

export default SearchMovie