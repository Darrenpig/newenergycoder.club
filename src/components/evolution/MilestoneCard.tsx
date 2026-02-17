import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { 
  Users, Coffee, Github, Code, Rocket, Presentation, 
  Globe, School, Handshake, Zap, BookOpen, Bot, Building, Network
} from 'lucide-react'
import type { Milestone } from '@/data/evolutionData'
import { useLanguage } from '@/contexts/LanguageContext'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Coffee,
  Github,
  Code,
  Rocket,
  Presentation,
  Globe,
  School,
  Handshake,
  Zap,
  BookOpen,
  Bot,
  Building,
  Network,
}

interface MilestoneCardProps {
  milestone: Milestone
  index: number
  isLeft?: boolean
}

export function MilestoneCard({ milestone, index, isLeft = true }: MilestoneCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          y: 80,
          opacity: 0,
          rotateX: 15,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.1,
        }
      )
    }, cardRef)

    return () => ctx.revert()
  }, [index])

  const Icon = iconMap[milestone.icon] || Zap
  const title = language === 'zh' ? milestone.title : milestone.titleEn
  const description = language === 'zh' ? milestone.description : milestone.descriptionEn
  const date = language === 'zh' ? milestone.date : milestone.dateEn

  return (
    <div
      ref={cardRef}
      className={`relative flex items-start gap-4 md:gap-6 ${
        isLeft ? 'flex-row' : 'flex-row-reverse'
      }`}
      style={{ perspective: '1000px' }}
    >
      {/* 时间线节点 */}
      <div className="absolute left-8 md:left-16 top-6 w-4 h-4 -translate-x-1/2 z-10">
        <div 
          className="w-full h-full rounded-full border-2 border-white shadow-md"
          style={{ backgroundColor: milestone.type === 'achievement' ? '#F59E0B' : '#10B981' }}
        />
      </div>

      {/* 内容卡片 */}
      <div className={`ml-16 md:ml-24 flex-1 ${isLeft ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'} md:w-[calc(50%-3rem)]`}>
        <div className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 
                        rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300
                        hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1">
          {/* 日期标签 */}
          <div className="absolute -top-3 left-6 px-3 py-1 bg-slate-800 rounded-full text-xs 
                          font-medium text-slate-400 border border-slate-700">
            {date}
          </div>

          <div className="flex items-start gap-4 mt-2">
            {/* 图标 */}
            <div className={`p-3 rounded-xl ${
              milestone.type === 'achievement' 
                ? 'bg-amber-500/10 text-amber-400' 
                : milestone.type === 'event'
                ? 'bg-blue-500/10 text-blue-400'
                : 'bg-emerald-500/10 text-emerald-400'
            }`}>
              <Icon className="w-6 h-6" />
            </div>

            {/* 内容 */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-emerald-400 
                           transition-colors">
                {title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {description}
              </p>

              {/* 统计数据 */}
              {milestone.stats && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-2xl font-bold text-emerald-400">
                    {milestone.stats.value}{milestone.stats.suffix}
                  </span>
                  <span className="text-sm text-slate-500">
                    {language === 'zh' ? milestone.stats.label : milestone.stats.label}
                  </span>
                </div>
              )}

              {/* 标签 */}
              <div className="mt-4 flex flex-wrap gap-2">
                {milestone.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-1 text-xs rounded-md bg-slate-800 text-slate-400 
                             border border-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MilestoneCard
