import React from 'react';

const VerticalSidebar: React.FC = () => {
  return (
    <div className="w-full md:w-auto">
      {/* Mobile (horizontal, centralizado) */}
      <div className="block md:hidden text-center">
        <span className="block text-sm tracking-widest text-[#d0d0d0] font-light">
          DATA SCIENTIST
        </span>
        <span className="block text-xs tracking-wider text-[#d0d0d0]/70">
          Decisões Baseadas em Dados
        </span>
      </div>

      {/* Desktop (vertical, rotacionado) */}
      <div className="hidden md:flex h-full items-center justify-center">
        <div className="transform -rotate-90 whitespace-nowrap">
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm tracking-widest text-[#d0d0d0] font-light">
              SOFTWARE ENGINEER
            </span>
            <span className="text-xs tracking-wider text-[#d0d0d0]/70">
              Decisões Baseadas em Dados
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalSidebar;
