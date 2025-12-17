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
      <section id="latest-instagram" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-800 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="latest-instagram" className="py-20 px-6 reveal">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-xs font-light tracking-widest uppercase text-gray-400 border border-gray-700 px-4 py-2 rounded-full">
              Instagram
            </span>
            <h2 className="text-3xl font-bold mt-6 text-white">Latest Shots</h2>
          </div>

          <a
            href="https://www.instagram.com/henriquesilvadev/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
          >
            <Instagram className="w-5 h-5" />
            <span>@henriquesilvadev</span>
            <span className="w-0 h-px bg-white transition-all duration-300 group-hover:w-full hidden group-hover:block" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.id.startsWith('placeholder') ? 'https://www.instagram.com/henriquesilvadev/' : `https://www.instagram.com/p/${post.id}`} // Fallback link for placeholders
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-gray-600 transition-all duration-300"
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-sm font-light text-white line-clamp-2">
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
