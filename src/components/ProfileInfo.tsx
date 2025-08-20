import React from 'react';

const ProfileInfo: React.FC = () => {
  return (
    <div className="flex-1 text-center md:text-left transition-transform duration-700 ease-out transform translate-y-8 opacity-0 animate-appear animation-delay-300">
      <br />
      <div className="text-[#d0d0d0] space-y-4 max-w-2xl text-justify" style={{ fontSize: '16px' }}>
        <p className="leading-relaxed">
          👋 Sou <b>Henrique Silva</b>, Desenvolvedor Sênior com mais de 10 anos de experiência em projetos de software, atuando no desenvolvimento de soluções escaláveis e orientadas a resultados.
        </p>

        <p className="leading-relaxed">
          📚 Atualmente, estou ampliando minha formação acadêmica como estudante de <b>Matemática Aplicada e Computacional</b> (UFG) e de <b>Inteligência Artificial</b> (FIAP), unindo prática de mercado e base científica.
        </p>

        <p className="leading-relaxed">
          🔍 Meu interesse está na interseção entre engenharia de software, ciência de dados e inteligência artificial, explorando como a matemática e a programação podem gerar impacto real em negócios e pesquisa.
        </p>

        <div>
          <b>Áreas de atuação e interesse:</b>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Desenvolvimento de Software (back-end & soluções escaláveis)</li>
            <li>Ciência de Dados & Machine Learning</li>
            <li>Inteligência Artificial Aplicada</li>
            <li>Robótica e Automação Inteligente</li>
            <li>Modelagem Matemática & Algoritmos</li>
          </ul>
        </div>

        <p className="leading-relaxed mt-4">
          🤝 Aberto a colaborações, estágios de pesquisa e conexões que fortaleçam a ponte entre mercado e academia.
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
