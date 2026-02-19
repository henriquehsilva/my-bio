export default function Hero() {
  return (
    <section className="relative min-h-screen h-screen max-h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/mochileiro-galaxia.jpg"
          alt="Mochileiro da galáxia"
          onError={(event) => {
            event.currentTarget.src = '/me.png';
          }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow leading-tight">
          Henrique Silva
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://www.instagram.com/henriquesilvadev/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium tracking-wide uppercase border border-white/50 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/henriquesilvadev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium tracking-wide uppercase border border-white/50 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/henriquehsilva"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium tracking-wide uppercase border border-white/50 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            GitHub
          </a>
          <a
            href="https://calendly.com/henriquesilvadev/mentoria-1-1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium tracking-wide uppercase border border-white/50 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            Calendly
          </a>
        </div>
      </div>
    </section>
  );
}
