import type { GitHubProject } from '../types';

export async function getFeaturedProjects(): Promise<GitHubProject[]> {
  const username = 'henriquesilvadev';
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  try {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json'
    };

    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    // Fetch more repos to have better filtering options
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      { headers }
    );

    if (!response.ok) throw new Error(`Failed to fetch GitHub projects: ${response.statusText}`);

    const repos = await response.json();

    // Filter and process repositories
    const filteredRepos = repos
      .filter((repo: any) => {
        // Exclude forks
        if (repo.fork) return false;

        // Exclude specific repos that might not be projects (e.g., the profile owner repo or tiny ones)
        if (repo.name === username) return false;

        return true;
      })
      .map((repo: any) => ({
        id: repo.id.toString(),
        name: repo.name,
        description: repo.description || 'No description provided.',
        language: repo.language || 'Mixed',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        updatedAt: new Date(repo.updated_at).getTime()
      }))
      .sort((a: any, b: any) => {
        // Sort by stars first, then by recent updates
        if (b.stars !== a.stars) {
          return b.stars - a.stars;
        }
        return b.updatedAt - a.updatedAt;
      })
      .slice(0, 9) // Get top 9 projects for a better grid (3x3)
      .map(({ updatedAt, ...repo }: any) => repo);

    return filteredRepos;
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
}
