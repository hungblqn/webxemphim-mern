import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FilmDetails from './pages/FilmDetails';
import MovieDetails from './pages/MovieDetails';

import WatchMovie from './pages/WatchMovie';
import Dashboard from './pages/Admin/Dashboard';
import AddEpisode from './pages/Admin/Movie/AddEpisode';
import ListEpisodeOfMovie from './pages/Admin/Movie/ListEpisodeOfMovie';

import EditGenre from './pages/Admin/Genre/EditGenre';

import EditCountry from './pages/Admin/Country/EditCountry';

import EditMovie from './pages/Admin/Movie/EditMovie';

import EditEpisode from './pages/Admin/Movie/EditEpisode';

import EditAccount from './pages/Admin/Account/EditAccount';


import SignUp from './pages/SignUp';
import Login from './pages/Login';

import SearchMovie from './pages/SearchMovie';

import Test from './pages/Test';

import ListSingleMovie from './pages/ListSingleMovie';
import ListSeriesMovie from './pages/ListSeriesMovie';
import ListMovieByGenre from './pages/ListMovieByGenre';
import ListMovieByCountry from './pages/ListMovieByCountry';

import FavoriteMovie from './pages/FavoriteMovie';
import WatchHistory from './pages/WatchHistory';

import UserProfileUpdate from './pages/UserProfileUpdate';
import LoadingScreen from './pages/LoadingScreen';

const App = () => {
  return (
    <Routes>
      {/*For administrator*/}
      <Route path='/admin' element={<Dashboard />} />
      <Route path='/movie/addepisode/:id' element={<AddEpisode />} />
      <Route path='/movie/listepisode/:id' element={<ListEpisodeOfMovie />} />

      <Route path='/genre/edit/:id' element={<EditGenre />} />
      <Route path='/country/edit/:id' element={<EditCountry />} />
      <Route path='/movie/edit/:id' element={<EditMovie />} />
      <Route path='/episode/edit/:id' element={<EditEpisode />} />
      <Route path='/account/edit/:id' element={<EditAccount />} />


      {/*Main*/}

      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />

      <Route path='/search' element={<SearchMovie />} />

      {/*Liệt kê phim mặc định */}
      <Route path='/' element={<Home />} />
      {/*Liệt kê phim theo phim lẻ & phim bộ */}
      <Route path='/phim-le' element={<ListSingleMovie />} />
      <Route path='/phim-bo' element={<ListSeriesMovie />} />

      {/*Liệt kê phim theo thể loại & quốc gia */}
      <Route path='/the-loai/:genre' element={<ListMovieByGenre />} />
      <Route path='/quoc-gia/:country' element={<ListMovieByCountry />} />

      <Route path='/phim' element={<FilmDetails />} />
      <Route path='/phim/:path' element={<MovieDetails />} />
      <Route path='/xem-phim/:moviePath/:episodePath' element={<WatchMovie />} />

      <Route path='/phim-yeu-thich' element={<FavoriteMovie />} />
      <Route path='/lich-su-xem-phim' element={<WatchHistory/>}/>

      <Route path='/cap-nhat-ho-so' element={<UserProfileUpdate />} />

      {/*Test UI */}
      <Route path='/test' element={<Test />} />
      <Route path='/loading' element = {<LoadingScreen/>}/>


    </Routes>
  )
}

export default App