import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MovieSimpleSlider = ({ movies }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {movies.map((movie, index) => (
        <a href={`/phim/${movie.path}`} className="relative" key={index}>
          <img className='w-[800px] h-[400px] object-cover'
            src={movie.poster} />
          <span className="absolute top-0 bg-black bg-opacity-15 text-white font-bold text-3xl">{movie.title}</span>
        </a>
        ))}
      </Slider>
    </div>
  );
}

export default MovieSimpleSlider;
