import type { YouTubeVideo } from '../types';

export async function getLatestYouTubeVideos(count: number = 3): Promise<YouTubeVideo[]> {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'UCxX1p2y0s4Wb7q9g3z8q9rQ'; // Fallback to henriquesilvaplay ID

  const placeholderVideos: YouTubeVideo[] = [
    {
      id: 'k6m4K_9fV1o',
      title: 'Realidade Virtual no PSVR2 - Imersão Absurda!',
      thumbnail: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=compress&cs=tinysrgb&w=640',
      publishedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      url: 'https://youtube.com/watch?v=k6m4K_9fV1o',
      views: 1240,
      likes: 85
    },
    {
      id: 'z-XN3_placeholder2',
      title: 'Explorando Mundos Abertos no PS5',
      thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=compress&cs=tinysrgb&w=640',
      publishedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      url: 'https://youtube.com/watch?v=z-XN3_placeholder2',
      views: 890,
      likes: 56
    },
    {
      id: '3-XN3_placeholder3',
      title: 'Desafios Épicos e Gameplays Autênticos',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=compress&cs=tinysrgb&w=640',
      publishedAt: new Date(Date.now() - 9 * 86400000).toISOString(),
      url: 'https://youtube.com/watch?v=3-XN3_placeholder3',
      views: 1520,
      likes: 102
    }
  ];

  if (!apiKey || !channelId) {
    return placeholderVideos;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${count}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('YouTube API Error:', response.status, errorData);
      throw new Error(`Failed to fetch YouTube videos: ${response.status}`);
    }

    const data = await response.json();

    if (!data.items) {
      console.warn('YouTube API returned no items:', data);
      return placeholderVideos;
    }

    return data.items
      .filter((item: any) => item.id.kind === 'youtube#video')
      .slice(0, count) // Strictly limit to the requested count
      .map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        publishedAt: item.snippet.publishedAt,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`
      }));
  } catch (error) {
    console.error('Error in getLatestYouTubeVideos:', error);
    return placeholderVideos;
  }
}
