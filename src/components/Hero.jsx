import React from 'react';

const Hero = ({ movie }) => {
  if (!movie) return null;

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <img 
        src={movie.image} 
        alt={movie.title} 
        className="hero-bg" 
      />
      <div className="container hero-content">
        <div className="hero-badge">Featured Today</div>
        <h1 className="hero-title">{movie.title}</h1>
        <div className="hero-meta">
          <span className="hero-rating">⭐ {movie.rating}</span>
          <span className="hero-year">{movie.year}</span>
          <span className="hero-genre">Sci-Fi / Action</span>
        </div>
        <p className="hero-description">{movie.description}</p>
        <div className="hero-actions">
          <button className="hero-btn primary">Watch Trailer</button>
          <button className="hero-btn secondary">+ Watchlist</button>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          height: 70vh;
          min-height: 500px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, #121212 20%, transparent 80%),
                      linear-gradient(to top, #121212 5%, transparent 40%);
          z-index: 0;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 600px;
        }

        .hero-badge {
          display: inline-block;
          background: var(--accent-color);
          color: #000;
          padding: 4px 12px;
          border-radius: 4px;
          font-weight: 800;
          font-size: 0.8rem;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 900;
          margin-bottom: 16px;
          line-height: 1.1;
        }

        .hero-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 24px;
          font-weight: 600;
        }

        .hero-rating {
          color: var(--accent-color);
        }

        .hero-description {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 32px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
        }

        .hero-btn {
          padding: 12px 32px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .hero-btn.primary {
          background: var(--accent-color);
          border: none;
          color: #000;
        }

        .hero-btn.secondary {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
        }

        .hero-btn:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero {
            height: 60vh;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
