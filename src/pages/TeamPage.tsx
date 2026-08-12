import { AspectRatio } from '@/types/ui'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from '@/contexts/LanguageContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart3, Users, Code, Palette, Heart, ExternalLink, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { ImageProxy } from '@/components/ui/image-proxy'
import { Header } from '@/components/layout/Header'
import { cn } from '@/lib/utils'
import teamGiteeStats from '@/data/team-gitee-stats.json'
const TeamPhoto1 = 'https://cdn.newenergycoder.club/images/src/image/校门合照.jpg'
const TeamPhoto2 = 'https://cdn.newenergycoder.club/images/src/image/横向项目合照.jpg'
const TeamPhoto3 = 'https://cdn.newenergycoder.club/images/src/image/合照1.jpg'
const TeamPhoto4 = 'https://cdn.newenergycoder.club/images/src/image/合照2.jpg'
const TeamPhoto5 = 'https://cdn.newenergycoder.club/images/src/image/合照3.jpg'
const TeamPhoto6 = 'https://cdn.newenergycoder.club/images/src/image/合照4.jpg'
const RCBBLogo = 'https://cdn.newenergycoder.club/images/src/RCBB.png'
import GifAnimation from '@/components/ui/GifAnimation'
import SEO from '@/components/SEO'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'
import { flushSync } from 'react-dom'
import type { TeamMember as TeamMemberType } from '@/lib/i18n/types/translations'
import type { Sponsor, SponsorLevel } from '@/lib/i18n/constants/team'
import { maintainers, developers, designers, contributors, sponsorMetas } from '@/lib/i18n/constants/team'
import { MemberTechDetail } from '@/components/team/MemberTechDetail'
import { MemberCard } from '@/components/team/MemberCard'

// 样式常量定义
const CARD_STYLES = {
  base: "team-card group overflow-hidden hover:shadow-lg transition-colors duration-300 bg-card/90 backdrop-blur-md border-primary/30 hover:border-primary/50 shadow-lg",
  analytics: "bg-card/90 backdrop-blur-md border-primary/30 shadow-lg",
  photo: "bg-card/90 backdrop-blur-md border-primary/30 shadow-lg overflow-hidden"
}

// 团队照片配置 —— 统一管理所有团队照片资源，方便后续替换/轮播
const TEAM_PHOTOS = {
  /** 页面背景使用的校门合照 */
  background: TeamPhoto1,
  /** 横向项目合照（"团队项目合照"区块使用） */
  project: TeamPhoto2,
  /** "更多团队合照" 区块的网格图 */
  gallery: [
    { src: TeamPhoto3, alt: "团队合照1" },
    { src: TeamPhoto4, alt: "团队合照2" },
    { src: TeamPhoto5, alt: "团队合照3" },
    { src: TeamPhoto6, alt: "团队合照4" },
  ],
} as const

// 赞助商等级徽章样式（不含文案，文案通过 i18n 提供）
const SPONSOR_LEVEL_BADGE_STYLES: Record<SponsorLevel, string> = {
  strategic: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0",
  gold: "bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 border-0",
  silver: "bg-gradient-to-r from-slate-300 to-slate-400 text-slate-800 border-0",
  bronze: "bg-gradient-to-r from-orange-400 to-amber-600 text-white border-0",
  partner: "bg-gradient-to-r from-blue-400 to-cyan-500 text-white border-0",
}

// 赞助商卡片组件
function SponsorCard({
  sponsor,
  levelName,
  supportLabel,
  visitWebsiteLabel,
}: {
  sponsor: Sponsor
  levelName: string
  supportLabel: string
  visitWebsiteLabel: string
}) {
  const levelBadgeClass = SPONSOR_LEVEL_BADGE_STYLES[sponsor.level]

  return (
    <Card className="group overflow-hidden border border-gray-200 dark:border-gray-700
      hover:shadow-xl hover:-translate-y-1 transition-all duration-300
      bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">

      {/* Logo 区域 - 统一尺寸 */}
      <div className="p-6 flex justify-center items-center h-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50">
        <div className="relative w-32 h-16 flex items-center justify-center">
          {sponsor.image ? (
            <img
              src={sponsor.image}
              alt={`${sponsor.name} logo`}
              className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
                ;(e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden')
              }}
            />
          ) : null}
          <span className={`text-lg font-bold text-center text-gray-400 ${sponsor.image ? 'hidden' : ''}`}>
            {sponsor.name}
          </span>
        </div>
      </div>

      <CardContent className="p-5">
        {/* 赞助商名称 */}
        <h3 className="text-lg font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
          {sponsor.name}
        </h3>

        {/* 等级徽章 */}
        <div className="flex justify-center mb-3">
          <Badge className={`text-xs px-3 py-1 font-semibold ${levelBadgeClass}`}>
            {levelName}
          </Badge>
        </div>

        {/* 简介 */}
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4 line-clamp-2">
          {sponsor.bio}
        </p>

        {/* 支持内容 */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-2 uppercase tracking-wider">{supportLabel}</p>
          <ul className="space-y-1.5">
            {sponsor.supports.slice(0, 3).map((support, idx) => (
              <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  {support.item}
                  {support.quantity && (
                    <span className="text-xs text-gray-500 ml-1">({support.quantity})</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 访问链接 */}
        {sponsor.website && sponsor.website !== '#' && (
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
            <a
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {visitWebsiteLabel}
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// 过滤分类
const FILTER_CATEGORIES = ['all', 'maintainers', 'developers', 'designers', 'contributors'] as const
type FilterCategory = typeof FILTER_CATEGORIES[number]

// 成员徽章（头像 + @姓名）
function MemberBadge({ member }: { member: TeamMemberType }) {
  const profileUrl = member.github || member.gitee

  const inner = (
    <>
      <div className="relative w-7 h-7 rounded-full overflow-hidden bg-muted shrink-0">
        <ImageProxy
          src={member.image}
          alt={member.name}
          className={`w-full h-full object-cover ${member.avatarStyle === 'bilevel' ? 'avatar-bilevel' : ''}`}
          fallbackSrc={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}`}
        />
      </div>
      <span className="text-sm font-medium text-foreground whitespace-nowrap">
        @{member.name}
      </span>
    </>
  )

  const baseClass =
    'group flex items-center gap-2 pl-1 pr-3 py-1 rounded-md bg-card/80 backdrop-blur-sm border border-primary/20 shrink-0 transition-all duration-300'

  // 没有 GitHub / Gitee 链接时降级为静态徽章，避免 href="#" 跳页首
  if (!profileUrl) {
    return (
      <span className={baseClass} aria-hidden="true">
        {inner}
      </span>
    )
  }

  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClass} hover:border-primary/50 hover:bg-card hover:-translate-y-0.5 hover:shadow-md`}
    >
      {inner}
    </a>
  )
}

// 单行无限滚动 marquee
function MarqueeRow({
  members,
  reverse = false,
  duration = 40,
}: {
  members: TeamMemberType[]
  reverse?: boolean
  duration?: number
}) {
  if (members.length === 0) return null

  const animationName = reverse ? 'marquee-right' : 'marquee-left'
  return (
    <div className="overflow-hidden py-1">
      <div
        className={`marquee-track flex w-max gap-2 ${animationName}`}
        style={{
          animation: `${animationName} ${duration}s linear infinite`,
          transform: reverse ? 'translateX(-50%)' : undefined,
        }}
      >
        {members.map((member, index) => (
          <MemberBadge
            key={`a-${member.github || member.gitee || member.email || member.name}-${index}`}
            member={member}
          />
        ))}
        {members.map((member, index) => (
          <MemberBadge
            key={`b-${member.github || member.gitee || member.email || member.name}-${index}`}
            member={member}
          />
        ))}
      </div>
    </div>
  )
}

// 3 行交错滚动的成员条
function MemberStrip({ members }: { members: TeamMemberType[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  // 不可见时暂停 marquee 动画，减少离屏 GPU/CPU 开销
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const row1 = members.filter((_, i) => i % 3 === 0)
  const row2 = members.filter((_, i) => i % 3 === 1)
  const row3 = members.filter((_, i) => i % 3 === 2)

  const rows = [row1, row2, row3].filter(row => row.length > 0)
  if (rows.length === 0) return null

  return (
    <div
      ref={containerRef}
      className="w-full pb-4"
      data-paused={!isVisible || undefined}
    >
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        /* 容器离屏时暂停所有 marquee 动画 */
        [data-paused] .marquee-track {
          animation-play-state: paused;
        }
        /* 无障碍：用户开启减少动画时直接停掉 */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
      {rows.map((row, idx) => (
        <MarqueeRow
          key={idx}
          members={row}
          reverse={idx % 2 === 1}
          duration={45 + idx * 5}
        />
      ))}
    </div>
  )
}

interface TeamSectionProps {
  title: string
  members: TeamMemberType[]
  selectedRatio?: AspectRatio
  variant?: 'featured' | 'compact'
  onMemberClick?: (member: TeamMemberType) => void
}

function TeamSection({ title, members, selectedRatio, variant = 'compact', onMemberClick }: TeamSectionProps) {
  const isFeatured = variant === 'featured'
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  // 跟踪当前已渲染的卡片集合是否已跑过入场动画。
  // 首次挂载跑入场；之后 members 变化（filter 切换）由 TeamPage 的 Flip 接管，不再重跑入场。
  const hasPlayedIntroRef = useRef(false)

  useGSAP(() => {
    const shouldPlayIntro = !hasPlayedIntroRef.current

    const ctx = gsap.context(() => {
      const titleEl = sectionRef.current?.querySelector('h2')
      const cards = gridRef.current?.querySelectorAll('.team-card')
      const splits: SplitText[] = []

      // 已跑过入场则跳过本次动画，但仍要 revert 任何遗留的 SplitText 包装
      if (!shouldPlayIntro) {
        return () => {
          splits.forEach(split => split.revert())
        }
      }

      if (titleEl) {
        const titleSplit = SplitText.create(titleEl, { type: 'chars' })
        splits.push(titleSplit)
        gsap.fromTo(
          titleSplit.chars,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.02,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 100, rotateX: 15, transformOrigin: 'center bottom' },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      hasPlayedIntroRef.current = true

      return () => {
        splits.forEach(split => split.revert())
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="mb-16" style={{ perspective: '1200px' }}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-foreground drop-shadow-lg dark:text-white dark:drop-shadow-2xl">{title}</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-sm"></div>
      </div>
      <div
        ref={gridRef}
        className={cn(
          'grid',
          isFeatured
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5'
        )}
      >
        {members.map((member, index) => (
          <MemberCard
            // 使用 GitHub/Gitee 等稳定标识作为 key，避免同名成员导致的 key 冲突
            key={member.github || member.gitee || member.email || member.name}
            member={member}
            variant={isFeatured ? 'featured' : 'compact'}
            aspectRatio={selectedRatio}
            onClick={onMemberClick ? () => onMemberClick(member) : undefined}
            priority={isFeatured && index < 4}
          />
        ))}
      </div>
    </section>
  )
}

// 统计卡片组件属性类型
interface StatCardProps {
  title: string
  count: number
  description: string
  icon: React.ComponentType<{ className?: string }>
}

// 统计卡片组件
function StatCard({ title, count, description, icon: Icon }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!cardRef.current) return
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, { scope: cardRef })

  return (
    <Card ref={cardRef} className={CARD_STYLES.analytics}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

// 照片卡片组件属性类型
interface PhotoCardProps {
  src: string
  alt: string
}

// 图片卡片组件
function PhotoCard({ src, alt }: PhotoCardProps) {
  return (
    <Card className="group overflow-hidden bg-card/90 backdrop-blur-md border-primary/30 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-primary/50">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <ImageProxy
            src={src}
            alt={alt}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            fallbackSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </CardContent>
    </Card>
  )
}

export function TeamPage() {
  const t = useTranslation()
  const [selectedRatio] = useState<AspectRatio>('aspect-[3/4]')
  const [filter, setFilter] = useState<FilterCategory>('all')
  const [selectedMember, setSelectedMember] = useState<TeamMemberType | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  // 过滤后的成员 —— 依赖具体的 4 个数组而不是整个 t.team，
  // 避免 LanguageContext 返回的 t 引用每次渲染都变导致 memo 失效
  const filteredMembers = useMemo(() => {
    switch (filter) {
      case 'maintainers': return { maintainers: t.team.maintainers, developers: [], designers: [], contributors: [] }
      case 'developers': return { maintainers: [], developers: t.team.developers, designers: [], contributors: [] }
      case 'designers': return { maintainers: [], developers: [], designers: t.team.designers, contributors: [] }
      case 'contributors': return { maintainers: [], developers: [], designers: [], contributors: t.team.contributors }
      default: return {
        maintainers: t.team.maintainers,
        developers: t.team.developers,
        designers: t.team.designers,
        contributors: t.team.contributors
      }
    }
  }, [filter, t.team.maintainers, t.team.developers, t.team.designers, t.team.contributors])

  // Flip 过滤切换
  const handleFilterChange = (nextFilter: FilterCategory) => {
    if (nextFilter === filter || !pageRef.current) return

    // 目标分类没有成员时直接切换，跳过 Flip（无元素可动画，跑了也没视觉效果）
    const nextMembers =
      nextFilter === 'all'
        ? [...t.team.maintainers, ...t.team.developers, ...t.team.designers, ...t.team.contributors]
        : t.team[nextFilter]
    if (nextMembers.length === 0) {
      setFilter(nextFilter)
      return
    }

    // 获取当前所有团队卡片的 Flip 状态
    const state = Flip.getState('.team-card')

    // flushSync 强制同步提交 DOM，保证随后 Flip.from 读到的是最新布局
    // （原先用 requestAnimationFrame 在 React 18 并发渲染下偶发时序错乱，导致卡片直接闪现）
    flushSync(() => {
      setFilter(nextFilter)
    })

    Flip.from(state, {
      duration: 0.65,
      ease: 'power3.inOut',
      stagger: 0.04,
      absolute: true,
      scale: true,
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { opacity: 0, scale: 0.8, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'back.out(1.4)' }
        )
      },
      onLeave: (elements) => {
        gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.35, ease: 'power2.in' })
      },
    })
  }

  // Hero 描述 SplitText 入场
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const paragraphs = heroRef.current?.querySelectorAll('.hero-desc-paragraph')
      const splits: SplitText[] = []

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
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      return () => {
        splits.forEach(split => split.revert())
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // 仅将中文角引号「」着色为主题色，其余文本按分段合并为字符串节点。
  // 避免逐字符生成 <span>（一段中文可能产生上百个节点，拖累 React reconciliation）。
  const renderBracketStyled = (text: string) => {
    const parts: Array<{ text: string; highlight: boolean }> = []
    let buffer = ''
    for (const ch of text) {
      if (ch === '「' || ch === '」') {
        if (buffer) {
          parts.push({ text: buffer, highlight: false })
          buffer = ''
        }
        parts.push({ text: ch, highlight: true })
      } else {
        buffer += ch
      }
    }
    if (buffer) parts.push({ text: buffer, highlight: false })

    return (
      <>
        {parts.map((part, idx) =>
          part.highlight ? (
            <span key={idx} className="text-primary">{part.text}</span>
          ) : (
            <React.Fragment key={idx}>{part.text}</React.Fragment>
          )
        )}
      </>
    )
  }

  // 将长段说明文字按句分段，以提升可读性
  const renderDescriptionParagraphs = (text: string) => {
    const sentences = text
      .split(/(?<=[。.!?])\s+/)
      .map(s => s.trim())
      .filter(Boolean)

    const renderCurlyEmphasis = (t: string) => {
      const targetPhrase = "如何让世界更高效、更清洁";
      const actionSentenceRegex = /^我们，是一个行动动词/;
      const englishFuturePhrase = "a greener, fairer, and smarter future";
      const englishActionSentenceRegex = /^We are a verb in action/;

      if (t.includes(targetPhrase)) {
        const parts = t.split(targetPhrase);
        return (
          <>
            {renderBracketStyled(parts[0])}
            <span className="text-primary font-bold">{"{ "}</span>
            <span className="font-bold">{targetPhrase}</span>
            <span className="text-primary font-bold">{" }"}</span>
            {renderBracketStyled(parts.slice(1).join(targetPhrase))}
          </>
        );
      }

      if (actionSentenceRegex.test(t)) {
        const hasPeriod = /。$/.test(t);
        const core = hasPeriod ? t.replace(/。$/, "") : t;
        return (
          <>
            <span className="text-primary font-bold">{"{ "}</span>
            <span className="text-primary font-bold">{core}</span>
            <span className="text-primary font-bold">{" }"}</span>
            {hasPeriod && <span>。</span>}
          </>
        );
      }

      if (englishActionSentenceRegex.test(t)) {
        const hasPeriod = /\.$/.test(t);
        const core = hasPeriod ? t.replace(/\.$/, "") : t;
        return (
          <>
            <span className="text-primary font-bold">{"{ "}</span>
            <span className="text-primary font-bold">{core}</span>
            <span className="text-primary font-bold">{" }"}</span>
            {hasPeriod && <span>.</span>}
          </>
        );
      }

      if (t.includes(englishFuturePhrase)) {
        const parts = t.split(englishFuturePhrase);
        return (
          <>
            {renderBracketStyled(parts[0])}
            <span className="text-primary font-bold">{englishFuturePhrase}</span>
            {renderBracketStyled(parts.slice(1).join(englishFuturePhrase))}
          </>
        );
      }

      return renderBracketStyled(t);
    }

    return sentences.map((s, idx) => {
      let cls = "hero-desc-paragraph mt-2 text-muted-foreground leading-relaxed tracking-wide"
      // 中文版强调
      if (/^一群在代码与梦想交汇处相遇的人/.test(s)) {
        cls = "hero-desc-paragraph mt-2 leading-relaxed tracking-wide font-bold text-foreground dark:text-white"
      }
      if (/^我们不同——/.test(s) || /^但我们相同——/.test(s)) {
        cls = "hero-desc-paragraph mt-2 leading-relaxed tracking-wide font-bold text-foreground dark:text-white"
      }
      if (/^我们，是一个行动动词/.test(s)) {
        cls = "hero-desc-paragraph mt-2 leading-relaxed tracking-wide font-bold text-primary"
      }
      // 英文版强调（与中文版对应）
      if (/^We are a group meeting at the intersection of code and dreams/.test(s)) {
        cls = "hero-desc-paragraph mt-2 leading-relaxed tracking-wide font-bold text-foreground dark:text-white"
      }
      if (/^We differ —/.test(s) || /^Yet we are the same —/.test(s)) {
        cls = "hero-desc-paragraph mt-2 leading-relaxed tracking-wide font-bold text-foreground dark:text-white"
      }
      if (/^We are a verb in action/.test(s)) {
        cls = "hero-desc-paragraph mt-2 leading-relaxed tracking-wide font-bold text-primary"
      }

      return (
        <p key={idx} className={cls}>
          {renderCurlyEmphasis(s)}
        </p>
      )
    })
  }

  // 使用 useMemo 优化统计计算
  const teamStats = useMemo(() => {
    const counts = {
      maintainers: t.team.maintainers?.length || 0,
      developers: t.team.developers?.length || 0,
      designers: t.team.designers?.length || 0,
      contributors: t.team.contributors?.length || 0
    }

    const total = Object.values(counts).reduce((sum, count) => sum + count, 0)

    const percentages = Object.fromEntries(
      Object.entries(counts).map(([key, count]) => [
        key,
        total > 0 ? ((count / total) * 100).toFixed(1) : '0.0'
      ])
    )

    return { counts, percentages, total }
  }, [t.team.maintainers, t.team.developers, t.team.designers, t.team.contributors])

  // 所有成员合并（用于顶部成员条）
  const allMembers = useMemo(() => [
    ...maintainers,
    ...developers,
    ...designers,
    ...contributors
  ], [])

  // 合并 sponsorMetas（不可译） + t.team.sponsors（可译） 得到完整 Sponsor 列表
  const sponsors = useMemo<Sponsor[]>(() => {
    return sponsorMetas.map((meta, idx) => {
      const text = t.team.sponsors[idx]
      return {
        name: meta.name,
        role: text?.role ?? '',
        bio: text?.bio ?? '',
        image: meta.image ?? '',
        tags: text?.tags ?? [],
        level: meta.level,
        supports: text?.supports ?? [],
        website: meta.website,
      }
    })
  }, [t.team.sponsors])

  // 赞助商按等级分组
  const sponsorsByLevel = useMemo(() => ({
    strategic: sponsors.filter(s => s.level === 'strategic'),
    gold: sponsors.filter(s => s.level === 'gold'),
    silver: sponsors.filter(s => s.level === 'silver'),
    bronze: sponsors.filter(s => s.level === 'bronze'),
    partner: sponsors.filter(s => s.level === 'partner')
  }), [sponsors])

  return (
    <div ref={pageRef} className="flex min-h-screen flex-col">
      <SEO
        title="团队介绍"
        description="认识 NEC 新能源编程俱乐部的核心成员与贡献者：硬件组、软件组、算法组、设计组，覆盖机器人全栈开发。开源社区的每一位 Maintainer 与 Contributor 都在这里。"
        keywords="NEC团队,新能源编程俱乐部成员,开源贡献者,Maintainer,机器人团队"
        path="/team"
      />
      <Header />
      <div className="flex-1 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Background with team photos */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/90 dark:from-background/98 dark:to-background/95"></div>
          {/* 浅色/深色模式都使用 CDN 上的团队合照作为背景，避免外部链接失效 */}
          <img
            src={TEAM_PHOTOS.background}
            alt="团队校门合照"
            className="w-full h-full object-cover opacity-[0.07] blur-sm block dark:hidden"
            onError={(e) => {
              (e.target as HTMLImageElement).src = TEAM_PHOTOS.project
            }}
          />
          <img
            src={TEAM_PHOTOS.background}
            alt="团队校门合照"
            className="w-full h-full object-cover opacity-[0.10] blur-sm hidden dark:block"
            onError={(e) => {
              (e.target as HTMLImageElement).src = TEAM_PHOTOS.project
            }}
          />
        </div>

      <div className="container py-12 relative z-20">
        {/* Hero Section with Theme Toggle */}
        <div ref={heroRef} className="mb-12 relative">
          <div className="flex items-center justify-center gap-3">
            <Button
              type="button"
              variant="default"
              className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-xl md:text-2xl font-bold shadow hover:glow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`{ ${t.about.title} }`}
            >
              {`{ ${t.about.title} }`}
            </Button>
            <ThemeToggle />
          </div>
          <div className="mt-4"></div>
          <div className="text-xl text-muted-foreground max-w-3xl mx-auto dark:text-gray-200 drop-shadow-md">
            {renderDescriptionParagraphs(t.team.description)}
          </div>
        </div>

        {/* Members Strip */}
        <div className="mb-8">
          <MemberStrip members={allMembers} />
        </div>

        {/* Team Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground drop-shadow-lg dark:text-white dark:drop-shadow-2xl">
            {t.team.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-sm"></div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FILTER_CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={filter === category ? 'default' : 'outline'}
              size="sm"
              className={`
                filter-button relative overflow-hidden rounded-full px-5 transition-all duration-300
                ${filter === category
                  ? 'bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)]'
                  : 'border-primary/30 hover:border-primary/60 hover:bg-primary/10'
                }
              `}
              onClick={() => handleFilterChange(category)}
            >
              {t.team.filterLabels[category]}
            </Button>
          ))}
        </div>

        {/* Team Sections —— 入场动画由 TeamSection 内部 useGSAP 自管理（仅首次播放），筛选切换时由 Flip 接管 */}
        <TeamSection title={t.team.maintainerTitle} members={filteredMembers.maintainers} selectedRatio={selectedRatio} variant="featured" onMemberClick={setSelectedMember} />
        <TeamSection title={t.team.developerTitle} members={filteredMembers.developers} selectedRatio={selectedRatio} variant="compact" onMemberClick={setSelectedMember} />
        <TeamSection title={t.team.designerTitle} members={filteredMembers.designers} selectedRatio={selectedRatio} variant="compact" onMemberClick={setSelectedMember} />
        <TeamSection title={t.team.contributorTitle} members={filteredMembers.contributors} selectedRatio={selectedRatio} variant="compact" onMemberClick={setSelectedMember} />

        <MemberTechDetail
          member={selectedMember}
          open={!!selectedMember}
          onOpenChange={open => {
            if (!open) setSelectedMember(null)
          }}
        />

        {/* Team Analytics Section */}
        <div className="mt-16 mb-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BarChart3 className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight text-foreground drop-shadow-lg dark:text-white dark:drop-shadow-2xl">
                {t.team.analytics.title}
              </h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-2">
              {t.team.analytics.description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {t.team.analytics.giteeReference}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
              {t.team.analytics.lastUpdated}: {new Date(teamGiteeStats.generatedAt).toLocaleDateString('zh-CN')}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-sm"></div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            <StatCard title={t.team.statsLabels.maintainers} count={teamStats.counts.maintainers} description={t.team.statsLabels.maintainersDesc} icon={Users} />
            <StatCard title={t.team.statsLabels.developers} count={teamStats.counts.developers} description={t.team.statsLabels.developersDesc} icon={Code} />
            <StatCard title={t.team.statsLabels.designers} count={teamStats.counts.designers} description={t.team.statsLabels.designersDesc} icon={Palette} />
            <StatCard title={t.team.statsLabels.contributors} count={teamStats.counts.contributors} description={t.team.statsLabels.contributorsDesc} icon={Heart} />
          </div>

          {/* Detailed Analytics Table */}
          <Card className={CARD_STYLES.analytics}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{t.team.analytics.roleDistribution}</CardTitle>
              <CardDescription>{t.team.analytics.contributionStats}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.team.statsLabels.roleTypeHeader}</TableHead>
                    <TableHead className="text-center">{t.team.statsLabels.countHeader}</TableHead>
                    <TableHead className="text-center">{t.team.statsLabels.percentageHeader}</TableHead>
                    <TableHead>{t.team.analytics.mainResponsibilities}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">{t.team.statsLabels.maintainers}</TableCell>
                    <TableCell className="text-center">{teamStats.counts.maintainers}</TableCell>
                    <TableCell className="text-center">{teamStats.percentages.maintainers}%</TableCell>
                    <TableCell>{t.team.analytics.maintainerResponsibilities}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.team.statsLabels.developers}</TableCell>
                    <TableCell className="text-center">{teamStats.counts.developers}</TableCell>
                    <TableCell className="text-center">{teamStats.percentages.developers}%</TableCell>
                    <TableCell>{t.team.analytics.developerResponsibilities}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.team.statsLabels.designers}</TableCell>
                    <TableCell className="text-center">{teamStats.counts.designers}</TableCell>
                    <TableCell className="text-center">{teamStats.percentages.designers}%</TableCell>
                    <TableCell>{t.team.analytics.designerResponsibilities}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.team.statsLabels.contributors}</TableCell>
                    <TableCell className="text-center">{teamStats.counts.contributors}</TableCell>
                    <TableCell className="text-center">{teamStats.percentages.contributors}%</TableCell>
                    <TableCell>{t.team.analytics.contributorResponsibilities}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Team Project Photo Section */}
        <div className="mt-16 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground drop-shadow-lg dark:text-white dark:drop-shadow-2xl">
              团队项目合照
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-sm"></div>
          </div>

          <Card className={CARD_STYLES.photo}>
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <img
                  src={TEAM_PHOTOS.project}
                  alt="团队横向项目合照"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
                <div className="absolute inset-0 backdrop-blur-sm" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
              </div>
              <div className="p-6">
                <p className="text-center text-muted-foreground dark:text-gray-200">
                  {t.team.teamPhotoDescription}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Team Photos Section */}
        <div className="mt-16 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground drop-shadow-lg dark:text-white dark:drop-shadow-2xl">
              更多团队合照
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-sm"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM_PHOTOS.gallery.map((photo, index) => (
              <PhotoCard key={index} src={photo.src} alt={photo.alt} />
            ))}
          </div>
        </div>

        {/* Sponsors Section */}
        {sponsors.length > 0 && (
          <div className="mt-20 mb-16 pt-12 border-t border-gray-200 dark:border-gray-800">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-3">
                <Building2 className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">{t.team.sponsorSection.title}</h2>
              </div>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {t.team.sponsorSection.subtitle}
              </p>
            </div>

            {/* 按等级分组展示 */}
            <div className="space-y-10">
              {/* 战略合作伙伴 */}
              {sponsorsByLevel.strategic.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-center">
                    <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm">
                      {t.team.sponsorSection.levelNames.strategic}
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {sponsorsByLevel.strategic.map((sponsor, idx) => (
                      <SponsorCard
                        key={idx}
                        sponsor={sponsor}
                        levelName={t.team.sponsorSection.levelNames[sponsor.level]}
                        supportLabel={t.team.sponsorSection.supportLabel}
                        visitWebsiteLabel={t.team.sponsorSection.visitWebsite}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Gold Sponsors */}
              {sponsorsByLevel.gold.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-center">
                    <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 text-sm">
                      {t.team.sponsorSection.goldGroupTitle}
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {sponsorsByLevel.gold.map((sponsor, idx) => (
                      <SponsorCard
                        key={idx}
                        sponsor={sponsor}
                        levelName={t.team.sponsorSection.levelNames[sponsor.level]}
                        supportLabel={t.team.sponsorSection.supportLabel}
                        visitWebsiteLabel={t.team.sponsorSection.visitWebsite}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Silver & Bronze */}
              {(sponsorsByLevel.silver.length > 0 || sponsorsByLevel.bronze.length > 0) && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-center">
                    <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-slate-300 to-slate-400 text-slate-800 text-sm">
                      {t.team.sponsorSection.silverBronzeGroupTitle}
                    </span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...sponsorsByLevel.silver, ...sponsorsByLevel.bronze].map((sponsor, idx) => (
                      <SponsorCard
                        key={idx}
                        sponsor={sponsor}
                        levelName={t.team.sponsorSection.levelNames[sponsor.level]}
                        supportLabel={t.team.sponsorSection.supportLabel}
                        visitWebsiteLabel={t.team.sponsorSection.visitWebsite}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 成为赞助商 CTA */}
            <div className="mt-12 text-center">
              <Card className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-primary/20">
                <div className="text-left">
                  <h4 className="font-semibold mb-1">{t.team.sponsorSection.ctaTitle}</h4>
                  <p className="text-sm text-muted-foreground">{t.team.sponsorSection.ctaDescription}</p>
                </div>
                <Button asChild>
                  <a href="mailto:22230635@czu.cn">
                    <Heart className="h-4 w-4 mr-2" />
                    {t.team.sponsorSection.ctaButton}
                  </a>
                </Button>
              </Card>
            </div>
          </div>
        )}

        {/* Three.js Animation Section */}
        <div className="mt-20 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground drop-shadow-lg dark:text-white dark:drop-shadow-2xl">
              <a href="https://rcbbs.top/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                萝马车圈
              </a>
            </h2>
            {/* RCBB 图片展示：置于标题下方 */}
            <div className="flex justify-center mb-6">
              <img
                src={RCBBLogo}
                alt="萝马车圈 RCBB"
                className="w-full h-auto max-w-[1600px] drop-shadow"
              />
            </div>
            <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto mb-6">
              <span className="text-primary font-semibold mr-2">网页链接：</span>
              <a href="https://rcbbs.top/" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary/80 transition-colors">
                https://rcbbs.top/
              </a>
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-sm mb-8"></div>
          </div>
        <GifAnimation />
        </div>
      </div>
    </div>
    </div>
  )
}
