'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  cute?: boolean;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  cute = true, 
  className, 
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-primary-700 mb-2 kawaii-text">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400',
          'placeholder:text-primary-300',
          cute ? 'border-primary-200 bg-white/80 cute-shadow' : 'border-gray-300 bg-white',
          error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : '',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-500 kawaii-text">{error}</p>
      )}
    </div>
  );
};