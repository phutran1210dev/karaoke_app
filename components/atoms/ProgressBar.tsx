'use client';

import React, { useEffect, useState } from 'react';
import type { KaraokeState } from '@/types/karaoke';

interface ProgressBarProps {
  karaokeState: KaraokeState;
  onSeek: (time: number) => void;
  player: unknown; // YouTube player instance
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  karaokeState,
  onSeek,
  player,
  className = ''
}) => {
  const [realtimeCurrentTime, setRealtimeCurrentTime] = useState(0);
  const [realtimeDuration, setRealtimeDuration] = useState(0);

  // Update realtime duration and current time
  useEffect(() => {
    if (!player || !karaokeState.isPlaying) return;

    const updateRealtime = () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ytPlayer = player as any;
        const currentTime = ytPlayer.getCurrentTime();
        const duration = ytPlayer.getDuration();
        
        setRealtimeCurrentTime(currentTime);
        setRealtimeDuration(duration);
      } catch (error) {
        // Handle player not ready
        console.log('Player not ready:', error);
      }
    };

    // Update every 100ms for smooth progress
    const interval = setInterval(updateRealtime, 100);
    
    return () => clearInterval(interval);
  }, [player, karaokeState.isPlaying]);

  // Use realtime values when playing, fallback to karaokeState when paused
  const currentTime = karaokeState.isPlaying ? realtimeCurrentTime : karaokeState.currentTime;
  const duration = realtimeDuration > 0 ? realtimeDuration : karaokeState.duration;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentageClicked = (clickX / rect.width) * 100;
    const newTime = (percentageClicked / 100) * duration;
    onSeek(newTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Time display */}
      <div className="flex justify-between items-center text-xs sm:text-sm text-primary-600 kawaii-text">
        <span>{formatTime(currentTime)}</span>
        <span className="text-primary-500">
          {karaokeState.isPlaying ? '🎵 Playing' : '⏸️ Paused'}
        </span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Progress bar */}
      <div 
        className="relative h-3 bg-primary-200 rounded-full cursor-pointer overflow-hidden cute-shadow"
        onClick={handleClick}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-primary-100 to-primary-200"></div>
        
        {/* Progress fill */}
        <div 
          className="absolute top-0 left-0 h-full bg-linear-to-r from-pink-400 via-purple-400 to-pink-500 
                     transition-all duration-200 ease-out rounded-full"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        >
          {/* Animated shine effect */}
          <div className="absolute top-0 left-0 h-full w-full bg-linear-to-r from-transparent via-white/30 to-transparent 
                         animate-shimmer rounded-full"></div>
        </div>

        {/* Current position indicator */}
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-pink-400 
                     rounded-full shadow-lg transition-all duration-200 ease-out hover:scale-110"
          style={{ left: `calc(${Math.min(100, Math.max(0, progress))}% - 8px)` }}
        >
          <div className="absolute inset-1 bg-pink-400 rounded-full animate-pulse"></div>
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 bg-linear-to-r from-pink-300/20 to-purple-300/20 
                       opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-full"></div>
      </div>

      {/* Progress percentage */}
      <div className="text-center">
        <span className="text-xs text-primary-500 kawaii-text">
          {progress.toFixed(1)}% • {Math.floor(currentTime)}s / {Math.floor(duration)}s
        </span>
      </div>
    </div>
  );
};