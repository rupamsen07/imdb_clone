import React, { useState } from 'react';
import { topPicks, fanFavorites } from '../data/mockData';

const IMG_URL = 'https://image.tmdb.org/t/p/w300';

const MOCK_GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" }
];

function PopularInterests() {
  const [selectedGenre, setSelectedGenre] = useState(MOCK_GENRES[0]);

  const movies = selectedGenre.id % 2 === 0 ? topPicks : fanFavorites;

  return (
    <section className="section popular-interests">
      <div className="container">
        <h2 className="section-title">
          <span className="title-bar"></span>
          Popular Interests
          <span className="title-sub">Browse by genre</span>
        </h2>

        <div className="genre-list">
          {MOCK_GENRES.map((genre) => (
            <button 
              className={`genre-pill ${selectedGenre?.id === genre.id ? 'active' : ''}`} 
              key={genre.id}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre.name}
            </button>
          ))}
        </div>

        <div className="genre-movies-container">
          <div className="horizontal-scroll">
            {movies.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <div className="card-img-wrap">
                  <img
                    src={movie.poster_path ? IMG_URL + movie.poster_path : 'https://via.placeholder.com/300x450?text=No+Image'}
                    alt={movie.title}
                  />
                </div>
                <div className="card-info">
                  <div className="card-rating">⭐ {movie.vote_average.toFixed(1)}</div>
                  <h3 className="card-name">{movie.title}</h3>
                  <button className="watchlist-btn">+ Watchlist</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .popular-interests {
          margin-top: 40px;
          padding-bottom: 60px;
        }
        .genre-list {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 30px;
        }
        .genre-pill {
          background: #1a1a1a;
          border: 1px solid #333;
          color: #fff;
          padding: 8px 20px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }
        .genre-pill:hover {
          background: #333;
          border-color: #f5c518;
        }
        .genre-pill.active {
          background: #f5c518;
          color: #000;
          border-color: #f5c518;
          font-weight: bold;
        }
        .genre-movies-container {
          min-height: 350px;
        }
      `}</style>
    </section>
  );
}

export default PopularInterests;

