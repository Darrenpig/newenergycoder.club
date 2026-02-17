import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { MilestoneCard } from './MilestoneCard'
import { EnergyLine } from './EnergyLine'
import type { Chapter } from '@/data/evolutionData'
import { useLanguage } from '@/contexts/LanguageContext'

interface MilestoneSectionProps {
  chapter: Chapter
  index: number
  isActive: boolean
  onActivate: () => void
}

export function MilestoneSection({ chapter, index, isActive, onActivate }: MilestoneSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const { language } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 章节标题动画
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
            onEnter: onActivate,
          },
        }
      )

      // 进度追踪
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        onUpdate: (self) => {
          progressRef.current = self.progress
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [chapter.id, onActivate])

  const theme = language === 'zh' ? chapter.theme : chapter.themeEn
  const subtitle = language === 'zh' ? chapter.subtitle : chapter.subtitleEn

  return (
    <section
      ref={sectionRef}
      id={chapter.id}
      className="relative min-h-screen py-24 px-4"
    >
      {/* 背景渐变 */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b ${
          index === 0 ? 'from-slate-950 via-blue-950/20 to-slate-950' :
          index === 1 ? 'from-slate-950 via-emerald-950/20 to-slate-950' :
          'from-slate-950 via-amber-950/20 to-slate-950'
        }`}
      />

      {/* 能量线 */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32">
        <EnergyLine progress={isActive ? 1 : 0} color={chapter.color} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* 章节标题 */}
        <div ref={headerRef} className="mb-16 md:mb-24 ml-16 md:ml-0">
          <div className="flex items-center gap-4 mb-4">
            <span 
              className="text-6xl md:text-8xl font-bold opacity-20"
              style={{ color: chapter.color }}
            >
              {chapter.period}
            </span>
            <div 
              className="h-px flex-1 max-w-xs"
              style={{ background: `linear-gradient(to right, ${chapter.color}, transparent)` }}
            />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-3" style={{ color: chapter.color }}>
            {theme}
          </h2>
          <p className="text-lg text-slate-400">{subtitle}</p>
        </div>

        {/* 里程碑列表 */}
        <div className="space-y-12 md:space-y-16">
          {chapter.milestones.map((milestone, idx) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              index={idx}
              isLeft={idx % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MilestoneSection
