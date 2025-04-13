
import React, { useEffect, useRef } from 'react';

interface LogoProps {
  isMinimal?: boolean;
}

const Logo: React.FC<LogoProps> = ({ isMinimal = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    
    const drawLogo = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Center point
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw the main triangle
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - 20 + Math.sin(time * 2) * 2);
      ctx.lineTo(centerX - 20, centerY + 15 + Math.sin(time * 2 + 1) * 2);
      ctx.lineTo(centerX + 20, centerY + 15 + Math.sin(time * 2 + 2) * 2);
      ctx.closePath();
      
      // Create gradient
      const gradient = ctx.createLinearGradient(centerX - 20, centerY - 20, centerX + 20, centerY + 20);
      gradient.addColorStop(0, '#3B82F6');
      gradient.addColorStop(1, '#8B5CF6');
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw pulsating circle
      const pulse = Math.sin(time * 3) * 0.2 + 0.8;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = '#10B981';
      ctx.fill();
      
      // Draw orbiting dots
      const orbitRadius = 25;
      const dotCount = 3;
      
      for (let i = 0; i < dotCount; i++) {
        const angle = time * 1.5 + (i * (Math.PI * 2 / dotCount));
        const dotX = centerX + Math.cos(angle) * orbitRadius;
        const dotY = centerY + Math.sin(angle) * orbitRadius;
        
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#F59E0B';
        ctx.fill();
      }
      
      // Draw text if not minimal
      if (!isMinimal) {
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('AlphaEdge', centerX, centerY + 35);
      }
      
      time += 0.01;
      animationRef.current = requestAnimationFrame(drawLogo);
    };
    
    drawLogo();
    
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMinimal]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={isMinimal ? 50 : 140} 
      height={isMinimal ? 50 : 70} 
      className="logo-canvas"
    />
  );
};

export default Logo;
