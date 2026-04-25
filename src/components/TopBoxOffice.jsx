import React from 'react';


const TopBoxOffice = ({ data }) => {
  return (
    <div className="box-office-container">
      <h2 className="section-title">
        Top Box Office
        <span>Weekend grossing</span>
      </h2>
      <div className="box-office-list">
        {data.map((item, index) => (
          <div key={item.id} className="box-office-item">
            <div className="item-rank-num">{index + 1}</div>
            <div className="item-details">
              <div className="item-title">{item.title}</div>
              <div className="item-gross">{item.gross}</div>
            </div>
            <div className="item-action">
              <span className="bookmark-icon">🔖</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .box-office-container {
          background: var(--bg-secondary);
          padding: 24px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .box-office-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .box-office-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px;
          border-radius: 8px;
          transition: background 0.2s;
          cursor: pointer;
        }

        .box-office-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .item-rank-num {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--accent-color);
          width: 24px;
        }

        .item-details {
          flex: 1;
        }

        .item-title {
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-primary);
        }

        .item-gross {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .bookmark-icon {
          font-size: 1.2rem;
          opacity: 0.5;
          transition: opacity 0.2s;
        }

        .box-office-item:hover .bookmark-icon {
          opacity: 1;
          color: var(--accent-color);
        }
      `}</style>
    </div>
  );
};

export default TopBoxOffice;
