import { useEffect, useRef, useCallback } from 'react'

interface PixelFragment {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  rotation: number
  rotationSpeed: number
  life: number
  maxLife: number
  opacity: number
}

interface CutPoint {
  x: number
  y: number
  timestamp: number
}

interface PixelCanvasProps {
  isActive: boolean
  containerRef?: React.RefObject<HTMLElement>
  onDeactivate: () => void
}

export function PixelCanvas({ isActive, containerRef: _containerRef, onDeactivate }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fragmentsRef = useRef<PixelFragment[]>([])
  const cutPathRef = useRef<CutPoint[]>([])
  const mouseRef = useRef({ x: 0, y: 0, isDown: false })
  const rafRef = useRef<number>()
  const lastCutRef = useRef(0)

  // 创建像素碎片
  const createFragment = useCallback((x: number, y: number, color: string): PixelFragment => {
    const angle = Math.random() * Math.PI * 2
    const speed = 3 + Math.random() * 8
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      size: 4 + Math.random() * 4,
      color,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.3,
      life: 2000 + Math.random() * 1000,
      maxLife: 3000,
      opacity: 1,
    }
  }, [])

  // 处理鼠标/触摸移动
  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!canvasRef.current || !isActive) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    mouseRef.current = { ...mouseRef.current, x, y }

    // 记录切割路径
    const now = Date.now()
    cutPathRef.current.push({ x, y, timestamp: now })

    // 清理旧路径点
    cutPathRef.current = cutPathRef.current.filter(p => now - p.timestamp < 500)

    // 限制切割频率
    if (now - lastCutRef.current < 50) return
    lastCutRef.current = now

    // 创建切割效果
    const cutRadius = 60
    const colors = ['#10B981', '#059669', '#047857', '#3B82F6', '#F59E0B']
    
    // 在切割位置周围创建碎片
    for (let i = 0; i < 3; i++) {
      const offsetX = (Math.random() - 0.5) * cutRadius
      const offsetY = (Math.random() - 0.5) * cutRadius
      const color = colors[Math.floor(Math.random() * colors.length)]
      fragmentsRef.current.push(createFragment(x + offsetX, y + offsetY, color))
    }
  }, [isActive, createFragment])

  // 渲染循环
  useEffect(() => {
    if (!isActive) {
      fragmentsRef.current = []
      cutPathRef.current = []
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布尺寸
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    // 动画循环
    const animate = () => {
      if (!ctx || !canvas) return

      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio

      // 清除画布
      ctx.clearRect(0, 0, width, height)

      // 绘制切割轨迹（光剑效果）
      if (cutPathRef.current.length > 1) {
        ctx.save()
        
        // 外发光
        ctx.shadowColor = '#10B981'
        ctx.shadowBlur = 20
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)'
        ctx.lineWidth = 20
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.beginPath()
        cutPathRef.current.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        })
        ctx.stroke()

        // 内发光
        ctx.shadowBlur = 10
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)'
        ctx.lineWidth = 10
        ctx.stroke()

        // 核心
        ctx.shadowBlur = 0
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 3
        ctx.stroke()

        ctx.restore()
      }

      // 更新和绘制碎片
      const now = Date.now()
      fragmentsRef.current = fragmentsRef.current.filter(f => {
        // 物理更新
        f.vy += 0.5 // 重力
        f.vx *= 0.98 // 阻力
        f.vy *= 0.98
        f.x += f.vx
        f.y += f.vy
        f.rotation += f.rotationSpeed
        f.life -= 16
        f.opacity = Math.max(0, f.life / f.maxLife)

        // 边界碰撞
        if (f.y > height) {
          f.y = height
          f.vy *= -0.3
        }

        // 绘制碎片
        if (f.opacity > 0) {
          ctx.save()
          ctx.translate(f.x, f.y)
          ctx.rotate(f.rotation)
          ctx.globalAlpha = f.opacity
          ctx.fillStyle = f.color
          ctx.fillRect(-f.size / 2, -f.size / 2, f.size, f.size)
          ctx.restore()
        }

        return f.life > 0
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isActive])

  // 事件监听
  useEffect(() => {
    if (!isActive) return

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY)
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDeactivate()
      if (e.key.toLowerCase() === 'r') {
        fragmentsRef.current = []
        cutPathRef.current = []
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isActive, handleMove, onDeactivate])

  if (!isActive) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{ cursor: 'none' }}
    />
  )
}

export default PixelCanvas
