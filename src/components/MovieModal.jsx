import React, { useState, useEffect } from 'react';
import { isWishlisted, toggleWishlist } from '../utils/wishlist';

const MovieModal = ({ movie, onClose }) => {
  const [showFullPlot, setShowFullPlot] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    if (movie) {
      setInWishlist(isWishlisted(movie.id));
    }
    
    const handleSync = () => {
      if (movie) setInWishlist(isWishlisted(movie.id));
    };
    
    window.addEventListener('wishlistUpdated', handleSync);
    
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('wishlistUpdated', handleSync);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(movie);
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="modal-panel">
          <div className="modal-left">
            <img 
              src={movie.image} 
              alt={movie.title} 
              className="modal-poster"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="modal-poster-placeholder" style={{display: 'none'}}>
              🎬 {movie.title}
            </div>
          </div>
          
          <div className="modal-right">
            <h2 className="modal-title">{movie.title}</h2>
            
            <div className="modal-meta">
              <span>{movie.year}</span>
              <span className="dot">·</span>
              <span>{movie.runtime || '2h 10m'}</span>
              <span className="dot">·</span>
              <span className="age-rating">PG-13</span>
            </div>
            
            <div className="modal-rating">
              <span className="star">⭐</span>
              <span className="rating-val">{movie.rating}</span>
              <span className="rating-max">/10</span>
              <span className="vote-count">(25.4K)</span>
            </div>
            
            <div className="modal-genres">
              {movie.genres?.map(g => (
                <span key={g} className="genre-pill">{g}</span>
              )) || <span className="genre-pill">Action</span>}
            </div>
            
            <div className="modal-plot-container">
              <p className={`modal-plot ${showFullPlot ? 'expanded' : ''}`}>
                {movie.description || movie.plot || 'No synopsis available for this title.'}
              </p>
              <button 
                className="show-more-btn" 
                onClick={() => setShowFullPlot(!showFullPlot)}
              >
                {showFullPlot ? 'Show less' : 'Show more'}
              </button>
            </div>
            
            <div className="modal-info-row">
              <span className="label">Director</span>
              <span className="value">Christopher Nolan</span>
            </div>
            
            <div className="modal-info-row">
              <span className="label">Cast</span>
              <span className="value muted">Christian Bale, Heath Ledger, Aaron Eckhart</span>
            </div>
            
            <div className="modal-actions">
              <button className="watch-trailer-btn">▶ Watch Trailer</button>
              <button 
                className={`modal-wishlist-btn ${inWishlist ? 'active' : ''}`}
                onClick={handleWishlistClick}
              >
                {inWishlist ? '✓ In Wishlist' : '+ Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.92);
          backdrop-filter: blur(4px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow-y: auto;
          animation: modalFadeIn 200ms ease;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }

        .modal-content {
          position: relative;
          width: 90%;
          max-width: 900px;
          background: #1c1c1c;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: #fff;
          font-size: 32px;
          cursor: pointer;
          z-index: 10;
          line-height: 1;
        }

        .modal-panel {
          display: flex;
        }

        .modal-left {
          width: 300px;
          flex-shrink: 0;
          background: #000;
        }

        .modal-poster {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .modal-poster-placeholder {
          height: 450px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
          background: #1a1a1a;
          color: #fff;
          font-weight: 700;
        }

        .modal-right {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .modal-title {
          font-size: 28px;
          font-weight: 500;
          color: #fff;
          margin: 0;
        }

        .modal-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-secondary);
          font-size: 14px;
        }

        .age-rating {
          border: 1px solid rgba(255,255,255,0.2);
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 12px;
        }

        .dot {
          opacity: 0.3;
        }

        .modal-rating {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rating-val {
          font-size: 20px;
          font-weight: 700;
          color: var(--accent-color);
        }

        .rating-max {
          font-size: 14px;
          color: #666;
        }

        .vote-count {
          font-size: 12px;
          color: #666;
        }

        .modal-genres {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .genre-pill {
          background: rgba(255,255,255,0.05);
          color: var(--text-secondary);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
        }

        .modal-plot {
          font-size: 14px;
          line-height: 1.7;
          color: #aaaaaa;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .modal-plot.expanded {
          display: block;
          overflow: visible;
        }

        .show-more-btn {
          background: none;
          border: none;
          color: var(--accent-color);
          font-size: 14px;
          cursor: pointer;
          padding: 0;
          margin-top: 4px;
          font-weight: 600;
        }

        .modal-info-row {
          display: flex;
          gap: 12px;
          font-size: 14px;
        }

        .modal-info-row .label {
          font-weight: 700;
          color: #fff;
          width: 80px;
        }

        .modal-info-row .value.muted {
          color: #888;
        }

        .modal-actions {
          display: flex;
          gap: 16px;
          margin-top: 20px;
        }

        .watch-trailer-btn {
          background: var(--accent-color);
          color: #000;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          flex: 1;
        }

        .modal-wishlist-btn {
          background: rgba(255,255,255,0.05);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          flex: 1;
        }

        .modal-wishlist-btn.active {
          color: var(--accent-color);
        }

        @media (max-width: 768px) {
          .modal-panel {
            flex-direction: column;
          }
          .modal-left {
            width: 100%;
            height: 300px;
          }
          .modal-right {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default MovieModal;
