'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
  animated?: boolean;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 'md', 
  color = 'currentColor', 
  className,
  animated = false 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const animationClass = animated ? 'animate-bounce-cute' : '';

  // Simple SVG icons for the karaoke app
  const icons = {
    heart: (
      <svg viewBox="0 0 24 24" fill={color} className={cn(sizeClasses[size], animationClass, className)}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
    music: (
      <svg viewBox="0 0 24 24" fill={color} className={cn(sizeClasses[size], animationClass, className)}>
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
    ),
    play: (
      <svg viewBox="0 0 24 24" fill={color} className={cn(sizeClasses[size], animationClass, className)}>
        <path d="M8 5v14l11-7z"/>
      </svg>
    ),
    pause: (
      <svg viewBox="0 0 24 24" fill={color} className={cn(sizeClasses[size], animationClass, className)}>
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </svg>
    ),
    sparkle: (
      <svg viewBox="0 0 24 24" fill={color} className={cn(sizeClasses[size], animationClass, className)}>
        <path d="M12 0l2.4 7.2H22l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6L12 0z"/>
      </svg>
    ),
    mic: (
      <svg viewBox="0 0 24 24" fill={color} className={cn(sizeClasses[size], animationClass, className)}>
        <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
      </svg>
    )
  };

  return icons[name as keyof typeof icons] || null;
};