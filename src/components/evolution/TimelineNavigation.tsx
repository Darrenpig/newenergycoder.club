import { useEffect, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { evolutionData, futureVision } from '@/data/evolutionData'
import { useLanguage } from '@/contexts/LanguageContext'

interface TimelineNavigationProps {
  activeSection: string
}

export function TimelineNavigation({ activeSection }: TimelineNavigationProps) {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  const sections = [
    ...evolutionData.map(c => ({ id: c.id, label: c.period, color: c.color })),
    { id: 'future', label: language === 'zh' ? '未来' : 'Future', color: '#8B5CF6' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight
      setIsVisible(window.scrollY > heroHeight * 0.5)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 100 },
        ease: 'power3.inOut',
      })
    }
  }

  return (
    <nav 
      className={`fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 
                  transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'
                  }`}
    >
      <div className="flex flex-col items-center gap-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleClick(section.id)}
            className="group relative flex items-center justify-center"
            aria-label={`Go to ${section.label}`}
          >
            {/* 时间点 */}
            <div 
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === section.id
                  ? 'scale-150 border-white'
                  : 'border-slate-600 group-hover:border-slate-400'
              }`}
              style={{ 
                backgroundColor: activeSection === section.id ? section.color : 'transparent',
                boxShadow: activeSection === section.id ? `0 0 15px ${section.color}` : 'none',
              }}
            />

            {/* 标签提示 */}
            <span 
              className="absolute right-6 px-3 py-1.5 bg-slate-900/90 backdrop-blur-sm 
                       text-sm font-medium text-slate-300 rounded-lg border border-slate-700
                       opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
                       transition-all duration-300 whitespace-nowrap pointer-events-none"
            >
              {section.label}
            </span>

            {/* 连接线 */}
            {section.id !== 'future' && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-px h-4 bg-slate-800" />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default TimelineNavigation
