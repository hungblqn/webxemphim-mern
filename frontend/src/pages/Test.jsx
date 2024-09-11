import React from 'react';

const Test = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <header className="bg-blue-700 py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="text-white font-bold text-xl">MovieStream</div>
          <nav>
            <ul className="flex space-x-4">
              <li className="text-white">Home</li>
              <li className="text-white">Movies</li>
              <li className="text-white">TV Shows</li>
              <li className="text-white">My List</li>
            </ul>
          </nav>
          <div className="text-white">Sign In</div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="text-white text-4xl font-bold mb-8">
          Unlimited Movies, TV Shows, and More.
        </div>
        <div className="flex mb-8">
          <input
            type="text"
            placeholder="Search for movies, TV shows, and more"
            className="px-4 py-2 rounded-l-md text-gray-900 w-full"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md">
            Search
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <MovieCard
            title="The Shawshank Redemption"
            genre="Drama"
            year="1994"
          />
          <MovieCard title="The Godfather" genre="Crime" year="1972" />
          <MovieCard title="The Dark Knight" genre="Action" year="2008" />
          {/* Add more MovieCard components as needed */}
        </div>
      </main>

      <footer className="bg-blue-700 py-4 text-white">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>&copy; 2023 MovieStream. All rights reserved.</div>
          <div>
            <ul className="flex space-x-4">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="flex space-x-4">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
      </footer>
    </div>
  );
};

const MovieCard = ({ title, genre, year }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
      <img
        src="https://via.placeholder.com/300x450"
        alt={title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-400">
          {genre} - {year}
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default Test;