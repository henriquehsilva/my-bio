import { useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import type { InstagramPost } from '../types';

interface ReelsModalProps {
    reels: InstagramPost[];
    isOpen: boolean;
    onClose: () => void;
}

export default function ReelsModal({ reels, isOpen, onClose }: ReelsModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleNext = () => {
        if (currentIndex < reels.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            onClose();
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    if (!isOpen || reels.length === 0) return null;

    const currentReel = reels[currentIndex];

    return (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center touch-none">
            <div className="relative w-full h-full max-w-lg md:h-[90vh] md:aspect-[9/16] bg-neutral-950 overflow-hidden md:rounded-2xl shadow-2xl flex flex-col">

                {/* Header */}
                <div className="absolute top-6 left-4 right-4 z-[110] flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                            <img src="/me.png" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white text-xs font-semibold leading-tight">henriquesilvadev</span>
                            <span className="text-white/60 text-[10px]">Reels</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 pointer-events-auto">
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={onClose}
                            className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Video Content */}
                <div className="relative flex-1 w-full bg-black flex items-center justify-center">
                    {currentReel.videoUrl ? (
                        <video
                            ref={videoRef}
                            src={currentReel.videoUrl}
                            autoPlay
                            muted={isMuted}
                            loop
                            playsInline
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => setIsMuted(!isMuted)}
                            onEnded={handleNext}
                        />
                    ) : (
                        <img
                            src={currentReel.imageUrl}
                            alt={currentReel.caption}
                            className="w-full h-full object-cover"
                        />
                    )}

                    {/* Caption Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 pt-20 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none">
                        <p className="text-white text-sm font-light line-clamp-2 leading-relaxed mb-4">
                            {currentReel.caption}
                        </p>
                        <a
                            href={currentReel.permalink || `https://www.instagram.com/reels/${currentReel.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-[10px] text-white/60 hover:text-white transition-colors pointer-events-auto"
                        >
                            View original on Instagram
                        </a>
                    </div>
                </div>

                {/* Invisible Tappable Areas for Navigation */}
                <div className="absolute inset-0 flex z-[105] pointer-events-none">
                    <div className="w-[30%] h-full cursor-pointer pointer-events-auto" onClick={(e) => { e.stopPropagation(); handlePrev(); }} />
                    <div className="w-[70%] h-full cursor-pointer pointer-events-auto" onClick={(e) => { e.stopPropagation(); handleNext(); }} />
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
