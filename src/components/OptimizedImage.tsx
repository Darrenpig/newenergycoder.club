import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOptimizedImageUrl, getBlurPlaceholder, preloadImage } from '@/lib/utils/image-optimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  placeholder?: 'blur' | 'color' | 'none';
  aspectRatio?: string;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  loading = 'lazy',
  placeholder = 'blur',
  aspectRatio
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) {
      preloadImage(src, { width, height })
        .then(() => setShouldLoad(true))
        .catch(() => setIsError(true));
    }
  }, [src, width, height, priority]);

  useEffect(() => {
    if (!priority && loading === 'lazy') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }
  }, [priority, loading]);

  const optimizedSrc = getOptimizedImageUrl(src, { width, height });

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <AnimatePresence mode="wait">
        {!isLoaded && !isError && (
          <motion.div
            className="absolute inset-0 bg-muted"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {placeholder === 'blur' && (
              <img
                src={getBlurPlaceholder(10, 10)}
                alt=""
                className="w-full h-full object-cover blur-sm"
                style={{ transform: 'scale(1.1)' }}
              />
            )}
            {placeholder === 'color' && (
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {shouldLoad && !isError && (
        <motion.img
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setIsError(true);
            setIsLoaded(false);
          }}
        />
      )}

      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>
  );
}