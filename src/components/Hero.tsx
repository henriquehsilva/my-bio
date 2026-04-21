const links = [
  { label: 'Instagram', href: 'https://www.instagram.com/henriquesilvadev/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/henriquesilvadev' },
  { label: 'GitHub', href: 'https://github.com/henriquehsilva' },
  { label: 'Mentoria', href: 'https://calendly.com/henriquesilvadev/mentoria-1-1' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/mochileiro-galaxia.jpg"
          alt="Mochileiro da galáxia"
          onError={(e) => { e.currentTarget.src = '/me.png'; }}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="animate-fade-up-1 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-white/60 mb-4 sm:mb-6">
          Software Engineer &amp; Content Creator
        </p>

        <h1 className="animate-fade-up-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none text-shadow mb-4 sm:mb-6">
          Henrique Silva
        </h1>

        <p className="animate-fade-up-3 text-base sm:text-lg font-light text-white/70 mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
          Desenvolvendo produtos, ensinando programação e compartilhando ideias sobre tecnologia e desenvolvimento.
        </p>

        <div className="animate-fade-up-4 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-sm font-medium tracking-wide px-7 py-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-fade-up-4">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-white/20" />
      </div>
    </section>
  );
}
