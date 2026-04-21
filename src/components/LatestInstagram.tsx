import { useEffect, useState } from 'react';
import { getLatestInstagramPosts } from '../services/instagram.service';
import type { InstagramPost } from '../types';
import { Instagram } from 'lucide-react';

export default function LatestInstagram() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getLatestInstagramPosts(4);
        setPosts(data);
      } catch (error) {
        console.error('Error loading instagram posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section id="latest-instagram" className="py-16 sm:py-24 px-4 sm:px-6 bg-black">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-800/40 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="latest-instagram" className="py-16 sm:py-24 px-4 sm:px-6 bg-black reveal">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8 sm:mb-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-2">Social</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Latest Shots</h2>
          </div>

          <a
            href="https://www.instagram.com/henriquesilvadev/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span className="hidden sm:inline">@henriquesilvadev</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {posts.map((post) => (
            <a
              key={post.id}
              href={
                post.id.startsWith('placeholder')
                  ? 'https://www.instagram.com/henriquesilvadev/'
                  : `https://www.instagram.com/p/${post.id}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square rounded-xl overflow-hidden bg-gray-900 border border-white/6 hover:border-white/20 transition-all duration-300"
            >
              {post.mediaType === 'VIDEO' && post.videoUrl ? (
                <video
                  src={post.videoUrl}
                  poster={post.imageUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-xs text-white line-clamp-2 leading-relaxed">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
