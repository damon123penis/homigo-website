import React from 'react';

const SmartHomeBanner = ({ 
  title = "Smart Home ohne Kabelsalat", 
  subtitle = "Moderne Hausautomation – einfach, kabellos und intelligent vernetzt",
  className = "",
  videoMp4 = "/video/homigo-banner.mp4",
  videoWebm = "/video/homigo-banner.webm",
  poster = "/video/homigo-banner-poster.jpg",
}) => {
  return (
    <div className={`relative w-full overflow-hidden aspect-[5/3] ${className}`}>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
      >
        <source src={videoWebm} type="video/webm" />
        <source src={videoMp4} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/35 to-slate-950/60" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-5">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-emerald-200 max-w-2xl">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default SmartHomeBanner;