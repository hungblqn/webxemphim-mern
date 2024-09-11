import express from 'express';
import { Movie } from '../models/movieModel.js';
import { Episode } from '../models/episodeModel.js';
import { Comment } from '../models/commentModel.js';
import { Genre } from '../models/genreModel.js';
import { Country } from '../models/countryModel.js';
import { FavoriteMovie } from '../models/favoriteMovieModel.js';
import { WatchHistory } from '../models/watchHistoryModel.js';
import { MovieRating } from '../models/movieRatingModel.js';
import { ReportComment } from '../models/reportCommentModel.js';
import { ReportEpisode } from '../models/reportEpisodeModel.js';


const router = express.Router();


// Lấy số lượng phim
router.get('/count', async(request, response) => {
    try {
        const result = await Movie.countDocuments();
        return response.status(200).send({count: result});
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

//Lấy tất cả dữ liệu của phim
router.get('/', async (request, response) => {
    try {
        const movies = await Movie.find({}).lean();
        return response.status(200).json({
            count: movies.length,
            data: movies
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Lấy tất cả phim lẻ
router.get('/phim-le', async (request, response) => {
    try {
        const movies = await Movie.find({ series: "Phim lẻ" }).lean();
        return response.status(200).json({
            count: movies.length,
            data: movies
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Lấy tất cả phim bộ
router.get('/phim-bo', async (request, response) => {
    try {
        const movies = await Movie.find({ series: "Phim bộ" }).lean();
        return response.status(200).json({
            count: movies.length,
            data: movies
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Lấy phim với thể loại
router.get('/the-loai/:genre', async (request, response) => {
    try {
        const { genre } = request.params;
        const genreRef = await Genre.findOne({ path: genre }).lean();
        // Find movies with the specified genre
        const movies = await Movie.find({ genres: genreRef.name });

        return response.status(200).json(movies);
    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Lấy phim với quốc gia
router.get('/quoc-gia/:country', async (request, response) => {
    try {
        const { country } = request.params;
        const countryRef = await Country.findOne({ path: country }).lean();
        const movies = await Movie.find({ country: countryRef.name });
        return response.status(200).json(movies);
    }
    catch (error) {
        console.error(error.message);
        return response.status(500).send({ message: error.message });
    }
})


//Tìm kiếm phim với title
// Search movies by title
const replaceVietnameseCharacters = (str) => {
    const charMap = {
        'ă': 'a', 'â': 'a', 'đ': 'd', 'ê': 'e', 'ô': 'o', 'ơ': 'o', 'ư': 'u',
        'à': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a', 'á': 'a', 'ằ': 'a', 'ẳ': 'a',
        'ẵ': 'a', 'ặ': 'a', 'ắ': 'a', 'ầ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
        'ấ': 'a', 'è': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e', 'é': 'e', 'ề': 'e',
        'ể': 'e', 'ễ': 'e', 'ệ': 'e', 'ế': 'e', 'ì': 'i', 'ỉ': 'i', 'ĩ': 'i',
        'ị': 'i', 'í': 'i', 'ò': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o', 'ó': 'o',
        'ồ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o', 'ố': 'o', 'ờ': 'o', 'ở': 'o',
        'ỡ': 'o', 'ợ': 'o', 'ớ': 'o', 'ù': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
        'ú': 'u', 'ừ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u', 'ứ': 'u', 'ỳ': 'y',
        'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y', 'ý': 'y', 'đ': 'd', 'ð': 'd'
    };
    return str.replace(/[ăâđêôơưàảãạáằẳẵặắầẩẫậấèẻẽẹéềểễệếìỉĩịíòỏõọóồổỗộốờởỡợớùủũụúừửữựứỳỷỹỵýđð]/g, match => charMap[match]);
};

router.get('/search/:title', async (request, response) => {
    try {
        const { title } = request.params;
        const movies = await Movie.find({}).lean();

        const moviesWithReplacedTitle = movies.map(movie => {
            return {
                ...movie,
                title2: replaceVietnameseCharacters(movie.title.toLowerCase())
            };
        });

        const searchTitle = replaceVietnameseCharacters(title.toLowerCase());

        const result = moviesWithReplacedTitle.filter(movie =>
            movie.title.toLowerCase().includes(searchTitle) ||
            movie.title2.toLowerCase().includes(searchTitle)
        );

        if (result.length === 0) {
            return response.status(404).json({ message: "Không tìm thấy phim nào với tiêu đề đã cho" });
        }

        return response.status(200).json({
            count: result.length,
            data: result
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

router.get('/add-one-view/:id', async(request, response) => {
    try {
        const { id } = request.params;
        const movie = await Movie.findById(id);
        if(movie){
            movie.view += 1;
            const result = await movie.save();
            if(result) return response.status(200).send("add view successfully");
        }
        return response.status(400).send('cant add view');
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

//Lấy dữ liệu phim với id phim
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const movie = await Movie.findById(id);
        return response.status(200).json(movie);
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})
//Lấy dữ liệu phim với path phim
router.get('/path/:path', async (request, response) => {
    try {
        const { path } = request.params;
        const movie = await Movie.findOne({ path: path });
        return response.status(200).json(movie);
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

//Thêm phim mới
router.post('/', async (request, response) => {
    try {
        if (!request.body.title ||
            !request.body.numberOfEpisode ||
            !request.body.duration ||
            !request.body.englishTitle ||
            !request.body.releaseYear ||
            !request.body.path ||
            !request.body.description ||
            !request.body.tag ||
            !request.body.director ||
            !request.body.actor ||
            !request.body.genres ||
            !request.body.quality ||
            !request.body.type ||
            !request.body.series ||
            !request.body.country ||
            !request.body.poster) {
            return response.status(400).send({
                message: 'Send all required fields: ..........................'
            });
        }
        const newMovie = {
            title: request.body.title,
            numberOfEpisode: request.body.numberOfEpisode,
            duration: request.body.duration,
            englishTitle: request.body.englishTitle,
            releaseYear: request.body.releaseYear,
            trailer_url: request.body.trailer_url,
            path: request.body.path,
            description: request.body.description,
            tag: request.body.tag,
            director: request.body.director,
            actor: request.body.actor,
            genres: request.body.genres,
            quality: request.body.quality,
            type: request.body.type,
            series: request.body.series,
            country: request.body.country,
            poster: request.body.poster
        }
        const movie = await Movie.create(newMovie);
        return response.status(201).send(movie);
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

router.put('/:id', async (request, response) => {
    try {
        if (!request.body.title ||
            !request.body.numberOfEpisode ||
            !request.body.duration ||
            !request.body.englishTitle ||
            !request.body.releaseYear ||
            !request.body.path ||
            !request.body.description ||
            !request.body.tag ||
            !request.body.genres ||
            !request.body.quality ||
            !request.body.type ||
            !request.body.series ||
            !request.body.country ||
            !request.body.poster) {
            return response.status(400).send({
                message: 'Send all required fields'
            });
        }

        const data = {
            title: request.body.title,
            numberOfEpisode: request.body.numberOfEpisode,
            duration: request.body.duration,
            englishTitle: request.body.englishTitle,
            releaseYear: request.body.releaseYear,
            trailer_url: request.body.trailer_url,
            path: request.body.path,
            description: request.body.description,
            tag: request.body.tag,
            director: request.body.director, // Gán mảng các đạo diễn đã tách
            actor: request.body.actor, // Gán mảng các diễn viên đã tách
            genres: request.body.genres,
            quality: request.body.quality,
            type: request.body.type,
            series: request.body.series,
            country: request.body.country,
            poster: request.body.poster
        }
        const { id } = request.params;
        const result = await Movie.findByIdAndUpdate(id, data);

        if (!result) return response.status(404).json({ message: "Movie not found" });
        return response.status(200).send({ message: "Movie updated successfully" });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
// Xoá phim
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        // Xoá tất cả các comment trong episode của bộ phim được xoá
        await Comment.deleteMany({ movie: id });
        // Xoá tất cả các episode của bộ phim được xoá
        await Episode.deleteMany({ movie: id });
        await FavoriteMovie.deleteMany({ movie: id });
        // Xoá bộ phim
        const result = await Movie.findByIdAndDelete(id);

        if (!result) return response.status(404).json({ message: "Movie not found" });
        return response.status(200).send({ message: "Movie deleted successfully" });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Xoá tất cả các phim
router.delete('/', async (request, response) => {
    try {
        // Xoá tất cả các comment của tất cả các episode của tất cả các phim
        await Comment.deleteMany({});
        // Xoá tất cả các episode của tất cả các phim
        await Episode.deleteMany({});
        // Xoá tất cả các phim khỏi danh sách yêu thích
        await FavoriteMovie.deleteMany({});
        await WatchHistory.deleteMany({});
        await MovieRating.deleteMany({});
        await ReportComment.deleteMany({});
        await ReportEpisode.deleteMany({});
        // Xoá tất cả các phim
        await Movie.deleteMany({});

        return response.status(200).send({ message: "All movies deleted successfully" });
    }
    catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;