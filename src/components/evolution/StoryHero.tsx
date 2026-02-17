import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { ChevronDown, Zap } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function StoryHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const { t, language } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // 背景渐变淡入
      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 }
      )

      // Logo 从中心缩放出现 + 发光效果
      tl.fromTo(
        logoRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8 },
        '-=0.5'
      )

      // Logo 脉动动画
      gsap.to(logoRef.current, {
        scale: 1.05,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })

      // 主标题从下方滑入
      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.3'
      )

      // 副标题打字机效果
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      )

      // 滚动指示器淡入 + 持续弹跳
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.2'
      )

      // 滚动指示器弹跳动画
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleScrollClick = () => {
    const firstChapter = document.getElementById('chapter-2023')
    if (firstChapter) {
      firstChapter.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const title = language === 'zh' ? 'NEC 演进历程' : 'NEC Evolution Story'
  const subtitle = language === 'zh' 
    ? '从五颗种子到一片森林，见证代码如何塑造未来的能源世界'
    : 'From five seeds to a forest, witness how code shapes the future of energy'

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      {/* 网格背景 */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* 发光粒子效果 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* 内容 */}
      <div className="relative z-10 text-center px-4">
        {/* Logo */}
        <div
          ref={logoRef}
          className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 
                     flex items-center justify-center shadow-2xl shadow-emerald-500/30"
        >
          <Zap className="w-12 h-12 text-white" />
        </div>

        {/* 主标题 */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-teal-400 
                     to-cyan-400 bg-clip-text text-transparent"
        >
          {title}
        </h1>

        {/* 副标题 */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </p>

        {/* 年份指示 */}
        <div className="mt-12 flex items-center justify-center gap-4 text-slate-500">
          <span className="text-2xl font-light">2023</span>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
          <span className="text-2xl font-light">2025</span>
        </div>
      </div>

      {/* 滚动指示器 */}
      <div
        ref={scrollIndicatorRef}
        onClick={handleScrollClick}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer group"
      >
        <div className="flex flex-col items-center gap-2 text-slate-500 group-hover:text-emerald-400 transition-colors">
          <span className="text-sm">{language === 'zh' ? '开始探索' : 'Start Exploring'}</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>

      {/* 底部渐变遮罩 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  )
}

export default StoryHero
