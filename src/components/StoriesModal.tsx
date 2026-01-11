import { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import type { StoryItem } from '../types';

interface StoriesModalProps {
    stories: StoryItem[];
    isOpen: boolean;
    onClose: () => void;
}

export default function StoriesModal({ stories, isOpen, onClose }: StoriesModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const STORY_DURATION = 7000; // 7 seconds per story

    useEffect(() => {
        if (!isOpen) {
            setCurrentIndex(0);
            setProgress(0);
            return;
        }

        const startProgress = () => {
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

            const startTime = Date.now();
            progressIntervalRef.current = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const newProgress = Math.min((elapsed / STORY_DURATION) * 100, 100);
                setProgress(newProgress);

                if (newProgress >= 100) {
                    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
                    handleNext();
                }
            }, 50);
        };

        startProgress();

        return () => {
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        };
    }, [isOpen, currentIndex, stories.length]);

    const handleNext = () => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setProgress(0);
        } else {
            onClose();
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setProgress(0);
        }
    };

    if (!isOpen || stories.length === 0) return null;

    const currentStory = stories[currentIndex];

    const renderContent = () => {
        switch (currentStory.type) {
            case 'VIDEO':
                return (
                    <video
                        src={currentStory.url}
                        autoPlay
                        muted={isMuted}
                        playsInline
                        className="w-full h-full object-cover"
                        onEnded={handleNext}
                    />
                );
            case 'SPOTIFY':
                // Spotify Embed
                return (
                    <div className="w-full h-full bg-neutral-900 flex items-center justify-center p-4">
                        <iframe
                            src={currentStory.url.replace('open.spotify.com/', 'open.spotify.com/embed/')}
                            width="100%"
                            height="352"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            className="rounded-xl shadow-2xl"
                        />
                    </div>
                );
            case 'IMAGE':
            default:
                return (
                    <img
                        src={currentStory.url}
                        alt={currentStory.caption}
                        className="w-full h-full object-cover"
                    />
                );
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center touch-none">
            <div className="relative w-full h-full max-w-lg md:h-[90vh] md:aspect-[9/16] bg-neutral-950 overflow-hidden md:rounded-2xl shadow-2xl flex flex-col">

                {/* Progress Bars */}
                <div className="absolute top-4 left-4 right-4 z-[110] flex gap-1.5">
                    {stories.map((_, index) => (
                        <div key={index} className="h-0.5 flex-1 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white transition-all duration-50"
                                style={{
                                    width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%'
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Header */}
                <div className="absolute top-8 left-4 right-4 z-[110] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                            <img src="/me.png" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white text-xs font-semibold leading-tight">henriquesilvadev</span>
                            <span className="text-white/60 text-[10px]">
                                {currentStory.type === 'SPOTIFY' ? 'Listening now' : new Date(currentStory.timestamp).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {currentStory.type === 'VIDEO' && (
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </button>
                        )}
                        <button onClick={onClose} className="text-white p-2 hover:bg-white/10 rounded-full transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Media Content */}
                <div className="relative flex-1 w-full bg-black flex items-center justify-center">
                    {renderContent()}

                    {/* Caption Overlay */}
                    {currentStory.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-8 pt-20 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none">
                            <p className="text-white text-sm font-light line-clamp-3 leading-relaxed">
                                {currentStory.caption}
                            </p>
                        </div>
                    )}
                </div>

                {/* Invisible Tappable Areas for Navigation */}
                <div className="absolute inset-0 flex z-[105]">
                    <div className="w-[30%] h-full cursor-pointer" onClick={(e) => { e.stopPropagation(); handlePrev(); }} />
                    <div className="w-[70%] h-full cursor-pointer" onClick={(e) => { e.stopPropagation(); handleNext(); }} />
                </div>
            </div>

            {/* Desktop Controls */}
            <div className="hidden md:block">
                <button
                    onClick={handlePrev}
                    className={`absolute left-8 top-1/2 -translate-y-1/2 p-4 text-white/40 hover:text-white transition-colors ${currentIndex === 0 ? 'invisible' : ''}`}
                >
                    <ChevronLeft className="w-12 h-12" />
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-8 top-1/2 -translate-y-1/2 p-4 text-white/40 hover:text-white transition-colors"
                >
                    <ChevronRight className="w-12 h-12" />
                </button>
            </div>
        </div>
    );
}
