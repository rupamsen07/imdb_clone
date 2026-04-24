import React from 'react';

/**
 * Navbar Component
 * Demonstrates: Controlled components, props, and callback functions.
 */
const Navbar = ({ searchQuery, setSearchQuery }) => {
  
  // Handle input change (Controlled component behavior)
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <div className="nav-logo">IMDb</div>
        
        <form className="search-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Search IMDb" 
            value={searchQuery} // Binds input value to state
            onChange={handleChange} // Updates state on change
            className="search-input"
          />
          <button type="submit" className="search-btn">🔍</button>
        </form>

        <div className="nav-links">
          <span>Watchlist</span>
          <span>Sign In</span>
        </div>
      </div>

      <style>{`
        .navbar {
          background: var(--imdb-black);
          height: 60px;
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid #333;
        }

        .nav-content {
          display: flex;
          align-items: center;
          gap: 2rem;
          width: 100%;
        }

        .nav-logo {
          background: var(--imdb-yellow);
          color: var(--imdb-black);
          padding: 4px 10px;
          border-radius: 4px;
          font-weight: 900;
          font-size: 1.2rem;
          cursor: pointer;
        }

        .search-form {
          flex-grow: 1;
          display: flex;
          background: white;
          border-radius: 4px;
          overflow: hidden;
        }

        .search-input {
          flex-grow: 1;
          border: none;
          padding: 8px 12px;
          font-size: 1rem;
          outline: none;
        }

        .search-btn {
          border: none;
          background: white;
          padding: 0 12px;
          cursor: pointer;
          color: #666;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
          font-weight: bold;
          font-size: 0.9rem;
          cursor: pointer;
        }

        @media (max-width: 600px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
