import React, { useRef } from 'react';

const FeaturedToday = ({ items }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/carousel">
      {/* Scroll Arrows */}
      <button 
        onClick={() => scroll('left')}
        className="absolute -left-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 border border-white/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10 hover:border-white hover:bg-black/80 shadow-xl"
      >
        <span className="text-2xl mb-1">‹</span>
      </button>
      <button 
        onClick={() => scroll('right')}
        className="absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 border border-white/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10 hover:border-white hover:bg-black/80 shadow-xl"
      >
        <span className="text-2xl mb-1">›</span>
      </button>

      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item) => (
          <div key={item.id} className="w-[300px] sm:w-[400px] flex-shrink-0 snap-start group cursor-pointer">
            <div className="relative aspect-video bg-neutral-800 rounded mb-2 overflow-hidden shadow-md">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-semibold flex items-center gap-1 group-hover:bg-black transition-colors">
                <span className="text-yellow-400">☰</span> List
              </div>
            </div>
            <h3 className="text-white font-normal text-base leading-tight group-hover:underline">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedToday;
