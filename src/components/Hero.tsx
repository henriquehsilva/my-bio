import { useEffect, useState } from 'react';
import { getLatestInstagramPosts } from '../services/instagram.service';
import type { InstagramPost } from '../types';

export default function Hero() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getLatestInstagramPosts(5);
        setPosts(data);
      } catch (error) {
        console.error('Error loading Instagram posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [posts.length]);

  if (loading) {
    return (
      <section className="relative min-h-screen h-screen max-h-screen flex items-center justify-center bg-black">
        <div className="relative z-10 text-center px-6">
          <div className="animate-pulse">
            <div className="h-12 w-64 bg-gray-800 rounded mx-auto mb-4" />
            <div className="h-6 w-96 bg-gray-800 rounded mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen h-screen max-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Layer */}
      <div className="absolute top-0 left-0 w-full h-full">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-shadow leading-tight">
          Henrique Silva
        </h1>
        <p className="text-xl md:text-2xl font-light text-gray-200 mb-8 text-shadow max-w-3xl mx-auto leading-relaxed">
          Senior Software Engineer | AI & Data Science Student
        </p>
        <a
          href="https://www.linkedin.com/in/henriquesilvadev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm font-light tracking-wide uppercase border border-white/40 px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
        >
          Visit my LinkedIn
        </a>

        {posts[0]?.id.includes('placeholder') && (
          <div className="mt-8">
            <p className="text-xs text-gray-400 font-light">
              Connect LinkedIn API to display your real photos
            </p>
          </div>
        )}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-8' : 'bg-white/40'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

