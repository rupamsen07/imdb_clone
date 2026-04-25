import React from 'react'

const TralierBox = ({
  title,
  subtitle,
  duration,
  image,
  likes,
  reactions,
}) => {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x169?text=Trailer+Preview';
  };

  return (
    <div className="flex flex-col sm:flex-row gap-5 bg-neutral-900 text-white p-4 rounded-2xl max-w-2xl group border border-neutral-800 hover:border-yellow-500/50 transition-all duration-300 shadow-xl">
      <div className="relative flex-shrink-0 w-full sm:w-48 aspect-video sm:aspect-square overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
        <div className="absolute bottom-2 right-2 bg-black/70 text-xs px-2 py-1 rounded font-bold">
          {duration}
        </div>
      </div>
      
      <div className="flex flex-col justify-center flex-1">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-800 text-white group-hover:bg-yellow-500 group-hover:text-black transition-all duration-300 shadow-lg">
            <span className="text-xl ml-1">▶</span>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold leading-tight group-hover:text-yellow-500 transition-colors line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">
              {subtitle}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 mt-2 pt-3 border-t border-neutral-800">
          <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
            <span className="text-lg">👍</span> {likes}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
            <span className="text-lg">❤️</span> {reactions}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TralierBox
