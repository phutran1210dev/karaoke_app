'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'cute' | 'heart';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-full transition-all duration-300 cute-shadow hover:scale-105 active:scale-95';
  
  const variantClasses = {
    primary: 'bg-primary-400 hover:bg-primary-500 text-white border-2 border-primary-500',
    secondary: 'bg-white hover:bg-pastel-pink text-primary-600 border-2 border-primary-300',
    cute: 'bg-gradient-to-r from-pastel-pink to-pastel-lavender hover:from-primary-300 hover:to-primary-400 text-primary-700 border-2 border-primary-200',
    heart: 'bg-gradient-to-r from-primary-400 to-pink-500 hover:from-primary-500 hover:to-pink-600 text-white border-2 border-primary-500 animate-heart-beat'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <span className="kawaii-text font-semibold">
        {children}
      </span>
    </button>
  );
};