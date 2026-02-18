import { 
  Code2, 
  Cpu, 
  GitFork, 
  Layers,
  Wrench,
  BookOpen
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    title: '200块预算方案',
    description: '从ROBOCON血泪史中提炼的低成本方案：国产芯片替代、模块化设计、可复用结构。钱少也能玩',
    icon: Code2,
    tags: ['低成本', '国产化', '复用']
  },
  {
    title: '踩坑文档库',
    description: '烧过的ESP32、炸过的MOS管、调不通的CAN总线——所有错误都有记录，让你少踩一遍我们踩过的坑',
    icon: Cpu,
    tags: ['故障记录', '调试笔记', '避坑']
  },
  {
    title: '熬夜调机指南',
    description: '20小时连轴转的实战经验：如何快速定位问题、应急修复方案、比赛现场Debug流程',
    icon: Wrench,
    tags: ['应急修复', '现场调试', '实战']
  },
  {
    title: '代码先能用再说',
    description: '没有完美架构，只有能跑起来的代码。从验证机到比赛机的迭代过程全部开源，丑陋但真实',
    icon: GitFork,
    tags: ['迭代记录', '版本对比', '实战代码']
  },
  {
    title: 'A416实验室',
    description: '不是高大上的「创新中心」，是堆满板子、线材、空饭盒的真实战场。来这你能闻到松香味',
    icon: Layers,
    tags: ['实体空间', '工具共享', '线下hack']
  },
  {
    title: '失败博物馆',
    description: '变砖的ESP32、烧糊的PCB、机械结构报废件——展示我们走过的路，失败比成功更有教育意义',
    icon: BookOpen,
    tags: ['失败案例', '复盘', '成长']
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* 标题部分 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            真实的工程资产
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            不是 polished 的演示项目，是带着 solder smell 的战场遗物
          </p>
        </div>
        
        {/* 特性卡片网格 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Card 
              key={i} 
              className="group border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-wrap gap-1 justify-end max-w-[120px]">
                    {feature.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <CardTitle className="text-lg font-semibold mt-3">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 快速开始指引 */}
        <div className="mt-16 p-6 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">怎么入坑？</h3>
              <p className="text-slate-400 text-sm">
                不用 fork，直接加群 → 来 A416 看看 → 领块板子开始折腾 → 烧了也别怕，我们有一箱
              </p>
            </div>
            <div className="flex gap-3">
              <a 
                href="https://gitee.com/darrenpig/new_energy_coder_club/blob/master/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-sm font-medium transition-colors"
              >
                贡献指南（随缘版）
              </a>
              <a 
                href="/getting-started"
                className="inline-flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md text-sm font-medium transition-colors"
              >
                踩坑手册
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
