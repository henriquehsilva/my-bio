import { useEffect, useState } from 'react';
import { getFeaturedProjects } from '../services/github.service';
import type { GitHubProject } from '../types';

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<GitHubProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getFeaturedProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error loading GitHub projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="featured-projects" className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-gray-800 rounded mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-800 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="featured-projects" className="py-32 px-6 bg-black reveal">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-16 tracking-tight">Featured Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-8 hover:border-gray-600 hover:transform hover:-translate-y-2 transition-all duration-300 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-100 leading-tight flex-1 pr-4">
                  {project.name}
                </h3>
                <span className="text-xs font-light text-gray-500 uppercase tracking-wide whitespace-nowrap">
                  {project.language}
                </span>
              </div>

              <p className="text-sm font-light leading-relaxed text-gray-400 mb-6 line-clamp-3">
                {project.description}
              </p>

              <div className="flex items-center gap-6 mb-6 text-sm text-gray-500 border-t border-gray-800 pt-4">
                <span className="font-light">{project.stars.toLocaleString()} Stars</span>
                <span className="font-light">{project.forks.toLocaleString()} Forks</span>
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-light text-gray-300 hover:text-white transition-colors relative group"
              >
                Open on GitHub
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <a
            href="https://github.com/henriquesilvadev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            See all projects on GitHub
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
