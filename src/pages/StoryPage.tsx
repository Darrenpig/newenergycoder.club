import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Zap, ExternalLink, Clock, Banknote, Cpu, Trophy } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

// 翻译内容
const translations = {
  zh: {
    nav: {
      home: '首页',
      team: '团队',
      story: '起源故事'
    },
    hero: {
      badge: 'Origin Story',
      title: '5月12日',
      subtitle: '那20小时',
      description: '账上200块生活费、两块变砖的ESP32、还有凌晨4:30实验室的呼噜声'
    },
    stats: {
      money: { value: '¥200', label: '剩余生活费', hint: '距离破产还有0天' },
      time: { value: '20h', label: '连续奋战' },
      bricks: { value: '2', label: '变砖的板子', hint: 'ESP32已阵亡' },
      rank: { value: '#12', label: '校赛排名', hint: '奇迹发生' }
    },
    timeline: {
      '18:00': {
        time: '18:00',
        period: '黄昏 · 化工楼',
        title: '判决时刻',
        content: '"化工设计材料被毙。"六个字，像六把刀。三个月的心血，指导老师的一句话，归零。',
        highlight: '账上余额：¥200',
        tags: ['材料状态: REJECTED', 'morale: CRITICAL']
      },
      '22:30': {
        time: '22:30',
        period: '深夜 · 实验室',
        title: 'MVP归来',
        content: '张若璐推门而入，带着一身夜色。Darren接过电机调试，手指在键盘上飞舞。徐海婷靠在椅背上，用那种"又要失败"的眼神看着我们，但没离开。',
        highlight: '"再试一次。"',
        status: 'SYSTEM RECOVERY INITIATED...'
      },
      '03:30': {
        time: '03:30',
        period: '凌晨 · 崩溃边缘',
        title: '至暗时刻',
        contents: [
          '两块ESP32彻底成了砖头。屏幕不亮，串口沉默，像是两具小小的尸体躺在防静电垫上。',
          '闻志伟的电机突然开始空转，发出像陀螺一样的尖啸。那声音在凌晨3点的实验室里，像某种嘲笑。'
        ],
        console: [
          '[ERROR] 0x00000005: Access Violation',
          '[WARN]  Voltage unstable: 4.2V → 3.1V',
          '[FATAL] Brick detected on COM3, COM4'
        ]
      },
      '04:30': {
        time: '04:30',
        period: '黎明前 · 荒诞剧场',
        title: '荒诞的胜利前奏',
        stories: [
          { icon: '😴', text: '张若璐在旁边的折叠椅上睡着了，发出均匀的呼噜声。图纸从她膝盖滑落，散落在水泥地上，像一群白天鹅。' },
          { icon: '☕', text: '徐海婷泡了第四杯速溶咖啡，没加糖。苦涩的味道在舌尖炸开，却让眼皮暂时投降。' }
        ],
        status: `>> 距离提交还有 3.5 小时
>> 当前状态: 代码编译成功 (Build #47)
>> 电机响应延迟: 12ms ✓
>> 奇迹概率: 从 0% 上升到 12%`
      },
      '08:00': {
        time: '08:00',
        title: '第12名',
        content: '不是第一，不是前三，但足够让我们继续走下去。那20小时教会我们：当所有硬件都变成砖头，唯一能运转的是不肯关机的意志。'
      }
    },
    team: [
      { name: 'Darren', role: '电机调试' },
      { name: '张若璐', role: '呼噜担当' },
      { name: '徐海婷', role: '眼神杀' },
      { name: '闻志伟', role: '陀螺制造者' }
    ],
    footer: {
      quote: '这不是一个关于技术胜利的故事，这是关于200块钱、两块砖、和四个不肯放弃的人的故事。',
      clubName: 'NEC 新能源开发者社区 · 成立于那个5月的凌晨'
    }
  },
  en: {
    nav: {
      home: 'Home',
      team: 'Team',
      story: 'Origin Story'
    },
    hero: {
      badge: 'Origin Story',
      title: 'May 12th',
      subtitle: 'Those 20 Hours',
      description: '200 RMB left, two bricked ESP32s, and snoring at 4:30 AM in the lab'
    },
    stats: {
      money: { value: '¥200', label: 'Remaining Budget', hint: '0 days to bankruptcy' },
      time: { value: '20h', label: 'Non-stop Work' },
      bricks: { value: '2', label: 'Bricked Boards', hint: 'ESP32s deceased' },
      rank: { value: '#12', label: 'School Ranking', hint: 'Miracle happened' }
    },
    timeline: {
      '18:00': {
        time: '18:00',
        period: 'Dusk · Chemical Building',
        title: 'The Verdict',
        content: '"Chemical design materials rejected." Six words, like six knives. Three months of work, one sentence from the advisor, back to zero.',
        highlight: 'Balance: ¥200',
        tags: ['Status: REJECTED', 'morale: CRITICAL']
      },
      '22:30': {
        time: '22:30',
        period: 'Night · Laboratory',
        title: 'MVP Returns',
        content: 'Zhang Ruolu walked in, carrying the night. Darren took over motor debugging, fingers dancing on the keyboard. Xu Hailing leaned back, watching us with "it\'s going to fail again" eyes, but she stayed.',
        highlight: '"One more try."',
        status: 'SYSTEM RECOVERY INITIATED...'
      },
      '03:30': {
        time: '03:30',
        period: 'Early AM · Breaking Point',
        title: 'The Darkest Hour',
        contents: [
          'Two ESP32s completely bricked. Screens dark, serial silent, like two tiny corpses on the anti-static mat.',
          'Wen Zhiwei\'s motor suddenly started spinning freely, making a gyroscope-like whine. That sound in the 3 AM lab felt like mockery.'
        ],
        console: [
          '[ERROR] 0x00000005: Access Violation',
          '[WARN]  Voltage unstable: 4.2V → 3.1V',
          '[FATAL] Brick detected on COM3, COM4'
        ]
      },
      '04:30': {
        time: '04:30',
        period: 'Pre-dawn · Absurd Theater',
        title: 'Absurd Prelude to Victory',
        stories: [
          { icon: '😴', text: 'Zhang Ruolu fell asleep on the folding chair next to us, snoring evenly. Blueprints slid from her knees, scattered on the concrete floor like white swans.' },
          { icon: '☕', text: 'Xu Hailing made her fourth instant coffee, no sugar. The bitter taste exploded on the tongue, but made the eyelids surrender temporarily.' }
        ],
        status: `>> 3.5 hours until submission
>> Current status: Build successful (Build #47)
>> Motor response delay: 12ms ✓
>> Miracle probability: 0% → 12%`
      },
      '08:00': {
        time: '08:00',
        title: '12th Place',
        content: 'Not first, not top three, but enough to keep us going. Those 20 hours taught us: when all hardware becomes bricks, the only thing that keeps running is the will that refuses to shut down.'
      }
    },
    team: [
      { name: 'Darren', role: 'Motor Debug' },
      { name: 'Zhang Ruolu', role: 'Snoring Lead' },
      { name: 'Xu Hailing', role: 'The Look' },
      { name: 'Wen Zhiwei', role: 'Gyro Maker' }
    ],
    footer: {
      quote: 'This is not a story about technical victory. This is a story about 200 yuan, two bricks, and four people who refused to give up.',
      clubName: 'NEC New Energy Coder Club · Founded that May dawn'
    }
  }
}

export default function StoryPage() {
  const { language } = useLanguage()
  const isEn = language === 'en'
  const t = isEn ? translations.en : translations.zh
  
  const [currentTime, setCurrentTime] = useState('00:00')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const heroRef = useRef<HTMLDivElement>(null)
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([])

  // 打字机效果
  useEffect(() => {
    const text = t.hero.description
    let index = 0
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50 + Math.random() * 50)
    return () => clearInterval(timer)
  }, [t.hero.description])

  // 滚动监听和时间轴更新
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress((scrolled / maxScroll) * 100)

      // 检测当前时间点
      timelineRefs.current.forEach((ref) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          if (rect.top >= 0 && rect.top <= window.innerHeight * 0.6) {
            const time = ref.getAttribute('data-time')
            if (time) setCurrentTime(time)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 根据时间改变进度条颜色
  const getProgressColor = () => {
    const hour = parseInt(currentTime.split(':')[0])
    if (hour < 20) return 'from-amber-400 to-red-500'
    if (hour < 4) return 'from-red-500 to-purple-600'
    return 'from-purple-600 to-emerald-500'
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden">
      {/* 背景效果 */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(32, 255, 77, 0.03) 25%, rgba(32, 255, 77, 0.03) 26%, transparent 27%, transparent 74%, rgba(32, 255, 77, 0.03) 75%, rgba(32, 255, 77, 0.03) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(32, 255, 77, 0.03) 25%, rgba(32, 255, 77, 0.03) 26%, transparent 27%, transparent 74%, rgba(32, 255, 77, 0.03) 75%, rgba(32, 255, 77, 0.03) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '30px 30px'
        }}
      />
      
      {/* 颗粒感叠加 */}
      <div 
        className="fixed inset-0 z-50 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 时间进度指示器 */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4">
        <div className="text-xs text-slate-500 font-mono mb-2">{isEn ? 'TIMELINE' : '时间轴'}</div>
        <div className="relative w-1 h-64 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`absolute top-0 left-0 w-full bg-gradient-to-b ${getProgressColor()} transition-all duration-500`}
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
        <div className="text-2xl font-bold text-amber-500 font-mono">{currentTime}</div>
      </div>

      {/* 导航 */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:block">
              {isEn ? 'NEC New Energy Coder Club' : 'NEC 新能源开发者社区'}
            </span>
            <span className="font-bold text-lg tracking-tight sm:hidden">NEC</span>
          </Link>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-sm text-slate-400">
              <Link to="/" className="hover:text-white transition-colors">{t.nav.home}</Link>
              <Link to="/team" className="hover:text-white transition-colors">{t.nav.team}</Link>
              <span className="text-amber-400">{t.nav.story}</span>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm mb-6 tracking-widest uppercase">
            {t.hero.badge}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
              {t.hero.title}
            </span>
            <span className="block text-white mt-2">{t.hero.subtitle}</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12 min-h-[3.5rem]">
            {displayText}
            <span className="inline-block w-0.5 h-6 bg-amber-400 animate-pulse ml-1" />
          </p>

          {/* 关键数据仪表盘 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16">
            {/* 余额 */}
            <div className="group bg-slate-800/50 backdrop-blur p-6 rounded-2xl border border-white/10 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10">
              <Banknote className="h-8 w-8 text-amber-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-amber-400">{t.stats.money.value}</div>
              <div className="text-sm text-slate-500 mt-1">{t.stats.money.label}</div>
              <div className="text-xs text-red-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">{t.stats.money.hint}</div>
            </div>
            
            {/* 时间 */}
            <div className="group bg-slate-800/50 backdrop-blur p-6 rounded-2xl border border-white/10 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/10">
              <Clock className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-red-400">{t.stats.time.value}</div>
              <div className="text-sm text-slate-500 mt-1">{t.stats.time.label}</div>
              <div className="w-full bg-slate-700 h-1 mt-3 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full w-full animate-pulse" />
              </div>
            </div>
            
            {/* 砖块 */}
            <div className="group bg-slate-800/50 backdrop-blur p-6 rounded-2xl border border-white/10 hover:border-slate-500/50 transition-all duration-300 hover:-translate-y-1">
              <Cpu className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-400">{t.stats.bricks.value}</div>
              <div className="text-sm text-slate-500 mt-1">{t.stats.bricks.label}</div>
              <div className="text-xs text-slate-600 mt-2">{t.stats.bricks.hint}</div>
            </div>
            
            {/* 排名 */}
            <div className="group bg-slate-800/50 backdrop-blur p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10">
              <Trophy className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-purple-400">{t.stats.rank.value}</div>
              <div className="text-sm text-slate-500 mt-1">{t.stats.rank.label}</div>
              <div className="text-xs text-emerald-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">{t.stats.rank.hint}</div>
            </div>
          </div>
        </div>

        {/* 向下滚动提示 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* 时间轴叙事区 */}
      <section className="relative py-32 max-w-5xl mx-auto px-6">
        
        {/* 18:00 起点 */}
        <div 
          ref={el => timelineRefs.current[0] = el}
          data-time="18:00"
          className="relative mb-32 scroll-mt-32"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3 text-center md:text-right">
              <div className="text-6xl font-black text-slate-800 mb-2 font-mono">18:00</div>
              <div className="text-amber-500 font-bold text-lg">{t.timeline['18:00'].period}</div>
            </div>
            <div className="relative w-full md:w-2/3">
              <div className="bg-slate-800/50 p-8 rounded-3xl relative overflow-hidden border border-red-500/20 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl" />
                <h3 className="text-2xl font-bold mb-4 text-red-400">{t.timeline['18:00'].title}</h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {t.timeline['18:00'].content}<br/><br/>
                  <span className="text-red-400 font-semibold">{t.timeline['18:00'].highlight}</span>。{isEn ? '26 hours until competition deadline.' : '离校赛截止还有26小时。'}
                </p>
                <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-500 font-mono">
                  {t.timeline['18:00'].tags.map((tag, i) => (
                    <span key={i} className="bg-red-500/10 px-3 py-1 rounded">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 22:30 转机 */}
        <div 
          ref={el => timelineRefs.current[1] = el}
          data-time="22:30"
          className="relative mb-32 scroll-mt-32"
        >
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <div className="text-6xl font-black text-slate-800 mb-2 font-mono">22:30</div>
              <div className="text-blue-400 font-bold text-lg">{t.timeline['22:30'].period}</div>
            </div>
            <div className="relative w-full md:w-2/3">
              <div className="bg-slate-800/50 p-8 rounded-3xl relative overflow-hidden border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
                <h3 className="text-2xl font-bold mb-4 text-blue-400">{t.timeline['22:30'].title}</h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {t.timeline['22:30'].content}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-sm text-blue-400 font-mono">{t.timeline['22:30'].status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 03:30 至暗 */}
        <div 
          ref={el => timelineRefs.current[2] = el}
          data-time="03:30"
          className="relative mb-32 scroll-mt-32"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3 text-center md:text-right">
              <div className="text-6xl font-black text-slate-800 mb-2 font-mono blur-[0.5px]">03:30</div>
              <div className="text-red-400 font-bold text-lg">{t.timeline['03:30'].period}</div>
            </div>
            <div className="relative w-full md:w-2/3">
              <div className="bg-black/40 border border-red-900/50 p-8 rounded-3xl relative overflow-hidden hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                    <h3 className="text-2xl font-bold text-red-500">{t.timeline['03:30'].title}</h3>
                  </div>
                  
                  <div className="space-y-4 text-slate-300">
                    {t.timeline['03:30'].contents.map((content, i) => (
                      <p key={i} className="text-lg border-l-4 border-red-500/50 pl-4" style={{ marginLeft: i > 0 ? '1rem' : 0, borderColor: i > 0 ? 'rgba(249, 115, 22, 0.5)' : undefined }}>
                        {content}
                      </p>
                    ))}
                    <div className="mt-6 p-4 bg-red-950/30 rounded-lg border border-red-500/20 font-mono text-sm text-red-400">
                      {t.timeline['03:30'].console.map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 04:30 荒诞与希望 */}
        <div 
          ref={el => timelineRefs.current[3] = el}
          data-time="04:30"
          className="relative mb-32 scroll-mt-32"
        >
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <div className="text-6xl font-black text-slate-800 mb-2 font-mono">04:30</div>
              <div className="text-emerald-400 font-bold text-lg">{t.timeline['04:30'].period}</div>
            </div>
            <div className="relative w-full md:w-2/3">
              <div className="bg-slate-800/50 p-8 rounded-3xl relative overflow-hidden border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                <h3 className="text-2xl font-bold mb-4 text-emerald-400">{t.timeline['04:30'].title}</h3>
                
                <div className="space-y-4">
                  {t.timeline['04:30'].stories.map((story, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-xl">
                        {story.icon}
                      </div>
                      <p className="text-slate-300 text-lg leading-relaxed">{story.text}</p>
                    </div>
                  ))}

                  <div className="mt-6 p-4 bg-emerald-950/30 rounded-lg border border-emerald-500/30">
                    <pre className="text-emerald-400 font-mono text-sm whitespace-pre-line">
                      {t.timeline['04:30'].status}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 08:00 结局 */}
        <div 
          ref={el => timelineRefs.current[4] = el}
          data-time="08:00"
          className="relative scroll-mt-32"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-4xl mb-6 shadow-2xl shadow-orange-500/50 animate-bounce">
              🏆
            </div>
            <h2 className="text-4xl font-bold mb-4 text-white">{t.timeline['08:00'].title}</h2>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              {t.timeline['08:00'].content}
            </p>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center opacity-50">
              {t.team.map((member, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-slate-600">{member.name}</div>
                  <div className="text-xs text-slate-700">{member.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 结语 */}
      <section className="py-32 bg-slate-900/50 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-2xl text-slate-400 italic leading-relaxed mb-8">
            "{t.footer.quote}"
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-red-500 mx-auto rounded-full" />
          <p className="mt-8 text-slate-600 text-sm">{t.footer.clubName}</p>
          
          <div className="mt-12">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700 hover:border-slate-600"
            >
              {isEn ? 'Back to Home' : '返回首页'}
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
