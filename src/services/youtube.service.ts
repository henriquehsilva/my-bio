import type { YouTubeVideo } from '../types';

export async function getLatestYouTubeVideos(count: number = 3): Promise<YouTubeVideo[]> {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

  const placeholderVideos: YouTubeVideo[] = [
    {
      id: '1',
      title: 'Building a Real-Time ML Model Deployment Pipeline',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=640',
      publishedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      url: 'https://youtube.com/watch?v=placeholder1',
      views: 12450,
      likes: 834
    },
    {
      id: '2',
      title: 'Advanced React Patterns for Large Scale Applications',
      thumbnail: 'https://images.pexels.com/photos/4974920/pexels-photo-4974920.jpeg?auto=compress&cs=tinysrgb&w=640',
      publishedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      url: 'https://youtube.com/watch?v=placeholder2',
      views: 8923,
      likes: 567
    },
    {
      id: '3',
      title: 'From Data Science to Production: A Complete Guide',
      thumbnail: 'https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=640',
      publishedAt: new Date(Date.now() - 9 * 86400000).toISOString(),
      url: 'https://youtube.com/watch?v=placeholder3',
      views: 15234,
      likes: 1023
    }
  ];

  if (!apiKey || !channelId) {
    return placeholderVideos;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${count}`
    );

    if (!response.ok) throw new Error('Failed to fetch YouTube videos');

    const data = await response.json();

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return placeholderVideos;
  }
}
