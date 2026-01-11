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
    },
    {
      id: 'placeholder4',
      title: 'Dominando o Framework de IA',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=compress&cs=tinysrgb&w=640',
      publishedAt: new Date(Date.now() - 12 * 86400000).toISOString(),
      url: 'https://youtube.com/watch?v=placeholder4',
      views: 2100,
      likes: 145
    },
    {
      id: 'placeholder5',
      title: 'Clean Code em Projetos Modernos',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=compress&cs=tinysrgb&w=640',
      publishedAt: new Date(Date.now() - 15 * 86400000).toISOString(),
      url: 'https://youtube.com/watch?v=placeholder5',
      views: 1850,
      likes: 120
    },
    {
      id: 'placeholder6',
      title: 'O Futuro da Programação com Agentes AI',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=compress&cs=tinysrgb&w=640',
      publishedAt: new Date(Date.now() - 18 * 86400000).toISOString(),
      url: 'https://youtube.com/watch?v=placeholder6',
      views: 3200,
      likes: 230
    },
    {
      id: 'placeholder7',
      title: 'Arquitetura de Sistemas Escaláveis',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=compress&cs=tinysrgb&w=640',
      publishedAt: new Date(Date.now() - 21 * 86400000).toISOString(),
      url: 'https://youtube.com/watch?v=placeholder7',
      views: 1400,
      likes: 95
    },
    {
      id: 'placeholder8',
      title: 'Deep Learning na Prática',
      thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd482180c?auto=compress&cs=tinysrgb&w=640',
      publishedAt: new Date(Date.now() - 25 * 86400000).toISOString(),
      url: 'https://youtube.com/watch?v=placeholder8',
      views: 2500,
      likes: 180
    },
    {
      id: 'placeholder9',
      title: 'Deploy Contínuo e DevOps de Elite',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=compress&cs=tinysrgb&w=640',
      publishedAt: new Date(Date.now() - 30 * 86400000).toISOString(),
      url: 'https://youtube.com/watch?v=placeholder9',
      views: 2900,
      likes: 210
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
