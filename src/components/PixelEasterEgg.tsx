import { useEffect, useRef, useCallback, useState } from 'react';
import { Zap, MousePointer, Sparkles } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  type: 'pixel' | 'sparkle' | 'energy';
}

interface PixelText {
  x: number;
  y: number;
  char: string;
  color: string;
  scale: number;
  targetScale: number;
}

const NEC_COLORS = [
  '#3b82f6', // blue-500
  '#06b6d4', // cyan-500
  '#10b981', // emerald-500
  '#8b5cf6', // violet-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
];

const PIXEL_FONT: Record<string, number[][]> = {
  'N': [[1,0,0,0,1],[1,1,0,0,1],[1,0,1,0,1],[1,0,0,1,1],[1,0,0,0,1]],
  'E': [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,1,1,1]],
  'C': [[0,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,1]],
  '+': [[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0]],
};

export function PixelEasterEgg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pixelTextsRef = useRef<PixelText[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const animationRef = useRef<number>(0);
  const energyLevelRef = useRef(0);
  const [energyLevel, setEnergyLevel] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [isCharged, setIsCharged] = useState(false);

  const createParticle = useCallback((x: number, y: number, type: Particle['type'] = 'pixel'): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = type === 'energy' ? Math.random() * 3 + 2 : Math.random() * 2 + 0.5;
    
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: type === 'energy' ? Math.random() * 4 + 2 : Math.random() * 3 + 1,
      color: NEC_COLORS[Math.floor(Math.random() * NEC_COLORS.length)],
      life: 1,
      maxLife: type === 'energy' ? 60 : 100 + Math.random() * 50,
      type,
    };
  }, []);

  const createExplosion = useCallback((x: number, y: number, count: number = 20) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(createParticle(x, y, 'sparkle'));
    }
  }, [createParticle]);

  const createEnergyBurst = useCallback((x: number, y: number) => {
    for (let i = 0; i < 10; i++) {
      particlesRef.current.push(createParticle(x, y, 'energy'));
    }
  }, [createParticle]);

  const drawPixelText = useCallback((ctx: CanvasRenderingContext2D, text: string, startX: number, startY: number, scale: number = 1) => {
    const pixelSize = 3 * scale;
    let offsetX = 0;

    for (const char of text) {
      const pattern = PIXEL_FONT[char];
      if (pattern) {
        for (let row = 0; row < pattern.length; row++) {
          for (let col = 0; col < pattern[row].length; col++) {
            if (pattern[row][col]) {
              ctx.fillStyle = NEC_COLORS[Math.floor(Math.random() * NEC_COLORS.length)];
              ctx.fillRect(
                startX + offsetX + col * pixelSize,
                startY + row * pixelSize,
                pixelSize - 0.5,
                pixelSize - 0.5
              );
            }
          }
        }
        offsetX += pattern[0].length * pixelSize + pixelSize;
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize pixel texts
    const initPixelTexts = () => {
      const texts: PixelText[] = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Create floating "NEC+" texts
      for (let i = 0; i < 3; i++) {
        texts.push({
          x: centerX + (Math.random() - 0.5) * 200,
          y: centerY + (Math.random() - 0.5) * 100,
          char: 'NEC+',
          color: NEC_COLORS[i % NEC_COLORS.length],
          scale: 0,
          targetScale: 0.8 + Math.random() * 0.4,
        });
      }
      pixelTextsRef.current = texts;
    };

    initPixelTexts();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isActive: true,
      };

      // Create particles on mouse move
      if (Math.random() > 0.7) {
        particlesRef.current.push(createParticle(mouseRef.current.x, mouseRef.current.y));
      }

      // Increase energy level
      energyLevelRef.current = Math.min(energyLevelRef.current + 0.5, 100);
      setEnergyLevel(energyLevelRef.current);

      if (energyLevelRef.current >= 100 && !isCharged) {
        setIsCharged(true);
        createExplosion(canvas.width / 2, canvas.height / 2, 50);
      }

      setShowHint(false);
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
      // Gradually decrease energy
      const drainInterval = setInterval(() => {
        energyLevelRef.current = Math.max(energyLevelRef.current - 2, 0);
        setEnergyLevel(energyLevelRef.current);
        if (energyLevelRef.current <= 0) {
          setIsCharged(false);
          clearInterval(drainInterval);
        }
      }, 100);
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      createExplosion(x, y, 30);
      
      // Add pixel text on click
      pixelTextsRef.current.push({
        x,
        y,
        char: ['N', 'E', 'C', '+'][Math.floor(Math.random() * 4)],
        color: NEC_COLORS[Math.floor(Math.random() * NEC_COLORS.length)],
        scale: 0,
        targetScale: 1.5,
      });

      // Boost energy
      energyLevelRef.current = Math.min(energyLevelRef.current + 20, 100);
      setEnergyLevel(energyLevelRef.current);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    // Animation loop
    let frameCount = 0;
    const animate = () => {
      frameCount++;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.15)'; // Trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid background (retro pixel effect)
      if (frameCount % 2 === 0) {
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
        ctx.lineWidth = 1;
        const gridSize = 20;
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1 / p.maxLife;

        // Gravity for energy particles
        if (p.type === 'energy') {
          p.vy += 0.1;
        }

        // Friction
        p.vx *= 0.98;
        p.vy *= 0.98;

        if (p.life <= 0) return false;

        ctx.save();
        ctx.globalAlpha = p.life;
        
        if (p.type === 'pixel') {
          // Draw square pixels
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        } else {
          // Draw glowing circles for sparkles/energy
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
          gradient.addColorStop(0, p.color);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
        return true;
      });

      // Draw pixel texts
      pixelTextsRef.current = pixelTextsRef.current.filter((text) => {
        // Animate scale
        if (text.scale < text.targetScale) {
          text.scale += 0.05;
        }
        
        // Float upward
        text.y -= 0.5;
        
        // Fade out
        if (text.scale >= text.targetScale) {
          text.targetScale = 0;
        }
        
        if (text.scale <= 0 && text.targetScale === 0) {
          return false;
        }

        ctx.save();
        ctx.globalAlpha = text.scale;
        drawPixelText(ctx, text.char, text.x - 15 * text.scale, text.y, text.scale);
        ctx.restore();
        
        return true;
      });

      // Draw energy burst when fully charged
      if (isCharged && frameCount % 10 === 0) {
        createEnergyBurst(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        );
      }

      // Draw connecting lines between nearby particles
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.lineWidth = 1;
      const maxDistance = 50;
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            ctx.globalAlpha = (1 - distance / maxDistance) * 0.3 * p1.life * p2.life;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationRef.current);
    };
  }, [createParticle, createExplosion, createEnergyBurst, drawPixelText, isCharged]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-48 overflow-hidden rounded-lg border border-border/50 bg-gradient-to-b from-background to-muted"
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        style={{ touchAction: 'none' }}
      />

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
        {/* Top bar with hint */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className={`w-4 h-4 ${isCharged ? 'text-yellow-400 animate-pulse' : 'text-muted-foreground'}`} />
            <span className="text-xs text-muted-foreground font-mono">
              {isCharged ? 'ENERGY MAX!' : 'Pixel Lab'}
            </span>
          </div>
          
          {showHint && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse">
              <MousePointer className="w-3 h-3" />
              <span>Hover & Click to interact</span>
            </div>
          )}
        </div>

        {/* Energy bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-mono">Energy Level</span>
            <span className={`font-mono font-bold ${isCharged ? 'text-yellow-400' : 'text-primary'}`}>
              {Math.round(energyLevel)}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden border border-border/50">
            <div 
              className={`h-full transition-all duration-200 rounded-full ${
                isCharged 
                  ? 'bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 animate-pulse' 
                  : 'bg-gradient-to-r from-blue-500 to-cyan-400'
              }`}
              style={{ width: `${energyLevel}%` }}
            />
          </div>
          
          {isCharged && (
            <div className="flex items-center justify-center gap-1 text-xs text-yellow-400 animate-bounce">
              <Sparkles className="w-3 h-3" />
              <span className="font-bold">FULL CHARGE - CLICK FOR MEGA BURST!</span>
              <Sparkles className="w-3 h-3" />
            </div>
          )}
        </div>
      </div>

      {/* Decorative corner pixels */}
      <div className="absolute top-2 left-2 w-2 h-2 bg-primary/30" />
      <div className="absolute top-2 right-2 w-2 h-2 bg-primary/30" />
      <div className="absolute bottom-2 left-2 w-2 h-2 bg-primary/30" />
      <div className="absolute bottom-2 right-2 w-2 h-2 bg-primary/30" />
    </div>
  );
}
