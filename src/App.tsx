import { useEffect, useState } from 'react';
import {
  Github,
  Instagram,
  Linkedin,
  Gamepad2,
  ExternalLink,
  Layers,
  Gitlab,
  Send,
  Calendar,
  Atom,
  BarChart3
} from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white overflow-x-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-20">
        <main className="grid md:grid-cols-2 gap-12 md:gap-16 items-center min-h-[calc(100vh-12rem)]">
          
          {/* TEXTOS + BOTÕES */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            
            {/* Título */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none">
                HENRIQUE<br />
                <span className="bg-gradient-to-r from-[#BF247A] via-[#812B8C] to-[#D9731A] bg-clip-text text-transparent">
                  SILVA DEV
                </span>
              </h1>

              <div className="w-20 h-[2px] bg-gradient-to-r from-[#BF247A] to-[#812B8C]"></div>
            </div>

            {/* Descrição */}
            <p className="text-lg md:text-xl font-light leading-relaxed text-gray-300 max-w-xl">
              Sou desenvolvedor de software há mais de 10 anos, com experiência em diversas tecnologias, produtos digitais e ambientes corporativos.
            </p>

            <p className="text-lg md:text-xl font-light leading-relaxed text-gray-300 max-w-xl">
              Atualmente curso Matemática Aplicada e Computacional na UFG e Inteligência Artificial na FIAP, 
              unindo fundamentos matemáticos, ciência de dados e engenharia de software para criar soluções inovadoras.
            </p>

            {/* BOTÕES SOCIAIS */}
            <div className="flex flex-wrap gap-4 pt-4">

              {/* LinkedIn */}
              <SocialButton
                url="https://www.linkedin.com/in/henriquesilvadev"
                icon={<Linkedin className="w-5 h-5 text-[#BF247A]" />}
                color="#BF247A"
                label="LinkedIn"
              />

              {/* Instagram */}
              <SocialButton
                url="https://www.instagram.com/henriquesilvadev"
                icon={<Instagram className="w-5 h-5 text-[#812B8C]" />}
                color="#812B8C"
                label="Instagram"
              />

              {/* GitHub */}
              <SocialButton
                url="https://github.com/henriquehsilva"
                icon={<Github className="w-5 h-5 text-[#D9731A]" />}
                color="#D9731A"
                label="GitHub"
              />

              {/* Stack Overflow */}
              <SocialButton
                url="https://stackoverflow.com/users/14033509/henrique-silva"
                icon={<Layers className="w-5 h-5 text-[#BF3939]" />}
                color="#BF3939"
                label="Stack Overflow"
              />

              {/* Pinterest */}
              <SocialButton
                url="https://pinterest.com/henrikesilva1"
                icon={<ExternalLink className="w-5 h-5 text-[#BF247A]" />}
                color="#BF247A"
                label="Pinterest"
              />

              {/* GitLab */}
              <SocialButton
                url="https://gitlab.com/henriquesilvadev"
                icon={<Gitlab className="w-5 h-5 text-[#D9731A]" />}
                color="#D9731A"
                label="GitLab"
              />

              {/* Spotify */}
              <SocialButton
                url="https://open.spotify.com/user/31h2twyyee3rvceua7x4bgsplqrm"
                icon={<ExternalLink className="w-5 h-5 text-[#812B8C]" />}
                color="#812B8C"
                label="Spotify"
              />

              {/* Telegram */}
              <SocialButton
                url="https://t.me/henriquesilvadev"
                icon={<Send className="w-5 h-5 text-[#BF3939]" />}
                color="#BF3939"
                label="Telegram"
              />

              {/* Calendly */}
              <SocialButton
                url="https://calendly.com/henriquesilvadev"
                icon={<Calendar className="w-5 h-5 text-[#BF247A]" />}
                color="#BF247A"
                label="Calendly"
              />

              {/* HuggingFace */}
              <SocialButton
                url="https://huggingface.co/henriquesilvadev"
                icon={<Atom className="w-5 h-5 text-[#812B8C]" />}
                color="#812B8C"
                label="HuggingFace"
              />

              {/* Kaggle */}
              <SocialButton
                url="https://www.kaggle.com/henriquesilvadev"
                icon={<BarChart3 className="w-5 h-5 text-[#D9731A]" />}
                color="#D9731A"
                label="Kaggle"
              />

              {/* Gameplay */}
              <SocialButton
                url="https://www.youtube.com/@henriquesilvalab"
                icon={<Gamepad2 className="w-5 h-5 text-[#BF3939]" />}
                color="#BF3939"
                label="Gameplay"
              />

              {/* Substack */}
              <SocialButton
                url="https://henriquesilva.substack.com/"
                icon={<ExternalLink className="w-5 h-5 text-[#BF247A]" />}
                color="#BF247A"
                label="Substack"
              />

            </div>
          </div>

          {/* FOTO */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative aspect-[3/4] md:aspect-[2/3] w-full max-w-md mx-auto">
              <img src="/eu.png" alt="Henrique Silva Dev" className="object-cover relative z-10" />

              {/* Decorative borders */}
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

/* COMPONENTE BOTÃO SOCIAL */
function SocialButton({ url, icon, color, label }: { url: string; icon: React.ReactNode; color: string; label: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-5 py-3 rounded-sm transition-all border"
      style={{
        backgroundColor: `${color}20`,
        borderColor: `${color}50`,
      }}
    >
      {icon}
      <span className="text-sm tracking-wide">{label}</span>
    </a>
  );
}
