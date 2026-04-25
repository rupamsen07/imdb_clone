import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Top10List from './components/Top10List';
import TopBoxOffice from './components/TopBoxOffice';
import Footer from './components/Footer';
import Card from './components/Card';
import Hero from './components/Hero';
import MovieModal from './components/MovieModal';
import WishlistPage from './components/WishlistPage';
import TrailerSection from './components/tralier-box';
import SectionHeader from './components/SectionHeader.jsx';
import FeaturedToday from './components/FeaturedToday.jsx';
import CelebrityList from './components/CelebrityList.jsx';
import { featuredToday, popularCelebrities, bornToday, trailers } from './data/mockData.js';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w300';

function App() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('home'); 
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);

  const handleSearch = (query) => {
    if (!query || !query.trim()) return;
    setSearchQuery(query.trim());
    navigate(`/?q=${encodeURIComponent(query.trim())}`);
  };

  useEffect(() => {
    const fetchTop10 = async () => {
      try {
        const pagesToFetch = 13;
        const requests = [];
        for (let i = 1; i <= pagesToFetch; i++) {
          requests.push(
            fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${i}`).then(res => res.json())
          );
        }
        const responses = await Promise.all(requests);
        let allMovies = responses.flatMap(r => r.results || []);
        
        const sortedMovies = allMovies.sort((a, b) => {
          const ratingA = parseFloat(a.vote_average) || 0;
          const ratingB = parseFloat(b.vote_average) || 0;
          return ratingB - ratingA;
        });

        const top10 = sortedMovies.slice(0, 10);
        setTrendingMovies(top10);
        setHeroMovie(top10[0]);
      } catch (err) {
        console.error('Error fetching Top 10 movies:', err);
      }
    };
    fetchTop10();

    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          setTopRatedMovies(data.results.slice(0, 6));
        }
      });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`)
        .then(res => res.json())
        .then(data => {
          if (data.results) {
            setSearchResults(data.results);
          }
          setIsSearching(false);
        })
        .catch(err => {
          console.error(err);
          setIsSearching(false);
        });
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
              <Top10List movies={trendingMovies.map((m, index) => ({
                ...m,
                id: m.id,
                title: m.title,
                rating: m.vote_average.toFixed(1),
                image: 'https://image.tmdb.org/t/p/w500' + m.poster_path,
                rank: index + 1,
                onClick: () => handleCardClick(m)
              }))} />
            </section>

            <section className="section container">
              <h2 className="section-title">Exclusive Trailers <span>Watch the latest clips</span></h2>
              <TrailerSection main={trailers.main} upNext={trailers.upNext} />
            </section>

            <section className="section section-alt">
              <div className="container">
                <h2 className="section-title">Trending Today <span>Movies popular right now</span></h2>
                <div className="trending-grid">
                  {topRatedMovies.map((movie) => (
                    <Card
                      key={movie.id}
                      {...movie}
                      rating={movie.vote_average.toFixed(1)}
                      image={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
                      genres={["Popular", "Trending"]}
                      onClick={() => handleCardClick(movie)}
                    />
                  ))}
                </div>
              </div>
            </section>

            <section className="section container">
              <SectionHeader title="Featured today" subtitle="Top picks from the IMDb editors" />
              <FeaturedToday items={featuredToday} />
            </section>

            <section className="section container">
              <SectionHeader title="Most popular celebrities" />
              <CelebrityList celebrities={popularCelebrities} />
            </section>

            <section className="section container">
              <SectionHeader title="Born today" subtitle="People born on this day" />
              <CelebrityList celebrities={bornToday} isBornToday={true} />
            </section>

            <section className="section container">
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
                    <div className="section-title">Latest News <span>Around the industry</span></div>
                    <div style={{color: '#999', padding: '20px'}}>Fetching industry news...</div>
                  </div>
               </div>
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
        .side-by-side-clean {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
        }
        @media (max-width: 1024px) {
          .side-by-side-clean { grid-template-columns: 1fr; }
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
