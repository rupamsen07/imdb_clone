import React, { useState, useEffect, useRef } from 'react';
import { getWishlist } from '../utils/wishlist';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w92';

function Header({ onSearch, onNavigate }) {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setWishlistCount(getWishlist().length);
    const handleSync = () => setWishlistCount(getWishlist().length);
    window.addEventListener('wishlistUpdated', handleSync);
    return () => window.removeEventListener('wishlistUpdated', handleSync);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchText.length > 2) {
        fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchText}`)
          .then(res => res.json())
          .then(data => {
            if (data.results) {
              setResults(data.results.slice(0, 6));
              setShowDropdown(true);
            }
          })
          .catch(err => console.error(err));
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchText);
    setShowDropdown(false);
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-left">
          <div className="navbar-logo" onClick={() => onNavigate('home')}>
            IMDb
          </div>
          <button className="navbar-menu">
            <span className="menu-icon">☰</span> Menu
          </button>
        </div>

        <div className="navbar-search-container" ref={dropdownRef}>
          <form className="navbar-search" onSubmit={handleSubmit}>
            <div className="search-category">All <span>▼</span></div>
            <input
              type="text"
              className="search-input"
              placeholder="Search IMDb"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onFocus={() => searchText.length > 2 && setShowDropdown(true)}
            />
            <button type="submit" className="search-btn">🔍</button>
          </form>

          {showDropdown && results.length > 0 && (
            <div className="search-dropdown">
              {results.map((movie) => (
                <div key={movie.id} className="dropdown-item" onClick={() => {
                  setSearchText(movie.title);
                  setShowDropdown(false);
                  onSearch(movie.title);
                }}>
                  <img 
                    src={movie.poster_path ? IMG_URL + movie.poster_path : 'https://via.placeholder.com/45x68?text=?'} 
                    alt={movie.title} 
                    className="dropdown-img"
                  />
                  <div className="dropdown-info">
                    <div className="dropdown-title">{movie.title}</div>
                    <div className="dropdown-meta">
                      {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'} • ⭐ {movie.vote_average.toFixed(1)}
                    </div>
                  </div>
                </div>
              ))}
              <div className="dropdown-footer" onClick={handleSubmit}>
                See all results for "{searchText}"
              </div>
            </div>
          )}
        </div>

        <div className="navbar-right">
          <div className="navbar-links">
            <span className="pro-link">IMDbPro</span>
            <span className="divider">|</span>
            <span className="wishlist-link" onClick={() => onNavigate('wishlist')}>
              Wishlist {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
            </span>
          </div>
          <button className="signin-btn">Sign In</button>
        </div>
      </div>

      <style>{`
        .navbar {
          background: #000;
          height: 64px;
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .navbar-inner {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }
        .navbar-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .navbar-logo {
          background: var(--accent-color);
          color: #000;
          padding: 4px 12px;
          border-radius: 4px;
          font-weight: 900;
          font-size: 1.2rem;
          cursor: pointer;
        }
        .navbar-menu {
          background: none;
          border: none;
          color: #fff;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }
        .navbar-search-container {
          flex: 1;
          position: relative;
          max-width: 600px;
        }
        .navbar-search {
          display: flex;
          background: #fff;
          border-radius: 4px;
          height: 36px;
          overflow: hidden;
        }
        .search-category {
          background: #f5f5f5;
          color: #333;
          padding: 0 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          border-right: 1px solid #ddd;
        }
        .search-input {
          flex: 1;
          border: none;
          padding: 0 12px;
          outline: none;
          font-size: 0.95rem;
          color: #000;
        }
        .search-btn {
          background: #fff;
          border: none;
          padding: 0 12px;
          cursor: pointer;
        }
        .search-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          background: #1f1f1f;
          border: 1px solid #333;
          border-radius: 8px;
          z-index: 1000;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
          overflow: hidden;
        }
        .dropdown-item {
          display: flex;
          padding: 10px;
          gap: 12px;
          cursor: pointer;
          transition: background 0.2s;
          border-bottom: 1px solid #2a2a2a;
        }
        .dropdown-item:hover { background: #2a2a2a; }
        .dropdown-img {
          width: 45px;
          height: 68px;
          object-fit: cover;
          border-radius: 4px;
        }
        .dropdown-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .dropdown-title {
          font-weight: bold;
          font-size: 0.95rem;
          color: #fff;
          margin-bottom: 4px;
        }
        .dropdown-meta { font-size: 0.8rem; color: #999; }
        .dropdown-footer {
          padding: 12px;
          text-align: center;
          font-size: 0.9rem;
          font-weight: bold;
          color: #5799ef;
          cursor: pointer;
          background: #1a1a1a;
        }
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 16px;
          font-weight: 700;
          font-size: 0.9rem;
        }
        .divider { color: rgba(255,255,255,0.2); }
        .pro-link { color: #fff; }
        .wishlist-link {
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .wishlist-badge {
          background: var(--accent-color);
          color: #000;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 800;
        }
        .signin-btn {
          background: none;
          border: none;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
        }
        @media (max-width: 1024px) {
          .navbar-links, .navbar-menu { display: none; }
        }
      `}</style>
    </header>
  );
}

export default Header;
