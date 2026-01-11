export interface Tweet {
  id: string;
  text: string;
  createdAt: string;
  likes: number;
  retweets: number;
  replies: number;
  url: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  timestamp: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  videoUrl?: string;
  permalink?: string;
}
export interface StoryItem {
  id: string;
  type: 'IMAGE' | 'VIDEO' | 'SPOTIFY';
  url: string;
  thumbnail?: string;
  caption?: string;
  timestamp: string;
  permalink?: string;
}

export interface SubstackPost {
  title: string;
  date: string;
  excerpt: string;
  readingTime: string;
  url: string;
  views?: number;
  likes?: number;
  comments?: number;
  subscribers?: number;
}

export interface GitHubProject {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
}

export interface MediumPost {
  title: string;
  date: string;
  excerpt: string;
  readingTime: string;
  url: string;
  claps?: number;
  responses?: number;
  reads?: number;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
  views?: number;
  likes?: number;
}

export interface SocialStats {
  github: {
    totalRepos: number;
    totalStars: number;
  };
  youtube: {
    subscribers: number;
    totalViews: number;
  };
  substack: {
    subscribers: number;
  };
  medium: {
    followers: number;
  };
  twitter: {
    followers: number;
  };
  instagram: {
    followers: number;
  };
}
