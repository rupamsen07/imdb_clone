import React, { useRef } from 'react';

const CelebrityList = ({ celebrities, isBornToday = false }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/carousel">
      {/* Scroll Arrows */}
      <button 
        onClick={() => scroll('left')}
        className="absolute -left-5 top-14 w-12 h-12 bg-black/50 border border-white/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10 hover:border-white hover:bg-black/80 shadow-xl"
      >
        <span className="text-2xl mb-1">‹</span>
      </button>
      <button 
        onClick={() => scroll('right')}
        className="absolute -right-5 top-14 w-12 h-12 bg-black/50 border border-white/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10 hover:border-white hover:bg-black/80 shadow-xl"
      >
        <span className="text-2xl mb-1">›</span>
      </button>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 snap-x hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {celebrities.map((celeb) => (
          <div key={celeb.id} className="flex flex-col items-center flex-shrink-0 snap-start w-36 group cursor-pointer">
            <div className="w-36 h-36 rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-white transition-colors relative shadow-lg">
              <img 
                src={celeb.image} 
                alt={celeb.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-white font-normal text-base text-center leading-tight group-hover:underline">
              {celeb.name}
            </h3>
            {isBornToday && celeb.age && (
              <p className="text-gray-400 text-sm text-center mt-1">
                {celeb.age}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CelebrityList;
