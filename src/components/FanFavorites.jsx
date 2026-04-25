import React from 'react';
import Card from './Card';
import { fanFavorites } from '../data/mockData';

const IMG_URL = 'https://image.tmdb.org/t/p/w300';

function FanFavorites() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">
          <span className="title-bar"></span>
          Fan Favorites
          <span className="title-sub">Top rated by IMDb users</span>
        </h2>

        <div className="horizontal-scroll">
          {fanFavorites.map((movie) => (
            <Card
              key={movie.id}
              title={movie.title}
              rating={movie.vote_average.toFixed(1)}
              image={movie.poster_path ? IMG_URL + movie.poster_path : 'https://via.placeholder.com/300x450?text=No+Image'}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FanFavorites;
