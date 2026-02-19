import { motion } from 'framer-motion';

export function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
          <motion.div
            className="absolute top-0 left-0 w-16 h-16 border-4 border-primary rounded-full border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}

export function SkeletonLoader({ className }: { className?: string }) {
  return (
    <motion.div
      className={`bg-muted animate-pulse rounded ${className}`}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="space-y-4">
      <SkeletonLoader className="h-48 w-full" />
      <div className="space-y-2">
        <SkeletonLoader className="h-4 w-3/4" />
        <SkeletonLoader className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <SkeletonLoader className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <SkeletonLoader className="h-4 w-1/3" />
            <SkeletonLoader className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ImageSkeleton({ aspectRatio = '16/9' }: { aspectRatio?: string }) {
  return (
    <div className={`relative bg-muted animate-pulse overflow-hidden`} style={{ aspectRatio }}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}