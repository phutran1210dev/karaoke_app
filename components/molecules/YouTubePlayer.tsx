'use client';

import React, { useState, useCallback } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { LyricsCaption } from '@/components/molecules/LyricsCaption';
import { getYouTubeVideoId } from '@/lib/utils';
import type { KaraokeState } from '@/types/karaoke';
import type { LyricsData } from '@/types/lyrics';

interface YouTubePlayerProps {
  onStateChange: (state: Partial<KaraokeState>) => void;
  karaokeState: KaraokeState;
  lyrics: LyricsData | null;
  currentLyricIndex: number;
  showCaptions?: boolean;
  onVideoToggle?: (showVideo: boolean) => void;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ 
  onStateChange, 
  karaokeState,
  lyrics,
  currentLyricIndex,
  showCaptions = true,
  onVideoToggle
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [player, setPlayer] = useState<any>(null);

  const handleUrlSubmit = useCallback(() => {
    const videoId = getYouTubeVideoId(urlInput);
    if (!videoId) {
      setError('Please enter a valid YouTube URL');
      return;
    }
    
    setError('');
    onStateChange({ youtubeUrl: urlInput });
  }, [urlInput, onStateChange]);

  const onReady: YouTubeProps['onReady'] = (event) => {
    setPlayer(event.target);
  };

  const onStateChangeHandler: YouTubeProps['onStateChange'] = (event) => {
    const playerState = event.target.getPlayerState();
    const currentTime = event.target.getCurrentTime();
    const duration = event.target.getDuration();
    
    onStateChange({
      isPlaying: playerState === 1, // 1 = playing
      currentTime,
      duration,
    });
  };

  const handlePlayPause = () => {
    if (!player) return;
    
    if (karaokeState.isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const handleSeek = (time: number) => {
    if (!player) return;
    player.seekTo(time, true);
  };

  const videoId = getYouTubeVideoId(karaokeState.youtubeUrl);

  const opts: YouTubeProps['opts'] = {
    height: showVideo ? '315' : '0',
    width: showVideo ? '560' : '0',
    playerVars: {
      autoplay: 0,
      controls: showVideo ? 1 : 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  return (
    <Card className="space-y-3 sm:space-y-4">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Icon name="music" size="lg" color="#F472B6" animated />
        <h2 className="text-lg sm:text-xl font-bold text-primary-700 kawaii-text">
          🎵 YouTube Karaoke 🎵
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Input
          placeholder="Paste YouTube URL here... ✨"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          error={error}
          className="flex-1"
        />
        <Button 
          onClick={handleUrlSubmit}
          variant="cute"
          disabled={!urlInput.trim()}
          className="w-full sm:w-auto whitespace-nowrap"
        >
          Load 🎤
        </Button>
      </div>

      {videoId && (
        <>
          {/* Video container with captions */}
          <div className="relative">
            {showVideo && (
              <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
                <YouTube
                  videoId={videoId}
                  opts={{
                    ...opts,
                    width: '100%',
                    height: '100%'
                  }}
                  onReady={onReady}
                  onStateChange={onStateChangeHandler}
                  className="w-full h-full"
                />
                
                {/* Lyrics caption overlay */}
                {showCaptions && lyrics && currentLyricIndex >= 0 && (
                  <LyricsCaption
                    lyrics={lyrics}
                    currentLyricIndex={currentLyricIndex}
                  />
                )}
              </div>
            )}

            {/* Hidden player for audio-only mode */}
            {!showVideo && (
              <div style={{ display: 'none' }}>
                <YouTube
                  videoId={videoId}
                  opts={opts}
                  onReady={onReady}
                  onStateChange={onStateChangeHandler}
                />
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <ProgressBar
            karaokeState={karaokeState}
            onSeek={handleSeek}
            player={player}
            className="mb-4"
          />

          {/* Custom controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-cute rounded-2xl">
            <div className="flex gap-2">
              <Button
                onClick={handlePlayPause}
                variant="heart"
                size="lg"
                className="animate-heart-beat"
              >
                <Icon 
                  name={karaokeState.isPlaying ? 'pause' : 'play'} 
                  size="lg" 
                  color="white" 
                />
              </Button>
              
              <Button
                onClick={() => {
                  const newShowVideo = !showVideo;
                  setShowVideo(newShowVideo);
                  onVideoToggle?.(newShowVideo);
                }}
                variant="cute"
                size="lg"
                title={showVideo ? 'Hide Video' : 'Show Video'}
              >
                <Icon 
                  name={showVideo ? 'eye-slash' : 'eye'} 
                  size="lg" 
                  color="white" 
                />
                {showVideo ? '🙈' : '👀'}
              </Button>
            </div>
            
            <div className="flex-1 text-center min-w-0">
              <div className="text-sm text-primary-600 kawaii-text truncate">
                {karaokeState.isPlaying ? '🎵 Playing... 🎵' : '⏸️ Paused'}
                {showVideo && ' 📺 Video Mode'}
              </div>
            </div>
            
            <div className="flex gap-1">
              <Icon name="sparkle" size="sm" color="#F472B6" animated />
              <Icon name="heart" size="sm" color="#E879F9" animated />
              <Icon name="sparkle" size="sm" color="#F472B6" animated />
            </div>
          </div>
        </>
      )}
    </Card>
  );
};