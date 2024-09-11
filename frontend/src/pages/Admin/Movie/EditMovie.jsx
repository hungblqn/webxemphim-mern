import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ServerAddress } from '../../../../config'
import { useParams } from 'react-router-dom'



const EditMovie = () => {
  //Chuẩn bị dữ liệu cho select
  const {id} = useParams();
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);

  //Lấy thể loại
  useEffect(() => {
    axios.get(`${ServerAddress}/genre`)
      .then((result) => {
        console.log(result);
        setGenres(result.data.data);
      })
      .catch((error) => {
        alert("Đã xảy ra lỗi. Vui lòng kiểm tra console.");
        console.log(error);
      })
  }, [])
  //Lấy quốc gia
  useEffect(() => {
    axios.get(`${ServerAddress}/country`)
      .then((result) => {
        console.log(result);
        setCountries(result.data.data);
      })
      .catch((error) => {
        alert("Kiểm tra console để xem lỗi");
        console.log(error);
      })
  }, [])


  //Khai báo dữ liệu cho phim
  const [title, setTitle] = useState('');
  const [numberOfEpisode, setNumberOfEpisode] = useState();
  const [duration, setDuration] = useState();
  const [englishTitle, setEnglishTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState();
  const [trailerUrl, setTrailerUrl] = useState('');
  const [path, setPath] = useState('');
  const [description, setDescription] = useState('');
  const [director, setDirector] = useState('');
  const [actor, setActor] = useState('');
  const [tag, setTag] = useState('');
  const [quality, setQuality] = useState('HD');
  const [type, setType] = useState('Vietsub');
  const [series, setSeries] = useState('Phim bộ');
  const [country, setCountry] = useState('Việt Nam');
  const [genres2, setGenres2] = useState([]);
  const [poster, setPoster] = useState('');

  //Lấy dữ liệu movie  với id movie

  useEffect(() => {
    axios.get(`${ServerAddress}/movie/${id}`)
    .then((result) => {
        console.log(result.data);
        setTitle(result.data.title);
        setNumberOfEpisode(result.data.numberOfEpisode);
        setDuration(result.data.duration);
        setEnglishTitle(result.data.englishTitle);
        setReleaseYear(result.data.releaseYear);
        setTrailerUrl(result.data.trailer_url);
        setPath(result.data.path);
        setDescription(result.data.description);
        setDirector(result.data.director);
        setActor(result.data.actor);
        setTag(result.data.tag);
        setQuality(result.data.quality);
        setType(result.data.type);
        setSeries(result.data.series);
        setCountry(result.data.country);
        setGenres2(result.data.genres);
        setPoster(result.data.poster);
    })
    .catch((error) => {
        alert('error');
        console.log(error);
    })
  }, [])

  const convertToPath = (name) => {
    const withoutAccent = removeAccents(name.toLowerCase());
    return withoutAccent.replace(/\s+/g, '-');
  };

  const removeAccents = (str) => {
    return str
      .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
      .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
      .replace(/[ìíịỉĩ]/g, 'i')
      .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
      .replace(/[ùúụủũưừứựửữ]/g, 'u')
      .replace(/[ỳýỵỷỹ]/g, 'y')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9 -]/g, '') // loại bỏ các ký tự không phải chữ cái, số, dấu cách, hoặc dấu gạch ngang
      .replace(/\s+/g, '-'); // thay thế các dấu cách bằng dấu gạch ngang
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setPath(convertToPath(newTitle)); // Tự động cập nhật đường dẫn khi nhập tên thể loại
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPoster(reader.result); // Set the Base64-encoded string to the state
      };
      reader.readAsDataURL(file);
    }
  };



  const SaveMovie = () => {
    const newMovie = {
      title: title,
      numberOfEpisode: numberOfEpisode,
      duration: duration,
      englishTitle: englishTitle,
      releaseYear: releaseYear,
      trailer_url: trailerUrl,
      path: path,
      description: description,
      tag: tag,
      director: director,
      actor: actor,
      genres: genres2,
      series: series,
      quality: quality,
      type: type,
      country: country,
      poster: poster
    }
    axios.put(`${ServerAddress}/movie/${id}`, newMovie)
    .then((result) => {
        alert('done');
        console.log(result);
    })
    .catch((error) => {
        alert('error');
        console.log(error);
    })
  }

  // Hàm xử lý khi tích hoặc hủy tích checkbox
  const handleCheckboxChange = (genreName) => {
    // Kiểm tra xem genreName đã có trong genres2 chưa
    const index = genres2.indexOf(genreName);
    if (index === -1) {
      // Nếu chưa có, thêm vào genres2
      setGenres2([...genres2, genreName]);
    } else {
      // Nếu đã có, xoá khỏi genres2
      const newGenres2 = [...genres2];
      newGenres2.splice(index, 1);
      setGenres2(newGenres2);
    }
  };

  return (
    <div className='pl-[10%] pr-[10%]'>
      <p className='font-bold text-3xl'>Sửa phim</p>
      <p className='font-bold'>Tên phim</p>
      <input value={title} onChange={handleTitleChange} type='text' className='w-full border-gray-500 border-2' />
      <p className='font-bold'>Số tập phim</p>
      <input value={numberOfEpisode} onChange={(e) => setNumberOfEpisode(e.target.value)} type='text' className='w-full border-gray-500 border-2' />
      <p className='font-bold'>Thời lượng phim</p>
      <input value={duration} onChange={(e) => setDuration(e.target.value)} type='text' className='w-full border-gray-500 border-2' />
      <p className='font-bold'>Tên tiếng anh</p>
      <input value={englishTitle} onChange={(e) => setEnglishTitle(e.target.value)} type='text' className='w-full border-gray-500 border-2' />
      <p className='font-bold'>Năm phát hành</p>
      <input value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} type='text' className='w-full border-gray-500 border-2' />
      <p className='font-bold'>Trailer (nhúng link)</p>
      <input value={trailerUrl} onChange={(e) => setTrailerUrl(e.target.value)} type='text' className='w-full border-gray-500 border-2' />
      <p className='font-bold'>Đường dẫn (trên trang web)</p>
      <input value={path} onChange={(e) => setPath(e.target.value)} type='text' className='w-full border-gray-500 border-2' />
      <p className='font-bold'>Mô tả phim</p>
      <input value={description} onChange={(e) => setDescription(e.target.value)} type='text' className='w-full border-gray-500 border-2' />
      <p className='font-bold'>Đạo diễn</p>
      <input value={director} onChange={(e) => setDirector(e.target.value)} type='text' className='w-full border-gray-500 border-2' />
      <p className='font-bold'>Diễn viên</p>
      <input value={actor} onChange={(e) => setActor(e.target.value)} type='text' className='w-full border-gray-500 border-2' />
      <p className='font-bold'>Tag phim</p>
      <input value={tag} onChange={(e) => setTag(e.target.value)} type='text' className='w-full border-gray-500 border-2' />
      <p className='font-bold'>Chất lượng</p>
      <select value={quality} onChange={(e) => setQuality(e.target.value)} className='w-full border-gray-500 border-2'>
        <option>HD</option>
        <option>SD</option>
        <option>480p</option>
        <option>360p</option>
      </select>
      <p className='font-bold'>Kiểu</p>
      <select value={type} onChange={(e) => setType(e.target.value)} className='w-full border-gray-500 border-2'>
        <option>Vietsub</option>
        <option>Raw</option>
        <option>Thuyết minh</option>
      </select>
      <p className='font-bold'>Thuộc phim</p>
      <select value={series} onChange={(e) => setSeries(e.target.value)} className='w-full border-gray-500 border-2'>
        <option>Phim bộ</option>
        <option>Phim lẻ</option>
      </select>
      <p className='font-bold'>Quốc gia</p>
      <select value={country} onChange={(e) => setCountry(e.target.value)} className='w-full border-gray-500 border-2'>
        <option></option>
        {countries.map((country, index) => (
          <option key={index}>{country.name}</option>
        ))}
      </select>
      <p className='font-bold'>Thể loại</p>
      <div>
        {genres.map((genre, index) => (
          <span key={index} className='font-semibold'>
            <input checked={genres2.includes(genre.name)} onChange={() => handleCheckboxChange(genre.name)} type='checkbox' className='ml-1' />
            {genre.name}
          </span>
        ))}
      </div>
      <p className='font-bold'>Hình ảnh</p>
      <input type='file' onChange={handleImageChange} className='border-gray-500 border-2' />

      <br />
      <button onClick={() => SaveMovie()} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Sửa phim
      </button>
    </div>
  )
}

export default EditMovie