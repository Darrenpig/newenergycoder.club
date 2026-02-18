import { ChevronRight, Code, Cpu, GitBranch, ArrowRight, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/contexts/LanguageContext'

// GitHub/Gitee 统计数据展示组件
function GitHubStats() {
  const { language } = useLanguage()
  const stats = [
    { label: language === 'en' ? 'Commits' : 'Commits', value: '260+', icon: GitBranch },
    { label: language === 'en' ? 'Contributors' : '贡献者', value: '45+', icon: Users },
    { label: language === 'en' ? 'Projects' : '项目', value: '12', icon: Code },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
      {stats.map((stat) => (
        <div 
          key={stat.label} 
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10"
        >
          <stat.icon className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">{stat.value}</span>
          <span className="text-sm text-muted-foreground">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}

export function HeroSection() {
  const { t, language } = useLanguage()
  const isEn = language === 'en'
  
  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-50">
      {/* 工程蓝图风格背景 */}
      <div className="absolute inset-0">
        {/* 深色网格背景 */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* 电路板风格装饰线 */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              {/* 水平线 */}
              <line x1="0" y1="50" x2="100" y2="50" stroke="#00FF88" strokeWidth="1" fill="none"/>
              <line x1="150" y1="150" x2="200" y2="150" stroke="#00FF88" strokeWidth="1" fill="none"/>
              {/* 垂直线 */}
              <line x1="50" y1="0" x2="50" y2="100" stroke="#00FF88" strokeWidth="1" fill="none"/>
              <line x1="150" y1="100" x2="150" y2="200" stroke="#00FF88" strokeWidth="1" fill="none"/>
              {/* 节点 */}
              <circle cx="50" cy="50" r="3" fill="#00FF88"/>
              <circle cx="150" cy="150" r="3" fill="#00FF88"/>
              <circle cx="100" cy="50" r="2" fill="#00FF88"/>
              <circle cx="150" cy="100" r="2" fill="#00FF88"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
        
        {/* 渐变光晕效果 */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"/>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"/>
      </div>
      
      <div className="container relative z-10 pt-20 pb-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* 标签 */}
          <div className="flex items-center justify-center mb-6">
            <Badge 
              variant="outline" 
              className="px-4 py-1.5 text-sm bg-emerald-500/10 border-emerald-500/30 text-emerald-400 backdrop-blur-sm"
            >
              <Cpu className="mr-2 h-4 w-4" />
              {isEn 
                ? 'Open Source Community for ROBOCON & New Energy Engineering'
                : '面向 ROBOCON 与新能源工程的开源社区'
              }
            </Badge>
          </div>
          
          {/* 主标题 */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {isEn ? (
              <>
                <span className="text-slate-100">Battle-Tested</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Cost-Effective
                </span>
                <br />
                <span className="text-slate-100">Open Source Solutions</span>
              </>
            ) : (
              <>
                <span className="text-slate-100">提供经过</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  真实竞赛验证
                </span>
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent font-extrabold">
                    成本敏感
                  </span>
                  <span className="absolute inset-0 -skew-x-6 bg-amber-500/20 rounded-lg -z-0 animate-pulse"/>
                </span>
                <span className="text-slate-100">开源方案</span>
              </>
            )}
          </h1>
          
          {/* 副标题 */}
          <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {isEn 
              ? 'Modular code baselines, hardware designs, and collaboration tools. Built by NEC for ROBOCON teams nationwide.'
              : '模块化代码基线、硬件方案与协作工具。NEC 新能源开发者社区 出品，服务多所高校 ROBOCON 竞赛队伍。'
            }
          </p>
          
          {/* GitHub 统计数据 */}
          <GitHubStats />
          
          {/* CTA 按钮 */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-12 text-base"
              asChild
            >
              <a 
                href="https://gitee.com/darrenpig/new_energy_coder_club" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Code className="mr-2 h-5 w-5" />
                {isEn ? 'View Projects' : '查看开源项目'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-8 h-12 text-base"
              asChild
            >
              <Link to="/join">
                <Users className="mr-2 h-5 w-5" />
                {isEn ? 'Join Us' : '加入协作'}
              </Link>
            </Button>
          </div>
          
          {/* 技术栈展示 */}
          <div className="mt-16 pt-8 border-t border-slate-800">
            <p className="text-sm text-slate-500 mb-6 uppercase tracking-wider">
              {isEn ? 'Tech Stack' : '技术栈覆盖'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {(isEn 
                ? ['Embedded C/C++', 'ROS/ROS2', 'Computer Vision', 'Mechanical Design', 'FPGA', 'Motor Control']
                : ['嵌入式 C/C++', 'ROS/ROS2', '计算机视觉', '机械设计', 'FPGA', '电机控制']
              ).map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1.5 text-sm bg-slate-900 border border-slate-800 rounded-md text-slate-400 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部渐变过渡 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"/>
    </div>
  )
}
