import type { SubstackPost } from '../types';

export async function getLatestSubstackPost(): Promise<SubstackPost> {
  const substackUrl = import.meta.env.VITE_SUBSTACK_URL;

  if (!substackUrl) {
    return {
      title: 'The Future of AI in Software Development',
      date: new Date().toISOString(),
      excerpt: 'Exploring how artificial intelligence is revolutionizing the way we build software, from code generation to automated testing and beyond. A deep dive into the tools and techniques shaping the future.',
      readingTime: '8 min read',
      url: 'https://placeholder.substack.com',
      views: 1234,
      likes: 89,
      comments: 23,
      subscribers: 1456
    };
  }

  try {
    // Substack RSS is usually at /feed
    const rssUrl = substackUrl.endsWith('/') ? `${substackUrl}feed` : `${substackUrl}/feed`;

    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
    );

    if (!response.ok) throw new Error('Failed to fetch Substack post');

    const data = await response.json();

    if (data.status !== 'ok' || !data.items || data.items.length === 0) {
      throw new Error('No posts found in Substack feed');
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
      readingTime: '5 min read', // RSS doesn't always provide reading time
      url: latestPost.link
    };
  } catch (error) {
    console.error('Error fetching Substack post:', error);
    return {
      title: 'Unable to load latest post',
      date: new Date().toISOString(),
      excerpt: 'Check Substack URL configuration in .env.',
      readingTime: '0 min read',
      url: '#'
    };
  }
}
