import { useEffect, useState } from 'react';
import { getLatestInstagramPosts } from '../services/instagram.service';
import type { StoryItem } from '../types';
import StoriesModal from './StoriesModal';
import { X, Menu } from 'lucide-react';

const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/henriquesilvadev' },
  { name: 'GitHub', url: 'https://github.com/henriquehsilva' },
  { name: 'X', url: 'https://x.com/henriquesdev' },
  { name: 'YouTube', url: 'https://www.youtube.com/@henriquesilvaplay' },
  { name: 'Substack', url: 'https://henriquesilva.substack.com/' },
  { name: 'Medium', url: 'https://mentalma.henriquesilva.dev' },
  { name: 'Instagram', url: 'https://www.instagram.com/henriquesilvadev/' },
  { name: 'Calendly', url: 'https://calendly.com/henriquesilvadev/mentoria-1-1' },
  { name: 'Spotify', url: 'https://open.spotify.com/user/31h2twyyee3rvceua7x4bgsplqrm' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showStories, setShowStories] = useState(false);
  const [stories, setStories] = useState<StoryItem[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await getLatestInstagramPosts(10);
        const instagramStories: StoryItem[] = data.map(post => ({
          id: post.id,
          type: post.mediaType === 'VIDEO' ? 'VIDEO' : 'IMAGE',
          url: post.mediaType === 'VIDEO' ? post.videoUrl || post.imageUrl : post.imageUrl,
          thumbnail: post.imageUrl,
          caption: post.caption,
          timestamp: post.timestamp,
          permalink: post.permalink,
        }));
        const spotifyStory: StoryItem = {
          id: 'spotify-story',
          type: 'SPOTIFY',
          url: 'https://open.spotify.com/playlist/37i9dQZF1E8Oof9xN6b5hS',
          timestamp: new Date().toISOString(),
          caption: "What I'm coding to today 💻🎧",
        };
        setStories([spotifyStory, ...instagramStories]);
      } catch (error) {
        console.error('Error fetching stories for modal:', error);
      }
    };
    fetchStories();
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-black/98 backdrop-blur-md border-b border-white/8'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => stories.length > 0 && setShowStories(true)}
              className="relative group p-[2px] rounded-full shrink-0"
              aria-label="Ver stories"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] animate-gradient-spin opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-9 h-9 rounded-full bg-black p-[2px]">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src="/me.png"
                    alt="@henriquesilvadev"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </button>
            <span className="text-sm font-semibold tracking-tight hidden sm:block">HENRIQUE SILVA DEV</span>
          </div>

          <div className="hidden lg:flex items-center gap-7">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-gray-400 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <button
            className="lg:hidden p-2 -mr-2 text-gray-300 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pt-2 pb-8 border-t border-white/8">
            <div className="grid grid-cols-2 gap-1">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {stories.length > 0 && (
        <StoriesModal
          stories={stories}
          isOpen={showStories}
          onClose={() => setShowStories(false)}
        />
      )}
    </>
  );
}
