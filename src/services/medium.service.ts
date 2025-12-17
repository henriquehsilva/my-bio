import type { MediumPost } from '../types';

export async function getLatestMediumPost(): Promise<MediumPost> {
  const username = import.meta.env.VITE_MEDIUM_USERNAME;

  if (!username) {
    return {
      title: 'Understanding Transformer Architecture in Deep Learning',
      date: new Date().toISOString(),
      excerpt: 'A comprehensive guide to understanding the transformer architecture that powers modern language models. We explore attention mechanisms, positional encoding, and practical implementation details.',
      readingTime: '12 min read',
      url: 'https://medium.com/@placeholder',
      claps: 2341,
      responses: 45,
      reads: 8934
    };
  }

  try {
    // Handle both usernames (@handle) and custom domains (https://domain/)
    let rssUrl: string;
    if (username.startsWith('http')) {
      // Remove trailing slash if present and add /feed
      const domain = username.replace(/\/$/, '');
      rssUrl = `${domain}/feed`;
    } else {
      const handle = username.startsWith('@') ? username : `@${username}`;
      rssUrl = `https://medium.com/feed/${handle}`;
    }

    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
    );

    if (!response.ok) throw new Error('Failed to fetch Medium post');

    const data = await response.json();

    if (data.status !== 'ok' || !data.items || data.items.length === 0) {
      throw new Error('No posts found in Medium feed');
    }

    const latestPost = data.items[0];

    // Clean description to get excerpt
    const description = latestPost.description || '';
    const cleanExcerpt = description
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ')    // Normalize whitespace
      .trim()
      .slice(0, 200) + '...';

    return {
      title: latestPost.title,
      date: latestPost.pubDate,
      excerpt: cleanExcerpt,
      readingTime: latestPost.content?.includes('min read')
        ? latestPost.content.match(/\d+ min read/)?.[0] || '5 min read'
        : `${Math.ceil(cleanExcerpt.split(' ').length / 50) + 1} min read`,
      url: latestPost.link
    };
  } catch (error) {
    console.error('Error fetching Medium post:', error);
    return {
      title: 'Unable to load latest post',
      date: new Date().toISOString(),
      excerpt: 'Please check your Medium username or custom domain in .env.',
      readingTime: '0 min read',
      url: '#'
    };
  }
}
