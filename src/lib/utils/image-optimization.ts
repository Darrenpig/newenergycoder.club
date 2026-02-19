const CDN_BASE_URL = import.meta.env.VITE_CDN_BASE_URL || '';
const IMAGE_OPTIMIZATION_ENABLED = import.meta.env.VITE_IMAGE_OPTIMIZATION_ENABLED === 'true';
const IMAGE_FORMAT = import.meta.env.VITE_IMAGE_FORMAT || 'webp';
const IMAGE_QUALITY = parseInt(import.meta.env.VITE_IMAGE_QUALITY || '80', 10);

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: string;
  fit?: 'cover' | 'contain' | 'fill';
}

export function getOptimizedImageUrl(
  originalPath: string,
  options: ImageOptimizationOptions = {}
): string {
  if (!IMAGE_OPTIMIZATION_ENABLED || !CDN_BASE_URL) {
    return originalPath;
  }

  const {
    width,
    height,
    quality = IMAGE_QUALITY,
    format = IMAGE_FORMAT,
    fit = 'cover'
  } = options;

  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  params.append('q', quality.toString());
  params.append('f', format);
  params.append('fit', fit);

  const queryString = params.toString();
  const separator = originalPath.includes('?') ? '&' : '?';
  
  return `${CDN_BASE_URL}${originalPath}${separator}${queryString}`;
}

export function preloadImage(src: string, options: ImageOptimizationOptions = {}): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const optimizedSrc = getOptimizedImageUrl(src, options);
    
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = optimizedSrc;
  });
}

export function createResponsiveImageSrcset(
  originalPath: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1536],
  options: Omit<ImageOptimizationOptions, 'width'> = {}
): string {
  return widths
    .map(width => {
      const optimizedSrc = getOptimizedImageUrl(originalPath, { ...options, width });
      return `${optimizedSrc} ${width}w`;
    })
    .join(', ');
}

export function getPlaceholderImage(width: number = 100, height: number = 100): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect fill='%23e5e7eb' width='${width}' height='${height}'/%3E%3C/svg%3E`;
}

export function getBlurPlaceholder(width: number = 10, height: number = 10): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect fill='%239ca3af' width='${width}' height='${height}'/%3E%3C/svg%3E`;
}