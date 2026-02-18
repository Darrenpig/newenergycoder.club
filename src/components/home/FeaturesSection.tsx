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
    title: '模块化代码库',
    description: '经过 ROBOCON 竞赛验证的嵌入式控制、视觉识别、路径规划等模块化代码，开箱即用',
    icon: Code2,
    tags: ['嵌入式', 'ROS', 'YOLO']
  },
  {
    title: '硬件方案开源',
    description: '机械结构设计、电路原理图、PCB 布局完全开源，提供详细的制作与调试指南',
    icon: Cpu,
    tags: ['SolidWorks', 'Altium', '3D打印']
  },
  {
    title: '协作工具链',
    description: '光伏排布、型材计算等工程辅助工具，提升团队设计与开发效率',
    icon: Wrench,
    tags: ['Web工具', '自动化', '仿真']
  },
  {
    title: '分层贡献体系',
    description: '从 Good First Issue 到核心模块维护，清晰的贡献者成长路径与代码审查机制',
    icon: GitFork,
    tags: ['Git工作流', 'Code Review', 'CI/CD']
  },
  {
    title: '线上线下结合',
    description: 'A416 实验室提供实体开发环境，配合线上文档与社区支持',
    icon: Layers,
    tags: ['实验室', '工作坊', '技术培训']
  },
  {
    title: '技术文档中心',
    description: '详细的 API 文档、赛题解析、开发笔记，降低新人上手门槛',
    icon: BookOpen,
    tags: ['Wiki', '教程', 'FAQ']
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* 标题部分 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            开源工程基础设施
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            不是「社团活动」，而是可复用的工程方案
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
              <h3 className="text-xl font-semibold mb-2">如何开始贡献？</h3>
              <p className="text-slate-400 text-sm">
                Fork → 克隆开发环境（提供 Docker/脚本）→ 提交 PR → Code Review → 合并
              </p>
            </div>
            <div className="flex gap-3">
              <a 
                href="https://gitee.com/darrenpig/new_energy_coder_club/blob/master/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-sm font-medium transition-colors"
              >
                阅读贡献指南
              </a>
              <a 
                href="/getting-started"
                className="inline-flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md text-sm font-medium transition-colors"
              >
                查看文档
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
