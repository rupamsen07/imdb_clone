import React, { useState, useEffect } from 'react';
import './App.css';

// Importing components
import Navbar from './components/Navbar';
import Top10List from './components/Top10List';
import PopularInterests from './components/PopularInterests';
import TopBoxOffice from './components/TopBoxOffice';
import TopNews from './components/TopNews';
import Footer from './components/Footer';

// Importing mock data
import { mockMovies, mockBoxOffice, mockNews, popularInterests } from './data/mockData';

/**
 * App Component
 * The main container for our IMDb clone.
 * Demonstrates: useState, useEffect, sharing state, and controlled components.
 */
function App() {
  // 1. State (useState)
  // Why normal variables don't work: React only re-renders when state or props change.
  // If we used a let variable, updating it wouldn't trigger a visual update in the browser.
  const [movies, setMovies] = useState([]);
  const [boxOffice, setBoxOffice] = useState([]);
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 2. useEffect (Fetching Mock Data)
  // Runs once on component mount due to the empty dependency array []
  useEffect(() => {
    console.log("App mounted: Fetching data...");
    
    // Simulating an API fetch
    const timer = setTimeout(() => {
      setMovies(mockMovies);
      setBoxOffice(mockBoxOffice);
      setNews(mockNews);
      setIsLoading(false);
    }, 800); // 800ms delay to simulate network latency

    // Cleanup function: runs when component unmounts
    return () => {
      console.log("App unmounting: Cleaning up...");
      clearTimeout(timer);
    };
  }, []);

  // 3. Derived State / Filtering
  // Filtering movies based on search query
  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtering news based on search query
  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loader">IMDb</div>
        <p>Loading your favorite movies...</p>
        <style>{`
          .loading-screen {
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: var(--imdb-black);
          }
          .loader {
            background: var(--imdb-yellow);
            color: var(--imdb-black);
            padding: 10px 20px;
            font-weight: 900;
            font-size: 2rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            animation: pulse 1.5s infinite;
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* 4. Sharing State: Passing state and setter to Navbar (Parent -> Child) */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main>
        {/* 5. Passing filtered data to components */}
        <Top10List movies={filteredMovies} />
        
        <PopularInterests interests={popularInterests} />
        
        <div className="container grid-split">
          <TopNews news={filteredNews} />
          <TopBoxOffice data={boxOffice} />
        </div>
      </main>

      <Footer />

      <style>{`
        .grid-split {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          align-items: start;
        }

        @media (max-width: 992px) {
          .grid-split {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
