import React, { useState, useEffect } from 'react';
import { isWishlisted, toggleWishlist } from '../utils/wishlist';

const Card = (movie) => {
  const { id, title, rating, image, onClick, rank, genres } = movie;
  const [imageError, setImageError] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    setInWishlist(isWishlisted(id));
    
    const handleSync = () => setInWishlist(isWishlisted(id));
    window.addEventListener('wishlistUpdated', handleSync);
    return () => window.removeEventListener('wishlistUpdated', handleSync);
  }, [id]);

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(movie);
  };

  return (
    <div className="card" onClick={onClick} data-movie-id={id}>
      <div className="card-image-container">
        {imageError ? (
          <div className="card-image-placeholder">
            <span className="placeholder-icon">🎬</span>
            <span className="placeholder-title">{title}</span>
          </div>
        ) : (
          <img 
            src={image} 
            alt={title} 
            className="card-image" 
            onError={() => setImageError(true)}
          />
        )}
        
        {rank && (
          <div className="rank-badge">
            {rank}
          </div>
        )}
      </div>
      <div className="card-content">
        <div className="card-header">
          {rating && (
            <div className="card-rating">
              <span className="star-icon">⭐</span>
              {rating}
            </div>
          )}
          {genres && (
            <div className="card-genres">
              {genres.slice(0, 2).map((genre, i) => (
                <span key={i} className="genre-pill">{genre}</span>
              ))}
            </div>
          )}
        </div>
        
        <h3 className="card-title">{title}</h3>
        
        <button 
          className={`watchlist-btn ${inWishlist ? 'active' : ''}`} 
          onClick={handleWishlistToggle}
        >
          {inWishlist ? (
            <><span>✓</span> In Wishlist</>
          ) : (
            <><span>+</span> Watchlist</>
          )}
        </button>
      </div>

      <style>{`
        .card {
          background: var(--bg-card);
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, background 0.3s ease;
          min-width: 200px;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          height: 100%;
        }

        .card:hover {
          background: #252525;
          transform: translateY(-8px);
        }

        .card-image-container {
          aspect-ratio: 2/3;
          overflow: hidden;
          position: relative;
          background: #1a1a1a;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .card:hover .card-image {
          transform: scale(1.05);
        }

        .card-image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          text-align: center;
          background: #1a1a1a;
          color: white;
        }

        .placeholder-icon {
          font-size: 3rem;
          margin-bottom: 0.75rem;
        }

        .placeholder-title {
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.4;
        }

        .rank-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          width: 32px;
          height: 32px;
          background: rgba(0, 0, 0, 0.75);
          border: 1px solid var(--accent-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 14px;
          z-index: 2;
          box-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .card-content {
          padding: 1rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .card-rating {
          font-size: 1rem;
          color: var(--accent-color);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .star-icon {
          font-size: 0.9rem;
        }

        .card-genres {
          display: flex;
          gap: 6px;
        }

        .genre-pill {
          font-size: 0.7rem;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          padding: 2px 8px;
          border-radius: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .card-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .watchlist-btn {
          margin-top: auto;
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: #5799ef;
          width: 100%;
          padding: 10px;
          border-radius: 6px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .watchlist-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .watchlist-btn.active {
          color: var(--accent-color);
        }
      `}</style>
    </div>
  );
};

export default Card;
