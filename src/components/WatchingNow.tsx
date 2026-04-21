import { useEffect, useState } from 'react';
import { getLatestYouTubeVideos, YOUTUBE_PLAYLISTS } from '../services/youtube.service';
import type { YouTubeVideo } from '../types';
import { Play, X } from 'lucide-react';

export default function WatchingNow() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getLatestYouTubeVideos(YOUTUBE_PLAYLISTS.WATCHING_NOW, 9);
        setVideos(data);
      } catch (error) {
        console.error('Error loading YouTube videos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <section id="watching-now" className="py-16 sm:py-24 px-4 sm:px-6 bg-black">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="h-7 w-48 bg-gray-800/60 rounded mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-video bg-gray-800/40 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="watching-now" className="py-16 sm:py-24 px-4 sm:px-6 bg-black reveal">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-14">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-2">YouTube</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Curso de Python</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {videos.map((video, index) => {
              const formattedDate = new Date(video.publishedAt).toLocaleDateString('pt-BR', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <button
                  key={video.id}
                  className="group text-left"
                  style={{ transitionDelay: `${index * 60}ms` }}
                  onClick={() => setSelectedVideo(video.id)}
                >
                  <div className="relative aspect-video mb-3 overflow-hidden rounded-xl border border-white/8 group-hover:border-white/20 transition-all duration-300">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                        <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-sm font-medium text-gray-200 mb-1.5 line-clamp-2 group-hover:text-white transition-colors">
                    {video.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{formattedDate}</span>
                    {video.views && (
                      <>
                        <span className="w-1 h-1 bg-gray-600 rounded-full" />
                        <span>{video.views.toLocaleString()} views</span>
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <a
            href={`https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLISTS.WATCHING_NOW}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
          >
            Ver playlist completa no YouTube
            <span className="w-0 group-hover:w-4 overflow-hidden transition-all duration-200">→</span>
          </a>
        </div>
      </section>

      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors p-1"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
