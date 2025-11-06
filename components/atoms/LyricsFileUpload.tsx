'use client';

import React, { useRef } from 'react';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { LyricsParserService } from '@/lib/lyricsParser';
import type { LyricsData } from '@/types/lyrics';

interface LyricsFileUploadProps {
  onLyricsLoad: (lyrics: LyricsData) => void;
  onError: (error: string) => void;
}

export const LyricsFileUpload: React.FC<LyricsFileUploadProps> = ({
  onLyricsLoad,
  onError
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const parser = new LyricsParserService();

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const validTypes = ['.lrc', '.txt', '.json', '.srt'];
    const fileName = file.name.toLowerCase();
    const isValidType = validTypes.some(type => fileName.endsWith(type));

    if (!isValidType) {
      onError('Please select a valid lyrics file (.lrc, .txt, .json, or .srt)');
      return;
    }

    // Read file
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedLyrics = parser.parseFromContent(content);
        
        if (parsedLyrics.lines.length === 0) {
          onError('No lyrics found in the file. Please check the format.');
          return;
        }

        // Extract title from filename if not provided
        if (!parsedLyrics.title && file.name) {
          parsedLyrics.title = file.name.replace(/\.[^/.]+$/, '');
        }

        onLyricsLoad(parsedLyrics);
      } catch {
        onError('Failed to read the file. Please try again.');
      }
    };

    reader.onerror = () => {
      onError('Failed to read the file. Please try again.');
    };

    reader.readAsText(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".lrc,.txt,.json,.srt"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        onClick={handleFileSelect}
        variant="cute"
        size="sm"
        className="whitespace-nowrap"
      >
        <Icon name="music" size="sm" color="currentColor" />
        Upload File 📄
      </Button>
    </>
  );
};