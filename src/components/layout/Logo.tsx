
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

    // Ajustando as dimensões do canvas para garantir visibilidade completa
    canvas.width = isMinimal ? 40 : 240; // Aumentando a largura
    canvas.height = 50; // Aumentando a altura

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    
    const drawLogo = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Base logo sem animação quando minimal
      if (isMinimal) {
        const miniHexRadius = 16;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = i * Math.PI / 3;
          const x = centerX + Math.cos(angle) * miniHexRadius;
          const y = centerY + Math.sin(angle) * miniHexRadius;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(
          centerX - miniHexRadius, 
          centerY - miniHexRadius, 
          centerX + miniHexRadius, 
          centerY + miniHexRadius
        );
        gradient.addColorStop(0, '#7c3aed');
        gradient.addColorStop(1, '#4f46e5');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Símbolo central
        ctx.beginPath();
        ctx.arc(centerX, centerY, miniHexRadius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#10B981';
        ctx.fill();
        
      } else {
        // Logo completo com animação
        const hexRadius = 20;
        
        // Hexágono animado
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (time * 0.01) + (i * Math.PI / 3);
          const x = 35 + Math.cos(angle) * hexRadius; // Posicionando mais à esquerda
          const y = centerY + Math.sin(angle) * hexRadius;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        
        const hexGradient = ctx.createLinearGradient(15, centerY - hexRadius, 55, centerY + hexRadius);
        hexGradient.addColorStop(0, '#7c3aed');
        hexGradient.addColorStop(1, '#4f46e5');
        
        ctx.fillStyle = hexGradient;
        ctx.fill();
        ctx.strokeStyle = '#c4b5fd';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Nome do sistema com gradiente
        ctx.font = 'bold 24px "Segoe UI", Arial, sans-serif';
        const textGradient = ctx.createLinearGradient(70, centerY - 15, width - 10, centerY + 15);
        textGradient.addColorStop(0, '#f0f9ff');
        textGradient.addColorStop(1, '#e2e8f0');
        
        ctx.fillStyle = textGradient;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('AlphaEdge', 70, centerY);
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
      className="logo-canvas"
      style={{ maxWidth: 'none' }} // Removendo limitação de largura
    />
  );
};

export default Logo;
