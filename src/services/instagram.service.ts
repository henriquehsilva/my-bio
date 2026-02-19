import type { InstagramPost } from '../types';

export async function getLatestInstagramPosts(count: number = 5): Promise<InstagramPost[]> {
  const staticPosts = await loadFromStaticJson(count);
  if (staticPosts.length > 0) return staticPosts;

  return buildPlaceholders(count, 'Unable to load Instagram content.');
}

async function loadFromStaticJson(count: number): Promise<InstagramPost[]> {
  try {
    const response = await fetch('/instagram.json', { cache: 'no-store' });
    if (!response.ok) return [];
    const data = await response.json();
    if (!Array.isArray(data)) return [];
    return data.slice(0, count);
  } catch {
    return [];
  }
}

function buildPlaceholders(count: number, caption: string): InstagramPost[] {
  const ids = ['5380664', '5483077', '3861969', '4974920', '5926382'];
  return Array.from({ length: count }, (_, i) => ({
    id: `placeholder-${i}`,
    imageUrl: `https://images.pexels.com/photos/${ids[i % ids.length]}/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=1920`,
    caption,
    timestamp: new Date(Date.now() - i * 86400000).toISOString(),
    mediaType: i === 1 ? 'VIDEO' : 'IMAGE',
    videoUrl: i === 1 ? 'https://videos.pexels.com/video-files/855564/855564-hd_1920_1080_30fps.mp4' : undefined,
    permalink: 'https://instagram.com'
  }));
}
