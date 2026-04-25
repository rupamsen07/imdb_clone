import React from 'react';
import Card from './Card';
import { topPicks } from '../data/mockData';

const IMG_URL = 'https://image.tmdb.org/t/p/w300';

function TopPicks() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">
          <span className="title-bar"></span>
          Top Picks
          <span className="title-sub">Movies trending today</span>
        </h2>

        <div className="horizontal-scroll">
          {topPicks.map((movie) => (
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

export default TopPicks;
