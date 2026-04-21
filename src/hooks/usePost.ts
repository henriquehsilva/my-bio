import { useState, useEffect } from 'react';
import type { PostMeta } from '../types/post';

export function usePosts() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/posts/posts.json')
      .then(r => r.json())
      .then((data: PostMeta[]) => {
        setPosts(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { posts, loading };
}

export function usePost(slug: string) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(false);
    fetch(`/posts/${slug}.md`)
      .then(r => {
        if (!r.ok) throw new Error('Not found');
        return r.text();
      })
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  return { content, loading, error };
}
