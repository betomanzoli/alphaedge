
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
      
      // Set up dimensions based on minimal mode
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Create a cube-like trading icon that rotates
      const cubeSize = isMinimal ? 16 : 24;
      const rotationSpeed = 0.01;
      
      // Draw the base of the logo - a hexagon
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (time * rotationSpeed) + (i * Math.PI / 3);
        const x = centerX + Math.cos(angle) * cubeSize;
        const y = centerY + Math.sin(angle) * cubeSize;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      
      // Create gradient for the hexagon
      const hexGradient = ctx.createLinearGradient(
        centerX - cubeSize, 
        centerY - cubeSize, 
        centerX + cubeSize, 
        centerY + cubeSize
      );
      hexGradient.addColorStop(0, '#8B5CF6');
      hexGradient.addColorStop(1, '#3B82F6');
      
      ctx.fillStyle = hexGradient;
      ctx.fill();
      
      // Draw pulsating central point
      const pulseFactor = Math.sin(time * 3) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(centerX, centerY, cubeSize / 3 * pulseFactor, 0, Math.PI * 2);
      ctx.fillStyle = '#10B981';
      ctx.fill();
      
      // Draw trending lines (up and down)
      ctx.lineWidth = 2;
      
      // Trending up line
      ctx.beginPath();
      const lineStartX = centerX - cubeSize * 0.6;
      const lineStartY = centerY + cubeSize * 0.3;
      const lineEndX = centerX + cubeSize * 0.6;
      const lineEndY = centerY - cubeSize * 0.3;
      
      ctx.moveTo(lineStartX, lineStartY);
      ctx.lineTo(lineEndX, lineEndY);
      ctx.strokeStyle = '#F59E0B';
      ctx.stroke();
      
      // Draw small dots at data points along the trend line
      const pointCount = 3;
      for (let i = 0; i < pointCount; i++) {
        const pointX = lineStartX + (lineEndX - lineStartX) * (i / (pointCount - 1));
        const pointY = lineStartY + (lineEndY - lineStartY) * (i / (pointCount - 1));
        
        // Add some animation to the points
        const wobble = Math.sin(time * 2 + i) * 2;
        
        ctx.beginPath();
        ctx.arc(pointX, pointY + wobble, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
      }
      
      // Draw the text if not in minimal mode
      if (!isMinimal) {
        ctx.font = 'bold 18px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('AlphaEdge', centerX + cubeSize + 8, centerY);
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
      width={isMinimal ? 40 : 160} 
      height={isMinimal ? 40 : 40} 
      className="logo-canvas"
    />
  );
};

export default Logo;
