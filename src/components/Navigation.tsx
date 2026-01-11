import { useEffect, useState } from 'react';
import { getLatestInstagramPosts } from '../services/instagram.service';
import type { InstagramPost } from '../types';
import ReelsModal from './ReelsModal';

const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/henriquesilvadev' },
  { name: 'GitHub', url: 'https://github.com/henriquehsilva' },
  { name: 'X', url: 'https://x.com/henriquesdev' },
  { name: 'YouTube', url: 'https://www.youtube.com/@henriquesilvaplay' },
  { name: 'Substack', url: 'https://henriquesilva.substack.com/' },
  { name: 'Medium', url: 'https://mentalma.henriquesilva.dev' },
  { name: 'Instagram', url: 'https://www.instagram.com/henriquesilvadev/' },
  { name: 'Calendly', url: 'https://calendly.com/henriquesilvadev/mentoria-1-1' },
  { name: 'Spotify', url: 'https://open.spotify.com/user/31h2twyyee3rvceua7x4bgsplqrm' }
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [showReels, setShowReels] = useState(false);
  const [reels, setReels] = useState<InstagramPost[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const data = await getLatestInstagramPosts(15);
        // Filter to only include posts with videoUrl (Reels)
        const filteredReels = data.filter(post => post.mediaType === 'VIDEO' && post.videoUrl);
        setReels(filteredReels);
      } catch (error) {
        console.error('Error fetching reels for modal:', error);
      }
    };
    fetchReels();
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-sm border-b border-white/10' : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => reels.length > 0 && setShowReels(true)}
              className="relative group p-[2px] rounded-full"
              aria-label="View Reels"
            >
              {/* Instagram Story Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] animate-gradient-spin opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-10 h-10 rounded-full bg-black p-[2px]">
                <div className="w-full h-full rounded-full bg-gray-900 overflow-hidden border border-white/10">
                  <img
                    src="/me.png"
                    alt="@henriquesilvadev"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </button>
            <span className="text-lg font-medium tracking-tight">HENRIQUE SILVA DEV</span>
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

      <ReelsModal
        reels={reels}
        isOpen={showReels}
        onClose={() => setShowReels(false)}
      />
    </>
  );
}
