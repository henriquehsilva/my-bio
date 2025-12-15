import { useEffect, useState } from 'react';

const socialLinks = [
  { name: 'LinkedIn', url: 'https://linkedin.com/in/placeholder' },
  { name: 'GitHub', url: 'https://github.com/placeholder' },
  { name: 'Twitter', url: 'https://twitter.com/placeholder' },
  { name: 'YouTube', url: 'https://youtube.com/@placeholder' },
  { name: 'Substack', url: 'https://placeholder.substack.com' },
  { name: 'Medium', url: 'https://medium.com/@placeholder' },
  { name: 'Instagram', url: 'https://instagram.com/placeholder' },
  { name: 'Calendly', url: 'https://calendly.com/placeholder' },
  { name: 'Spotify', url: 'https://open.spotify.com/user/placeholder' }
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-sm border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 overflow-hidden border border-white/20">
            <img
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=80"
              alt="Henrique Silva"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-lg font-medium tracking-tight">HenriqueSilva.dev</span>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-light text-gray-300 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <button className="lg:hidden text-gray-300 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
