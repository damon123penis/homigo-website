import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center">
        <div className="relative">
          <div className="w-8 h-6 border-2 border-white rounded-t-lg"></div>
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
            <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
            <div className="w-3 h-0.5 bg-emerald-500 rounded-full mt-0.5"></div>
            <div className="w-4 h-0.5 bg-emerald-500 rounded-full mt-0.5"></div>
            <div className="w-3 h-0.5 bg-emerald-500 rounded-full mt-0.5"></div>
          </div>
        </div>
      </div>
      {showText && (
        <span className="text-2xl font-bold text-slate-800">homigo</span>
      )}
    </div>
  );
}