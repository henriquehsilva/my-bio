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
    const response = await fetch(`${substackUrl}/api/v1/posts/latest`);

    if (!response.ok) throw new Error('Failed to fetch Substack post');

    return await response.json();
  } catch (error) {
    console.error('Error fetching Substack post:', error);
    return {
      title: 'Unable to load latest post',
      date: new Date().toISOString(),
      excerpt: 'Check Substack API configuration.',
      readingTime: '0 min read',
      url: '#'
    };
  }
}
