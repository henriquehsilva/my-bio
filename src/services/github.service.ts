import type { GitHubProject } from '../types';

export async function getFeaturedProjects(): Promise<GitHubProject[]> {
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'henriquesilva';
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const placeholderProjects: GitHubProject[] = [
    {
      id: '1',
      name: 'ml-pipeline-framework',
      description: 'Production-ready machine learning pipeline framework with automated data processing, model training, and deployment capabilities.',
      language: 'Python',
      stars: 324,
      forks: 45,
      url: 'https://github.com/placeholder/ml-pipeline-framework'
    },
    {
      id: '2',
      name: 'react-analytics-dashboard',
      description: 'Modern analytics dashboard built with React, TypeScript, and D3.js. Real-time data visualization with customizable widgets.',
      language: 'TypeScript',
      stars: 189,
      forks: 32,
      url: 'https://github.com/placeholder/react-analytics-dashboard'
    },
    {
      id: '3',
      name: 'ai-code-reviewer',
      description: 'AI-powered code review assistant that provides intelligent suggestions and identifies potential bugs using machine learning.',
      language: 'Python',
      stars: 567,
      forks: 78,
      url: 'https://github.com/placeholder/ai-code-reviewer'
    },
    {
      id: '4',
      name: 'distributed-data-processor',
      description: 'Scalable distributed system for processing large datasets. Built with Apache Spark and optimized for cloud deployment.',
      language: 'Scala',
      stars: 234,
      forks: 41,
      url: 'https://github.com/placeholder/distributed-data-processor'
    },
    {
      id: '5',
      name: 'neural-network-playground',
      description: 'Interactive neural network visualization tool. Experiment with different architectures and see results in real-time.',
      language: 'JavaScript',
      stars: 445,
      forks: 89,
      url: 'https://github.com/placeholder/neural-network-playground'
    }
  ];

  if (!token) {
    return placeholderProjects;
  }

  try {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json'
    };

    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=stars&per_page=5`,
      { headers }
    );

    if (!response.ok) throw new Error('Failed to fetch GitHub projects');

    const repos = await response.json();

    return repos.map((repo: any) => ({
      id: repo.id.toString(),
      name: repo.name,
      description: repo.description || 'No description available',
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url
    }));
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return placeholderProjects;
  }
}
