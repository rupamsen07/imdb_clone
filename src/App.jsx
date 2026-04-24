import React, { useState } from 'react';
import './App.css';

import Header from './components/Header';
import TopPicks from './components/TopPicks';
import FanFavorites from './components/FanFavorites';
import PopularInterests from './components/PopularInterests';
import ExploreStreaming from './components/ExploreStreaming';
import InTheaters from './components/InTheaters';
import Footer from './components/Footer';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearch(query) {
    setSearchQuery(query);
    console.log('User searched for:', query);
  }

  return (
    <div className="app">
      <Header onSearch={handleSearch} />

      <main>
        <TopPicks />
        <FanFavorites />
        <PopularInterests />
        <ExploreStreaming />
        <InTheaters />
      </main>

      <Footer />
    </div>
  );
}

export default App;
