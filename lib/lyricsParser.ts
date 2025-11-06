import type { LyricsData, LyricsParser as ILyricsParser } from '@/types/lyrics';

// LRC Format Parser (most common karaoke format)
export class LRCParser implements ILyricsParser {
  validate(content: string): boolean {
    return /\[\d{2}:\d{2}\.\d{2}\]/.test(content);
  }

  parse(content: string): LyricsData {
    const lines = content.split('\n');
    const lyricsLines: Array<{ text: string; startTime: number; endTime: number }> = [];
    let title = '';
    let artist = '';
    
    lines.forEach((line, index) => {
      const timeMatch = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/);
      if (timeMatch) {
        const [, minutes, seconds, centiseconds, text] = timeMatch;
        const startTime = parseInt(minutes) * 60 + parseInt(seconds) + parseInt(centiseconds) / 100;
        
        // Calculate end time (next line's start time or +5 seconds for last line)
        const nextLine = lines[index + 1];
        let endTime = startTime + 5;
        
        if (nextLine) {
          const nextTimeMatch = nextLine.match(/\[(\d{2}):(\d{2})\.(\d{2})\]/);
          if (nextTimeMatch) {
            const [, nextMinutes, nextSeconds, nextCentiseconds] = nextTimeMatch;
            endTime = parseInt(nextMinutes) * 60 + parseInt(nextSeconds) + parseInt(nextCentiseconds) / 100;
          }
        }
        
        lyricsLines.push({
          text: text.trim(),
          startTime,
          endTime
        });
      } else if (line.includes('[ti:')) {
        title = line.match(/\[ti:(.*)\]/)?.[1] || '';
      } else if (line.includes('[ar:')) {
        artist = line.match(/\[ar:(.*)\]/)?.[1] || '';
      }
    });

    return {
      title,
      artist,
      lines: lyricsLines
    };
  }
}

// Simple Text Parser
export class TextParser implements ILyricsParser {
  validate(content: string): boolean {
    return content.trim().length > 0;
  }

  parse(content: string): LyricsData {
    const lines = content.split('\n').filter(line => line.trim());
    const lyricsLines = lines.map((text, index) => ({
      text: text.trim(),
      startTime: index * 4, // 4 seconds per line
      endTime: (index + 1) * 4
    }));

    return {
      lines: lyricsLines
    };
  }
}

// JSON Format Parser
export class JSONParser implements ILyricsParser {
  validate(content: string): boolean {
    try {
      JSON.parse(content);
      return true;
    } catch {
      return false;
    }
  }

  parse(content: string): LyricsData {
    try {
      const data = JSON.parse(content);
      return {
        title: data.title || '',
        artist: data.artist || '',
        lines: data.lines || []
      };
    } catch {
      return { lines: [] };
    }
  }
}

// Main Lyrics Parser
export class LyricsParserService {
  private parsers: ILyricsParser[] = [
    new LRCParser(),
    new JSONParser(),
    new TextParser()
  ];

  parseFromContent(content: string): LyricsData {
    for (const parser of this.parsers) {
      if (parser.validate(content)) {
        return parser.parse(content);
      }
    }
    
    // Fallback to text parser
    return new TextParser().parse(content);
  }

  // Sample lyrics for demo
  getSampleLyrics(): LyricsData {
    return {
      title: "✨ Kawaii Karaoke Sample",
      artist: "Cute Singer 🎀",
      lines: [
        { text: "💕 Thank you for singing with us! 💕", startTime: 18, endTime: 21 }
      ]
    };
  }
}