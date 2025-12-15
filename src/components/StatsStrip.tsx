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
      <section className="py-20 px-6 bg-black border-y border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-800 rounded" />
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
        { label: 'Stars', value: stats.github.totalStars }
      ]
    },
    {
      platform: 'YouTube',
      metrics: [
        { label: 'Subscribers', value: stats.youtube.subscribers },
        { label: 'Views', value: stats.youtube.totalViews }
      ]
    },
    {
      platform: 'Substack',
      metrics: [
        { label: 'Subscribers', value: stats.substack.subscribers }
      ]
    },
    {
      platform: 'Medium',
      metrics: [
        { label: 'Followers', value: stats.medium.followers }
      ]
    },
    {
      platform: 'X',
      metrics: [
        { label: 'Followers', value: stats.twitter.followers }
      ]
    },
    {
      platform: 'Instagram',
      metrics: [
        { label: 'Followers', value: stats.instagram.followers }
      ]
    }
  ];

  return (
    <section className="py-20 px-6 bg-black border-y border-gray-900 reveal">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {statsData.map((stat, index) => (
            <div
              key={stat.platform}
              className="text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-xs font-light tracking-widest uppercase text-gray-500 mb-4">
                {stat.platform}
              </div>
              <div className="space-y-2">
                {stat.metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="text-3xl font-bold text-gray-100 mb-1">
                      {metric.value.toLocaleString()}
                    </div>
                    <div className="text-xs font-light text-gray-400">
                      {metric.label}
                    </div>
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
