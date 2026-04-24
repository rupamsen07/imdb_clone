import React, { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w300';

function TopPicks() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setMovies(data.results.slice(0, 10));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching top picks:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <section className="section"><p className="loading-text">Loading Top Picks...</p></section>;
  }

  if (movies.length === 0) {
    return (
      <section className="section">
        <div className="container">
          <h2 className="section-title">
            <span className="title-bar"></span>
            Top Picks
          </h2>
          <p className="loading-text">⚠️ Add your TMDB API key in the .env file to see movies.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">
          <span className="title-bar"></span>
          Top Picks
          <span className="title-sub">Movies trending today</span>
        </h2>

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
    </section>
  );
}

export default TopPicks;
