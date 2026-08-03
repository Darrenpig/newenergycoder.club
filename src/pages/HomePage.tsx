import { PageLayout } from '@/components/layout/PageLayout'
import { HeroSection } from '@/components/home/HeroSection'
import { AboutSection } from '@/components/home/AboutSection'
import { ManifestoSection } from '@/components/home/ManifestoSection'
// 原成员墙暂时隐藏（成员展示已由宣言区三行滚动墙承担）
// import { TeamSection } from '@/components/home/TeamSection'
import { TeamAnalysisSection } from '@/components/home/TeamAnalysisSection'
import { ProjectsSection } from '@/components/home/ProjectsSection'
import { CTASection } from '@/components/home/CTASection'
import { type AspectRatio } from '@/components/ui/floating-controls'
import { useEffect, useState } from 'react'

function HomePage() {
  // 显示比例状态管理 - 控制页面中卡片图片的宽高比显示
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('aspect-[3/4]')
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <PageLayout 
      showAspectRatio={true}
      aspectRatio={selectedRatio}
      onAspectRatioChange={setSelectedRatio}
    >
      <HeroSection />
      <AboutSection />
      <ManifestoSection />
      {/* 原成员墙暂时注释隐藏
      <TeamSection selectedRatio={selectedRatio} />
      */}
      <TeamAnalysisSection />
      <ProjectsSection selectedRatio={selectedRatio} />
      <CTASection />
    </PageLayout>
  )
}

export default HomePage