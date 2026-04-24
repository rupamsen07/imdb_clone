import React from 'react';
import Card from './Card';

/**
 * TopNews Component
 * Demonstrates: Reusing the Card component with different props.
 */
const TopNews = ({ news }) => {
  return (
    <section className="container">
      <h2>Top News</h2>
      <div className="card-grid">
        {news.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            subTitle={`${item.date} • ${item.source}`}
            image={item.image}
            onClick={() => console.log(`Reading news: ${item.title}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default TopNews;
