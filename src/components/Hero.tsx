import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover filter grayscale"
          poster="https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
        >
          <source
            src="/videos/hero.mp4"
            type="video/mp4"
          />
          {/* Fallback for browsers that don't support video */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
        </video>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6 leading-tight">
          <span className="block font-extralight text-white/90 text-2xl md:text-3xl lg:text-4xl mb-4 tracking-widest uppercase">
            Tentando ser
          </span>
          <span className="font-thin">
            Mais
            <span className="font-normal italic"> Simples</span>
          </span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
          Entre estudo e trabalho, 
          <span className="block mt-2 text-base md:text-lg text-white/60">
            escolho a simplicidade como guia para crescer e construir.
          </span>
        </p>

        {/* Subtle accent line */}
        <div className="mt-12 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        
        {/* Optional CTA or additional content */}
        <div className="mt-12">
          <div className="inline-flex items-center text-sm text-white/60 tracking-widest uppercase">
            <div className="w-8 h-px bg-white/30 mr-4"></div>
            estudo & trabalho
            <div className="w-8 h-px bg-white/30 ml-4"></div>            
          </div>
          <div className="flex items-center -space-x-16">
            <img src="/logo-fiap.png" alt="FIAP" className="w-48 h-48" />
            <img src="/logo-ufg.png" alt="UFG" className="w-64 h-48" />
            <img src="/logo-cast.png" alt="CAST" className="w-64 h-48" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;