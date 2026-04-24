import React, { useState } from 'react';

function Header({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  function handleChange(e) {
    setSearchText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchText);
  }

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">IMDb</div>

        <button className="header-menu-btn">☰ Menu</button>

        <form className="header-search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search IMDb"
            value={searchText}
            onChange={handleChange}
            className="header-search-input"
          />
          <button type="submit" className="header-search-btn">🔍</button>
        </form>

        <div className="header-links">
          <span className="header-link">IMDb<span className="pro-text">Pro</span></span>
          <span className="header-divider">|</span>
          <span className="header-link">Watchlist</span>
          <span className="header-link">Sign In</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
