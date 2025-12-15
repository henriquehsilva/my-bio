import type { SocialStats } from '../types';

export async function getSocialStats(): Promise<SocialStats> {
  const placeholderStats: SocialStats = {
    github: {
      totalRepos: 47,
      totalStars: 2184
    },
    youtube: {
      subscribers: 8543,
      totalViews: 234567
    },
    substack: {
      subscribers: 1456
    },
    medium: {
      followers: 3421
    },
    twitter: {
      followers: 5678
    },
    instagram: {
      followers: 4321
    }
  };

  const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || 'henriquesilva';
  const githubToken = import.meta.env.VITE_GITHUB_TOKEN;

  try {
    const stats = { ...placeholderStats };

    if (githubToken) {
      const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token ${githubToken}`
      };

      const userResponse = await fetch(`https://api.github.com/users/${githubUsername}`, { headers });
      if (userResponse.ok) {
        const userData = await userResponse.json();
        stats.github.totalRepos = userData.public_repos;
      }

      const reposResponse = await fetch(
        `https://api.github.com/users/${githubUsername}/repos?per_page=100`,
        { headers }
      );
      if (reposResponse.ok) {
        const repos = await reposResponse.json();
        stats.github.totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
      }
    }

    return stats;
  } catch (error) {
    console.error('Error fetching social stats:', error);
    return placeholderStats;
  }
}
