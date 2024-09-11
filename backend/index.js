import express from "express";
import cors from 'cors';
import { PORT, mongoDBURL, FEAddress } from './config.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

//Routes
import genreRoute from './routes/genreRoute.js';
import countryRoute from './routes/countryRoute.js';
import movieRoute from './routes/movieRoute.js';
import episodeRoute from './routes/episodeRoute.js';
import accountRoute from './routes/accountRoute.js';
import commentRoute from './routes/commentRoute.js';
import reportCommentRoute from './routes/reportCommentRoute.js';
import reportEpisodeRoute from './routes/reportEpisodeRoute.js';
import favoriteMovieRoute from './routes/favoriteMovieRoute.js';
import movieRatingRoute from './routes/movieRatingRoute.js';
import watchHistoryRoute from './routes/watchHistoryRoute.js';

const app = express();
// Sử dụng middleware để xử lý JSON và giới hạn dung lượng của request lên đến 1MB
app.use(bodyParser.json({ limit: '5mb' }));

// Sử dụng CORS middleware để cho phép các yêu cầu từ origin http://localhost:5173
app.use(cors({
    origin: [`${FEAddress}`, 'https://ophim1.com/phim'],  // Update this with your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Sử dụng middleware để xử lý cookie
app.use(cookieParser());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send(`Chào mừng đến với web của hungblqn`);
});

// Sử dụng các router đã được định nghĩa
app.use('/genre', genreRoute);
app.use('/country', countryRoute);
app.use('/movie', movieRoute);
app.use('/episode', episodeRoute);
app.use('/account', accountRoute);
app.use('/comment', commentRoute);
app.use('/reportComment', reportCommentRoute);
app.use('/reportEpisode', reportEpisodeRoute);
app.use('/favoriteMovie', favoriteMovieRoute);
app.use('/movieRating', movieRatingRoute);
app.use('/watchHistory', watchHistoryRoute);

// Kết nối đến MongoDB và khởi động máy chủ backend
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Đã kết nối với MongoDB');
        app.listen(PORT, () => {
            console.log(`Server backend đang chạy ở cổng ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });