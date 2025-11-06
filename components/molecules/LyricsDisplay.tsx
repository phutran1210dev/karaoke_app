'use client';

import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';
import type { LyricsLine } from '@/types/lyrics';

interface LyricsDisplayProps {
  lyrics: LyricsLine[];
  currentTime: number;
  isPlaying: boolean;
}

export const LyricsDisplay: React.FC<LyricsDisplayProps> = ({ 
  lyrics, 
  currentTime, 
  isPlaying 
}) => {
  const currentLyricIndex = lyrics.findIndex(
    (lyric) => currentTime >= lyric.startTime && currentTime <= lyric.endTime
  );

  const nextLyricIndex = lyrics.findIndex(
    (lyric) => currentTime < lyric.startTime
  );

  return (
    <Card className="min-h-[250px] sm:min-h-[300px] sparkle-bg">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Icon name="mic" size="lg" color="#F472B6" animated />
        <h2 className="text-lg sm:text-xl font-bold text-primary-700 kawaii-text">
          🎤 Sing Along! 🎵
        </h2>
        <Icon name="sparkle" size="md" color="#E879F9" animated />
      </div>

      <div className="space-y-3 sm:space-y-4">
        {lyrics.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎵</div>
            <p className="text-base sm:text-lg text-primary-600 kawaii-text px-4">
              Add some lyrics to start singing! ✨
            </p>
            <p className="text-sm text-primary-500 mt-2 px-4">
              No lyrics loaded yet. Add your favorite song! 💖
            </p>
          </div>
        ) : (
          <>
            {/* Previous lyric */}
            {currentLyricIndex > 0 && (
              <div className="text-center">
                <p className="text-primary-400 text-base sm:text-lg kawaii-text opacity-60 transition-all duration-300 px-4">
                  {lyrics[currentLyricIndex - 1].text}
                </p>
              </div>
            )}

            {/* Current lyric */}
            {currentLyricIndex >= 0 && (
              <div className="text-center transform transition-all duration-500">
                <p className={`text-xl sm:text-2xl font-bold kawaii-text transition-all duration-300 px-4 ${
                  isPlaying 
                    ? 'text-primary-600 animate-pulse-soft scale-110' 
                    : 'text-primary-500'
                }`}>
                  {lyrics[currentLyricIndex].text}
                </p>
                <div className="flex justify-center gap-2 mt-2">
                  <Icon name="heart" size="sm" color="#F472B6" animated />
                  <Icon name="sparkle" size="sm" color="#E879F9" animated />
                  <Icon name="heart" size="sm" color="#F472B6" animated />
                </div>
              </div>
            )}

            {/* Next lyric preview */}
            {nextLyricIndex >= 0 && (
              <div className="text-center mt-4 sm:mt-6">
                <p className="text-primary-400 text-sm sm:text-base kawaii-text opacity-50 transition-all duration-300 px-4">
                  Next: {lyrics[nextLyricIndex].text}
                </p>
              </div>
            )}

            {/* Progress indicator */}
            <div className="mt-6 sm:mt-8">
              <div className="flex justify-between text-xs text-primary-500 mb-2">
                <span>Lyrics Progress</span>
                <span>{currentLyricIndex + 1} / {lyrics.length}</span>
              </div>
              <div className="w-full bg-primary-100 rounded-full h-2">
                <div 
                  className="bg-linear-to-r from-primary-400 to-primary-500 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ 
                    width: `${((currentLyricIndex + 1) / lyrics.length) * 100}%` 
                  }}
                />
              </div>
            </div>

            {/* Cute decoration */}
            <div className="flex justify-center gap-2 sm:gap-4 mt-4 sm:mt-6">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="animate-bounce-cute"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <Icon 
                    name="sparkle" 
                    size="sm" 
                    color="#F472B6" 
                    animated 
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Card>
  );
};