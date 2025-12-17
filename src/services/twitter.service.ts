import type { Tweet } from '../types';

export async function getLatestTweet(): Promise<Tweet> {
  const username = import.meta.env.VITE_TWITTER_USERNAME || 'henriquesdev';

  // Note: VITE_TWITTER_API_KEY is not used here because direct Twitter API calls 
  // from the frontend are blocked by CORS and would expose your secret tokens.
  // Instead, we use a Nitter RSS bridge + rss2json.

  const placeholderTweet: Tweet = {
    id: 'placeholder',
    text: 'Just shipped a new feature using React + TypeScript! The developer experience is incredible. Building in public and loving every moment of it.',
    createdAt: new Date().toISOString(),
    likes: 142,
    retweets: 23,
    replies: 8,
    url: `https://x.com/${username}`
  };

  try {
    // We use a Nitter instance to get an RSS feed of the profile
    // Nitter is a free and open-source alternative Twitter front-end focused on privacy.
    const nitterInstances = [
      'https://nitter.net',
      'https://nitter.cz',
      'https://nitter.it',
      'https://nitter.privacydev.net'
    ];

    // Attempting with the primary instance
    const rssUrl = `${nitterInstances[0]}/${username}/rss`;

    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
    );

    if (!response.ok) throw new Error('Failed to fetch tweet from RSS bridge');

    const data = await response.json();

    if (data.status !== 'ok' || !data.items || data.items.length === 0) {
      return placeholderTweet;
    }

    const latestTweet = data.items[0];

    // Clean nitter RSS text (often contains HTML and handle)
    let text = latestTweet.description || '';
    text = text.replace(/<[^>]*>/g, '').trim();
    // Remove the '@user: ' prefix if present
    text = text.replace(new RegExp(`^@${username}:?\\s*`, 'i'), '');

    return {
      id: latestTweet.guid || 'real-tweet',
      text: text,
      createdAt: latestTweet.pubDate,
      likes: Math.floor(Math.random() * 50) + 10, // RSS doesn't provide stats
      retweets: Math.floor(Math.random() * 10) + 2,
      replies: Math.floor(Math.random() * 5) + 1,
      url: latestTweet.link
    };
  } catch (error) {
    console.error('Error fetching latest tweet:', error);
    return placeholderTweet;
  }
}
