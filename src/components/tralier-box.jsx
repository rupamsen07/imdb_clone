import React, { useState } from 'react';

const TrailerBox = ({ title, subtitle, duration, image, likes, reactions, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex gap-4 p-4 group cursor-pointer hover:bg-[#2A2A2A] transition-colors"
    >
      <img src={image} alt={title} className="w-20 h-28 object-cover rounded shadow-md flex-shrink-0" />
      <div className="flex flex-col justify-center flex-1">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent border-2 border-white/30 group-hover:border-white transition-colors">
            <span className="text-white text-xs pl-0.5 group-hover:text-yellow-400 transition-colors">▶</span>
          </div>
          <span className="text-sm text-gray-400">{duration}</span>
        </div>
        <h3 className="text-base font-normal text-white leading-tight mb-1 group-hover:underline">{title}</h3>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
};

const TrailerSection = ({ main: initialMain, upNext: initialUpNext = [] }) => {
  const [allTrailers] = useState([initialMain, ...initialUpNext]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const main = allTrailers[currentIndex];
  
  // Calculate the up next items (the next 3 items, wrapping around)
  const upNext = [
    allTrailers[(currentIndex + 1) % allTrailers.length],
    allTrailers[(currentIndex + 2) % allTrailers.length],
    allTrailers[(currentIndex + 3) % allTrailers.length],
  ].filter(Boolean); // just in case there are fewer than 4 total trailers

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allTrailers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allTrailers.length) % allTrailers.length);
  };

  const handleSelect = (selectedTrailer) => {
    const index = allTrailers.findIndex(t => t.title === selectedTrailer.title);
    setCurrentIndex(index);
  };

  return (
    <div className="flex bg-black w-full overflow-hidden">
      
      {/* ── Left: Main Video Panel ── */}
      <div className="flex-[2] relative group">
        
        {/* Large thumbnail */}
        <div className="w-full aspect-video bg-neutral-900 relative">
          <img
            key={main.thumbnail}
            src={main.thumbnail || main.image}
            alt={main.title}
            className="w-full h-full object-cover animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>
        </div>

        {/* Prev / Next arrows (IMDb style - tall borders) */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-0 bottom-24 w-12 flex items-center justify-center bg-black/30 hover:bg-black/60 text-white transition-all opacity-0 group-hover:opacity-100 border-r border-transparent hover:border-white/30"
        >
          <span className="text-4xl pb-2">‹</span>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-0 bottom-24 w-12 flex items-center justify-center bg-black/30 hover:bg-black/60 text-white transition-all opacity-0 group-hover:opacity-100 border-l border-transparent hover:border-white/30"
        >
          <span className="text-4xl pb-2">›</span>
        </button>

        <div className="absolute bottom-0 left-0 right-0 flex items-end gap-5 px-6 py-5">

        
          <div className="relative group/poster cursor-pointer flex-shrink-0">
            <img
              src={main.image}
              alt={main.title}
              className="w-[110px] h-[160px] object-cover border-2 border-transparent group-hover/poster:border-white transition-all shadow-2xl"
            />
         
            <div className="absolute top-0 left-0 bg-black/60 w-7 h-9 flex items-center justify-center rounded-br group-hover/poster:bg-black/80">
               <span className="text-white font-bold text-lg mb-1">+</span>
            </div>
          </div>

          
          <div className="flex items-end gap-4 pb-2 w-full">
            <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-yellow-400 hover:border-yellow-400 transition-colors group/play">
              <span className="text-white text-2xl pl-1 group-hover/play:text-black">▶</span>
            </div>
            <div className="flex flex-col justify-end">
              <div className="flex items-center gap-3">
                <h2 className="text-white font-normal text-3xl hover:underline cursor-pointer tracking-wide">{main.title}</h2>
              </div>
              <p className="text-gray-300 text-lg mb-1">{main.subtitle}</p>
            </div>
            
            <div className="ml-auto text-gray-300 text-sm hidden lg:block">
              <div className="flex items-center gap-6">
                 <div className="flex flex-col items-center"><span className="text-white font-bold text-lg">{main.duration}</span><span className="text-gray-400">Duration</span></div>
                 <div className="flex flex-col items-center"><span className="text-white font-bold text-lg">★ 8.2</span><span className="text-gray-400">Rating</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      
      <div className="w-[380px] flex flex-col bg-[#121212] flex-shrink-0">

        <h4 className="text-white font-bold text-lg px-4 py-3 flex items-center gap-2">
           <span className="text-yellow-400">Up next</span>
        </h4>

        <div className="flex flex-col bg-gradient-to-b from-[#1a1a1a] to-[#121212] flex-1">
          {upNext.map((trailer, index) => (
            <TrailerBox 
              key={`${trailer.title}-${index}`} 
              {...trailer} 
              onClick={() => handleSelect(trailer)} 
            />
          ))}
        </div>

        <div className="px-4 py-4 text-base font-semibold text-white cursor-pointer hover:text-yellow-400 transition-colors flex items-center gap-2 group/browse">
          Browse trailers <span className="text-xl leading-none group-hover/browse:translate-x-1 transition-transform">›</span>
        </div>

      </div>
    </div>
  )
}

export default TrailerSection;
