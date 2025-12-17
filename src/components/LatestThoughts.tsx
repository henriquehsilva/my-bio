import { useEffect, useState } from 'react';
import { getLatestSubstackPost } from '../services/substack.service';
import { getLatestMediumPost } from '../services/medium.service';
import type { SubstackPost, MediumPost } from '../types';

export default function LatestThoughts() {
  const [post, setPost] = useState<SubstackPost | MediumPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'Substack' | 'Medium'>('Substack');

  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        const mediumUsername = import.meta.env.VITE_MEDIUM_USERNAME;
        const substackUrl = import.meta.env.VITE_SUBSTACK_URL;

        const promises: Promise<any>[] = [];
        if (mediumUsername) promises.push(getLatestMediumPost());
        if (substackUrl) promises.push(getLatestSubstackPost());

        if (promises.length === 0) {
          // Both missing, show default Substack placeholder
          const defaultPost = await getLatestSubstackPost();
          setPost(defaultPost);
          setLoading(false);
          return;
        }

        const results = await Promise.all(promises);

        // Find the absolute latest post by date
        const sorted = results.sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        const latest = sorted[0];
        setPost(latest);
        setSource(latest.url.includes('medium.com') || latest.url.includes('henriquesilva.dev') ? 'Medium' : 'Substack');
      } catch (error) {
        console.error('Error loading latest thoughts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPost();
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

          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-light text-gray-300 hover:text-white transition-colors relative group"
          >
            Read on {source}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
    </section>
  );
}
