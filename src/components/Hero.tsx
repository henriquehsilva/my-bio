import { Link } from 'react-router-dom';

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/henriquesilvadev/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/henriquesilvadev' },
  { label: 'GitHub', href: 'https://github.com/henriquehsilva' },
  { label: 'Calendly', href: 'https://calendly.com/henriquesilvadev/mentoria-1-1' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/mochileiro-galaxia.jpg"
          alt="Mochileiro da galáxia"
          onError={e => { e.currentTarget.src = '/me.png'; }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 text-center px-5 w-full max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-3 text-shadow leading-tight tracking-tight">
          Henrique Silva
        </h1>
        <p className="text-white/50 text-sm sm:text-base font-light mb-8 tracking-widest uppercase">
          software developer
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {socialLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-medium tracking-wide uppercase border border-white/30 px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              {label}
            </a>
          ))}
          <Link
            to="/blog"
            className="text-xs sm:text-sm font-medium tracking-wide uppercase border border-white/30 px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            Caderno
          </Link>
        </div>
      </div>
    </section>
  );
}
