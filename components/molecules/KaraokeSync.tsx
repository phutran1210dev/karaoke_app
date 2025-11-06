'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import type { LyricsData } from '@/types/lyrics';
import type { GirlAnimationState } from '@/types/karaoke';

interface KaraokeSyncProps {
  lyrics: LyricsData | null;
  isPlaying: boolean;
  currentTime: number; // in seconds
  onAnimationChange: (state: GirlAnimationState) => void;
  onCurrentLyricChange: (lyricIndex: number) => void;
}

export const KaraokeSync: React.FC<KaraokeSyncProps> = ({
  lyrics,
  isPlaying,
  currentTime,
  onAnimationChange,
  onCurrentLyricChange
}) => {
  const currentLyricIndexRef = useRef(-1);
  const previousLyricIndexRef = useRef(-1);

  // Find current lyric based on time
  const findCurrentLyric = useCallback((time: number) => {
    if (!lyrics || !lyrics.lines.length) return -1;
    
    for (let i = 0; i < lyrics.lines.length; i++) {
      const line = lyrics.lines[i];
      if (time >= line.startTime && time < line.endTime) {
        return i;
      }
    }
    
    return -1;
  }, [lyrics]);

  // Analyze lyrics content for dance style
  const analyzeLyricsForDanceStyle = useCallback((lyricText: string): GirlAnimationState['mood'] => {
    const text = lyricText.toLowerCase();
    
    // High energy words
    if (text.includes('dance') || text.includes('party') || text.includes('jump') || 
        text.includes('rock') || text.includes('beat') || text.includes('pump')) {
      return 'dancing';
    }
    
    // Rock/metal style
    if (text.includes('rock') || text.includes('metal') || text.includes('bang') ||
        text.includes('scream') || text.includes('wild')) {
      return 'headbanging';
    }
    
    // Spinning/twirling
    if (text.includes('spin') || text.includes('turn') || text.includes('round') ||
        text.includes('twirl') || text.includes('circle')) {
      return 'spinning';
    }
    
    // Singing focused
    if (text.includes('sing') || text.includes('voice') || text.includes('song') ||
        text.includes('melody') || text.includes('harmony')) {
      return 'singing';
    }
    
    // Excited/happy
    if (text.includes('happy') || text.includes('joy') || text.includes('love') ||
        text.includes('amazing') || text.includes('wonderful') || text.includes('excited')) {
      return 'excited';
    }
    
    // Default to dancing for most lyrics
    return 'dancing';
  }, []);

  // Calculate dance intensity based on lyric content and timing
  const calculateDanceIntensity = useCallback((lyricText: string, timeSinceStart: number) => {
    const text = lyricText.toLowerCase();
    let baseIntensity = 0.5;
    
    // High energy words increase intensity
    if (text.includes('dance') || text.includes('jump') || text.includes('party')) baseIntensity += 0.3;
    if (text.includes('rock') || text.includes('wild') || text.includes('crazy')) baseIntensity += 0.4;
    if (text.includes('love') || text.includes('heart') || text.includes('amazing')) baseIntensity += 0.2;
    
    // Add rhythmic variation
    const rhythmicBoost = Math.sin(timeSinceStart * 2) * 0.2;
    
    return Math.min(1.0, Math.max(0.2, baseIntensity + rhythmicBoost));
  }, []);

  // Get color based on mood and lyrics
  const getDanceColor = useCallback((mood: GirlAnimationState['mood'], lyricText: string) => {
    const text = lyricText.toLowerCase();
    
    // Emotion-based colors
    if (text.includes('love') || text.includes('heart')) return '#FF69B4'; // Pink
    if (text.includes('happy') || text.includes('joy')) return '#FFD700'; // Gold
    if (text.includes('sad') || text.includes('blue')) return '#87CEEB'; // Sky blue
    if (text.includes('angry') || text.includes('mad')) return '#FF4500'; // Red orange
    if (text.includes('cool') || text.includes('chill')) return '#40E0D0'; // Turquoise
    if (text.includes('fire') || text.includes('hot')) return '#FF6347'; // Tomato
    if (text.includes('green') || text.includes('nature')) return '#98FB98'; // Pale green
    if (text.includes('purple') || text.includes('magic')) return '#DDA0DD'; // Plum
    
    // Mood-based default colors
    switch (mood) {
      case 'dancing': return '#FF1493'; // Deep pink
      case 'headbanging': return '#FF4500'; // Orange red
      case 'spinning': return '#9370DB'; // Medium purple
      case 'singing': return '#FFB6C1'; // Light pink
      case 'excited': return '#FFD700'; // Gold
      default: return '#F472B6'; // Default pink
    }
  }, []);

  // Main sync effect
  useEffect(() => {
    if (!isPlaying) {
      // Default idle animation when not playing
      onAnimationChange({
        mood: 'idle',
        intensity: 0.3,
        color: '#F472B6'
      });
      currentLyricIndexRef.current = -1;
      return;
    }

    const newIndex = findCurrentLyric(currentTime);
    
    if (newIndex !== currentLyricIndexRef.current) {
      previousLyricIndexRef.current = currentLyricIndexRef.current;
      currentLyricIndexRef.current = newIndex;
      
      if (newIndex >= 0) {
        onCurrentLyricChange(newIndex);
      }
    }
    
    if (!lyrics || newIndex === -1) {
      // No current lyric, use idle animation
      onAnimationChange({
        mood: 'idle',
        intensity: 0.3,
        color: '#F472B6'
      });
      return;
    }

    const currentLyric = lyrics.lines[newIndex];
    if (!currentLyric) return;

    const lyricText = currentLyric.text;
    const timeSinceStart = currentTime - currentLyric.startTime;
    
    const mood = analyzeLyricsForDanceStyle(lyricText);
    const intensity = calculateDanceIntensity(lyricText, timeSinceStart);
    const color = getDanceColor(mood, lyricText);

    onAnimationChange({
      mood,
      intensity,
      color
    });

    // Special effects for lyric transitions
    if (newIndex !== previousLyricIndexRef.current && newIndex >= 0) {
      const text = lyricText.toLowerCase();
      
      // Special animations for certain words
      if (text.includes('jump') || text.includes('fly')) {
        onAnimationChange({
          mood: 'excited',
          intensity: 1.0,
          color: '#FFD700'
        });
        
        // Return to normal after a brief moment
        setTimeout(() => {
          const normalMood = analyzeLyricsForDanceStyle(text);
          const normalIntensity = calculateDanceIntensity(text, 0);
          const normalColor = getDanceColor(normalMood, text);
          
          onAnimationChange({ mood: normalMood, intensity: normalIntensity, color: normalColor });
        }, 500);
      }
    }
  }, [
    isPlaying,
    currentTime,
    lyrics,
    onAnimationChange,
    onCurrentLyricChange,
    findCurrentLyric,
    analyzeLyricsForDanceStyle,
    calculateDanceIntensity,
    getDanceColor
  ]);

  return null; // This component only manages sync logic, no UI
};