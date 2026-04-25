import React from 'react';
import { topPicks } from '../data/mockData';

const IMG_URL = 'https://image.tmdb.org/t/p/w300';

function InTheaters() {
  const movies = topPicks;

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">
          <span className="title-bar"></span>
          In Theaters
          <span className="title-sub">Now playing near you</span>
        </h2>

        <div className="horizontal-scroll">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <div className="card-img-wrap">
                <img
                  src={movie.poster_path ? IMG_URL + movie.poster_path : 'https://via.placeholder.com/300x450?text=No+Image'}
                  alt={movie.title}
                />
                <span className="theater-badge">🎬 In Theaters</span>
              </div>
              <div className="card-info">
                <div className="card-rating">⭐{movie.vote_average.toFixed(1)}</div>
                <h3 className="card-name">{movie.title}</h3>
                <p className="card-date">{movie.release_date}</p>
                <button className="watchlist-btn">+ Watchlist</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InTheaters;
