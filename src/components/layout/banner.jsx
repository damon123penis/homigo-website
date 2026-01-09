'use client';

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
    <div className={`relative w-full overflow-hidden h-[56vh] min-h-[320px] max-h-[640px] md:h-[68vh] md:min-h-[420px] md:max-h-[760px] ${className}`}>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        poster={poster}
      >
        <source src={videoMp4} type="video/mp4" />
        <source src={videoWebm} type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/35 to-slate-950/60" />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end text-center px-5 pb-10 md:pb-14">
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