
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
      
      // Create a more sophisticated logo design
      const baseSize = isMinimal ? 16 : 24;
      
      // Draw the base of the logo - a hexagon with gradient fill
      const hexagonRadius = baseSize * 1.1;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (time * 0.01) + (i * Math.PI / 3);
        const x = centerX + Math.cos(angle) * hexagonRadius;
        const y = centerY + Math.sin(angle) * hexagonRadius;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      
      // Create a more vibrant gradient for the hexagon
      const hexGradient = ctx.createLinearGradient(
        centerX - hexagonRadius, 
        centerY - hexagonRadius, 
        centerX + hexagonRadius, 
        centerY + hexagonRadius
      );
      hexGradient.addColorStop(0, '#7c3aed'); // More vibrant purple
      hexGradient.addColorStop(0.5, '#8b5cf6');
      hexGradient.addColorStop(1, '#4f46e5'); // Indigo touch
      
      ctx.fillStyle = hexGradient;
      ctx.fill();
      
      // Add outer glow effect
      ctx.shadowColor = '#8b5cf6';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#c4b5fd';
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Draw central symbol - a dynamic graph icon
      ctx.beginPath();
      const innerRadius = baseSize * 0.5;
      ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
      
      const innerGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, innerRadius
      );
      innerGradient.addColorStop(0, '#10B981'); // Green center
      innerGradient.addColorStop(1, '#059669'); // Darker green edge
      
      ctx.fillStyle = innerGradient;
      ctx.fill();
      
      // Add dynamic trading graph lines
      ctx.lineWidth = 2;
      
      // Rising trend line with animation
      const lineLength = baseSize * 1.2;
      const lineAmplitude = baseSize * 0.3;
      const linePhase = time * 5;
      
      ctx.beginPath();
      ctx.moveTo(centerX - lineLength, centerY);
      
      // Create animated graph path
      for (let i = 0; i <= 20; i++) {
        const x = centerX - lineLength + (lineLength * 2 * i / 20);
        const progress = i / 20;
        // Create a dynamic wave pattern with multiple oscillations
        const y = centerY - lineAmplitude * Math.sin(progress * Math.PI * 3 + linePhase * 0.1) * 
                  (1 - Math.abs(progress - 0.5) * 1.2);
        ctx.lineTo(x, y);
      }
      
      ctx.strokeStyle = '#f59e0b'; // Amber color for the line
      ctx.stroke();
      
      // Add data points along the line
      const dataPoints = 5;
      for (let i = 0; i < dataPoints; i++) {
        const pointProgress = i / (dataPoints - 1);
        const pointX = centerX - lineLength + lineLength * 2 * pointProgress;
        const pointY = centerY - lineAmplitude * Math.sin(pointProgress * Math.PI * 3 + linePhase * 0.1) * 
                       (1 - Math.abs(pointProgress - 0.5) * 1.2);
        
        const pointSize = (i % 2 === 0) ? 2.5 : 1.5; // Alternate point sizes
        
        ctx.beginPath();
        ctx.arc(pointX, pointY, pointSize, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        // Add glow to key data points
        if (i % 2 === 0) {
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 5;
          ctx.beginPath();
          ctx.arc(pointX, pointY, pointSize * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      
      // Draw the text if not in minimal mode
      if (!isMinimal) {
        // Draw text shadow
        ctx.font = 'bold 20px "Segoe UI", Arial, sans-serif';
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('AlphaEdge', centerX + baseSize + 9, centerY + 1);
        
        // Draw main text with gradient
        const textGradient = ctx.createLinearGradient(
          centerX + baseSize, centerY - 10,
          centerX + baseSize + 100, centerY + 10
        );
        textGradient.addColorStop(0, '#f0f9ff'); // Light blue tint
        textGradient.addColorStop(1, '#e2e8f0'); // Slight gray
        
        ctx.font = 'bold 20px "Segoe UI", Arial, sans-serif';
        ctx.fillStyle = textGradient;
        ctx.fillText('AlphaEdge', centerX + baseSize + 8, centerY);
      }
      
      time += 0.05;
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
      width={isMinimal ? 40 : 200} 
      height={isMinimal ? 40 : 40} 
      className="logo-canvas"
    />
  );
};

export default Logo;
