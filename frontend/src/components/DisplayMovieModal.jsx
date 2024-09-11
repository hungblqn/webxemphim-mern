import React from 'react';
import { useNavigate } from 'react-router-dom';

const DisplayMovieModal = ({ isOpen, onClose, movies }) => {
    const navigate = useNavigate();
    if (!isOpen) return null;
    return (
        <div className="fixed z-10 inset-0 overflow-y-scroll">
            <div className="flex items-center justify-center min-h-screen">
                <div className="relative bg-white w-3/4 mx-auto rounded-lg shadow-xl">
                    <div className="p-8 ">
                        <h2 className="text-2xl font-bold mb-4">Danh sách phim</h2>
                        <div className="grid grid-cols-2 gap-4 overflow-y-scroll h-96">
                            {movies.map((movie, index) => (
                                <a key={index} href={`/phim/${movie.path}`} className="flex items-center hover:bg-gray-200">
                                    <img
                                        src={movie.poster}
                                        type="image/webp"
                                        alt="Movie 1"
                                        className="w-20 h-20 object-cover rounded-md mr-4"
                                    />
                                    <p className="text-lg">{movie.title}</p>
                                </a>
                            ))}
                            {/* Thêm các div khác tương tự cho các phim khác */}
                        </div>
                    </div>
                    <button
                        onClick={() => onClose()}
                        className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DisplayMovieModal;
