import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface EnergyLineProps {
  progress: number
  color?: string
}

export function EnergyLine({ progress, color = '#10B981' }: EnergyLineProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const glowRef = useRef<SVGFEFloodElement>(null)

  useEffect(() => {
    if (!pathRef.current) return

    const path = pathRef.current
    const length = path.getTotalLength()

    // 初始化路径
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    })

    // 根据进度绘制路径
    gsap.to(path, {
      strokeDashoffset: length * (1 - progress),
      duration: 0.5,
      ease: 'power2.out',
    })
  }, [progress])

  // 生成 S 曲线路径
  const generatePath = () => {
    const points = []
    const segments = 10
    const width = 100
    const height = 100

    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const x = 50 + Math.sin(t * Math.PI * 3) * 20
      const y = t * 100
      points.push(`${x},${y}`)
    }

    return `M ${points.join(' L ')}`
  }

  return (
    <div className="absolute left-8 md:left-16 top-0 bottom-0 w-px pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          {/* 发光滤镜 */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* 渐变 */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="50%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* 背景线 */}
        <path
          d="M 50,0 L 50,100"
          stroke="rgba(148, 163, 184, 0.2)"
          strokeWidth="2"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />

        {/* 能量线 */}
        <path
          ref={pathRef}
          d="M 50,0 L 50,100"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          fill="none"
          filter="url(#glow)"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* 进度节点 */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-300"
        style={{ 
          top: `${progress * 100}%`,
          backgroundColor: color,
          boxShadow: `0 0 20px ${color}`,
        }}
      >
        <div 
          className="absolute inset-0 rounded-full animate-ping opacity-75"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export default EnergyLine
