import type { YouTubeVideo } from '../types';

export const YOUTUBE_PLAYLISTS = {
  WATCHING_NOW: 'PLVFX2B2opoKkmpLq7HV8GtbcXO7Gb4gJp',
  STUDY_JOURNEY: 'PLVFX2B2opoKldIrw-D1dSh1YgCX3gmW16'
};

export async function getLatestYouTubeVideos(playlistId: string = YOUTUBE_PLAYLISTS.WATCHING_NOW, count: number = 3): Promise<YouTubeVideo[]> {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

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

  if (!apiKey) {
    return placeholderVideos;
  }

  try {
    // Fetch from playlist instead of channel search
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${playlistId}&part=snippet,contentDetails&maxResults=${count}`
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
      .map((item: any) => ({
        id: item.contentDetails.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        publishedAt: item.snippet.publishedAt,
        url: `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`
      }));
  } catch (error) {
    console.error('Error in getLatestYouTubeVideos:', error);
    return placeholderVideos;
  }
}
