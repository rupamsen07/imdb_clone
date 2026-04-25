import React from 'react';


const PopularInterests = ({ interests }) => {
  return (
    <section className="container">
      <h2>Popular Interests</h2>
      <div className="interests-grid">
        {interests.map((interest, index) => (
          <div key={index} className="interest-chip">
            {interest}
          </div>
        ))}
      </div>

      <style>{`
        .interests-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .interest-chip {
          background: var(--imdb-grey);
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          border: 1px solid #444;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
        }

        .interest-chip:hover {
          background: var(--imdb-light-grey);
          border-color: var(--imdb-yellow);
          color: var(--imdb-yellow);
        }
      `}</style>
    </section>
  );
};

export default PopularInterests;
