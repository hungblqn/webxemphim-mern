import React, { useState } from 'react';
import { MdStarRate } from 'react-icons/md';
import { FaFaceSmileBeam } from "react-icons/fa6";
import axios from 'axios';
import { ServerAddress } from '../../config';

const RateMovieModal = ({ isOpen, onClose, currentAccountId, currentMovieId }) => {
    const [hoverIndex, setHoverIndex] = useState(null);

    const handleStarHover = (index) => {
        setHoverIndex(index);
    };

    const handleRateMovie = (point) => {
        const data = {
            movie: currentMovieId,
            account: currentAccountId,
            point: point
        }
        console.log(data);
        axios.post(`${ServerAddress}/movieRating`, data)
        .then((result) => {
            console.log(result);
            alert(`Bạn đã đánh giá phim `+point+` sao!`);
            onClose();
        })
        .catch((error) => {
            alert('error');
            console.log(error);
        })
    }

    if (!isOpen) return null;
    return (
        <div className="bg-gray-500 bg-opacity-75 fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                        <div className="flex items-start">
                            <div className="mx-auto text-5xl bg-gray-700 p-1 text-yellow-200 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                <FaFaceSmileBeam />
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-xl pt-2 leading-6 font-medium">Đánh giá phim</h3>
                            </div>
                        </div>
                        <div className='flex bg-slate-300 rounded-md justify-center mt-2'>
                            {[1, 2, 3, 4, 5].map((index) => (
                                <button
                                    key={index}
                                    className={`text-gray-500 ml-3 rounded-full p-2 text-3xl ${hoverIndex >= index ? 'text-yellow-200' : ''}`}
                                    onClick={() => handleRateMovie(index)}
                                    onMouseEnter={() => handleStarHover(index)}
                                    onMouseLeave={() => handleStarHover(null)}
                                >
                                    <MdStarRate />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            onClick={onClose}
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Huỷ bỏ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RateMovieModal;
