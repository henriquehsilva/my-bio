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
      timestamp: new Date(Date.now() - i * 86400000).toISOString(),
      mediaType: i === 1 ? 'VIDEO' : 'IMAGE',
      videoUrl: i === 1 ? 'https://videos.pexels.com/video-files/855564/855564-hd_1920_1080_30fps.mp4' : undefined,
      permalink: 'https://instagram.com'
    }));
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,thumbnail_url,permalink&access_token=${accessToken}&limit=${count}`
    );

    if (!response.ok) throw new Error('Failed to fetch Instagram posts');

    const data = await response.json();
    return data.data.map((post: any) => ({
      id: post.id,
      imageUrl: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
      caption: post.caption || '',
      timestamp: post.timestamp,
      mediaType: post.media_type,
      videoUrl: post.media_type === 'VIDEO' ? post.media_url : undefined,
      permalink: post.permalink
    }));
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return Array.from({ length: count }, (_, i) => ({
      id: `error-${i}`,
      imageUrl: `https://images.pexels.com/photos/5380664/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=1920`,
      caption: 'Unable to load Instagram content.',
      timestamp: new Date().toISOString(),
      mediaType: 'IMAGE',
      permalink: 'https://instagram.com'
    }));
  }
}
