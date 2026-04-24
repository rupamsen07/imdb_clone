import React from 'react';

/**
 * Card Component
 * A reusable UI component to display movie or news information.
 * Demonstrates: Props usage and JSX expressions.
 */
const Card = ({ title, subTitle, rating, image, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-image-container">
        <img src={image} alt={title} className="card-image" />
      </div>
      <div className="card-content">
        {/* Conditional rendering for rating if it exists */}
        {rating && (
          <div className="card-rating">
            <span className="star-icon">⭐</span>
            {rating}
          </div>
        )}
        <h3 className="card-title">{title}</h3>
        {subTitle && <p className="card-subtitle">{subTitle}</p>}
        
        <button className="watchlist-btn">
          <span>+</span> Watchlist
        </button>
      </div>

      <style>{`
        .card {
          background: var(--imdb-grey);
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
          min-width: 180px;
          display: flex;
          flex-direction: column;
        }

        .card:hover {
          background: var(--imdb-light-grey);
          transform: translateY(-4px);
        }

        .card-image-container {
          aspect-ratio: 2/3;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-content {
          padding: 0.75rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .card-rating {
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .star-icon {
          color: var(--imdb-yellow);
        }

        .card-title {
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-subtitle {
          font-size: 0.85rem;
          color: var(--imdb-text-dim);
          margin-bottom: 1rem;
        }

        .watchlist-btn {
          margin-top: auto;
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: var(--imdb-blue);
          width: 100%;
          padding: 0.5rem;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }

        .watchlist-btn:hover {
          background: rgba(255, 255, 255, 0.12);
        }
      `}</style>
    </div>
  );
};

export default Card;
