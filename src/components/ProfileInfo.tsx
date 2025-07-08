import React from 'react';

const ProfileInfo: React.FC = () => {
  return (
    <div className="flex-1 text-center md:text-left transition-transform duration-700 ease-out transform translate-y-8 opacity-0 animate-appear animation-delay-300">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 tracking-tight">
        Henrique Silva - Tio Rick
      </h1>
      
      <div className="text-[#d0d0d0] mb-6 space-y-1">
        <p className="text-lg md:text-xl">
          Dev Sênior | Empreendedor e Pensador Social | Inovação com alma
        </p>
      </div>
      
      <div className="text-[#d0d0d0] space-y-4 max-w-2xl text-justify">
        <p className="leading-relaxed">
          👋 Sou o Henrique, também conhecido como Tio Rick — desenvolvedor sênior, empreendedor social e pensador inquieto sobre o papel da tecnologia no mundo.        
        </p>
        
        <p className="leading-relaxed">
          🎯 Como engenheiro de software, atuo no desenvolvimento de soluções escaláveis e orientadas a produto, com foco em impacto real e experiência do usuário. Tenho vivência em arquitetura de sistemas, integrações complexas e boas práticas de engenharia, sempre com uma abordagem fullstack e colaborativa.
        </p>

        <p className="leading-relaxed">
          💡 Acredito que tecnologia com propósito é uma das ferramentas mais poderosas para transformar vidas. Por isso, além da rotina técnica, me dedico a iniciativas de inovação social, como o QR do Bem e o Code Lab Comunitário, que conectam pessoas, oportunidades e cidadania digital.
        </p>

        <p className="leading-relaxed">
          🚀 Atuo com metodologias ágeis, cultura de dados e times multidisciplinares — sempre buscando aprender, compartilhar e construir produtos que façam a diferença.
        </p>

        <b>Projetos</b>
        <ul className="list-disc pl-5">
          <li>
            <a href="https://curso.henriquesilva.dev" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Curso de Programação do Tio Rick
            </a> - Uma jornada prática e acessível para aprender a programar com propósito, usando tecnologia para resolver problemas reais..
          </li>
          <li>
            <a href="https://benfeitoria.com/projeto/qr-do-bem-1zy6" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              QR do Bem
            </a> - Sistema de microdoações via QR Code que conecta doadores a pessoas em situação de rua, com uso social controlado e transparente.
          </li>
          <li>
            <a href="https://youtu.be/nYn63zLyd04?si=1TLy1lw8UqMb37E7" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Code Lab Comunitário
            </a> - Espaço de aprendizagem tecnológica em condomínios, promovendo inclusão digital, criatividade e inovação local.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileInfo;
