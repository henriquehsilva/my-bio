import { Link, useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import { usePost, usePosts } from '../hooks/usePost';
import type { ReactNode } from 'react';

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

const mdComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-2xl sm:text-3xl font-bold text-[#f0f0f0] mt-10 mb-4 leading-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl sm:text-2xl font-semibold text-[#e8e8e8] mt-9 mb-3 leading-snug border-b border-[#1e1e1e] pb-2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-[#e0e0e0] mt-7 mb-2">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-base font-semibold text-[#d0d0d0] mt-6 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-[#b0b0b0] leading-[1.85] mb-5 text-[0.975rem]">
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#4da3ff] underline underline-offset-2 decoration-[#4da3ff]/30 hover:decoration-[#4da3ff] transition-all"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 space-y-1.5 pl-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 space-y-1.5 pl-0 list-none counter-reset-item">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-[#b0b0b0] text-[0.975rem] leading-relaxed flex gap-3 before:content-['—'] before:text-[#333] before:shrink-0">
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 pl-5 border-l-2 border-[#ff3b30]/40 bg-[#ff3b30]/5 py-3 pr-4 rounded-r-sm">
      <div className="text-[#c0c0c0] text-sm leading-relaxed italic [&>p]:mb-0">
        {children}
      </div>
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.startsWith('language-');
    if (isBlock) {
      return (
        <code className={className}>{children}</code>
      );
    }
    return (
      <code className="font-mono text-[0.85em] px-1.5 py-0.5 rounded bg-[#1e1e1e] text-[#e6db74] border border-[#2a2a2a]">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <div className="monokai-block group relative my-6 rounded-lg overflow-hidden border border-[#2a2a2a]">
      <div className="monokai-topbar flex items-center gap-1.5 px-4 py-2.5 bg-[#1e1c1a] border-b border-[#2a2a2a]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      <pre className="overflow-x-auto text-sm leading-relaxed p-4 sm:p-5 bg-[#272822] m-0">
        {children}
      </pre>
    </div>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-[#2a2a2a]">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="text-left py-2.5 px-3 font-mono text-xs text-[#888] tracking-wider uppercase">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="py-2.5 px-3 text-[#b0b0b0] border-b border-[#1a1a1a]">
      {children}
    </td>
  ),
  hr: () => (
    <hr className="my-10 border-none h-px bg-gradient-to-r from-transparent via-[#333] to-transparent" />
  ),
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      className="rounded-lg w-full my-6 border border-[#2a2a2a]"
      loading="lazy"
    />
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[#e0e0e0]">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-[#c0c0c0]">{children}</em>
  ),
};

function ReadingProgress() {
  return null;
}

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { content, loading, error } = usePost(slug ?? '');
  const { posts } = usePosts();

  const meta = posts.find(p => p.slug === slug);

  if (error) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#ff3b30]/30">
      {/* Sticky header */}
      <header className="sticky top-0 z-20 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1e1e1e]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            to="/blog"
            className="font-mono text-sm text-[#666] hover:text-white transition-colors duration-200 flex items-center gap-2"
          >
            <span>←</span>
            <span>caderno</span>
          </Link>
          {meta && (
            <span className="font-mono text-xs text-[#444]">
              {meta.readingTime} min de leitura
            </span>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="flex gap-2 mb-6">
              <div className="h-5 bg-[#1e1e1e] rounded w-16" />
              <div className="h-5 bg-[#1e1e1e] rounded w-20" />
            </div>
            <div className="h-8 bg-[#1e1e1e] rounded w-4/5 mb-2" />
            <div className="h-8 bg-[#1e1e1e] rounded w-3/5 mb-8" />
            <div className="space-y-3 mt-10">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-[#161616] rounded"
                  style={{ width: `${75 + Math.random() * 25}%` }}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Post header */}
            {meta && (
              <header className="mb-10 pb-8 border-b border-[#1e1e1e]">
                <div className="flex flex-wrap gap-2 mb-5">
                  {meta.tags.map(tag => (
                    <Link
                      key={tag}
                      to={`/blog`}
                      className="text-xs px-2.5 py-0.5 rounded font-mono text-[#666] bg-[#161616] border border-[#252525] hover:border-[#444] hover:text-[#aaa] transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-white mb-4">
                  {meta.title}
                </h1>
                <div className="flex items-center gap-4 text-sm font-mono text-[#555]">
                  <time>{formatDate(meta.date)}</time>
                  <span>·</span>
                  <span>{meta.readingTime} min</span>
                </div>
              </header>
            )}

            {/* Notebook content */}
            <div className="post-content relative">
              {/* Red margin line */}
              <div className="hidden sm:block absolute -left-6 top-0 bottom-0 w-px bg-[#ff3b30]/10" />
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={mdComponents}
              >
                {content}
              </ReactMarkdown>
            </div>

            {/* Post footer */}
            <footer className="mt-16 pt-8 border-t border-[#1e1e1e]">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 font-mono text-sm text-[#555] hover:text-white transition-colors"
              >
                <span>←</span>
                <span>ver todas as anotações</span>
              </Link>
            </footer>
          </>
        )}
      </main>
    </div>
  );
}
