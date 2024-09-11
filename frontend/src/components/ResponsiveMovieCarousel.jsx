import React from 'react';
import Slider from 'react-slick';

import MovieCard2 from './MovieCard2';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ResponsiveMovieCarousel = ({movies}) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="ml-1">
            <Slider {...settings} className="w-full">
                {movies.map((movie, index) => (
                    <div key={index}>
                        <a href={`/phim/${movie.path}`} className='inline-block'>
                            <img className="w-[140px] h-[180px] object-cover" src={movie.poster} alt="Movie" />
                            <span className='text-white'>{movie.title}</span>
                        </a>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ResponsiveMovieCarousel;
