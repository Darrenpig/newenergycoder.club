import { useRef, useMemo } from 'react'
import { useTranslation } from '@/contexts/LanguageContext'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

/**
 * 社区宣言 + 成员滚动墙
 * 宣言段落按行入场（SplitText lines + ScrollTrigger），
 * 下方成员卡片横向无限滚动（悬停减速，两端渐隐）。
 */
export function ManifestoSection() {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const sloganRef = useRef<HTMLParagraphElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const rowTweens = useRef<gsap.core.Tween[]>([])

  // 汇总所有成员（去重），均分为三行，每行复制一份实现无缝滚动
  const memberRows = useMemo(() => {
    const groups = [t.team.maintainers, t.team.developers, t.team.designers, t.team.contributors]
    const seen = new Set<string>()
    const all = groups
      .flat()
      .filter((m) => {
        if (!m?.name || !m?.image || seen.has(m.name)) return false
        seen.add(m.name)
        return true
      })
    const rowCount = 3
    const perRow = Math.ceil(all.length / rowCount)
    return Array.from({ length: rowCount }, (_, i) => {
      const slice = all.slice(i * perRow, (i + 1) * perRow)
      return [...slice, ...slice]
    })
  }, [t])

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const splits: SplitText[] = []

        // 宣言段落按行入场
        const paragraphs = textRef.current?.querySelectorAll('.manifesto-paragraph')
        paragraphs?.forEach((p) => {
          const split = SplitText.create(p, { type: 'lines' })
          splits.push(split)
          gsap.fromTo(
            split.lines,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: p,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        })

        // 金句弹入（不拆字，避免 gradient-text 子元素裁剪问题）
        if (sloganRef.current) {
          gsap.fromTo(
            sloganRef.current,
            { opacity: 0, scale: 0.9, y: 30 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: 'back.out(1.6)',
              scrollTrigger: {
                trigger: sloganRef.current,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }

        // 成员墙：淡入 + 无限横向滚动
        gsap.fromTo(
          marqueeRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: marqueeRef.current,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // 三行成员墙：奇偶行反向交错无限滚动
        const tracks = marqueeRef.current?.querySelectorAll<HTMLElement>('.member-track')
        rowTweens.current = []
        tracks?.forEach((track, i) => {
          const totalWidth = track.scrollWidth / 2
          if (totalWidth <= 0) return
          const duration = Math.max(28, (track.children.length / 2) * 1.6)
          const reverse = i % 2 === 1
          const tween = reverse
            ? gsap.fromTo(
                track,
                { x: -totalWidth },
                { x: 0, duration, repeat: -1, ease: 'none' }
              )
            : gsap.to(track, { x: -totalWidth, duration, repeat: -1, ease: 'none' })
          rowTweens.current.push(tween)
        })

        return () => {
          splits.forEach((s) => s.revert())
        }
      }, sectionRef)

      return () => ctx.revert()
    },
    { scope: sectionRef, dependencies: [memberRows] }
  )

  const handleMarqueeEnter = () => {
    rowTweens.current.forEach((tween) => {
      gsap.to(tween, { timeScale: 0.25, duration: 0.4, ease: 'power2.out' })
    })
  }
  const handleMarqueeLeave = () => {
    rowTweens.current.forEach((tween) => {
      gsap.to(tween, { timeScale: 1, duration: 0.4, ease: 'power2.out' })
    })
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 bg-gradient-to-b from-background via-primary/5 to-background"
    >
      <div className="container relative z-10">
        {/* 宣言正文 */}
        <div ref={textRef} className="mx-auto max-w-3xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
            {t.manifesto.title}
          </h2>

          <p className="manifesto-paragraph mt-10 text-lg sm:text-xl leading-loose text-foreground/90">
            {t.manifesto.p1}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 text-left">
            <div className="manifesto-paragraph rounded-2xl border border-border/50 bg-card/40 p-5 backdrop-blur-sm">
              <p className="text-sm font-semibold text-muted-foreground mb-2">{t.manifesto.p2DifferentLabel}</p>
              <p className="leading-relaxed text-foreground/85">{t.manifesto.p2Different}</p>
            </div>
            <div className="manifesto-paragraph rounded-2xl border border-primary/20 bg-primary/5 p-5 backdrop-blur-sm">
              <p className="text-sm font-semibold text-primary mb-2">{t.manifesto.p2SameLabel}</p>
              <p className="leading-relaxed text-foreground/85">{t.manifesto.p2Same}</p>
            </div>
          </div>

          <p className="manifesto-paragraph mt-10 text-lg sm:text-xl leading-loose text-foreground/90">
            {t.manifesto.p3}
          </p>

          <p
            ref={sloganRef}
            className="gradient-text mt-12 text-3xl sm:text-4xl font-bold tracking-tight opacity-0"
          >
            {t.manifesto.slogan}
          </p>
        </div>

        {/* 成员滚动墙：三行交错方向 */}
        <div
          ref={marqueeRef}
          className="mt-16 space-y-4 overflow-hidden py-2 opacity-0 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          onMouseEnter={handleMarqueeEnter}
          onMouseLeave={handleMarqueeLeave}
        >
          {memberRows.map((row, rowIndex) => (
            <div key={rowIndex} className="member-track flex w-max items-stretch gap-4 px-2">
              {row.map((member, index) => (
                <div
                  key={`${member.name}-${index}`}
                  className="flex w-52 flex-shrink-0 items-center gap-3 rounded-2xl border border-border/50 bg-card/40 p-3 backdrop-blur-sm transition-colors hover:border-primary/40"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-12 w-12 flex-shrink-0 rounded-full border border-primary/20 object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{member.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
