import type { GitHubProject } from '../types';

export async function getFeaturedProjects(): Promise<GitHubProject[]> {
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'henriquesilvadev';
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const placeholderProjects: GitHubProject[] = [
    {
      id: '1',
      name: 'codeimagin',
      description: 'Interactive code visualization tool with Google Gemini integration. Modern UI with PWA support.',
      language: 'JavaScript',
      stars: 0,
      forks: 0,
      url: 'https://github.com/henriquesilvadev/codeimagin'
    },
    {
      id: '2',
      name: 'atividade_cap10',
      description: 'Análise e modelos preditivos de uma base de dados com informações de condições de solo e temperatura.',
      language: 'Jupyter Notebook',
      stars: 0,
      forks: 0,
      url: 'https://github.com/henriquesilvadev/atividade_cap10'
    },
    {
      id: '3',
      name: 'dashboard-python-streamlit',
      description: 'Dashboard interativo desenvolvido com Streamlit para visualização e análise dos dados de irrigação.',
      language: 'Python',
      stars: 0,
      forks: 0,
      url: 'https://github.com/henriquesilvadev/dashboard-python-streamlit'
    },
    {
      id: '4',
      name: 'cap3_fase4',
      description: 'Implementando Algoritmos de Machine Learning com Scikit-learn',
      language: 'Jupyter Notebook',
      stars: 0,
      forks: 0,
      url: 'https://github.com/henriquesilvadev/cap3_fase4'
    },
    {
      id: '5',
      name: 'bone-age-regression',
      description: 'Machine learning model to predict Bone Age of children from Hand X-Ray images.',
      language: 'Jupyter Notebook',
      stars: 0,
      forks: 0,
      url: 'https://github.com/henriquesilvadev/bone-age-regression'
    }
  ];

  try {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json'
    };

    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    // Fetch more repos to have better filtering options
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
      { headers }
    );

    if (!response.ok) throw new Error('Failed to fetch GitHub projects');

    const repos = await response.json();

    // Filter and process repositories
    const filteredRepos = repos
      .filter((repo: any) => {
        // Exclude forks
        if (repo.fork) return false;

        // Exclude repos without descriptions
        if (!repo.description || repo.description.trim() === '') return false;

        // Prioritize repos with meaningful content
        return true;
      })
      .map((repo: any) => ({
        id: repo.id.toString(),
        name: repo.name,
        description: repo.description,
        language: repo.language || 'Unknown',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        updatedAt: new Date(repo.updated_at).getTime()
      }))
      .sort((a: any, b: any) => {
        // Sort by combination of stars and recent updates
        const scoreA = a.stars * 10 + (a.updatedAt / 1000000000);
        const scoreB = b.stars * 10 + (b.updatedAt / 1000000000);
        return scoreB - scoreA;
      })
      .slice(0, 6) // Get top 6 projects
      .map(({ updatedAt, ...repo }: any) => repo); // Remove updatedAt from final result

    // Return filtered repos if we have enough, otherwise use placeholders
    return filteredRepos.length >= 3 ? filteredRepos : placeholderProjects;
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return placeholderProjects;
  }
}
