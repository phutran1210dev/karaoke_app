'use client';

import React from 'react';
import type { LyricsData } from '@/types/lyrics';

interface LyricsCaptionProps {
  lyrics: LyricsData | null;
  currentLyricIndex: number;
  className?: string;
}

export const LyricsCaption: React.FC<LyricsCaptionProps> = ({
  lyrics,
  currentLyricIndex,
  className = ''
}) => {
  if (!lyrics || !lyrics.lines.length || currentLyricIndex < 0) {
    return null;
  }

  const currentLyric = lyrics.lines[currentLyricIndex];
  const nextLyric = lyrics.lines[currentLyricIndex + 1];

  return (
    <div className={`
      absolute bottom-4 left-4 right-4 z-10 
      bg-black/80 backdrop-blur-sm rounded-xl p-4 
      text-center transition-all duration-500 
      ${className}
    `}>
      {/* Current lyric */}
      <div className="text-white font-bold text-lg sm:text-xl lg:text-2xl 
                     text-shadow-lg kawaii-text mb-2 
                     animate-pulse">
        {currentLyric?.text}
      </div>
      
      {/* Next lyric preview */}
      {nextLyric && (
        <div className="text-white/70 text-sm sm:text-base 
                       kawaii-text opacity-60">
          Next: {nextLyric.text}
        </div>
      )}
      
      {/* Decorative elements */}
      <div className="flex justify-center gap-2 mt-2">
        <span className="text-pink-300 text-xs animate-bounce">🎵</span>
        <span className="text-purple-300 text-xs animate-bounce delay-100">✨</span>
        <span className="text-pink-300 text-xs animate-bounce delay-200">🎤</span>
        <span className="text-purple-300 text-xs animate-bounce delay-300">💖</span>
      </div>
    </div>
  );
};