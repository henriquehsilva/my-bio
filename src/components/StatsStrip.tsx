import { useEffect, useState } from 'react';
import { getSocialStats } from '../services/stats.service';
import type { SocialStats } from '../types';

export default function StatsStrip() {
  const [stats, setStats] = useState<SocialStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getSocialStats();
        setStats(data);
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="py-14 px-4 sm:px-6 bg-black border-y border-white/6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-800/50 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!stats) return null;

  const statsData = [
    {
      platform: 'GitHub',
      metrics: [
        { label: 'Repos', value: stats.github.totalRepos },
        { label: 'Stars', value: stats.github.totalStars },
      ],
    },
    {
      platform: 'YouTube',
      metrics: [
        { label: 'Inscritos', value: stats.youtube.subscribers },
        { label: 'Views', value: stats.youtube.totalViews },
      ],
    },
    { platform: 'Substack', metrics: [{ label: 'Inscritos', value: stats.substack.subscribers }] },
    { platform: 'Medium', metrics: [{ label: 'Seguidores', value: stats.medium.followers }] },
    { platform: 'X', metrics: [{ label: 'Seguidores', value: stats.twitter.followers }] },
    { platform: 'Instagram', metrics: [{ label: 'Seguidores', value: stats.instagram.followers }] },
  ];

  return (
    <section className="py-14 px-4 sm:px-6 bg-black border-y border-white/6 reveal">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
          {statsData.map((stat, index) => (
            <div
              key={stat.platform}
              className="text-center"
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">
                {stat.platform}
              </p>
              <div className="space-y-1.5">
                {stat.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                      {metric.value.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
