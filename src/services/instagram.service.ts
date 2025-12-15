import type { InstagramPost } from '../types';

export async function getLatestInstagramPosts(count: number = 5): Promise<InstagramPost[]> {
  const accessToken = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    return Array.from({ length: count }, (_, i) => ({
      id: `placeholder-${i}`,
      imageUrl: `https://images.pexels.com/photos/${[
        '5380664',
        '5483077',
        '3861969',
        '4974920',
        '5926382'
      ][i]}/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=1920`,
      caption: `Placeholder post ${i + 1}. Connect Instagram API to display your real content.`,
      timestamp: new Date(Date.now() - i * 86400000).toISOString()
    }));
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp&access_token=${accessToken}&limit=${count}`
    );

    if (!response.ok) throw new Error('Failed to fetch Instagram posts');

    const data = await response.json();
    return data.data.map((post: any) => ({
      id: post.id,
      imageUrl: post.media_url,
      caption: post.caption || '',
      timestamp: post.timestamp
    }));
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return Array.from({ length: count }, (_, i) => ({
      id: `error-${i}`,
      imageUrl: `https://images.pexels.com/photos/5380664/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=1920`,
      caption: 'Unable to load Instagram content.',
      timestamp: new Date().toISOString()
    }));
  }
}
