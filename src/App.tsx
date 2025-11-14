import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white overflow-x-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-20">
        <main className="grid md:grid-cols-2 gap-12 md:gap-16 items-center min-h-[calc(100vh-12rem)]">
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none">
                HENRIQUE<br />
                <span className="bg-gradient-to-r from-[#BF247A] via-[#812B8C] to-[#D9731A] bg-clip-text text-transparent">
                  SILVA DEV
                </span>
              </h1>

              <div className="w-20 h-[2px] bg-gradient-to-r from-[#BF247A] to-[#812B8C]"></div>
            </div>

            <p className="text-lg md:text-xl font-light leading-relaxed text-gray-300 max-w-xl">
              Sou desenvolvedor de software há mais de 10 anos, com experiência em diversas tecnologias, produtos digitais e ambientes corporativos.
            </p>

            <p className="text-lg md:text-xl font-light leading-relaxed text-gray-300 max-w-xl">
              Atualmente curso Matemática Aplicada e Computacional na UFG e Inteligência Artificial na FIAP, unindo fundamentos matemáticos, ciência de dados e engenharia de software para criar soluções inovadoras.
            </p>

            <a
              href="https://henriquesilva.link/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#BF247A] to-[#812B8C] text-white font-bold text-sm tracking-wider uppercase rounded-sm hover:shadow-[0_0_30px_rgba(191,36,122,0.5)] transition-all duration-300 group"
            >
              LINKS
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative aspect-[3/4] md:aspect-[2/3] w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#BF247A]/20 via-[#812B8C]/20 to-[#D9731A]/20 rounded-sm blur-3xl"></div>

              <div className="relative w-full h-full border border-[#BF247A]/30 rounded-sm overflow-hidden bg-gradient-to-br from-[#1a1a1c] to-[#0A0A0C] shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent z-10"></div>

                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-[#D9731A]/20 rounded-sm -z-10"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-[#BF3939]/20 rounded-sm -z-10"></div>
            </div>
          </div>
        </main>

        <footer className="mt-20 pt-8 border-t border-gray-800/50 text-center text-sm text-gray-600">
          <p>© 2025 Henrique Silva Dev. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
