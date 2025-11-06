export interface LyricsSource {
  id: string;
  name: string;
  description: string;
  format: 'lrc' | 'srt' | 'txt' | 'json';
}

export interface LyricsLine {
  text: string;
  startTime: number;
  endTime: number;
  active?: boolean;
}

export interface LyricsData {
  title?: string;
  artist?: string;
  duration?: number;
  lines: LyricsLine[];
}

export interface LyricsParser {
  parse(content: string): LyricsData;
  validate(content: string): boolean;
}

export interface LyricsState {
  isLoading: boolean;
  error: string | null;
  lyrics: LyricsData | null;
  currentIndex: number;
}