import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Rocket, 
  Users, 
  Award, 
  Code2, 
  Cpu, 
  Globe,
  Zap,
  Target,
  TrendingUp,
  Sparkles,
  ChevronDown,
  Calendar,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// NEC 演进时间线数据
const timelineData = [
  {
    year: '2023',
    quarter: 'Q1',
    title: '梦想的种子',
    subtitle: 'NEC 正式成立',
    description: '一群热爱开源和新能源技术的学生聚在一起，成立了 New Energy Coder Club。初始团队只有4人，但梦想很大。',
    icon: Sparkles,
    stats: [
      { label: '创始成员', value: '4' },
      { label: '首个项目', value: '1' }
    ],
    color: 'from-blue-500 to-cyan-400',
    bgImage: '/image/校门合照.jpg'
  },
  {
    year: '2023',
    quarter: 'Q3',
    title: '开源之夏',
    subtitle: '首次参加 OSPP',
    description: '成功申请开源之夏 2023，获得华为、中科院软件所等机构的赞助支持。这是 NEC 走向开源社区的重要一步。',
    icon: Award,
    stats: [
      { label: '获得赞助', value: '¥12K' },
      { label: '成功立项', value: '3' }
    ],
    color: 'from-amber-500 to-orange-400',
    highlight: '开源之夏 Gold Sponsor'
  },
  {
    year: '2024',
    quarter: 'Q1',
    title: '团队扩张',
    subtitle: '突破 20 人',
    description: '随着项目增多，NEC 吸引了更多志同道合的伙伴加入。团队涵盖了嵌入式、算法、设计、产品等多个领域。',
    icon: Users,
    stats: [
      { label: '团队成员', value: '25' },
      { label: '技术方向', value: '6' }
    ],
    color: 'from-green-500 to-emerald-400'
  },
  {
    year: '2024',
    quarter: 'Q2',
    title: 'ROBOCON 征程',
    subtitle: '首次参赛即获奖',
    description: '组建 NEC 战队参加全国大学生机器人大赛 ROBOCON，从 0 到 1 搭建机器人，最终获得全国三等奖的好成绩。',
    icon: Target,
    stats: [
      { label: '参赛队员', value: '15' },
      { label: '获奖等级', value: '国三' }
    ],
    color: 'from-purple-500 to-pink-400',
    highlight: '全国机器人大赛 ROBOCON'
  },
  {
    year: '2024',
    quarter: 'Q3',
    title: '技术突破',
    subtitle: '多项目并行',
    description: 'OpenHarmony 智慧万用表、机械狗仿真、星闪手柄等多个项目齐头并进，技术栈不断扩展，工程能力大幅提升。',
    icon: Cpu,
    stats: [
      { label: '进行中项目', value: '8' },
      { label: '代码贡献', value: '50K+' }
    ],
    color: 'from-indigo-500 to-blue-400'
  },
  {
    year: '2024',
    quarter: 'Q4',
    title: '社区建设',
    subtitle: '官网 & 知识库上线',
    description: '正式上线 NEC 官方网站，建立飞书知识库，形成完善的新人培养体系，为持续发展打下坚实基础。',
    icon: Globe,
    stats: [
      { label: '文档数量', value: '100+' },
      { label: '培训场次', value: '20' }
    ],
    color: 'from-rose-500 to-red-400'
  },
  {
    year: '2025',
    quarter: 'Q1',
    title: '新征程',
    subtitle: '迈向 50+ 人规模',
    description: '团队规模持续扩大，引入预备维护者机制，建立研究员体系。向着成为一流的学生技术组织的目标迈进。',
    icon: Rocket,
    stats: [
      { label: '成员总数', value: '67' },
      { label: '累计项目', value: '15' }
    ],
    color: 'from-teal-500 to-cyan-400',
    isLatest: true
  }
];

// 核心技术栈展示
const techStack = [
  { name: '嵌入式开发', icon: Cpu, desc: 'STM32 / ESP32 / RT-Thread / FreeRTOS', progress: 90 },
  { name: '算法与 AI', icon: Code2, desc: 'Python / C++ / 机器学习 / 计算机视觉', progress: 75 },
  { name: '机器人技术', icon: Target, desc: 'ROS / Gazebo / 运动控制 / 路径规划', progress: 80 },
  { name: '硬件设计', icon: Zap, desc: 'PCB Design / SolidWorks / 3D Printing', progress: 85 },
  { name: '开源协作', icon: Globe, desc: 'Git / Gitee / GitHub / CI/CD', progress: 95 },
];

// 合作伙伴
const partners = [
  { name: '开源之夏', level: 'Gold Sponsor', logo: '/image/sponsor/开源之夏Logo.png' },
  { name: '立创开源', level: 'Silver Sponsor', logo: '/image/sponsor/立创开源广场.png' },
  { name: 'CubeMars', level: 'Partner', logo: '/image/sponsor/CubeMars.png' },
  { name: '萝卜小酱', level: 'Partner', logo: '/image/sponsor/萝卜小酱.png' },
  { name: '华艺塑业', level: 'Sponsor', logo: '/image/sponsor/华艺塑业.png' },
];

export default function NECEvolutionPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const partnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero 动画
      gsap.fromTo(
        '.hero-title',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
      
      gsap.fromTo(
        '.hero-subtitle',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-stats',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: 'power3.out' }
      );

      // 滚动指示器动画
      gsap.to('.scroll-indicator', {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: 'power1.inOut'
      });

      // 时间线卡片动画
      const timelineCards = gsap.utils.toArray<HTMLElement>('.timeline-card');
      timelineCards.forEach((card, i) => {
        const direction = i % 2 === 0 ? -100 : 100;
        
        gsap.fromTo(
          card,
          { x: direction, opacity: 0, rotateY: i % 2 === 0 ? 15 : -15 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 30%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // 时间线中轴线绘制动画
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1
          }
        }
      );

      // 统计数字动画
      const statNumbers = gsap.utils.toArray<HTMLElement>('.stat-number');
      statNumbers.forEach((num) => {
        const target = parseInt(num.dataset.value || '0', 10);
        
        ScrollTrigger.create({
          trigger: num,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              num,
              { innerText: 0 },
              {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: 'power2.out'
              }
            );
          },
          once: true
        });
      });

      // 技术栈进度条动画
      const techBars = gsap.utils.toArray<HTMLElement>('.tech-progress');
      techBars.forEach((bar) => {
        const width = bar.dataset.progress || '0';
        
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${width}%`,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // 合作伙伴 logo 渐入
      gsap.fromTo(
        '.partner-logo',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: partnerRef.current,
            start: 'top 75%'
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 overflow-x-hidden">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Logo/徽章 */}
          <div className="hero-subtitle mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Our Journey</span>
          </div>

          {/* 主标题 */}
          <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              NEC 演进之路
            </span>
          </h1>

          {/* 副标题 */}
          <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            从 4 人小团队到 60+ 人技术社区，<br className="hidden sm:block" />
            见证 New Energy Coder Club 的成长历程
          </p>

          {/* 快速统计 */}
          <div className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-3xl mx-auto mb-12">
            {[
              { icon: Users, value: 67, label: '成员总数' },
              { icon: Code2, value: 15, label: '累计项目' },
              { icon: Award, value: 3, label: '获奖荣誉' },
              { icon: Calendar, value: 2, label: '年历程' }
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center p-4 rounded-xl bg-card/50 border border-border/50">
                <stat.icon className="w-6 h-6 text-primary mb-2" />
                <span className="stat-number text-2xl sm:text-3xl font-bold" data-value={stat.value}>
                  0
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTA 按钮 */}
          <div className="hero-subtitle flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group" asChild>
              <Link to="/team">
                认识团队
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/projects">查看项目</Link>
            </Button>
          </div>
        </div>

        {/* 滚动指示器 */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground">
          <span className="text-xs mb-2">向下滚动探索</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              发展历程
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              每一个里程碑，都是 NEC 成长的见证
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* 中轴线 - 仅在桌面端显示 */}
            <div className="timeline-line hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary to-primary/20 -translate-x-1/2 origin-top" />
            
            {/* 移动端时间线 */}
            <div className="timeline-line md:hidden absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary to-primary/20 origin-top" />

            {/* Timeline Items */}
            <div className="space-y-12 sm:space-y-24">
              {timelineData.map((item, index) => {
                const Icon = item.icon;
                const isLeft = index % 2 === 0;
                
                return (
                  <div 
                    key={index} 
                    className={`timeline-card relative flex flex-col md:flex-row items-center gap-6 sm:gap-8 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* 时间节点 - 桌面端 */}
                    <div className={`hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 ${
                      item.isLatest ? 'animate-pulse' : ''
                    }`}>
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg shadow-primary/25`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    {/* 时间节点 - 移动端 */}
                    <div className="md:hidden absolute left-4 -translate-x-1/2 z-10">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* 内容卡片 */}
                    <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${
                      isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}>
                      <div className={`group relative p-6 sm:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 ${
                        item.isLatest ? 'ring-2 ring-primary/30' : ''
                      }`}>
                        {/* 年份标签 */}
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${item.color} text-white mb-4`}>
                          <Calendar className="w-3 h-3" />
                          {item.year} {item.quarter}
                          {item.isLatest && <span className="ml-1">· 最新</span>}
                        </div>

                        {/* 标题 */}
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className={`text-sm font-medium mb-3 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                          {item.subtitle}
                        </p>

                        {/* 描述 */}
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* 高亮标签 */}
                        {item.highlight && (
                          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                            <Award className="w-3 h-3" />
                            {item.highlight}
                          </div>
                        )}

                        {/* 统计数据 */}
                        <div className={`flex gap-6 ${isLeft ? 'md:justify-end' : ''}`}>
                          {item.stats.map((stat, statIndex) => (
                            <div key={statIndex} className="text-center">
                              <div className="text-xl sm:text-2xl font-bold text-primary">
                                {stat.value}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 占位空间 - 桌面端 */}
                    <div className="hidden md:block md:w-5/12" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview Section */}
      <section ref={statsRef} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">数据见证成长</h2>
            <p className="text-muted-foreground">用数字说话，展示 NEC 的硬实力</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: Users, 
                value: 67, 
                suffix: '+',
                label: '团队成员', 
                desc: '来自不同专业背景的技术爱好者',
                color: 'from-blue-500 to-cyan-400'
              },
              { 
                icon: Code2, 
                value: 15, 
                suffix: '+',
                label: '开源项目', 
                desc: '涵盖嵌入式、算法、硬件设计等领域',
                color: 'from-purple-500 to-pink-400'
              },
              { 
                icon: Award, 
                value: 3, 
                suffix: '',
                label: '获奖荣誉', 
                desc: 'ROBOCON 国三、开源之夏等',
                color: 'from-amber-500 to-orange-400'
              },
              { 
                icon: Globe, 
                value: 538475, 
                suffix: '+',
                label: 'CSDN 访问量', 
                desc: '技术博客分享与知识传播',
                color: 'from-green-500 to-emerald-400'
              },
              { 
                icon: MapPin, 
                value: 5, 
                suffix: '+',
                label: '合作伙伴', 
                desc: '开源之夏、立创、CubeMars 等',
                color: 'from-rose-500 to-red-400'
              },
              { 
                icon: TrendingUp, 
                value: 100, 
                suffix: 'K+',
                label: '代码贡献', 
                desc: '累计代码行数与文档贡献',
                color: 'from-indigo-500 to-blue-400'
              }
            ].map((stat, index) => (
              <div 
                key={index}
                className="group relative p-6 sm:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-bold stat-number" data-value={stat.value}>
                    0
                  </span>
                  <span className="text-2xl font-bold text-primary">{stat.suffix}</span>
                </div>
                
                <h3 className="text-lg font-semibold mb-1">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section ref={techRef} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">技术能力图谱</h2>
            <p className="text-muted-foreground">多领域技术栈，全方位能力提升</p>
          </div>

          <div className="space-y-6">
            {techStack.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div 
                  key={index}
                  className="group p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{tech.name}</h3>
                      <p className="text-sm text-muted-foreground">{tech.desc}</p>
                    </div>
                    <span className="text-2xl font-bold text-primary">{tech.progress}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="tech-progress h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-1000"
                      data-progress={tech.progress}
                      style={{ width: '0%' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section ref={partnerRef} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">合作伙伴</h2>
            <p className="text-muted-foreground">感谢支持 NEC 发展的合作伙伴</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="partner-logo group flex flex-col items-center p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-20 h-20 mb-4 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                  {partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <Award className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <h3 className="font-medium text-center">{partner.name}</h3>
                <span className="text-xs text-muted-foreground">{partner.level}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20">
            {/* 装饰 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <Rocket className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">加入我们，共创未来</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                NEC 的故事还在继续，下一个篇章，由你来书写。
                无论你是技术大牛还是初学者，这里都有属于你的舞台。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group" asChild>
                  <Link to="/join">
                    立即加入
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/getting-started">了解如何开始</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
