// NEC 演进历程数据

export type MilestoneType = 'milestone' | 'achievement' | 'event' | 'project'

export interface Milestone {
  id: string
  date: string
  dateEn: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  type: MilestoneType
  icon: string
  stats?: {
    label: string
    value: number
    suffix?: string
  }
  tags: string[]
}

export interface Chapter {
  id: string
  period: string
  periodEn: string
  theme: string
  themeEn: string
  subtitle: string
  subtitleEn: string
  color: string
  gradient: string
  milestones: Milestone[]
}

export const evolutionData: Chapter[] = [
  {
    id: 'chapter-2023',
    period: '2023',
    periodEn: '2023',
    theme: '从零到一',
    themeEn: 'From Zero to One',
    subtitle: '萌芽期 · 种子破土',
    subtitleEn: 'Germination · Seeds Breaking Through',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-cyan-400',
    milestones: [
      {
        id: 'm-2023-01',
        date: '2023年1月',
        dateEn: 'Jan 2023',
        title: '创始团队组建',
        titleEn: 'Founding Team Formed',
        description: '5位来自不同高校的新能源爱好者汇聚一堂，怀揣着用代码改变能源世界的梦想，NEC 的故事由此开启。',
        descriptionEn: '5 energy enthusiasts from different universities gathered with a dream to change the energy world through code.',
        type: 'milestone',
        icon: 'Users',
        tags: ['founding', 'team'],
      },
      {
        id: 'm-2023-03',
        date: '2023年3月',
        dateEn: 'Mar 2023',
        title: '第一次线下 Meetup',
        titleEn: 'First Offline Meetup',
        description: '在常州工学院举办首次线下活动，10位早期成员分享了各自对新能源技术的见解，确立了"开源协作"的核心理念。',
        descriptionEn: 'First offline event at Changzhou Institute of Technology with 10 early members.',
        type: 'event',
        icon: 'Coffee',
        stats: { label: '参与人数', value: 10, suffix: '人' },
        tags: ['event', 'community'],
      },
      {
        id: 'm-2023-05',
        date: '2023年5月',
        dateEn: 'May 2023',
        title: 'GitHub 组织创建',
        titleEn: 'GitHub Organization Created',
        description: '正式建立 NEC GitHub 组织，开源协作模式起步，首批项目涵盖能源数据分析与可视化工具。',
        descriptionEn: 'Official NEC GitHub organization established, starting the open source collaboration model.',
        type: 'milestone',
        icon: 'Github',
        tags: ['opensource', 'github'],
      },
      {
        id: 'm-2023-06',
        date: '2023年6月',
        dateEn: 'Jun 2023',
        title: '首个开源项目发布',
        titleEn: 'First Open Source Project',
        description: '发布首个开源项目「EnergyDataViz」- 新能源数据可视化工具包，获得 Gitee 推荐。',
        descriptionEn: 'Released first open source project "EnergyDataViz" - new energy data visualization toolkit.',
        type: 'project',
        icon: 'Code',
        stats: { label: 'Star 数', value: 128, suffix: '+' },
        tags: ['project', 'opensource'],
      },
    ],
  },
  {
    id: 'chapter-2024',
    period: '2024',
    periodEn: '2024',
    theme: '社区发芽',
    themeEn: 'Community Sprouting',
    subtitle: '成长期 · 枝繁叶茂',
    subtitleEn: 'Growth · Branches Flourishing',
    color: '#10B981',
    gradient: 'from-emerald-500 to-teal-400',
    milestones: [
      {
        id: 'm-2023-08',
        date: '2023年8月',
        dateEn: 'Aug 2023',
        title: '成员突破 50 人',
        titleEn: 'Members Exceeded 50',
        description: '社区成员突破 50 人大关，来自全国各地的高校学生和从业者加入，形成了跨地域的技术交流网络。',
        descriptionEn: 'Community members exceeded 50, forming a cross-regional technical exchange network.',
        type: 'achievement',
        icon: 'Users',
        stats: { label: '成员数', value: 50, suffix: '+' },
        tags: ['growth', 'community'],
      },
      {
        id: 'm-2023-10',
        date: '2023年10月',
        dateEn: 'Oct 2023',
        title: '第一次技术 Workshop',
        titleEn: 'First Technical Workshop',
        description: '举办「新能源+AI」技术工作坊，邀请行业专家分享机器学习在能源预测中的应用，线上线下参与人数超过 100 人。',
        descriptionEn: 'First "New Energy + AI" workshop with industry experts, over 100 participants online and offline.',
        type: 'event',
        icon: 'Presentation',
        stats: { label: '参与人数', value: 100, suffix: '+' },
        tags: ['workshop', 'education'],
      },
      {
        id: 'm-2024-01',
        date: '2024年1月',
        dateEn: 'Jan 2024',
        title: '官方网站 V1 上线',
        titleEn: 'Official Website V1 Launched',
        description: '采用 React + TypeScript + Tailwind CSS 技术栈，官方网站正式上线，成为社区对外展示的重要窗口。',
        descriptionEn: 'Official website launched using React + TypeScript + Tailwind CSS stack.',
        type: 'project',
        icon: 'Globe',
        tags: ['website', 'project'],
      },
      {
        id: 'm-2024-03',
        date: '2024年3月',
        dateEn: 'Mar 2024',
        title: '高校合作建立',
        titleEn: 'University Partnerships',
        description: '与常州工学院、江苏理工学院等高校建立合作关系，成为学生课外技术实践的重要平台。',
        descriptionEn: 'Established partnerships with Changzhou Institute of Technology and other universities.',
        type: 'milestone',
        icon: 'School',
        stats: { label: '合作高校', value: 3, suffix: '所' },
        tags: ['partnership', 'education'],
      },
      {
        id: 'm-2024-05',
        date: '2024年5月',
        dateEn: 'May 2024',
        title: '首个企业赞助',
        titleEn: 'First Corporate Sponsorship',
        description: '获得新能源行业首家企业赞助，为社区活动提供资源支持，标志着 NEC 获得行业认可。',
        descriptionEn: 'Received first corporate sponsorship from new energy industry, marking industry recognition.',
        type: 'achievement',
        icon: 'Handshake',
        tags: ['sponsor', 'growth'],
      },
    ],
  },
  {
    id: 'chapter-2025',
    period: '2025',
    periodEn: '2025',
    theme: '能量爆发',
    themeEn: 'Energy Explosion',
    subtitle: '繁荣期 · 璀璨绽放',
    subtitleEn: 'Prosperity · Brilliant Bloom',
    color: '#F59E0B',
    gradient: 'from-amber-500 to-orange-400',
    milestones: [
      {
        id: 'm-2024-07',
        date: '2024年7月',
        dateEn: 'Jul 2024',
        title: '成员突破 200 人',
        titleEn: 'Members Exceeded 200',
        description: '社区规模突破 200 人，覆盖嵌入式开发、数据分析、Web 开发等多个技术方向，形成良性生态。',
        descriptionEn: 'Community exceeded 200 members, covering embedded, data analysis, web development and more.',
        type: 'achievement',
        icon: 'Rocket',
        stats: { label: '成员数', value: 200, suffix: '+' },
        tags: ['growth', 'milestone'],
      },
      {
        id: 'm-2024-09',
        date: '2024年9月',
        dateEn: 'Sep 2024',
        title: '新能源黑客松',
        titleEn: 'New Energy Hackathon',
        description: '举办首届「绿色代码」黑客松，48小时极限编程，产出 15 个创新项目，其中 3 个获得投资意向。',
        descriptionEn: 'First "Green Code" hackathon, 15 innovative projects in 48 hours, 3 received investment interest.',
        type: 'event',
        icon: 'Zap',
        stats: { label: '项目数', value: 15, suffix: '个' },
        tags: ['hackathon', 'innovation'],
      },
      {
        id: 'm-2024-11',
        date: '2024年11月',
        dateEn: 'Nov 2024',
        title: '技术博客发布',
        titleEn: 'Tech Blog Launched',
        description: '官方技术博客上线，累计发布 30+ 篇技术文章，覆盖能源算法、嵌入式开发、工业 AI 等热门话题。',
        descriptionEn: 'Official tech blog launched with 30+ articles covering energy algorithms, embedded, industrial AI.',
        type: 'project',
        icon: 'BookOpen',
        stats: { label: '文章数', value: 30, suffix: '+' },
        tags: ['blog', 'content'],
      },
      {
        id: 'm-2025-01',
        date: '2025年1月',
        dateEn: 'Jan 2025',
        title: 'AI 助手上线',
        titleEn: 'AI Assistant Launched',
        description: '推出「新能源产线先知」AI 对话助手，基于大模型技术，为社区成员提供 7x24 小时技术咨询服务。',
        descriptionEn: 'Launched "New Energy Production Line Prophet" AI assistant based on LLM technology.',
        type: 'project',
        icon: 'Bot',
        tags: ['ai', 'innovation'],
      },
      {
        id: 'm-2025-03',
        date: '2025年3月',
        dateEn: 'Mar 2025',
        title: '国际化启动',
        titleEn: 'Internationalization',
        description: '网站支持中英文双语，开始吸引海外开发者关注，迈向国际化开源社区。',
        descriptionEn: 'Website supports Chinese and English, starting to attract international developers.',
        type: 'milestone',
        icon: 'Globe',
        tags: ['i18n', 'global'],
      },
    ],
  },
]

// 未来愿景数据
export const futureVision = {
  id: 'future',
  period: '未来',
  periodEn: 'Future',
  theme: '无限可能',
  themeEn: 'Infinite Possibilities',
  subtitle: '愿景 · 星辰大海',
  subtitleEn: 'Vision · Sea of Stars',
  color: '#8B5CF6',
  gradient: 'from-violet-500 to-purple-400',
  targets: [
    { label: '目标成员', value: 500, suffix: '+', icon: 'Users' },
    { label: '连接开发者', value: 1000, suffix: '+', icon: 'Network' },
    { label: '开源项目', value: 50, suffix: '+', icon: 'Code' },
    { label: '合作企业', value: 20, suffix: '+', icon: 'Building' },
  ],
  mission: '连接全球新能源开发者，推动可持续发展技术创新',
  missionEn: 'Connecting global new energy developers, driving sustainable technology innovation',
}

export default evolutionData
