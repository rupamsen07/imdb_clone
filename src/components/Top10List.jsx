import React from 'react';
import Card from './Card';

/**
 * Top10List Component
 * Demonstrates: Rendering arrays using .map(), props, and basic event handling.
 */
const Top10List = ({ movies }) => {
  return (
    <section className="container">
      <h2>Top 10 on IMDb This Week <span>›</span></h2>
      <div className="horizontal-scroll">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <div key={movie.id} className="top-10-item">
              <span className="rank-number">{index + 1}</span>
              <Card 
                title={movie.title}
                rating={movie.rating}
                image={movie.image}
                onClick={() => alert(`You clicked on ${movie.title}`)}
              />
            </div>
          ))
        ) : (
          <p className="no-results">No movies found matching your search.</p>
        )}
      </div>

      <style>{`
        .top-10-item {
          position: relative;
        }

        .rank-number {
          position: absolute;
          left: -10px;
          bottom: 10px;
          font-size: 5rem;
          font-weight: 900;
          color: rgba(0, 0, 0, 0.8);
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.5);
          z-index: 1;
          pointer-events: none;
          line-height: 1;
        }

        .no-results {
          color: var(--imdb-text-dim);
          padding: 2rem 0;
        }
      `}</style>
    </section>
  );
};

export default Top10List;
