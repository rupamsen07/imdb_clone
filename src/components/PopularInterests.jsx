import React, { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

function PopularInterests() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.genres) {
          setGenres(data.genres);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching genres:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <section className="section"><p className="loading-text">Loading...</p></section>;
  }

  if (genres.length === 0) {
    return (
      <section className="section">
        <div className="container">
          <h2 className="section-title"><span className="title-bar"></span>Popular Interests</h2>
          <p className="loading-text">⚠️ Add your TMDB API key in the .env file to see genres.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">
          <span className="title-bar"></span>
          Popular Interests
          <span className="title-sub">Browse by genre</span>
        </h2>

        <div className="genre-list">
          {genres.map((genre) => (
            <button className="genre-pill" key={genre.id}>
              {genre.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularInterests;
