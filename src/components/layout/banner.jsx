import React, { useEffect, useRef, useState } from 'react';

const SmartHomeBanner = ({ 
  title = "Smart Home ohne Kabelsalat", 
  subtitle = "Moderne Hausautomation – einfach, kabellos und intelligent vernetzt",
  height = "400px",
  className = ""
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;
    
    // Canvas setup
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };
    
    updateCanvasSize();
    setIsLoaded(true);
    
    // Mouse tracking
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
    };
    
    // Convert 3D to 2D isometric
    const toIsometric = (x, y, z) => {
      const angle = Math.PI / 6;
      const isoX = (x - z) * Math.cos(angle);
      const isoY = y + (x + z) * Math.sin(angle);
      return { x: isoX, y: isoY };
    };
    
    // Draw glowing line
    const drawGlowLine = (x1, y1, x2, y2, color, width = 2, glow = true) => {
      if (glow) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    };
    
    // Draw smartphone
    const drawSmartphone = (centerX, centerY, rotation) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      
      // Phone body
      const phoneWidth = 120;
      const phoneHeight = 240;
      const cornerRadius = 15;
      
      // Phone shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.roundRect(-phoneWidth/2 + 5, -phoneHeight/2 + 5, phoneWidth, phoneHeight, cornerRadius);
      ctx.fill();
      
      // Phone gradient background
      const phoneGradient = ctx.createLinearGradient(-phoneWidth/2, -phoneHeight/2, phoneWidth/2, phoneHeight/2);
      phoneGradient.addColorStop(0, '#1a1f3a');
      phoneGradient.addColorStop(1, '#0a0e27');
      ctx.fillStyle = phoneGradient;
      ctx.beginPath();
      ctx.roundRect(-phoneWidth/2, -phoneHeight/2, phoneWidth, phoneHeight, cornerRadius);
      ctx.fill();
      
      // Phone border
      ctx.strokeStyle = '#4a5568';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-phoneWidth/2, -phoneHeight/2, phoneWidth, phoneHeight, cornerRadius);
      ctx.stroke();
      
      // Screen
      const screenMargin = 8;
      const screenGradient = ctx.createLinearGradient(
        -phoneWidth/2 + screenMargin, 
        -phoneHeight/2 + screenMargin,
        phoneWidth/2 - screenMargin, 
        phoneHeight/2 - screenMargin
      );
      screenGradient.addColorStop(0, '#0f172a');
      screenGradient.addColorStop(1, '#1e293b');
      ctx.fillStyle = screenGradient;
      ctx.beginPath();
      ctx.roundRect(
        -phoneWidth/2 + screenMargin, 
        -phoneHeight/2 + screenMargin, 
        phoneWidth - screenMargin * 2, 
        phoneHeight - screenMargin * 2, 
        cornerRadius - 5
      );
      ctx.fill();
      
      ctx.restore();
    };
    
    // Draw isometric house
    const drawIsometricHouse = (centerX, centerY, scale, rotation) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(scale, scale);
      
      // House dimensions
      const baseSize = 60;
      const height = 50;
      const roofHeight = 30;
      
      // Calculate corners
      const base = [
        toIsometric(-baseSize/2, 0, -baseSize/2),
        toIsometric(baseSize/2, 0, -baseSize/2),
        toIsometric(baseSize/2, 0, baseSize/2),
        toIsometric(-baseSize/2, 0, baseSize/2)
      ];
      
      const top = [
        toIsometric(-baseSize/2, -height, -baseSize/2),
        toIsometric(baseSize/2, -height, -baseSize/2),
        toIsometric(baseSize/2, -height, baseSize/2),
        toIsometric(-baseSize/2, -height, baseSize/2)
      ];
      
      // Draw walls with glow
      ctx.strokeStyle = '#10b981'; // emerald-500
      ctx.lineWidth = 2;
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 15;
      
      // Front wall
      ctx.beginPath();
      ctx.moveTo(base[0].x, base[0].y);
      ctx.lineTo(base[1].x, base[1].y);
      ctx.lineTo(top[1].x, top[1].y);
      ctx.lineTo(top[0].x, top[0].y);
      ctx.closePath();
      ctx.stroke();
      
      // Right wall
      ctx.beginPath();
      ctx.moveTo(base[1].x, base[1].y);
      ctx.lineTo(base[2].x, base[2].y);
      ctx.lineTo(top[2].x, top[2].y);
      ctx.lineTo(top[1].x, top[1].y);
      ctx.closePath();
      ctx.stroke();
      
      // Draw roof
      const roofTop = toIsometric(0, -height - roofHeight, 0);
      ctx.strokeStyle = '#34d399'; // emerald-400
      ctx.shadowColor = '#34d399';
      
      ctx.beginPath();
      ctx.moveTo(top[0].x, top[0].y);
      ctx.lineTo(roofTop.x, roofTop.y);
      ctx.lineTo(top[1].x, top[1].y);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(top[1].x, top[1].y);
      ctx.lineTo(roofTop.x, roofTop.y);
      ctx.lineTo(top[2].x, top[2].y);
      ctx.stroke();
      
      // WiFi signal from house
      const wifiX = roofTop.x;
      const wifiY = roofTop.y - 20;
      for(let i = 1; i <= 3; i++) {
        ctx.strokeStyle = `rgba(16, 185, 129, ${1 - i * 0.3})`; // emerald-500 with fading opacity
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(wifiX, wifiY, i * 8 + Math.sin(time * 2) * 2, -Math.PI * 0.7, -Math.PI * 0.3);
        ctx.stroke();
      }
      
      ctx.shadowBlur = 0;
      ctx.restore();
    };
    
    // Draw floating icons
    const drawFloatingIcon = (x, y, type, size, rotation, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      // Icon background
      ctx.fillStyle = color + '20';
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      
      // Draw hexagon background
      ctx.beginPath();
      for(let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const px = Math.cos(angle) * size;
        const py = Math.sin(angle) * size;
        if(i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Draw icon
      ctx.fillStyle = color;
      ctx.font = `${size * 0.8}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const icons = {
        bulb: '💡',
        temp: '🌡️',
        lock: '🔒',
        camera: '📷',
        speaker: '🔊',
        wifi: '📡'
      };
      
      ctx.fillText(icons[type] || '⚡', 0, 0);
      ctx.shadowBlur = 0;
      ctx.restore();
    };
    
    // Floating particles
    const particles = Array.from({ length: 20 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      speed: 0.0005 + Math.random() * 0.001,
      size: Math.random() * 2 + 1
    }));
    
    // Main animation loop
    const animate = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      // Clear with gradient
      const bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, '#0f172a');
      bgGradient.addColorStop(0.5, '#1e293b');
      bgGradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);
      
      // Update time
      time += 0.01;
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.1)'; // emerald-500 with opacity
      ctx.lineWidth = 1;
      const gridSize = 50;
      for(let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for(let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Draw particles
      particles.forEach(p => {
        p.y -= p.speed;
        if(p.y < 0) p.y = 1;
        
        const x = p.x * width;
        const y = p.y * height;
        
        ctx.fillStyle = `rgba(16, 185, 129, ${0.5 * (1 - p.y)})`; // emerald-500
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Center position with mouse influence
      const centerX = width / 2 + (mouseX - 0.5) * 50;
      const centerY = height / 2 + (mouseY - 0.5) * 30;
      
      // Draw smartphone
      drawSmartphone(centerX, centerY, Math.sin(time * 0.5) * 0.05);
      
      // Draw isometric house on phone
      drawIsometricHouse(centerX, centerY - 20, 1 + Math.sin(time) * 0.05, time * 0.5);
      
      // Draw floating icons around
      const iconRadius = 150;
      const icons = [
        { type: 'bulb', color: '#fbbf24', angle: 0 }, // gelb bleibt für Licht
        { type: 'temp', color: '#ef4444', angle: Math.PI / 3 }, // rot bleibt für Temperatur
        { type: 'lock', color: '#10b981', angle: 2 * Math.PI / 3 }, // emerald-500
        { type: 'camera', color: '#34d399', angle: Math.PI }, // emerald-400
        { type: 'speaker', color: '#6ee7b7', angle: 4 * Math.PI / 3 }, // emerald-300
        { type: 'wifi', color: '#059669', angle: 5 * Math.PI / 3 } // emerald-600
      ];
      
      icons.forEach((icon, i) => {
        const angle = icon.angle + time * 0.3;
        const x = centerX + Math.cos(angle) * iconRadius;
        const y = centerY + Math.sin(angle) * iconRadius * 0.5;
        const floatY = Math.sin(time * 2 + i) * 5;
        
        // Connection line
        drawGlowLine(centerX, centerY, x, y + floatY, icon.color + '40', 1);
        
        // Icon
        drawFloatingIcon(x, y + floatY, icon.type, 20, -angle, icon.color);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Event listeners
    window.addEventListener('resize', updateCanvasSize);
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ height }}>
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-5">
        <h1 className={`text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg transition-all duration-1000 transform ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {title}
        </h1>
        <p className={`text-lg md:text-xl text-emerald-200 max-w-2xl transition-all duration-1000 delay-200 transform ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default SmartHomeBanner;