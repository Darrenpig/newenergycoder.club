import { useEffect, useState, useCallback } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { PageLayout } from '@/components/layout/PageLayout'
import { StoryHero } from '@/components/evolution/StoryHero'
import { MilestoneSection } from '@/components/evolution/MilestoneSection'
import { TimelineNavigation } from '@/components/evolution/TimelineNavigation'
import { FutureVision } from '@/components/evolution/FutureVision'
import { evolutionData } from '@/data/evolutionData'

function EvolutionStoryPage() {
  const [activeSection, setActiveSection] = useState('chapter-2023')

  const handleActivate = useCallback((id: string) => {
    setActiveSection(id)
  }, [])

  useEffect(() => {
    // 初始化 ScrollTrigger
    ScrollTrigger.refresh()

    // 页面加载动画
    gsap.fromTo(
      document.body,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <PageLayout>
      <div className="relative bg-slate-950 min-h-screen">
        {/* 全局背景效果 */}
        <div className="fixed inset-0 pointer-events-none">
          {/* 渐变光晕 */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        </div>

        {/* 时间线导航 */}
        <TimelineNavigation activeSection={activeSection} />

        {/* 页面内容 */}
        <main className="relative">
          {/* Hero 区域 */}
          <StoryHero />

          {/* 里程碑章节 */}
          {evolutionData.map((chapter, index) => (
            <MilestoneSection
              key={chapter.id}
              chapter={chapter}
              index={index}
              isActive={activeSection === chapter.id}
              onActivate={() => handleActivate(chapter.id)}
            />
          ))}

          {/* 未来愿景 */}
          <FutureVision />
        </main>

        {/* 底部渐变 */}
        <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
      </div>
    </PageLayout>
  )
}

export default EvolutionStoryPage
