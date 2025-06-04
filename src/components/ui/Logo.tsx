import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = "", showText = true, size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Echtes Logo */}
      <div className={`${sizes[size]} relative`}>
        <Image
          src="/images/logo.png"
          alt="homigo Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      
      {showText && (
        <span className="text-2xl font-bold text-slate-800">homigo</span>
      )}
    </div>
  );
}