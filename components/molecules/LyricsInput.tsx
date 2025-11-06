'use client';

import React, { useState } from 'react';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { LyricsFileUpload } from '@/components/atoms/LyricsFileUpload';
import { LyricsParserService } from '@/lib/lyricsParser';
import type { LyricsData } from '@/types/lyrics';

interface LyricsInputProps {
  onLyricsLoad: (lyrics: LyricsData) => void;
  currentLyrics?: LyricsData | null;
}

export const LyricsInput: React.FC<LyricsInputProps> = ({ 
  onLyricsLoad, 
  currentLyrics 
}) => {
  const [lyricsText, setLyricsText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState('');
  
  const parser = new LyricsParserService();

  const handleLoadLyrics = () => {
    if (!lyricsText.trim()) {
      setError('Please enter some lyrics');
      return;
    }

    try {
      const parsedLyrics = parser.parseFromContent(lyricsText);
      if (parsedLyrics.lines.length === 0) {
        setError('No lyrics found. Please check the format.');
        return;
      }
      
      setError('');
      onLyricsLoad(parsedLyrics);
      setIsExpanded(false);
    } catch {
      setError('Failed to parse lyrics. Please check the format.');
    }
  };

  const handleLoadSample = () => {
    const sampleLyrics = parser.getSampleLyrics();
    onLyricsLoad(sampleLyrics);
    setLyricsText('');
    setError('');
  };

  const handleClearLyrics = () => {
    onLyricsLoad({ lines: [] });
    setLyricsText('');
    setError('');
  };

  const lrcExample = `[ti:Example Song]
[ar:Artist Name]
[00:12.50]🎵 This is how LRC format works
[00:16.80]✨ Each line has a timestamp
[00:21.20]💖 Like this cute example
[00:25.60]🌟 Copy and paste your lyrics here!`;

  return (
    <Card className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="music" size="lg" color="#F472B6" animated />
          <h2 className="text-lg sm:text-xl font-bold text-primary-700 kawaii-text">
            🎤 Lyrics Manager
          </h2>
        </div>
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="cute"
          size="sm"
          className="whitespace-nowrap"
        >
          {isExpanded ? 'Hide' : 'Add Lyrics'} 📝
        </Button>
      </div>

      {/* Current lyrics info */}
      {currentLyrics && currentLyrics.lines.length > 0 && (
        <div className="bg-gradient-cute rounded-xl p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              {currentLyrics.title && (
                <h3 className="font-semibold text-primary-700 kawaii-text">
                  {currentLyrics.title}
                </h3>
              )}
              {currentLyrics.artist && (
                <p className="text-sm text-primary-600">
                  by {currentLyrics.artist}
                </p>
              )}
              <p className="text-xs text-primary-500">
                {currentLyrics.lines.length} lines loaded
              </p>
            </div>
            <Button
              onClick={handleClearLyrics}
              variant="secondary"
              size="sm"
            >
              Clear 🗑️
            </Button>
          </div>
        </div>
      )}

      {/* Expanded lyrics input */}
      {isExpanded && (
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-700 kawaii-text mb-2">
              📋 Paste Your Lyrics
            </label>
            <textarea
              value={lyricsText}
              onChange={(e) => setLyricsText(e.target.value)}
              placeholder="Paste lyrics here... Supports LRC format, plain text, or JSON"
              className="w-full h-32 sm:h-40 px-3 sm:px-4 py-3 rounded-2xl border-2 border-primary-200 
                        focus:border-primary-400 focus:ring-2 focus:ring-primary-200 
                        bg-white/80 backdrop-blur-sm text-primary-700 placeholder:text-primary-400
                        cute-shadow hover:cute-shadow-lg resize-none text-sm sm:text-base"
            />
            {error && (
              <p className="mt-2 text-sm text-red-500 kawaii-text">
                {error}
              </p>
            )}
          </div>

          {/* Format example */}
          <div className="bg-primary-50 rounded-xl p-3">
            <h4 className="text-sm font-semibold text-primary-700 kawaii-text mb-2">
              💡 LRC Format Example:
            </h4>
            <pre className="text-xs text-primary-600 whitespace-pre-wrap font-mono bg-white rounded-lg p-2 overflow-x-auto">
              {lrcExample}
            </pre>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              onClick={handleLoadLyrics}
              variant="heart"
              disabled={!lyricsText.trim()}
              className="flex-1"
            >
              Load Lyrics 🎵
            </Button>
            <LyricsFileUpload
              onLyricsLoad={onLyricsLoad}
              onError={(error) => setError(error)}
            />
            <Button
              onClick={handleLoadSample}
              variant="cute"
              className="flex-1 sm:flex-none whitespace-nowrap"
            >
              Try Sample 🌟
            </Button>
          </div>

          {/* Supported formats */}
          <div className="text-center">
            <p className="text-xs text-primary-500 kawaii-text">
              📄 Supports: LRC (timestamped), Plain Text, JSON formats
            </p>
          </div>
        </div>
      )}

      {/* Quick actions when collapsed */}
      {!isExpanded && (!currentLyrics || currentLyrics.lines.length === 0) && (
        <div className="text-center py-4">
          <p className="text-sm text-primary-600 kawaii-text mb-3">
            No lyrics loaded. Add some to start singing! ✨
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button
              onClick={handleLoadSample}
              variant="cute"
              size="sm"
            >
              Load Sample Lyrics 🎤
            </Button>
            <LyricsFileUpload
              onLyricsLoad={onLyricsLoad}
              onError={(error) => setError(error)}
            />
          </div>
        </div>
      )}
    </Card>
  );
};