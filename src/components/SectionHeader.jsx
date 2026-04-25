import React from 'react';

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <div className="w-1 h-8 bg-yellow-400 rounded-sm"></div>
        <h2 className="text-3xl font-bold text-white hover:text-yellow-400 cursor-pointer transition-colors inline-flex items-center gap-2">
          {title}
          <span className="text-2xl mt-1">›</span>
        </h2>
      </div>
      {subtitle && <p className="text-gray-400 mt-2 text-lg">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
