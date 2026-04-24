import React, { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w300';

function ExploreStreaming() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=2`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setMovies(data.results.slice(0, 8));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching streaming:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <section className="section"><p className="loading-text">Loading Streaming...</p></section>;
  }

  if (movies.length === 0) {
    return (
      <section className="section">
        <div className="container">
          <h2 className="section-title"><span className="title-bar"></span>Explore What's Streaming</h2>
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
          Explore What's Streaming
          <span className="title-sub">Popular right now</span>
        </h2>

        <div className="streaming-grid">
          {movies.map((movie) => (
            <div className="streaming-card" key={movie.id}>
              <img
                src={movie.backdrop_path ? IMG_URL + movie.backdrop_path : 'https://via.placeholder.com/300x170?text=No+Image'}
                alt={movie.title}
                className="streaming-img"
              />
              <div className="streaming-info">
                <h3 className="streaming-name">{movie.title}</h3>
                <p className="streaming-overview">
                  {movie.overview.length > 80
                    ? movie.overview.slice(0, 80) + '...'
                    : movie.overview}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExploreStreaming;
