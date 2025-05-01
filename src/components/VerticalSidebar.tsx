import React from 'react';

const VerticalSidebar: React.FC = () => {
  return (
    <div className="fixed right-0 top-0 h-full flex items-center transform translate-x-[30%] md:translate-x-0 opacity-0 animate-sidebar">
      <div className="transform -rotate-90 whitespace-nowrap">
        <div className="flex flex-col items-center">
          <span className="text-sm tracking-widest text-[#d0d0d0] mb-2 font-light">DATA SCIENTIST</span>
          <span className="text-xs tracking-wider text-[#d0d0d0]/70">Decisões Baseadas em Dados</span>
        </div>
      </div>
    </div>
  );
};

export default VerticalSidebar;