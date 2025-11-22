import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Cpu, Palette, Calculator, Globe } from 'lucide-react'

const categories = [
  { key: 'embedded', title: '嵌入式选型', desc: 'MCU/RTOS/通信协议与调试工具', icon: Cpu, link: '/learning/embedded' },
  { key: 'gui', title: 'GUI选型', desc: 'Qt/QML/跨平台UI与设计系统', icon: Palette, link: '/learning/gui' },
  { key: 'algorithm', title: '算法选型', desc: '数据结构/算法库/性能优化方案', icon: Calculator, link: '/learning/algorithm' },
  { key: 'mechanical', title: '结构打印选型', desc: 'CAD/切片/材料与控制方案', icon: Globe, link: '/learning/mechanical' },
]

export function ResourcesSelectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <section className="relative py-16 px-4 text-center">
        <div className="container mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <BookOpen className="h-4 w-4" />
            学习资料选型
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">为你的方向挑选合适资料</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">按技术方向聚合精选资料与路线，快速确定学习路径与工具栈。</p>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c) => {
            const Icon = c.icon
            return (
              <Card key={c.key} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">选型</Badge>
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="mt-2">{c.title}</CardTitle>
                  <CardDescription>{c.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <a href={c.link}>进入方向</a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default ResourcesSelectionPage

