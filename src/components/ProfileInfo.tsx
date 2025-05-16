import React from 'react';

const ProfileInfo: React.FC = () => {
  return (
    <div className="flex-1 text-center md:text-left transition-transform duration-700 ease-out transform translate-y-8 opacity-0 animate-appear animation-delay-300">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 tracking-tight">
        Henrique Silva
      </h1>
      
      <div className="text-[#d0d0d0] mb-6 space-y-1">
        <p className="text-lg md:text-xl">
          Matemática Aplicada e Computacional - UFG
        </p>
        <p className="text-lg md:text-xl">
          Desenvolvedor de Software com foco em Design e Arquitetura
        </p>
      </div>
      
      <div className="text-[#d0d0d0] space-y-4 max-w-2xl text-justify">
        <p className="leading-relaxed">
          Sou graduando em Matemática Aplicada e Computacional pela UFG 
          e atua como desenvolvedor com foco em design de sistemas e 
          arquitetura de software. Trabalha na criação de aplicações robustas e evolutivas, 
          com ênfase em práticas ágeis, refatoração contínua e entrega de valor real para 
          times de desenvolvimento.
        </p>
        
        <p className="leading-relaxed">
          Minha dedicação está voltada ao estudo de padrões de arquitetura, processos e 
          estratégias que tornam o desenvolvimento mais eficaz e sustentável. Seu trabalho 
          se baseia em aprender continuamente, conectar ideias relevantes e aplicá-las com 
          clareza e propósito.
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
