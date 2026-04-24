import React, { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w300';

function PopularInterests() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moviesLoading, setMoviesLoading] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.genres) {
          setGenres(data.genres.slice(0, 12)); // Just top 12 for better UI
          if (data.genres.length > 0) {
            setSelectedGenre(data.genres[0]);
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching genres:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      setMoviesLoading(true);
      fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre.id}&sort_by=popularity.desc`)
        .then((response) => response.json())
        .then((data) => {
          if (data.results) {
            setMovies(data.results.slice(0, 10));
          }
          setMoviesLoading(false);
        })
        .catch((error) => {
          console.log('Error fetching movies by genre:', error);
          setMoviesLoading(false);
        });
    }
  }, [selectedGenre]);

  if (loading) {
    return <section className="section"><p className="loading-text">Loading...</p></section>;
  }

  if (genres.length === 0) {
    return (
      <section className="section">
        <div className="container">
          <h2 className="section-title"><span className="title-bar"></span>Popular Interests</h2>
          <p className="loading-text">⚠️ Add your TMDB API key in the .env file to see genres.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section popular-interests">
      <div className="container">
        <h2 className="section-title">
          <span className="title-bar"></span>
          Popular Interests
          <span className="title-sub">Browse by genre</span>
        </h2>

        <div className="genre-list">
          {genres.map((genre) => (
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
          {moviesLoading ? (
            <p className="loading-text">Loading {selectedGenre?.name} movies...</p>
          ) : (
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
          )}
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

