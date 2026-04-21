import { useEffect, useState } from 'react';
import { getLatestSubstackPost } from '../services/substack.service';
import { getLatestMediumPost } from '../services/medium.service';
import type { SubstackPost, MediumPost } from '../types';
import { ArrowUpRight } from 'lucide-react';

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
          const defaultPost = await getLatestSubstackPost();
          setPost(defaultPost);
          setLoading(false);
          return;
        }

        const results = await Promise.all(promises);
        const sorted = results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
      <section id="latest-thoughts" className="py-16 sm:py-24 px-4 sm:px-6 bg-black">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-7 w-40 bg-gray-800/60 rounded mb-10" />
          <div className="h-48 bg-gray-800/40 rounded-2xl" />
        </div>
      </section>
    );
  }

  if (!post) return null;

  const formattedDate = new Date(post.date).toLocaleDateString('pt-BR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section id="latest-thoughts" className="py-16 sm:py-24 px-4 sm:px-6 bg-black reveal">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 sm:mb-14">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-2">Newsletter</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Latest Thoughts</h2>
        </div>

        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-white/[0.03] border border-white/8 rounded-2xl p-6 sm:p-8 hover:border-white/20 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-5 text-xs text-gray-500">
            <span>{formattedDate}</span>
            <span className="w-1 h-1 bg-gray-600 rounded-full" />
            <span>{post.readingTime}</span>
            <span className="w-1 h-1 bg-gray-600 rounded-full" />
            <span className="text-gray-400">{source}</span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-100 leading-snug group-hover:text-white transition-colors">
              {post.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 shrink-0 text-gray-600 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 mt-1" />
          </div>

          <p className="text-base text-gray-400 leading-relaxed mt-4">
            {post.excerpt}
          </p>
        </a>
      </div>
    </section>
  );
}
