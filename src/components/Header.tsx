import React from 'react';
import { Youtube, Instagram, Linkedin, Github } from 'lucide-react';

const Header = () => {
  const socialLinks = [
    { icon: Youtube, href: 'https://www.youtube.com/@henriquesilvalab', label: 'YouTube' },
    { icon: Instagram, href: 'https://www.instagram.com/henriquesilvadev/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/henriquesilvadev/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/henriquehsilva', label: 'GitHub' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <nav className="flex items-center space-x-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-full transition-all duration-300 hover:bg-white/10"
                aria-label={label}
              >
                <Icon 
                  size={20} 
                  className="text-white/70 group-hover:text-white transition-colors duration-300 group-hover:scale-110 transform"
                />
                <span className="sr-only">{label}</span>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-black/90 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {label}
                </div>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;