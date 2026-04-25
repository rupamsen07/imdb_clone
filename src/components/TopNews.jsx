import React from 'react';

const TopNews = ({ news }) => {
  return (
    <>
      <div className="section-title">Latest News <span>Around the industry</span></div>
      <div className="news-list">
        {news.map((item) => (
          <div className="news-item" key={item.id} onClick={() => console.log(`Reading news: ${item.title}`)}>
            <div className="news-dot"></div>
            <div className="news-content">
              <div className="news-headline">{item.title}</div>
              <div className="news-meta">{item.source} • {item.date}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopNews;
