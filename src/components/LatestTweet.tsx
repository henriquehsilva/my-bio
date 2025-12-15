import { useEffect, useState } from 'react';
import { getLatestTweet } from '../services/twitter.service';
import type { Tweet } from '../types';

export default function LatestTweet() {
  const [tweet, setTweet] = useState<Tweet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const data = await getLatestTweet();
        setTweet(data);
      } catch (error) {
        console.error('Error loading tweet:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTweet();
  }, []);

  if (loading) {
    return (
      <section id="latest-tweet" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-4 w-32 bg-gray-800 rounded mb-6" />
            <div className="h-24 bg-gray-800 rounded" />
          </div>
        </div>
      </section>
    );
  }

  if (!tweet) return null;

  const formattedDate = new Date(tweet.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <section id="latest-tweet" className="py-20 px-6 reveal">
      <div className="max-w-4xl mx-auto">
        <div className="inline-block mb-6">
          <span className="text-xs font-light tracking-widest uppercase text-gray-400 border border-gray-700 px-4 py-2 rounded-full">
            Latest Tweet
          </span>
        </div>

        <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300">
          <p className="text-xl font-light leading-relaxed mb-6 text-gray-100">{tweet.text}</p>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="font-light">{formattedDate}</span>
              <div className="flex items-center gap-4">
                <span className="font-light">{tweet.likes.toLocaleString()} Likes</span>
                <span className="font-light">{tweet.retweets.toLocaleString()} Retweets</span>
                <span className="font-light">{tweet.replies.toLocaleString()} Replies</span>
              </div>
            </div>

            <a
              href={tweet.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-light text-gray-300 hover:text-white transition-colors relative group"
            >
              View on X
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {tweet.id === 'placeholder' && (
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500 font-light">
                Connect Twitter API to display real tweets
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
