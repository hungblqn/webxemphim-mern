import React, { useState } from 'react';
import { ServerAddress } from '../../../../config';

const AddMovieWithAPI = () => {
    const [apiLink, setApiLink] = useState('');
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

    const addNewMovie = () => {
        setIsAddingMovie(true);

        if (apiLink.trim() === '') {
            alert('Please enter an API link');
            setIsAddingMovie(false);
            return;
        }

        fetch(apiLink)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Invalid API response');
                }
                return response.json();
            })
            .then(data => {
                const { movie, episodes } = data;

                console.log(movie);
                console.log(episodes);
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

                // Convert poster URL to base64
                convertToBase64(movie.poster_url)
                    .then(base64Poster => {
                        const movieData = {
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
                            poster: base64Poster // Use base64 poster here
                        };

                        fetch(`${ServerAddress}/movie`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(movieData)
                        })
                            .then(response => {
                                if (!response.ok) {
                                    console.log(response);
                                    throw new Error('Error adding movie');
                                }
                                return response.json();
                            })
                            .then(result => {
                                const movieId = result._id;

                                const episodePromises = episodes[0].server_data.map(episode => {
                                    const path = 'tap-' + episode.name;
                                    const episodeData = {
                                        movie: movieId,
                                        episodeNumber: episode.name,
                                        path: path,
                                        episodeUrl: episode.link_embed
                                    };

                                    return fetch(`${ServerAddress}/episode`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(episodeData)
                                    });
                                });

                                Promise.all(episodePromises)
                                    .then(responses => {
                                        responses.forEach(response => {
                                            if (!response.ok) {
                                                throw new Error('Error adding episode');
                                            }
                                        });
                                        setIsAddingMovie(false);
                                        setApiLink('');
                                        alert('Done');
                                    })
                                    .catch(error => {
                                        setIsAddingMovie(false);
                                        alert('Error adding episode');
                                        console.error(error);
                                    });
                            })
                            .catch(error => {
                                setIsAddingMovie(false);
                                alert('Error adding movie');
                                console.log(error);
                                console.error(error);
                            });
                    })
                    .catch(error => {
                        setIsAddingMovie(false);
                        alert('Error converting poster to base64');
                        console.error(error);
                    });
            })
            .catch(error => {
                setIsAddingMovie(false);
                alert('Error fetching API');
                console.error(error);
            });
    };

    return (
        <div className='flex flex-wrap justify-normal'>
            <div>
                <p className='font-bold'>Nhập phim từ API ophim</p>
                <input value={apiLink} onChange={e => setApiLink(e.target.value)} className='border-gray-500 border-2' />
                <br />
                <button
                    onClick={addNewMovie}
                    className={`mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isAddingMovie ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isAddingMovie}
                >
                    {isAddingMovie ? 'Đang thực hiện...' : 'Xác nhận'}
                </button>
            </div>
        </div>
    );
};

export default AddMovieWithAPI;
