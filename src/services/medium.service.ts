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
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`
    );

    if (!response.ok) throw new Error('Failed to fetch Medium post');

    const data = await response.json();
    const latestPost = data.items[0];

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = latestPost.description;
    const excerpt = tempDiv.textContent?.slice(0, 200) + '...' || '';

    return {
      title: latestPost.title,
      date: latestPost.pubDate,
      excerpt,
      readingTime: `${Math.ceil(excerpt.split(' ').length / 200)} min read`,
      url: latestPost.link
    };
  } catch (error) {
    console.error('Error fetching Medium post:', error);
    return {
      title: 'Unable to load latest post',
      date: new Date().toISOString(),
      excerpt: 'Check Medium API configuration.',
      readingTime: '0 min read',
      url: '#'
    };
  }
}
