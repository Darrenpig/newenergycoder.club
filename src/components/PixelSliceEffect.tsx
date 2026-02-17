import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

interface PixelSliceProps {
  src: string;
  alt?: string;
  rows?: number;
  cols?: number;
  className?: string;
  trigger?: 'hover' | 'click' | 'auto' | 'scroll';
  animationType?: 'explode' | 'dissolve' | 'shuffle' | 'wave' | 'glitch';
  duration?: number;
  stagger?: number;
  onComplete?: () => void;
  onStart?: () => void;
}

interface PixelPiece {
  id: number;
  row: number;
  col: number;
  x: number;
  y: number;
  width: number;
  height: number;
  bgX: string;
  bgY: string;
}

export function PixelSliceEffect({
  src,
  alt = '',
  rows = 8,
  cols = 8,
  className = '',
  trigger = 'hover',
  animationType = 'explode',
  duration = 1,
  stagger = 0.02,
  onComplete,
  onStart,
}: PixelSliceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [pieces, setPieces] = useState<PixelPiece[]>([]);
  const piecesRef = useRef<HTMLDivElement[]>([]);

  // 生成像素块数据
  const generatePieces = useCallback((width: number, height: number): PixelPiece[] => {
    const pieces: PixelPiece[] = [];
    const pieceWidth = width / cols;
    const pieceHeight = height / rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        pieces.push({
          id: row * cols + col,
          row,
          col,
          x: col * pieceWidth,
          y: row * pieceHeight,
          width: pieceWidth,
          height: pieceHeight,
          bgX: `${(col / (cols - 1)) * 100}%`,
          bgY: `${(row / (rows - 1)) * 100}%`,
        });
      }
    }
    return pieces;
  }, [rows, cols]);

  // 加载图片获取尺寸
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
      setPieces(generatePieces(img.width, img.height));
      setIsLoaded(true);
    };
    img.src = src;
  }, [src, generatePieces]);

  // 动画函数
  const animate = useCallback(() => {
    if (!isLoaded || isAnimating || piecesRef.current.length === 0) return;

    setIsAnimating(true);
    onStart?.();

    const pieceElements = piecesRef.current.filter(Boolean);
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        onComplete?.();
      },
    });

    switch (animationType) {
      case 'explode':
        // 爆炸效果 - 向外扩散
        pieceElements.forEach((piece, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const centerX = (cols - 1) / 2;
          const centerY = (rows - 1) / 2;
          const angle = Math.atan2(row - centerY, col - centerX);
          const distance = 100 + Math.random() * 200;
          
          tl.to(piece, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            rotation: Math.random() * 360,
            opacity: 0,
            scale: 0.5,
            duration: duration * (0.5 + Math.random() * 0.5),
            ease: 'power2.out',
          }, i * stagger);
        });
        break;

      case 'dissolve':
        // 溶解效果 - 随机消失
        const shuffled = [...pieceElements].sort(() => Math.random() - 0.5);
        tl.to(shuffled, {
          opacity: 0,
          scale: 0.8,
          rotation: () => Math.random() * 30 - 15,
          duration: duration * 0.5,
          stagger: stagger,
          ease: 'power1.in',
        });
        break;

      case 'shuffle':
        // 打乱重组
        pieceElements.forEach((piece, i) => {
          tl.to(piece, {
            x: () => (Math.random() - 0.5) * 300,
            y: () => (Math.random() - 0.5) * 300,
            rotation: () => Math.random() * 180 - 90,
            duration: duration * 0.4,
            ease: 'power2.inOut',
          }, i * stagger * 0.5)
          .to(piece, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: duration * 0.4,
            ease: 'power2.inOut',
          }, duration * 0.4 + i * stagger * 0.5);
        });
        break;

      case 'wave':
        // 波浪效果
        pieceElements.forEach((piece, i) => {
          const row = Math.floor(i / cols);
          const delay = row * stagger * 2;
          
          tl.to(piece, {
            y: -50,
            opacity: 0.3,
            duration: duration * 0.3,
            ease: 'power1.out',
          }, delay)
          .to(piece, {
            y: 0,
            opacity: 1,
            duration: duration * 0.3,
            ease: 'power1.in',
          }, delay + duration * 0.3);
        });
        break;

      case 'glitch':
        // 故障效果
        pieceElements.forEach((piece, i) => {
          const col = i % cols;
          const delay = col * stagger;
          
          tl.to(piece, {
            x: () => (Math.random() - 0.5) * 20,
            skewX: () => Math.random() * 20 - 10,
            duration: 0.05,
            repeat: 5,
            yoyo: true,
            ease: 'none',
          }, delay)
          .to(piece, {
            x: 0,
            skewX: 0,
            duration: 0.1,
          });
        });
        break;
    }

    // 重置状态
    tl.eventCallback('onReverseComplete', () => {
      setIsAnimating(false);
    });

    return () => {
      tl.kill();
    };
  }, [isLoaded, isAnimating, animationType, duration, stagger, cols, rows, onStart, onComplete]);

  // 重置动画
  const reset = useCallback(() => {
    piecesRef.current.forEach((piece) => {
      if (piece) {
        gsap.set(piece, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          skewX: 0,
          clearProps: 'all',
        });
      }
    });
    setIsAnimating(false);
  }, []);

  // 事件监听
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (trigger === 'hover') {
      container.addEventListener('mouseenter', animate);
      container.addEventListener('mouseleave', reset);
    } else if (trigger === 'click') {
      container.addEventListener('click', () => {
        if (isAnimating) {
          reset();
        } else {
          animate();
        }
      });
    } else if (trigger === 'auto') {
      const timer = setTimeout(animate, 500);
      return () => clearTimeout(timer);
    }

    return () => {
      container.removeEventListener('mouseenter', animate);
      container.removeEventListener('mouseleave', reset);
    };
  }, [trigger, animate, reset, isAnimating]);

  // 视口检测（scroll 触发）
  useEffect(() => {
    if (trigger !== 'scroll') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimating) {
            animate();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [trigger, animate, isAnimating]);

  if (!isLoaded) {
    return (
      <div 
        ref={containerRef}
        className={`relative overflow-hidden bg-muted animate-pulse ${className}`}
        style={{ aspectRatio: imageSize.width / imageSize.height || 16/9 }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          Loading...
        </div>
      </div>
    );
  }

  const aspectRatio = imageSize.width / imageSize.height;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-pointer group ${className}`}
      style={{ aspectRatio }}
    >
      {/* 原始图片（作为背景/备用） */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-0 transition-opacity"
      />

      {/* 像素块网格 */}
      <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
        {pieces.map((piece, index) => (
          <div
            key={piece.id}
            ref={(el) => {
              if (el) piecesRef.current[index] = el;
            }}
            className="relative overflow-hidden will-change-transform"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: `${cols * 100}% ${rows * 100}%`,
              backgroundPosition: `${piece.bgX} ${piece.bgY}`,
            }}
          />
        ))}
      </div>

      {/* 悬停提示 */}
      {trigger === 'hover' && !isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-black/30">
          <span className="text-white font-mono text-sm">Hover to Slice</span>
        </div>
      )}

      {/* 动画中提示 */}
      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-white font-mono text-sm animate-pulse">Slicing...</span>
        </div>
      )}

      {/* 网格线（可选装饰） */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: `${100 / cols}% ${100 / rows}%`,
        }}
      />
    </div>
  );
}

// 像素文字切割效果
interface PixelTextSliceProps {
  text: string;
  className?: string;
  pixelSize?: number;
  colors?: string[];
}

export function PixelTextSlice({ 
  text, 
  className = '', 
  pixelSize = 4,
  colors = ['#3b82f6', '#06b6d4', '#10b981', '#8b5cf6']
}: PixelTextSliceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pixels, setPixels] = useState<{ x: number; y: number; char: string; color: string; delay: number }[]>([]);

  useEffect(() => {
    // 简化的像素化文字 - 使用字符网格
    const chars = text.split('');
    const pixelData: { x: number; y: number; char: string; color: string; delay: number }[] = [];
    
    chars.forEach((char, charIndex) => {
      // 每个字符生成一些"像素"
      for (let i = 0; i < 4; i++) {
        pixelData.push({
          x: charIndex * pixelSize * 3 + (Math.random() - 0.5) * 10,
          y: (Math.random() - 0.5) * pixelSize * 2,
          char: char,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: charIndex * 0.05 + i * 0.02,
        });
      }
    });
    
    setPixels(pixelData);
  }, [text, pixelSize, colors]);

  useEffect(() => {
    if (!containerRef.current || pixels.length === 0) return;

    const elements = containerRef.current.querySelectorAll('.pixel-char');
    
    gsap.fromTo(elements, 
      { 
        y: -20, 
        opacity: 0,
        scale: 0,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.02,
        ease: 'back.out(1.7)',
      }
    );
  }, [pixels]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* 背景文字 */}
      <span className="opacity-20 font-bold">{text}</span>
      
      {/* 像素层 */}
      <div className="absolute inset-0 flex items-center justify-center">
        {pixels.map((pixel, i) => (
          <span
            key={i}
            className="pixel-char absolute font-bold"
            style={{
              color: pixel.color,
              left: `${pixel.x}px`,
              top: `50%`,
              transform: `translateY(${pixel.y}px)`,
              fontSize: `${pixelSize * 4}px`,
              textShadow: `0 0 10px ${pixel.color}`,
            }}
          >
            {pixel.char}
          </span>
        ))}
      </div>
    </div>
  );
}

// 使用示例导出
export const PixelSliceDemo = () => {
  const [currentEffect, setCurrentEffect] = useState<PixelSliceProps['animationType']>('explode');
  const effects: PixelSliceProps['animationType'][] = ['explode', 'dissolve', 'shuffle', 'wave', 'glitch'];

  return (
    <div className="space-y-8 p-8">
      <div className="flex gap-4 flex-wrap justify-center">
        {effects.map((effect) => (
          <button
            key={effect}
            onClick={() => setCurrentEffect(effect)}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
              currentEffect === effect 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {effect.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div>
          <h3 className="text-sm font-mono mb-2 text-muted-foreground">Hover Effect</h3>
          <PixelSliceEffect
            src="/image/校门合照.jpg"
            rows={6}
            cols={8}
            animationType={currentEffect}
            trigger="hover"
            duration={0.8}
          />
        </div>

        <div>
          <h3 className="text-sm font-mono mb-2 text-muted-foreground">Click Effect</h3>
          <PixelSliceEffect
            src="/image/横向项目合照.jpg"
            rows={8}
            cols={8}
            animationType={currentEffect}
            trigger="click"
            duration={1}
          />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-sm font-mono mb-4 text-muted-foreground">Pixel Text Effect</h3>
        <PixelTextSlice 
          text="NEC CLUB" 
          pixelSize={6}
          className="text-4xl md:text-6xl"
        />
      </div>
    </div>
  );
};
