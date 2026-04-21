import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePost';
import type { PostMeta } from '../types/post';

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link to={`/blog/${post.slug}`} className="block group focus:outline-none">
      <article className="py-8 border-b border-[#111] transition-colors duration-200">
        <div className="flex items-center gap-2.5 mb-3">
          <time className="font-mono text-[11px] text-[#3a3a3a] tracking-wider">
            {formatDate(post.date)}
          </time>
          <span className="text-[#222] text-xs">·</span>
          <span className="font-mono text-[11px] text-[#3a3a3a]">
            {post.readingTime} min
          </span>
        </div>

        <h2 className="text-base sm:text-lg font-medium text-[#bbb] mb-2.5 leading-snug group-hover:text-white transition-colors duration-200">
          {post.title}
        </h2>

        <p className="text-sm text-[#484848] leading-relaxed mb-4">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2 py-0.5 text-[#383838] border border-[#1a1a1a] rounded-sm tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="py-8 border-b border-[#111] animate-pulse">
      <div className="h-2.5 bg-[#1a1a1a] rounded w-24 mb-4" />
      <div className="h-5 bg-[#1a1a1a] rounded w-3/4 mb-3" />
      <div className="h-4 bg-[#141414] rounded w-full mb-2" />
      <div className="h-4 bg-[#141414] rounded w-5/6 mb-4" />
      <div className="flex gap-2">
        <div className="h-4 bg-[#141414] rounded w-14" />
        <div className="h-4 bg-[#141414] rounded w-16" />
      </div>
    </div>
  );
}

export default function BlogPage() {
  const { posts, loading } = usePosts();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = [...new Set(posts.flatMap(p => p.tags))].sort();
  const filtered = activeTag
    ? posts.filter(p => p.tags.includes(activeTag))
    : posts;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#ff3b30]/30">
      {/* Sticky header */}
      <header className="sticky top-0 z-20 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1e1e1e]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="font-mono text-sm text-[#666] hover:text-white transition-colors duration-200 flex items-center gap-2"
          >
            <span>←</span>
            <span>voltar</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#666]">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <span className="text-sm font-medium tracking-wide text-[#ccc]">caderno</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Page heading */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-baseline gap-3 mb-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Anotações</h1>
            {!loading && (
              <span className="font-mono text-sm text-[#555]">
                {filtered.length}
              </span>
            )}
          </div>
          <p className="text-[#666] text-sm font-mono">
            notas, estudos e pensamentos em markdown
          </p>
        </div>

        {/* Tag filter */}
        {!loading && allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveTag(null)}
              className={`text-xs px-3 py-1.5 rounded-full font-mono transition-all duration-200 border ${
                !activeTag
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-[#666] border-[#2a2a2a] hover:border-[#444] hover:text-[#aaa]'
              }`}
            >
              todos
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={`text-xs px-3 py-1.5 rounded-full font-mono transition-all duration-200 border ${
                  activeTag === tag
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-[#666] border-[#2a2a2a] hover:border-[#444] hover:text-[#aaa]'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* Post list */}
        <div className="border-t border-[#111]">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : filtered.length === 0 ? (
            <p className="font-mono text-sm text-[#555] py-8 text-center">
              nenhuma anotação encontrada.
            </p>
          ) : (
            filtered.map(post => <PostCard key={post.slug} post={post} />)
          )}
        </div>
      </main>

      {/* Footer rule */}
      <footer className="max-w-2xl mx-auto px-4 sm:px-6 pb-12">
        <div className="border-t border-[#1e1e1e] pt-8 flex items-center justify-between">
          <span className="font-mono text-xs text-[#444]">henrique silva</span>
          <span className="font-mono text-xs text-[#333]">
            {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </div>
  );
}
