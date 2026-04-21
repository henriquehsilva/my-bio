import { useEffect, useState } from 'react';
import { getFeaturedProjects } from '../services/github.service';
import type { GitHubProject } from '../types';
import { ArrowRight } from 'lucide-react';

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
      <section id="featured-projects" className="py-16 sm:py-24 px-4 sm:px-6 bg-black">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="h-7 w-48 bg-gray-800/60 rounded mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-56 bg-gray-800/40 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="featured-projects" className="py-16 sm:py-24 px-4 sm:px-6 bg-black reveal">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10 sm:mb-14">
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-2">Open Source</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Featured Projects</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white/[0.03] border border-white/8 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="flex items-start justify-between mb-4 gap-3">
                <h3 className="text-base font-semibold text-gray-100 leading-snug">
                  {project.name}
                </h3>
                <span className="shrink-0 text-[10px] font-medium text-gray-500 uppercase tracking-wider bg-white/5 px-2 py-1 rounded-md">
                  {project.language}
                </span>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-5 line-clamp-3">
                {project.description}
              </p>

              <div className="flex items-center justify-between border-t border-white/6 pt-4">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{project.stars.toLocaleString()} Stars</span>
                  <span>{project.forks.toLocaleString()} Forks</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 sm:mt-14 text-center">
          <a
            href="https://github.com/henriquehsilva"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors"
          >
            Ver todos os projetos
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
