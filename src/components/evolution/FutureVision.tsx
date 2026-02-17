import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { futureVision } from '@/data/evolutionData'
import { Users, Code, Building, Sparkles, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Code,
  Building,
  Network: Users,
}

export function FutureVision() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 内容淡入
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
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
          },
        }
      )

      // 统计数据动画
      const statElements = statsRef.current?.querySelectorAll('.stat-item')
      if (statElements) {
        gsap.fromTo(
          statElements,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // 数字增长动画
        statElements.forEach((el) => {
          const valueEl = el.querySelector('.stat-value')
          if (valueEl) {
            const target = parseInt(valueEl.getAttribute('data-value') || '0')
            gsap.fromTo(
              { value: 0 },
              { value: target },
              {
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 80%',
                  toggleActions: 'play none none reverse',
                },
                onUpdate: function () {
                  valueEl.textContent = Math.round(this.targets()[0].value).toString()
                },
              }
            )
          }
        })
      }

      // 粒子动画
      const particles = sectionRef.current?.querySelectorAll('.vision-particle')
      if (particles) {
        particles.forEach((particle, i) => {
          gsap.to(particle, {
            y: -100 - Math.random() * 200,
            x: (Math.random() - 0.5) * 100,
            opacity: 0,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            delay: i * 0.2,
            ease: 'power1.out',
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const theme = language === 'zh' ? futureVision.theme : futureVision.themeEn
  const subtitle = language === 'zh' ? futureVision.subtitle : futureVision.subtitleEn
  const mission = language === 'zh' ? futureVision.mission : futureVision.missionEn

  return (
    <section
      ref={sectionRef}
      id="future"
      className="relative min-h-screen py-32 px-4 overflow-hidden"
    >
      {/* 星空背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-violet-950/30 to-slate-950">
        {/* 星星 */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* 上升粒子 */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="vision-particle absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '0',
              backgroundColor: futureVision.color,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      <div ref={contentRef} className="relative max-w-6xl mx-auto text-center">
        {/* 无限符号 */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full 
                          bg-gradient-to-br from-violet-500/20 to-purple-500/20 
                          border border-violet-500/30 backdrop-blur-sm">
            <Sparkles className="w-12 h-12 text-violet-400" />
          </div>
        </div>

        {/* 标题 */}
        <h2 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-violet-400 
                     via-purple-400 to-pink-400 bg-clip-text text-transparent">
          {theme}
        </h2>
        <p className="text-xl md:text-2xl text-slate-400 mb-8">{subtitle}</p>

        {/* 使命宣言 */}
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
            "{mission}"
          </p>
        </div>

        {/* 目标统计 */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto"
        >
          {futureVision.targets.map((target, index) => {
            const Icon = iconMap[target.icon] || Sparkles
            return (
              <div 
                key={index}
                className="stat-item p-6 rounded-2xl bg-slate-900/50 backdrop-blur-sm 
                         border border-slate-800 hover:border-violet-500/50 
                         transition-all duration-300 hover:-translate-y-1"
              >
                <Icon className="w-8 h-8 mx-auto mb-4 text-violet-400" />
                <div 
                  className="stat-value text-4xl md:text-5xl font-bold text-white mb-2"
                  data-value={target.value}
                >
                  0
                </div>
                <div className="text-slate-400 text-sm">{target.suffix}</div>
                <div className="text-slate-500 text-xs mt-1">{target.label}</div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16">
          <a
            href="/join"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full 
                     bg-gradient-to-r from-violet-600 to-purple-600 
                     text-white font-medium hover:from-violet-500 hover:to-purple-500 
                     transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25
                     group"
          >
            {language === 'zh' ? '加入我们，共创未来' : 'Join Us, Create the Future'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default FutureVision
