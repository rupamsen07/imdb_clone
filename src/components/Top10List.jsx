import React from 'react';
import Card from './Card';

/**
 * Top10List Component
 * Demonstrates: Rendering arrays using .map(), props, and basic event handling.
 */
const Top10List = ({ movies }) => {
  return (
    <div className="top-10-section">
      <h2 className="section-title">
        Top 10 on IMDb This Week
        <span>Movies everyone is watching</span>
      </h2>
      <div className="horizontal-scroll">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <Card
              key={movie.id}
              {...movie}
              rank={index + 1}
              onClick={movie.onClick}
            />
          ))
        ) : (
          <p className="no-results">No movies found matching your search.</p>
        )}
      </div>

      <style>{`
        .top-10-section {
          width: 100%;
        }

        .horizontal-scroll {
          display: flex !important;
          align-items: stretch !important;
          gap: 24px;
          overflow-x: auto;
          padding: 20px 0;
          scrollbar-width: none;
        }

        .horizontal-scroll::-webkit-scrollbar {
          display: none;
        }

        /* Lock Card Height */
        .horizontal-scroll .card {
          height: 420px !important;
          width: 220px !important;
          flex-shrink: 0 !important;
          display: flex !important;
          flex-direction: column !important;
          margin-bottom: 0 !important;
        }

        /* Lock Poster Height */
        .horizontal-scroll .card-image-container {
          height: 280px !important;
          width: 100% !important;
          flex-shrink: 0 !important;
          overflow: hidden !important;
        }

        .horizontal-scroll .card-image {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center top !important;
        }

        /* Lock Content Area Height */
        .horizontal-scroll .card-content {
          height: 140px !important;
          padding: 12px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          flex-grow: 0 !important;
          flex-shrink: 0 !important;
        }

        .horizontal-scroll .card-title {
          font-size: 1rem !important;
          margin: 4px 0 !important;
          display: -webkit-box !important;
          -webkit-line-clamp: 2 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden !important;
          line-height: 1.3 !important;
        }

        .horizontal-scroll .watchlist-btn {
          margin-top: auto !important;
        }

        .no-results {
          color: var(--text-secondary);
          padding: 2rem 0;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Top10List;
