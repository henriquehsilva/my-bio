import { useEffect, useState } from 'react';
import { getLatestMediumPost } from '../services/medium.service';
import type { MediumPost } from '../types';
import { ArrowUpRight } from 'lucide-react';

export default function LatestStudyNote() {
  const [post, setPost] = useState<MediumPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getLatestMediumPost();
        setPost(data);
      } catch (error) {
        console.error('Error loading Medium post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  if (loading) {
    return (
      <section id="latest-study-note" className="py-16 sm:py-24 px-4 sm:px-6 bg-black">
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
    <section id="latest-study-note" className="py-16 sm:py-24 px-4 sm:px-6 bg-black reveal">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 sm:mb-14">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-2">Medium</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Latest Study Note</h2>
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

          {(post.claps || post.responses || post.reads) && (
            <div className="flex items-center gap-6 mt-6 pt-5 border-t border-white/6 text-xs text-gray-500">
              {post.claps && <span>{post.claps.toLocaleString()} Claps</span>}
              {post.responses && <span>{post.responses.toLocaleString()} Responses</span>}
              {post.reads && <span>{post.reads.toLocaleString()} Reads</span>}
            </div>
          )}
        </a>
      </div>
    </section>
  );
}
