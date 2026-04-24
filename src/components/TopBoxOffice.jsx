import React from 'react';

/**
 * TopBoxOffice Component
 * Demonstrates: List rendering with numeric data and layout structure.
 */
const TopBoxOffice = ({ data }) => {
  return (
    <section className="container">
      <h2>Top Box Office (US) <span>›</span></h2>
      <div className="box-office-list">
        {data.map((item) => (
          <div key={item.id} className="box-office-item">
            <div className="item-rank">{item.rank}</div>
            <div className="item-info">
              <div className="item-title">{item.title}</div>
              <div className="item-gross">{item.gross}</div>
            </div>
            <div className="item-icon">🔖</div>
          </div>
        ))}
      </div>

      <style>{`
        .box-office-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .box-office-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          background: transparent;
          border-bottom: 1px solid #333;
          transition: background 0.2s;
          cursor: pointer;
        }

        .box-office-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .item-rank {
          font-size: 1.2rem;
          font-weight: bold;
          color: var(--imdb-blue);
          width: 40px;
        }

        .item-info {
          flex-grow: 1;
        }

        .item-title {
          font-weight: bold;
          font-size: 1.1rem;
        }

        .item-gross {
          color: var(--imdb-text-dim);
          font-size: 0.9rem;
        }

        .item-icon {
          opacity: 0.5;
        }
      `}</style>
    </section>
  );
};

export default TopBoxOffice;
