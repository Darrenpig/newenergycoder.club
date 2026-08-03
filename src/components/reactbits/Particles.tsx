import { useEffect, useRef } from 'react'

/**
 * ReactBits-style Particles background (https://www.reactbits.dev/backgrounds/particles)
 * Dependency-free canvas implementation: drifting particles with connecting
 * lines and optional mouse interaction. Theme-aware (reads --primary).
 */
interface ParticlesProps {
  className?: string
  /** Number of particles (scaled by viewport area). Default 90 */
  particleCount?: number
  /** Base drift speed multiplier. Default 0.4 */
  speed?: number
  /** Particles react to mouse movement. Default true */
  moveParticlesOnHover?: boolean
  /** Max particle radius in px. Default 2.2 */
  particleBaseSize?: number
  /** Max distance for connecting lines. Default 120 */
  linkDistance?: number
  /** Overall opacity of the particle layer. Default 0.9 */
  opacity?: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

export function Particles({
  className = '',
  particleCount = 90,
  speed = 0.4,
  moveParticlesOnHover = true,
  particleBaseSize = 2.2,
  linkDistance = 120,
  opacity = 0.9,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId = 0
    let particles: Particle[] = []
    let width = 0
    let height = 0
    let color = { h: 222, s: 47, l: 55 }
    const mouse = { x: -9999, y: -9999 }

    const readThemeColor = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary')
        .trim()
      // shadcn format: "h s% l%"
      const parts = raw.match(/([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/)
      if (parts) {
        color = { h: Number(parts[1]), s: Number(parts[2]), l: Number(parts[3]) }
      }
    }

    const paint = (h: number, s: number, l: number, a: number) =>
      `hsla(${h}, ${s}%, ${l}%, ${a})`

    const seed = () => {
      // Scale particle count by area so mobile stays light
      const areaFactor = Math.min(1, (width * height) / (1440 * 800))
      const count = Math.max(24, Math.round(particleCount * areaFactor))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: 0.8 + Math.random() * particleBaseSize,
      }))
    }

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const step = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        // Mouse repulsion (ReactBits moveParticlesOnHover)
        if (moveParticlesOnHover) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)
          const radius = 110
          if (dist < radius && dist > 0.01) {
            const force = ((radius - dist) / radius) * 0.6
            p.x += (dx / dist) * force
            p.y += (dy / dist) * force
          }
        }

        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = paint(color.h, color.s, color.l, 0.55 * opacity)
        ctx.fill()
      }

      // Connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < linkDistance) {
            const alpha = (1 - dist / linkDistance) * 0.25 * opacity
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = paint(color.h, color.s, color.l, alpha)
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      rafId = requestAnimationFrame(step)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const handleMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    readThemeColor()
    resize()

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      // Render one static frame for reduced-motion users
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = paint(color.h, color.s, color.l, 0.4 * opacity)
        ctx.fill()
      }
    } else {
      rafId = requestAnimationFrame(step)
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      document.addEventListener('mouseleave', handleMouseLeave)
    }

    const resizeObserver = new ResizeObserver(resize)
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement)

    // Re-read color when theme (dark/light class) changes
    const themeObserver = new MutationObserver(readThemeColor)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [particleCount, speed, moveParticlesOnHover, particleBaseSize, linkDistance, opacity])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}

export default Particles
