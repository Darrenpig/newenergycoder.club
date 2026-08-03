import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

/**
 * OriginKit-style TextMorph (https://www.originkit.dev/components/textmorph)
 * Cycles through words with a blur/scale morph transition, powered by GSAP.
 * Two stacked spans crossfade-blur into each other; the container sizes
 * itself to the widest word via CSS grid stacking.
 */
interface TextMorphProps {
  /** Words to cycle through (>= 2 to animate) */
  words: string[]
  /** Seconds each word stays fully visible. Default 2.2 */
  hold?: number
  /** Morph transition duration in seconds. Default 0.7 */
  morph?: number
  className?: string
}

export function TextMorph({
  words,
  hold = 2.2,
  morph = 0.7,
  className = '',
}: TextMorphProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const wordARef = useRef<HTMLSpanElement>(null)
  const wordBRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const a = wordARef.current
      const b = wordBRef.current
      if (!a || !b || words.length === 0) return

      a.textContent = words[0]
      b.textContent = ''
      gsap.set(a, { opacity: 1, filter: 'blur(0px)', scale: 1 })
      gsap.set(b, { opacity: 0, filter: 'blur(12px)', scale: 0.96 })

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced || words.length < 2) return

      let index = 0
      const showNext = () => {
        const current = index % 2 === 0 ? a : b
        const next = index % 2 === 0 ? b : a
        index = (index + 1) % words.length
        next.textContent = words[index]

        gsap.to(current, {
          opacity: 0,
          filter: 'blur(12px)',
          scale: 1.06,
          duration: morph,
          delay: hold,
          ease: 'power2.in',
        })
        gsap.fromTo(
          next,
          { opacity: 0, filter: 'blur(12px)', scale: 0.96 },
          {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: morph,
            delay: hold + morph * 0.6,
            ease: 'power2.out',
            onComplete: showNext,
          }
        )
      }
      showNext()
    },
    { scope: containerRef, dependencies: [words.join('|'), hold, morph] }
  )

  return (
    <span ref={containerRef} className="inline-grid" aria-label={words.join(' ')}>
      <span ref={wordARef} className={`col-start-1 row-start-1 whitespace-nowrap will-change-transform ${className}`} />
      <span ref={wordBRef} className={`col-start-1 row-start-1 whitespace-nowrap will-change-transform ${className}`} aria-hidden="true" />
    </span>
  )
}

export default TextMorph
