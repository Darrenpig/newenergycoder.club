import { ArrowRight, GitBranch, Scale, Users, Code, BookOpen, Clock, Trophy, FolderGit2, Map, MapPin, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/contexts/LanguageContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function AboutSection() {
  const t = useTranslation();
  
  return (
    <section className="py-24 bg-gradient-to-br from-secondary/20 to-accent/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
      
      <div className="container relative z-10">
        <div className="relative rounded-lg shadow-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border border-white/10">
          <div className="relative z-10 p-12">
            <div className="text-foreground mb-8">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 gradient-text">
                  {t.footer.clubName}
                </h1>
                <h2 className="text-3xl font-bold tracking-tight">
                  <span className="gradient-text mr-2">{`{`}</span>
                  {t.about.title}
                  <span className="gradient-text ml-2">{`}`}</span>
                </h2>
                <div className="mt-6 max-w-4xl mx-auto">
                  <p className="leading-relaxed text-left">
                    {t.about.paragraph1}
                  </p>
                </div>
                <div className="mt-8 flex">
                  <Button asChild className="bg-white/10 border-white/20 hover:bg-white/20 hover-lift glow-hover" variant="outline">
                    <Link to="/team">
                      {t.about.learnMore}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
            </div>

            {/* Project Origin Story */}
            <Card className="glass-card hover-lift">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded-lg bg-primary/10">
                     <BookOpen className="h-6 w-6 text-primary" />
                   </div>
                   <div>
                     <CardTitle className="gradient-text">{t.about.projectOrigin.title}</CardTitle>
                     <CardDescription>如果你对本项目还不是那么的了解，我希望你能好好看完下面这部分内容</CardDescription>
                   </div>
                </div>
              </CardHeader>
               <CardContent className="pt-0">
                 <div className="prose prose-sm max-w-none text-muted-foreground">
                   <p className="leading-relaxed whitespace-pre-line">
                     {t.about.projectOrigin.content}
                   </p>
                 </div>
               </CardContent>
             </Card>
          </div>
        </div>
        
        {/* Phase 2 Development */}
        <div className="mt-12">
          <Card className="glass-card hover-lift">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle className="gradient-text">{t.about.phase2.title}</CardTitle>
                  <CardDescription>{t.about.phase2.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p className="leading-relaxed">
                  {t.about.phase2.content}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Advantages */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold gradient-text mb-2">为什么选择 NEC？</h3>
            <p className="text-muted-foreground">不只是代码仓库，更是可持续的技术社区</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 双驱动结构 */}
            <Card className="glass-card hover-lift">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">双驱动结构</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>竞赛 + 项目</strong>，不是"一次性赛题仓"。 competitions/（历年赛季资产）+ projects/（长期项目沉淀）+ docs/（新手路径/贡献）+ shared/（通用资源），比常见"一个仓=一个比赛"的结构更可持续。
                </p>
              </CardContent>
            </Card>

            {/* 全周期资产库 */}
            <Card className="glass-card hover-lift">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <FolderGit2 className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-lg">全周期资产库</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  不是"最后一版代码"。README 直接强调覆盖 <strong>2022–2026</strong> 的赛季资料、FRC 图纸、标准化型材库、从 0 到 1 的过程记录，这种"复盘 + 资产化"是很多竞赛仓做不到的。
                </p>
              </CardContent>
            </Card>

            {/* 新手上手与贡献路径 */}
            <Card className="glass-card hover-lift">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Map className="h-5 w-5 text-green-500" />
                  </div>
                  <CardTitle className="text-lg">新手友好</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  把<strong>"快速上手 / First Good Issue / 岗位路线图"</strong>放在导航里，本质是在做"社区型仓库"而不是"队内私仓开源"。这对扩大贡献者非常关键。
                </p>
              </CardContent>
            </Card>

            {/* 线上线下联动 */}
            <Card className="glass-card hover-lift">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <MapPin className="h-5 w-5 text-orange-500" />
                  </div>
                  <CardTitle className="text-lg">线上线下联动</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  很多竞赛仓只解决"代码怎么跑"，我们把<strong>线上协作 + A416 线下据点</strong>也写进定位，天然更像组织/社区。
                </p>
              </CardContent>
            </Card>

            {/* 文档/知识库外置联动 */}
            <Card className="glass-card hover-lift md:col-span-2 lg:col-span-2">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <ExternalLink className="h-5 w-5 text-purple-500" />
                  </div>
                  <CardTitle className="text-lg">文档/知识库外置联动</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  主流竞赛仓经常 README=全部文档；我们明确把<strong>官网 + 飞书知识库</strong>作为入口（这对规模化很重要）。实现"线上文档协作 + 线下实验室实践"的完整闭环，让知识沉淀与传承更加高效。
                </p>
                <div className="mt-4 flex gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://scn0bdoc8zxg.feishu.cn/wiki/S10LwzVZdiWLwxkEnEqcTcmEn6e" target="_blank" rel="noopener noreferrer">
                      <BookOpen className="mr-2 h-4 w-4" />
                      飞书知识库
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/getting-started">
                      <Code className="mr-2 h-4 w-4" />
                      快速上手
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Contributing and License Section */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Contributing Guidelines */}
          <Card className="glass-card hover-lift">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GitBranch className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="gradient-text">{t.about.contributing.title}</CardTitle>
                  <CardDescription>{t.about.contributing.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  {t.about.contributing.howToContribute}
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {t.about.contributing.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-2">{t.about.contributing.codeOfConduct}</p>
                <p className="text-sm text-muted-foreground">{t.about.contributing.reportIssues}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* License Information */}
          <Card className="glass-card hover-lift">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Scale className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle className="gradient-text">{t.about.license.title}</CardTitle>
                  <CardDescription>{t.about.license.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <p className="text-sm text-muted-foreground">{t.about.license.openSource}</p>
              
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <h5 className="font-medium text-green-600 mb-2 flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Permissions
                  </h5>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {t.about.license.permissions.map((permission, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-green-500"></span>
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-red-600 mb-2">Limitations</h5>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {t.about.license.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-red-500"></span>
                        {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-blue-600 mb-2">Conditions</h5>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {t.about.license.conditions.map((condition, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                        {condition}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}