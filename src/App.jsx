import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedToday from './components/FeaturedToday.jsx';
import TopPicks from './components/TopPicks';
import FanFavorites from './components/FanFavorites';
import ExploreStreaming from './components/ExploreStreaming';
import Top10List from './components/Top10List';
import CelebrityList from './components/CelebrityList.jsx';
import InTheaters from './components/InTheaters';
import TopBoxOffice from './components/TopBoxOffice';
import PopularInterests from './components/PopularInterests';
import Footer from './components/Footer';
import Card from './components/Card';
import MovieModal from './components/MovieModal';
import WishlistPage from './components/WishlistPage';
import SectionHeader from './components/SectionHeader.jsx';
import { featuredToday, popularCelebrities, bornToday, trailers, topPicks, fanFavorites } from './data/mockData.js';
import TrailerSection from './components/tralier-box.jsx';
import TopNews from './components/TopNews.jsx';

function App() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('home');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState(fanFavorites);
  const [topRatedMovies, setTopRatedMovies] = useState(topPicks.slice(0, 6));
  const [heroMovie, setHeroMovie] = useState(topPicks[0]);

  const handleSearch = (query) => {
    if (!query || !query.trim()) return;
    setSearchQuery(query.trim());
    navigate(`/?q=${encodeURIComponent(query.trim())}`);
  };

  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      const queryLower = searchQuery.toLowerCase();
      const allMovies = [...topPicks, ...fanFavorites];
      const results = allMovies.filter(m => m.title.toLowerCase().includes(queryLower));
      
      setTimeout(() => {
        setSearchResults(results);
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const handleCardClick = (movie) => {
    setSelectedMovie({
      ...movie,
      image: movie.image || (movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : 'https://via.placeholder.com/300x450?text=No+Image'),
      description: movie.overview || movie.description
    });
  };

  const onNavigate = (view) => {
    setActiveView(view);
    setSearchQuery('');
    window.scrollTo(0, 0);
    navigate(view === 'home' ? '/' : '/wishlist');
  };

  return (
    <div className="app">
      <Header onSearch={handleSearch} onNavigate={onNavigate} />

      <main>
        {activeView === 'wishlist' ? (
          <WishlistPage />
        ) : searchQuery ? (
          <section className="section container">
            <h2 className="section-title">Results for "{searchQuery}"</h2>
            {isSearching ? (
              <p className="loading-text">Searching...</p>
            ) : searchResults.length > 0 ? (
              <div className="trending-grid">
                {searchResults.map((movie) => (
                  <Card
                    key={movie.id}
                    {...movie}
                    rating={movie.vote_average?.toFixed(1) || 'N/A'}
                    image={movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : 'https://via.placeholder.com/300x450?text=No+Image'}
                    onClick={() => handleCardClick(movie)}
                  />
                ))}
              </div>
            ) : (
              <p className="loading-text">No results found for "{searchQuery}".</p>
            )}
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>Back to Home</button>
          </section>
        ) : (
          <>
            {heroMovie && (
              <Hero
                movie={{
                  ...heroMovie,
                  title: heroMovie.title,
                  rating: heroMovie.vote_average.toFixed(1),
                  year: heroMovie.release_date?.split('-')[0],
                  image: 'https://image.tmdb.org/t/p/original' + heroMovie.backdrop_path,
                  description: heroMovie.overview
                }}
              />
            )}

            <section className="section container">
              <SectionHeader title="Featured today" subtitle="Top picks from the IMDb editors" />
              <FeaturedToday items={featuredToday} />
            </section>

            <section className="section section-alt">
              <div className="container">
                <div className="what-to-watch-label">What to Watch</div>
                <TopPicks />
              </div>
            </section>

            <section className="section container">
              <FanFavorites />
            </section>

            <section className="section section-alt">
              <div className="container">
                <h2 className="section-title">Exclusive Videos <span>Watch the latest trailers and clips</span></h2>
                <TrailerSection main={trailers.main} upNext={trailers.upNext} />
              </div>
            </section>

            <section className="section container">
              <ExploreStreaming />
            </section>

            <section className="section section-alt">
              <div className="container">
                <Top10List movies={trendingMovies.map((m, index) => ({
                  ...m,
                  id: m.id,
                  title: m.title,
                  rating: m.vote_average.toFixed(1),
                  image: 'https://image.tmdb.org/t/p/w500' + m.poster_path,
                  rank: index + 1,
                  onClick: () => handleCardClick(m)
                }))} />
              </div>
            </section>

            <section className="section container">
              <SectionHeader title="Most popular celebrities" />
              <CelebrityList celebrities={popularCelebrities} />
            </section>

            <section className="section section-alt">
              <div className="container">
                <SectionHeader title="Born today" subtitle="People born on this day" />
                <CelebrityList celebrities={bornToday} isBornToday={true} />
              </div>
            </section>

            <section className="section container">
              <InTheaters />
            </section>

            <section className="section section-alt">
              <div className="container">
                <div className="side-by-side-clean">
                  <div className="box-office-wrapper">
                    <TopBoxOffice data={[
                      { id: 1, title: "Dune: Part Two", gross: "$711M" },
                      { id: 2, title: "Kung Fu Panda 4", gross: "$541M" },
                      { id: 3, title: "Godzilla x Kong", gross: "$567M" },
                      { id: 4, title: "Civil War", gross: "$122M" },
                      { id: 5, title: "The Fall Guy", gross: "$170M" }
                    ]} />
                  </div>
                  <div className="news-wrapper">
                    <TopNews news={[
                      { id: 1, title: "Marvel Studios Announces New Fantastic Four Cast", date: "April 23, 2024", source: "Variety", image: "https://via.placeholder.com/300x170?text=News" },
                      { id: 2, title: "Joker: Folie à Deux Trailer Breaks Records", date: "April 22, 2024", source: "The Hollywood Reporter", image: "https://via.placeholder.com/300x170?text=News" },
                      { id: 3, title: "Everything We Know About House of the Dragon Season 2", date: "April 21, 2024", source: "IMDb News", image: "https://via.placeholder.com/300x170?text=News" }
                    ]} />
                  </div>
                </div>
              </div>
            </section>

            <section className="section container">
              <PopularInterests />
            </section>
          </>
        )}
      </main>

      <Footer />

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <style>{`
        .what-to-watch-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--accent-color);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }
        .trailer-hero-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }
        .trailer-main {
          border-radius: 12px;
          overflow: hidden;
          background: var(--bg-card);
          cursor: pointer;
        }
        .trailer-main-img-wrap {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
        }
        .trailer-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s;
        }
        .trailer-main:hover .trailer-main-img {
          transform: scale(1.03);
        }
        .trailer-play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.25);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .trailer-main:hover .trailer-play-overlay {
          opacity: 1;
        }
        .trailer-play-btn {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(0,0,0,0.7);
          border: 2px solid #fff;
          color: #fff;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 4px;
        }
        .trailer-main-duration {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(0,0,0,0.8);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .trailer-main-info {
          padding: 16px;
        }
        .trailer-main-title {
          font-size: 1.3rem;
          font-weight: 800;
          margin-bottom: 4px;
        }
        .trailer-main-subtitle {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        .trailer-sidebar {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .trailer-sidebar-header {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--accent-color);
          padding-bottom: 8px;
          border-bottom: 2px solid var(--accent-color);
        }
        .trailer-sidebar-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: var(--bg-card);
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: background 0.2s;
        }
        .trailer-sidebar-item:hover {
          background: #2a2a2a;
        }
        .trailer-sidebar-thumb {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
        }
        .trailer-sidebar-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .trailer-sidebar-duration {
          position: absolute;
          bottom: 4px;
          right: 4px;
          background: rgba(0,0,0,0.8);
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 3px;
        }
        .trailer-sidebar-info {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 10px 10px;
        }
        .trailer-sidebar-play {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #333;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          flex-shrink: 0;
        }
        .trailer-sidebar-item:hover .trailer-sidebar-play {
          background: var(--accent-color);
          color: #000;
        }
        .trailer-sidebar-title {
          font-size: 0.85rem;
          font-weight: 700;
          line-height: 1.2;
        }
        .trailer-sidebar-sub {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-top: 2px;
        }
        .news-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 24px;
        }
        .news-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          background: var(--bg-card);
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .news-item:hover {
          background: #2a2a2a;
        }
        .news-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-color);
          margin-top: 6px;
          flex-shrink: 0;
        }
        .news-headline {
          font-weight: 700;
          font-size: 0.95rem;
          margin-bottom: 4px;
        }
        .news-meta {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .side-by-side-clean {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
        }
        @media (max-width: 1024px) {
          .side-by-side-clean { grid-template-columns: 1fr; }
          .trailer-hero-layout { grid-template-columns: 1fr; }
        }
        .clear-search-btn {
          margin-top: 30px;
          background: #333;
          color: #fff;
          border: 1px solid #444;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.2s;
        }
        .clear-search-btn:hover { background: #444; }
      `}</style>
    </div>
  );
}

export default App;
