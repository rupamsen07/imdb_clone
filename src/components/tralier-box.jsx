import React from 'react'

const TralierBox = ({
  title,
  subtitle,
  duration,
  image,
  likes,
  reactions,
}) => {
  return (
    <div className="flex gap-4 bg-neutral-900 text-white p-4 rounded-xl max-w-xl group">
      <img
        src={image}
        alt={title}
        className="w-28 h-40 object-cover rounded-lg"
      />
      <div className="flex flex-col justify-center flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 group-hover:bg-yellow-500">
            ▶
          </div>
          <span className="text-sm text-gray-400">{duration}</span>
        </div>
        <h3 className="text-lg font-semibold leading-snug">
          {title}
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          {subtitle}
        </p>
        <div className="flex gap-4 mt-3 text-sm text-gray-300">
          <span>👍 {likes}</span>
          <span>❤️ {reactions}</span>
        </div>
      </div>
    </div>
  )
}

export default TralierBox
