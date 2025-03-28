import React from 'react';
import { Bot, Code, MessageSquare, Mic, Brain, ExternalLink, Github, Linkedin } from 'lucide-react';


function App() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-['Roboto']">
      {/* Hero Section */}
      <header className="min-h-[60vh] flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D9A404] via-[#D97904] to-[#F25C05] opacity-8">
        <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            autoPlay
            muted
            loop
            
          >
            <source src="/bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>  
        </div>        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Henrique Silva</h1>
          <h2 className="text-2xl md:text-3xl text-[#D9A404] mb-8">Desenvolvedor e Designer de Bots</h2>
          <div className="flex justify-center gap-4 text-[#D97904]">
            <Bot size={32} />
            <Code size={32} />
            <Brain size={32} />
          </div>
        </div>
      </header>

      {/* Bio Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
        <div className="flex gap-4">
            <a href="https://github.com/henriquesilvadev" target="_blank" rel="noopener noreferrer">
              <Github className="w-6 h-6 text-white hover:text-yellow transition-colors" />
            </a>
            <a href="https://linkedin.com/in/henriquesilvadev" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6 text-white hover:text-yellow transition-colors" />
            </a>
          </div>
          <br></br>
          <div className="bg-[#0D0D0D]/50 p-8 rounded-lg border border-[#D97904]/20">
            <p className="text-lg leading-relaxed mb-8">
              Sou um desenvolvedor com anos de experiência em tecnologia, atualmente em transição para a área de interfaces inteligentes e experiências conversacionais. Tenho me aprofundado no design e desenvolvimento de chatbots, voicebots e soluções integradas com inteligência artificial. Com uma base sólida em desenvolvimento full-stack, estou direcionando minha expertise para criar experiências conversacionais que unem tecnologia, empatia e eficiência, sempre com foco em gerar valor real para os negócios.
            </p>
          </div>

          {/* Quote */}
          <blockquote className="my-16 p-8 border-l-4 border-[#F25C05] bg-[#0D0D0D]/30">
            <p className="text-xl italic mb-4">"Design não é apenas sobre como algo parece ou se sente. Design é sobre como funciona."</p>
            <footer className="text-[#D9A404]">– Steve Jobs</footer>
          </blockquote>

          {/* Expertise Areas */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
            <div className="p-6 bg-[#0D0D0D]/50 rounded-lg border border-[#D97904]/20">
              <MessageSquare className="text-[#D9A404] mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Chatbots</h3>
              <p>Designing intelligent conversational interfaces that enhance user experience.</p>
            </div>
            <div className="p-6 bg-[#0D0D0D]/50 rounded-lg border border-[#D97904]/20">
              <Mic className="text-[#D9A404] mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Voicebots</h3>
              <p>Creating natural voice interactions powered by advanced AI technology.</p>
            </div>
            <div className="p-6 bg-[#0D0D0D]/50 rounded-lg border border-[#D97904]/20">
              <Brain className="text-[#D9A404] mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">AI Solutions</h3>
              <p>Integrating artificial intelligence to deliver smart, efficient solutions.</p>
            </div>
          </div> */}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#D97904]/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <a 
            href="https://site.henriquesilva.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#D9A404] hover:text-[#F25C05] transition-colors"
          >
            https://site.henriquesilva.dev
            <ExternalLink size={16} className="ml-1" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;