import { useEffect, useState } from 'react';
import { getLatestYouTubeVideos } from '../services/youtube.service';
import type { YouTubeVideo } from '../types';

export default function WatchingNow() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getLatestYouTubeVideos(3);
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
      <section id="watching-now" className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-800 rounded mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-800 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <section id="watching-now" className="py-32 px-6 bg-black reveal">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 tracking-tight">What I’m Watching 👀</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {videos.slice(0, 3).map((video, index) => {
              const formattedDate = new Date(video.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <div
                  key={video.id}
                  className="group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleVideoClick(video.id)}
                >
                  <div className="relative aspect-video mb-4 overflow-hidden rounded-xl border border-gray-800 group-hover:border-gray-600 transition-all duration-300">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
                      </div>
                    </div>
                  </div>

                  <div className="px-2">
                    <h3 className="text-lg font-medium text-gray-100 mb-2 line-clamp-2 group-hover:text-white transition-colors">
                      {video.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="font-light">{formattedDate}</span>
                      {video.views && (
                        <>
                          <span className="w-1 h-1 bg-gray-600 rounded-full" />
                          <span className="font-light">{video.views.toLocaleString()} views</span>
                        </>
                      )}
                      {video.likes && (
                        <>
                          <span className="w-1 h-1 bg-gray-600 rounded-full" />
                          <span className="font-light">{video.likes.toLocaleString()} likes</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <a
            href="https://www.youtube.com/playlist?list=PLVFX2B2opoKkmpLq7HV8GtbcXO7Gb4gJp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-light text-gray-300 hover:text-white transition-colors relative group"
          >
            Watch playlist on YouTube
            <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </section>

      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6"
          onClick={closeModal}
        >
          <div className="relative w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-400 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="YouTube video player"
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
