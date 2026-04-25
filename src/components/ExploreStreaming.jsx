import React from 'react';
import { topPicks, fanFavorites } from '../data/mockData';

const IMG_URL = 'https://image.tmdb.org/t/p/w300';

function ExploreStreaming() {
  const movies = [...topPicks.slice(4, 8), ...fanFavorites.slice(4, 8)];

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
