import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = "", showText = true, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 }, 
    lg: { width: 64, height: 64 }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        <Image
          src="/images/Logo.png"
          alt="homigo Logo"
          width={sizes[size].width}
          height={sizes[size].height}
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