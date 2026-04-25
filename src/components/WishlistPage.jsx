import React, { useState, useEffect } from 'react';
import { getWishlist, removeFromWishlist } from '../utils/wishlist';
import Card from './Card';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(getWishlist());
    
    const handleSync = () => setWishlist(getWishlist());
    window.addEventListener('wishlistUpdated', handleSync);
    return () => window.removeEventListener('wishlistUpdated', handleSync);
  }, []);

  const handleRemove = (id) => {
    removeFromWishlist(id);
  };

  return (
    <div className="wishlist-page container section">
      <h1 className="wishlist-title">
        My Wishlist <span className="count">({wishlist.length})</span>
      </h1>
      
      {wishlist.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📂</div>
          <h2>Your wishlist is empty.</h2>
          <p>Start adding movies to see them here!</p>
          <button className="back-btn" onClick={() => window.location.href = '/'}>
            Browse Movies
          </button>
        </div>
      ) : (
        <div className="trending-grid">
          {wishlist.map(movie => (
            <div key={movie.id} className="wishlist-item-wrapper">
              <Card {...movie} />
              <button 
                className="remove-from-wishlist-btn"
                onClick={() => handleRemove(movie.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .wishlist-title {
          font-size: 2.5rem;
          margin-bottom: 40px;
          color: #fff;
        }

        .wishlist-title .count {
          color: var(--text-secondary);
          font-weight: 400;
          font-size: 1.5rem;
        }

        .empty-state {
          text-align: center;
          padding: 80px 0;
          color: var(--text-secondary);
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 24px;
          opacity: 0.5;
        }

        .empty-state h2 {
          color: #fff;
          margin-bottom: 12px;
        }

        .back-btn {
          margin-top: 32px;
          background: var(--accent-color);
          color: #000;
          border: none;
          padding: 12px 32px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }

        .wishlist-item-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .remove-from-wishlist-btn {
          background: #ff4444;
          color: #fff;
          border: none;
          padding: 8px;
          border-radius: 4px;
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s;
        }

        .remove-from-wishlist-btn:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default WishlistPage;
