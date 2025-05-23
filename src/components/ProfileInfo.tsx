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
          Sou graduando em Matemática Aplicada e Computacional pela UFG, 
          com atuação em desenvolvimento de software voltada à criação de 
          sistemas robustos, sustentáveis e evolutivos. Me interesso profundamente 
          por modelagem matemática, arquitetura de software e ciência de dados 
          aplicada — especialmente onde esses domínios se cruzam para resolver 
          problemas reais com impacto prático.        </p>
        
        <p className="leading-relaxed">
          Minha abordagem combina rigor analítico com princípios de design e práticas ágeis. 
          Tenho um olhar atento para padrões arquiteturais, processos de desenvolvimento eficazes 
          e estratégias que tornam equipes mais produtivas e o código mais expressivo. 
          Não me considero um inventor de ideias originais, mas sou eficaz em reconhecer boas ideias,
          conectá-las e aplicá-las com propósito.
        </p>

        <p className="leading-relaxed">
          Acredito que desenvolvimento de software é, acima de tudo, um processo de aprendizado contínuo — e é isso que me move.
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
