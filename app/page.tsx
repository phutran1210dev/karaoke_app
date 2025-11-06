'use client';

import React, { useState, useCallback } from 'react';
import { ThreeScene } from '@/components/organisms/ThreeScene';
import { YouTubePlayer } from '@/components/molecules/YouTubePlayer';
import { LyricsDisplay } from '@/components/molecules/LyricsDisplay';
import { KaraokeSync } from '@/components/molecules/KaraokeSync';
import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';
import type { KaraokeState, GirlAnimationState } from '@/types/karaoke';
import type { LyricsData } from '@/types/lyrics';
import { LyricsParserService } from '@/lib/lyricsParser';

export default function Home() {
  const [karaokeState, setKaraokeState] = useState<KaraokeState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    youtubeUrl: '',
  });

  const [girlAnimationState, setGirlAnimationState] = useState<GirlAnimationState>({
    mood: 'idle',
    intensity: 0.5,
    color: '#F472B6',
  });

  // Updated lyrics state to use new system
  const parser = new LyricsParserService();
  const [lyricsData, setLyricsData] = useState<LyricsData>(
    parser.getSampleLyrics()
  );
  
  const [currentLyricIndex, setCurrentLyricIndex] = useState<number>(-1);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  const handleKaraokeStateChange = (newState: Partial<KaraokeState>) => {
    setKaraokeState(prev => ({ ...prev, ...newState }));
  };

  const loadSampleLyrics = () => {
    const parser = new LyricsParserService();
    const sampleLyrics = parser.getSampleLyrics();
    setLyricsData(sampleLyrics);
  };

  const handleVideoToggle = (isVideoShown: boolean) => {
    setShowVideo(isVideoShown);
  };

  const handleAnimationChange = useCallback((animationState: GirlAnimationState) => {
    setGirlAnimationState(prev => {
      // Only update if values actually changed to prevent infinite loops
      if (prev.mood !== animationState.mood || 
          prev.intensity !== animationState.intensity || 
          prev.color !== animationState.color) {
        return animationState;
      }
      return prev;
    });
  }, []);

  const handleCurrentLyricChange = useCallback((lyricIndex: number) => {
    setCurrentLyricIndex(lyricIndex);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-cute p-2 sm:p-4 lg:p-6">
      {/* KaraokeSync component for intelligent sync */}
      <KaraokeSync
        lyrics={lyricsData}
        isPlaying={karaokeState.isPlaying}
        currentTime={karaokeState.currentTime}
        onAnimationChange={handleAnimationChange}
        onCurrentLyricChange={handleCurrentLyricChange}
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-700 kawaii-text mb-2 sm:mb-4">
            🎤 Kawaii Karaoke 🎵
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-primary-600 kawaii-text px-4">
            ✨ Sing along with our cute dancing girl! ✨
          </p>
          <div className="flex justify-center gap-1 sm:gap-2 mt-2 sm:mt-4">
            <Icon name="heart" size="md" color="#F472B6" animated />
            <Icon name="sparkle" size="md" color="#E879F9" animated />
            <Icon name="music" size="md" color="#F472B6" animated />
            <Icon name="sparkle" size="md" color="#E879F9" animated />
            <Icon name="heart" size="md" color="#F472B6" animated />
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
          {/* Left side - YouTube Player and Lyrics Display */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-6 order-2 xl:order-1">
            <YouTubePlayer
              onStateChange={handleKaraokeStateChange}
              karaokeState={karaokeState}
              lyrics={lyricsData}
              currentLyricIndex={currentLyricIndex}
              onVideoToggle={handleVideoToggle}
            />

            {/* Quick controls */}
            <Card className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="music" size="md" color="#F472B6" animated />
                  <span className="text-sm font-semibold text-primary-700 kawaii-text">
                    Quick Controls
                  </span>
                </div>
                <button
                  onClick={loadSampleLyrics}
                  className="px-3 py-2 bg-gradient-cute text-white text-sm font-medium rounded-xl 
                           hover:scale-105 transition-transform duration-200 kawaii-text"
                >
                  Load Sample Lyrics 🎵
                </button>
              </div>
            </Card>
            
            {/* Only show LyricsDisplay when video is not visible */}
            {!showVideo && (
              <LyricsDisplay 
                lyrics={lyricsData.lines}
                currentTime={karaokeState.currentTime}
                isPlaying={karaokeState.isPlaying}
              />
            )}
          </div>

          {/* Right side - 3D Scene */}
          <div className="order-1 xl:order-2 xl:sticky xl:top-4">
            <Card className="h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden">
              <div className="flex items-center gap-2 mb-2 sm:mb-4">
                <Icon name="sparkle" size="lg" color="#F472B6" animated />
                <h2 className="text-lg sm:text-xl font-bold text-primary-700 kawaii-text">
                  🌟 Dancing Girl 🌟
                </h2>
              </div>
              <ThreeScene 
                animationState={girlAnimationState}
                isPlaying={karaokeState.isPlaying}
                className="h-full"
              />
            </Card>
          </div>
        </div>

        {/* Footer */}
        <Card className="text-center p-3 sm:p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 items-center">
            <Icon name="heart" size="md" color="#F472B6" animated />
            <p className="text-sm sm:text-base text-primary-600 kawaii-text">
              Made with 💖 for all the karaoke lovers! 
            </p>
            <Icon name="heart" size="md" color="#F472B6" animated />
          </div>
          <p className="text-xs sm:text-sm text-primary-500 mt-2">
            🎵 Paste any YouTube URL and start singing! 🎵
          </p>
        </Card>
      </div>
    </div>
  );
}
