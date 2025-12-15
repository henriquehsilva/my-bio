import type { Tweet } from '../types';

export async function getLatestTweet(): Promise<Tweet> {
  const apiKey = import.meta.env.VITE_TWITTER_API_KEY;

  if (!apiKey) {
    return {
      id: 'placeholder',
      text: 'Just shipped a new feature using React + TypeScript! The developer experience is incredible. Building in public and loving every moment of it.',
      createdAt: new Date().toISOString(),
      likes: 142,
      retweets: 23,
      replies: 8,
      url: 'https://twitter.com/placeholder'
    };
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/twitter/latest`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    if (!response.ok) throw new Error('Failed to fetch tweet');

    return await response.json();
  } catch (error) {
    console.error('Error fetching latest tweet:', error);
    return {
      id: 'error',
      text: 'Unable to load latest tweet. Check API configuration.',
      createdAt: new Date().toISOString(),
      likes: 0,
      retweets: 0,
      replies: 0,
      url: 'https://twitter.com/placeholder'
    };
  }
}
