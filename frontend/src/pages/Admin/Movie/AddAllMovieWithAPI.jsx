import React, { useState } from 'react';
import { ServerAddress } from '../../../../config';
import semaphore from 'semaphore';

const AddAllMovieWithAPI = () => {
  const [isAddingMovie, setIsAddingMovie] = useState(false);

  const removeHtmlTags = (htmlString) => {
    return htmlString.replace(/(<([^>]+)>)/ig, '');
  };

  const convertToBase64 = (url) => {
    return fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));
  };

  const addNewMovie = async () => {
    setIsAddingMovie(true);
    try {
      const totalPages = 1106;
      const sem = semaphore(5); // Giới hạn số lượng yêu cầu đồng thời

      // Lặp qua từng trang
      for (let page = 1; page <= totalPages; page++) {
        // Fetch dữ liệu từ trang hiện tại
        const response = await fetch(`http://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${page}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const items = data.items;
        let movieData, episodeData;
        // Lặp qua từng phim trên trang hiện tại
        for (let i = 0; i < items.length; i++) {
          sem.take(() => { // Lấy một khe trống từ semaphore
            const item = items[i];
            fetch(`https://ophim1.com/phim/${item.slug}`)
              .then(response => {
                if (!response.ok) {
                  throw new Error('network response wasnt ok');
                }
                return response.json();
              })
              .then(async data => {
                const { movie, episodes } = data;
                // Xử lý dữ liệu và chuẩn bị dữ liệu để thêm vào cơ sở dữ liệu
                let genres = [];
                for (let i = 0; i < movie.category.length; i++) {
                  genres.push(movie.category[i].name);
                }
                let countries = [];
                for (let i = 0; i < movie.country.length; i++) {
                  countries.push(movie.country[i].name);
                }
                let convertedTrailerLink = movie.trailer_url.replace("watch?v=", "embed/");
                let series = "Phim bộ";
                if (movie.episode_total === "1") {
                  series = "Phim lẻ";
                }
                const base64Poster = await convertToBase64(movie.poster_url);
                movieData = {
                  title: movie.name,
                  numberOfEpisode: movie.episode_total,
                  duration: movie.time,
                  englishTitle: movie.origin_name,
                  releaseYear: movie.year,
                  trailer_url: convertedTrailerLink,
                  path: movie.slug,
                  description: removeHtmlTags(movie.content),
                  tag: movie.name,
                  director: movie.director,
                  actor: movie.actor,
                  genres: genres,
                  series: series,
                  quality: movie.quality,
                  type: movie.lang,
                  country: countries,
                  poster: base64Poster
                };

                // Thêm phim vào cơ sở dữ liệu
                const movieResponse = await fetch(`${ServerAddress}/movie`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(movieData)
                });
                if (!movieResponse.ok) {
                  throw new Error('Error adding movie');
                }
                const movieId = await movieResponse.json();

                // Thêm các tập phim vào cơ sở dữ liệu
                const episodePromises = episodes[0].server_data.map(async episode => {
                  const path = 'tap-' + episode.name;
                  episodeData = {
                    movie: movieId._id,
                    episodeNumber: episode.name,
                    path: path,
                    episodeUrl: episode.link_embed
                  };

                  const episodeResponse = await fetch(`${ServerAddress}/episode`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(episodeData)
                  });

                  if (!episodeResponse.ok) {
                    throw new Error('Error adding episode');
                  }
                });

                await Promise.all(episodePromises);
                console.log('done a film');
                sem.leave(); // Trả lại khe đã dùng của semaphore
              })
              .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                console.log(JSON.stringify(movieData)); // Log dữ liệu phim không thành công
                console.log(JSON.stringify(episodeData)); // Log dữ liệu tập phim không thành công
                sem.leave(); // Trả lại khe đã dùng của semaphore
              });
          });
        }
      }
      setIsAddingMovie(false);
    } catch (error) {
      setIsAddingMovie(false);
      console.error('There was a problem with the fetch operation:', error);
      alert('Error adding movie');
    }
  }

  return (
    <div>
      <button
        onClick={addNewMovie}
        className={`mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isAddingMovie ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isAddingMovie}
      >
        {isAddingMovie ? 'Đang thực hiện...' : 'Thêm tất cả phim từ API'}
      </button>
    </div>
  )
}

export default AddAllMovieWithAPI;
