import { useEffect, useState } from 'react';
import { getLatestSubstackPost } from '../services/substack.service';
import type { SubstackPost } from '../types';

export default function LatestThoughts() {
  const [post, setPost] = useState<SubstackPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getLatestSubstackPost();
        setPost(data);
      } catch (error) {
        console.error('Error loading Substack post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) {
    return (
      <section id="latest-thoughts" className="py-32 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-800 rounded mb-12" />
            <div className="h-32 bg-gray-800 rounded" />
          </div>
        </div>
      </section>
    );
  }

  if (!post) return null;

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <section id="latest-thoughts" className="py-32 px-6 bg-black reveal">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-16 tracking-tight">Latest Thoughts</h2>

        <div className="bg-gradient-to-br from-gray-900/30 to-black border border-gray-800 rounded-2xl p-10 md:p-12 hover:border-gray-700 transition-all duration-300">
          <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
            <span className="font-light">{formattedDate}</span>
            <span className="w-1 h-1 bg-gray-600 rounded-full" />
            <span className="font-light">{post.readingTime}</span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-100 leading-tight">
            {post.title}
          </h3>

          <p className="text-lg font-light leading-relaxed text-gray-300 mb-8">
            {post.excerpt}
          </p>

          {(post.views || post.likes || post.comments || post.subscribers) && (
            <div className="flex items-center gap-8 mb-8 text-sm text-gray-400 border-t border-gray-800 pt-6">
              {post.views && <span className="font-light">{post.views.toLocaleString()} Views</span>}
              {post.likes && <span className="font-light">{post.likes.toLocaleString()} Likes</span>}
              {post.comments && <span className="font-light">{post.comments.toLocaleString()} Comments</span>}
              {post.subscribers && <span className="font-light">{post.subscribers.toLocaleString()} Subscribers</span>}
            </div>
          )}

          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-light text-gray-300 hover:text-white transition-colors relative group"
          >
            Read on Substack
            <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
    </section>
  );
}
