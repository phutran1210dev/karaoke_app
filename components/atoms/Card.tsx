'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  cute?: boolean;
  glowing?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  cute = true, 
  glowing = false 
}) => {
  return (
    <div
      className={cn(
        'rounded-3xl p-6 transition-all duration-300',
        cute ? 'karaoke-card cute-shadow' : 'bg-white shadow-lg',
        glowing ? 'animate-pulse-soft ring-2 ring-primary-300' : '',
        className
      )}
    >
      {children}
    </div>
  );
};