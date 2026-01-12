import { maintainers, developers, designers, contributors, sponsors } from '../constants/team';
import { Translations } from '../types/translations';
import { learningTranslations } from '../constants/learning';

export const zhTranslations: Translations = {
  joinPage: {
    title: '加入我们的俱乐部',
    subtitle: '成为我们可持续编程社区的一员',
    wechat: {
      title: '微信群',
      description: '加入我们的微信群，了解最新更新、项目讨论和社区活动',
      id: 'NEC新能源开发者社区',
      copyButton: '复制群名',
      copied: '已复制！',
      addTips: '如何加入：',
      addTipsList: [
        '复制上面的群名',
        '打开微信',
        '搜索群名',
        '申请加入'
      ]
    },
    roadmap: {
      title: '您的旅程',
      description: '从申请到成为我们社区活跃成员的路径',
      steps: [
        {
          title: '提交申请',
          description: '填写我们的会员申请表，告诉我们您的兴趣、技能和动机',
          duration: '5-10分钟'
        },
        {
          title: '初步联系',
          description: '我们的团队成员将在24小时内通过电子邮件与您联系，安排介绍会议',
          duration: '24小时内'
        },
        {
          title: '介绍会议',
          description: '参加介绍会议，了解我们的项目、社区准则以及如何开始',
          duration: '30-45分钟'
        },
        {
          title: '项目分配',
          description: '根据您的兴趣和技能，我们将为您分配一个适合的项目团队',
          duration: '1-2天'
        },
        {
          title: '开始贡献',
          description: '开始参与您的项目团队，参加每周会议，并开始为开源项目做贡献',
          duration: '立即开始'
        }
      ]
    },
    cta: {
      title: '准备好加入了吗？',
      description: '迈出第一步，成为我们致力于可持续技术的充满活力的社区的一部分',
      addWechat: '添加微信群',
      viewProject: '查看我们的项目',
      tip: '我们迫不及待地想见到您！'
    },
    form: {
      name: '姓名',
      email: '邮箱',
      phone: '电话',
      experience: '经验',
      interests: '兴趣',
      submit: '提交',
      submitting: '提交中...',
      success: '提交成功',
      error: '提交失败'
    },
    benefits: {
      title: '会员福利',
      networking: '人脉拓展',
      learning: '学习机会',
      projects: '项目参与',
      career: '职业发展'
    }
  },
  join: {
    form: {
      title: '加入NEC新能源开发者社区',
      subtitle: '填写此表格成为我们社区的一员',
      basicInfo: {
        title: '基本信息',
        description: '请提供您的基本联系信息',
        name: '姓名',
        email: '邮箱地址',
        phone: '电话号码',
        organization: '组织/公司',
        namePlaceholder: '请输入您的姓名',
        emailPlaceholder: '请输入您的邮箱地址',
        phonePlaceholder: '请输入您的电话号码',
        organizationPlaceholder: '请输入您的组织或公司'
      },
      roleInfo: {
        title: '角色信息',
        description: '告诉我们您的专业背景',
        role: '角色',
        rolePlaceholder: '请输入您的角色',
        experience: '经验',
        experiencePlaceholder: '描述您的经验',
        identityLabel: '身份',
        student: '学生',
        professional: '专业人士',
        freelancer: '自由职业者',
        other: '其他'
      },
      techStack: {
        title: '技术技能',
        description: '选择您的专业领域',
        frontend: '前端开发',
        backend: '后端开发',
        embedded: '嵌入式系统',
        ai: 'AI/机器学习',
        other: '其他',
        otherPlaceholder: '请说明其他技能',
        options: ['前端', '后端', '移动端', 'AI/ML', 'DevOps', '数据科学']
      },
      experience: {
        title: '经验与动机',
        description: '分享您的背景和目标',
        motivation: '动机',
        motivationPlaceholder: '您为什么想加入？',
        experienceLabel: '技术经验',
        motivationLabel: '动机',
        contributionLabel: '预期贡献',
        experiencePlaceholder: '描述您的技术背景',
        contributionPlaceholder: '您计划如何贡献？'
      },
      timeExpectation: {
        title: '时间投入',
        description: '帮助我们了解您的可用时间',
        expectationsLabel: '期望',
        expectationsPlaceholder: '您对俱乐部有什么期望？',
        availabilityLabel: '每周可用时间（小时）',
        selectPlaceholder: '选择您的可用时间',
        option1to2: '1-2小时',
        option3to5: '3-5小时',
        option6to10: '6-10小时',
        option10plus: '10+小时'
      },
      submit: {
        button: '提交申请',
        submitting: '提交中...',
        success: '申请已提交',
        successMessage: '感谢您的申请！我们将审核并尽快回复您。',
        error: '提交失败',
        errorMessage: '提交申请时出现错误，请重试。'
      }
    }
  },
  nav: {
    home: '首页',
    projects: '项目',
    innovation: '创新成果',
    events: '活动',
    resources: '资源',
    contact: '联系我们',
    team: '团队',
    login: '登录',
    logout: '退出',
    joinClub: '加入俱乐部',
    dashboard: '控制台'
  },
  hero: {
    tagline: '欢迎来到NEC新能源开发者社区',
    title: '构建可持续',
    titleHighlight: '未来',
    description: '加入我们的社区，通过开源项目、技术研讨会和协作学习，推动可再生能源和可持续技术的发展。',
    joinCommunity: '加入社区',
    viewGithub: '查看Gitee',
    codingWorkshops: '编程工作坊',
    codingWorkshopsDesc: '每周动手编程工作坊',
    innovationProjects: '创新项目',
    innovationProjectsDesc: '可再生能源开源项目',
    industryConnections: '行业联系',
    industryConnectionsDesc: '与可持续技术领导者建立联系'
  },
  about: {
    title: '关于我们',
    paragraph1: 'NEC新能源开发者社区是一个由学生主导的技术社区，致力于通过开源项目和协作学习推动可持续技术的发展。我们的使命是弥合可再生能源与软件开发之间的差距。',
    paragraph2: '成立于2024年，我们已经从一个小型学习小组发展成为一个充满活力的社区，拥有来自不同学科的活跃贡献者，包括计算机科学、电气工程、环境科学等。',
    paragraph3: '我们的项目涵盖人工智能、物联网、嵌入式系统和数据分析，所有这些都专注于解决可再生能源、能源效率和可持续技术方面的现实挑战。',
    learnMore: '了解更多',
    projectOrigin: {
      title: '项目起源',
      content: '我们的俱乐部最初是一个专注于太阳能预测的小型项目，现已发展成为一个综合性的可持续技术社区。我们的成长是由学生、教育工作者和行业专业人士的协作努力推动的。'
    },
    phase2: {
      title: '第二阶段：社区扩展',
      description: '超越初始项目',
      content: '随着我们早期项目的成功，我们将范围扩展到包括风能优化、智能电网技术和可持续交通解决方案，同时保持对开源开发的强烈关注。'
    },
    contributing: {
      title: '贡献',
      description: '我们如何构建社区',
      howToContribute: '如何贡献',
      steps: [
        '通过我们的Gitee仓库加入',
        '参加每周工作坊',
        '参与开源项目',
        '与团队成员协作',
        '分享知识和最佳实践'
      ],
      codeOfConduct: '行为准则',
      reportIssues: '报告问题',
      submitPR: '提交拉取请求'
    },
    license: {
      title: '许可证',
      description: '开源承诺',
      openSource: '我们所有的项目都在MIT许可证下开源',
      permissions: ['商业使用', '修改', '分发', '私人使用'],
      limitations: ['责任', '担保'],
      conditions: ['许可证和版权声明']
    }
  },
  features: {
    title: '俱乐部特色',
    subtitle: '加入我们的社区，享受这些独特的好处',
    weeklyWorkshops: '每周工作坊',
    weeklyWorkshopsDesc: '定期举办编程和技术研讨会',
    openSource: '开源项目',
    openSourceDesc: '为真实的可持续技术项目做贡献',
    hackathons: '黑客马拉松',
    hackathonsDesc: '参加专注的编码挑战',
    guestSpeakers: '客座演讲者',
    guestSpeakersDesc: '向行业专家学习',
    networking: '网络交流',
    networkingDesc: '与志同道合的人建立联系',
    conferences: '会议',
    conferencesDesc: '参加可持续技术活动'
  },
  team: {
    title: '我们的团队',
    description: '认识我们多元化团队的学生、开发者和可持续技术爱好者',
    maintainerTitle: '维护者',
    developerTitle: '开发者',
    designerTitle: '设计师',
    contributorTitle: '贡献者',
    sponsorTitle: '赞助商',
    viewFullTeam: '查看完整团队',
    teamPhoto: '团队照片',
    analytics: {
      title: '团队分析',
      description: '我们社区增长的详细统计',
      totalMembers: '总成员',
      activeContributors: '活跃贡献者',
      giteeReference: 'Gitee参考',
      lastUpdated: '最后更新',
      roleDistribution: '角色分布',
      contributionStats: '贡献统计',
      mainResponsibilities: '主要职责',
      maintainerResponsibilities: '项目管理、代码审核、技术决策',
      developerResponsibilities: '功能开发、Bug修复、技术实现',
      designerResponsibilities: '界面设计、用户体验、视觉规范',
      contributorResponsibilities: '文档编写、测试反馈、社区支持'
    },
    teamPhotoDescription: '团队成员在项目开发过程中的珍贵合影，记录了我们共同努力和协作的美好时光。',
    maintainers,
    developers,
    designers,
    contributors,
    sponsors
  },
  cta: {
    title: '准备好开始了吗？',
    description: '加入我们的社区，参与可持续技术项目',
    getStarted: '立即开始'
  },
  common: {
    loading: '加载中...',
    error: '出现错误',
    success: '成功',
    cancel: '取消',
    confirm: '确认',
    save: '保存',
    edit: '编辑',
    delete: '删除',
    back: '返回',
    next: '下一步',
    previous: '上一步'
  },
  notFound: {
    title: '页面未找到',
    description: '您寻找的页面不存在。',
    returnHome: '返回首页'
  },
  projects: {
    title: '我们的项目',
    description: '探索专注于可再生能源和可持续发展的开源项目',
    filterTitle: '筛选项目',
    expandFilters: '展开筛选',
    collapseFilters: '收起筛选',
    filterAll: '全部',
    filterAI: '人工智能与机器学习',
    filterIoT: '物联网',
    filterEmbedded: '嵌入式系统',
    filterRobotics: '机器人技术',
    filterResearch: '研究',
    filterWeb: 'Web开发',
    filterMobile: '移动应用',
    filterOther: '其他',
    viewProject: '查看项目',
    viewCode: '查看代码',
    technologies: '技术',
    author: '作者',
    date: '日期'
  },
  events: {
    title: 'Future / 未来',
    description: '参加我们即将举行的可持续技术活动和研讨会',
    filterTitle: '筛选活动',
    expandFilters: '展开筛选',
    collapseFilters: '收起筛选',
    upcoming: '即将开始',
    past: '已结束',
    noUpcoming: '暂无即将开始的活动',
    noPast: '暂无已结束的活动',
    registerNow: '立即注册',
    learnMore: '了解更多',
    viewDetails: '查看详情',
    eventDate: '日期',
    location: '地点',
    participants: '参与者',
    category: '类别',
    filterAll: '全部',
    filterWorkshop: '工作坊',
    filterHackathon: '黑客马拉松',
    filterSeminar: '研讨会',
    filterCompetition: '竞赛',
    filterNetworking: '网络活动'
  },
  resources: {
    title: '学习资源',
    description: '获取可持续技术开发的精选资源',
    filterTitle: '筛选资源',
    expandFilters: '展开筛选',
    collapseFilters: '收起筛选',
    searchPlaceholder: '搜索资源...',
    filterAll: '全部',
    filterTutorials: '教程',
    filterTools: '工具',
    filterBooks: '书籍',
    filterCourses: '课程',
    filterDocumentation: '文档',
    noResults: '未找到资源',
    viewResource: '查看资源',
    downloadResource: '下载',
    freeResource: '免费',
    paidResource: '付费',
    difficulty: '难度',
    beginner: '初级',
    intermediate: '中级',
    advanced: '高级',
    category: '类别',
    author: '作者',
    rating: '评分',
    sortBy: '排序方式',
    sortOrder: '排序',
    sortByRating: '评分',
    sortByTitle: '标题',
    sortByDifficulty: '难度',
    sortByType: '类型',
    ascending: '升序',
    descending: '降序',
    totalResources: '共 {count} 个资源'
  },
  contact: {
    title: '联系我们',
    description: '如有疑问、合作或伙伴关系，请与我们的团队联系',
    getInTouch: '联系我们',
    contactInfo: '联系信息',
    followUs: '关注我们',
    channelsDescription: '您也可以通过以下方式与我们取得联系。',
    followUsDescription: '在社交平台关注我们，获取最新动态与新闻。',
    form: {
      name: '姓名',
      email: '邮箱',
      subject: '主题',
      message: '消息',
      namePlaceholder: '您的姓名',
      emailPlaceholder: 'your.email@example.com',
      subjectPlaceholder: '我们如何帮助您？',
      messagePlaceholder: '请详细说明您的询问...',
      sendMessage: '发送消息',
      sending: '发送中...',
      messageSent: '消息发送成功！',
      messageError: '发送消息失败。请重试。',
      introText: '请填写下方表单，我们会尽快与您联系。',
      toastSuccessDescription: '我们会尽快与您取得联系。',
      toastErrorDescription: '请检查您的网络连接并重试。'
    },
    info: {
      address: '新北区辽河路666号，东一门，玉衡楼 A416',
      phone: '+86 158 9600 0818',
      email: '22230635@czu.cn',
      hours: '周一至周五：上午9点 - 下午6点'
    },
    infoLabels: {
      address: '地址',
      phone: '电话',
      email: '邮箱',
      hours: '办公时间'
    },
    social: {
      gitee: 'Gitee',
      wechat: '微信',
      email: '邮箱'
    },
    application: {
      title: 'NEC官网上线申请',
      description: '申请加入NEC官网，展示您的项目与成果。',
      applyNow: '立即申请'
    }
  },
  dashboard: {
    title: '控制台',
    welcome: '欢迎回来，',
    memberSince: '会员自',
    logout: '退出',
    myProjects: {
      title: '我的项目',
      description: '管理和跟踪您对我们开源项目的贡献',
      noProjects: '暂无项目',
      viewGithub: '查看Gitee'
    },
    upcomingEvents: {
      title: '即将开始的活动',
      description: '及时了解即将开始的工作坊和活动',
      noEvents: '暂无即将开始的活动',
      viewAll: '查看所有活动'
    },
    myActivity: {
      title: '我的活动',
      description: '跟踪您的贡献和社区参与度',
      contributions: '贡献',
      eventsAttended: '参加的活动',
      projectsCompleted: '完成的项目'
    },
    quickActions: {
      title: '快捷操作',
      submitProject: '提交新项目',
      registerEvent: '注册活动',
      viewResources: '查看资源',
      contactUs: '联系我们'
    }
  },
  footer: {
    clubName: 'NEC新能源开发者社区',
    description: '通过协作开发构建可持续技术',
    navigation: '导航',
    resources: '资源',
    contact: '联系',
    learningMaterials: '学习资料',
    joinClub: '加入NEC仓库实验室',
    gettingStarted: '入门文档',
    techRoadmap: {
      title: '技术路线',
      description: '专业的技术发展指导'
    },
    address: '江苏省常州市新北区辽河路666号常州工学院辽河路校区玉衡A416仓库实验室',
    copyright: '© 2025 NEC新能源开发者社区。保留所有权利。'
  },
  displayRatio: {
    title: '显示比例调整器',
    description: '调整卡片显示比例，查看不同比例下的视觉效果',
    aspectRatioLabel: '显示比例',
    viewDetails: '查看详情',
    noMatchingContent: '没有找到匹配的内容',
    aspectRatios: {
      square: '正方形 (1:1)',
      video: '视频比例 (16:9)',
      traditional: '传统比例 (4:3)',
      portrait: '竖直比例 (3:4)',
      widescreen: '宽屏比例 (16:10)',
      ultrawide: '超宽比例 (21:9)'
    }
  },
  // Getting Started 页面翻译
  gettingStarted: {
    hero: {
      title: '新能源编程俱乐部',
      description: '探索新能源技术的无限可能，从编程开始改变世界',
      buttons: {
        joinClub: '加入俱乐部',
        viewProjects: '查看项目',
        visitSite: '访问官网'
      }
    },
    stats: {
      learnersTitle: '学习者',
      learnersDesc: '活跃学习者',
      completedProjectsTitle: '完成项目',
      completedProjectsDesc: '项目完成数',
      averageRatingTitle: '平均评分',
      averageRatingDesc: '学员满意度',
      successRateTitle: '成功率',
      successRateDesc: '学习成功率'
    },
    directions: {
      title: '选择你的技术方向',
      description: '根据你的兴趣和职业规划，选择最适合的学习路径',
      coreSkills: '核心技能',
      projectsSuffix: '个项目',
      startLearning: '开始学习',
      embedded: {
        title: '嵌入式开发',
        description: '学习嵌入式系统开发，掌握硬件与软件结合的核心技术',
        skills: ['C/C++', 'FreeRTOS', '硬件调试', '通信协议'],
        duration: '6-8个月'
      },
      gui: {
        title: 'GUI界面开发',
        description: '掌握跨平台图形界面开发，创建美观实用的桌面应用',
        skills: ['Qt/QML', 'UI设计', '跨平台开发', '用户体验'],
        duration: '4-6个月'
      },
      algorithm: {
        title: '算法与数据结构',
        description: '深入学习算法设计与优化，提升编程思维和解决问题的能力',
        skills: ['算法设计', '数据结构', '性能优化', '数学建模'],
        duration: '8-12个月'
      },
      structurePrint: {
        title: '结构打印开发',
        description: '面向3D结构打印的设计、切片与控制开发',
        skills: ['CAD建模', '切片软件', '材料工艺', 'G-code/控制'],
        duration: '5-7个月'
      }
    },
    quickGuides: {
      title: '快速上手指南',
      description: '跟随我们的指南，快速开始你的新能源编程之旅',
      stepsLabel: '步骤：',
      items: {
        setup: {
          title: '环境搭建',
          description: '快速搭建开发环境，开始你的编程之旅',
          steps: [
            '选择适合的开发工具',
            '安装必要的软件包',
            '配置开发环境',
            '运行第一个程序'
          ],
          estimatedTime: '30分钟'
        },
        firstGoodIssue: {
          title: '第一个好的问题',
          description: '寻找并解决你的第一个Good Issue，开始为开源项目做贡献',
          steps: [
            '浏览项目Issue列表',
            '筛选Good First Issue标签',
            '理解问题描述和要求',
            'Fork项目并创建分支',
            '实现解决方案',
            '提交Pull Request'
          ],
          estimatedTime: '25分钟'
        },
        firstProject: {
          title: '第一个项目',
          description: '通过实际项目快速上手，掌握基础开发流程',
          steps: [
            '选择入门项目',
            '理解项目结构',
            '编写核心代码',
            '测试和调试',
            '项目部署'
          ],
          estimatedTime: '2小时'
        },
        community: {
          title: '加入社区',
          description: '融入学习社区，获得更多支持和交流机会',
          steps: [
            '注册俱乐部账号',
            '完善个人资料',
            '加入学习小组',
            '参与讨论交流'
          ],
          estimatedTime: '15分钟'
        }
      }
    },
    baseTutorials: {
      title: '基础教程',
      description: '从零开始学习编程基础知识和核心概念',
      introTitle: '编程入门',
      introDesc: '编程基础概念和思维方式，了解新能源编程的应用领域和发展前景',
      fundamentalsTitle: '编程基础',
      fundamentalsDesc: '变量、函数、控制结构等基础知识，掌握编程的核心概念和语法',
      startLearning: '开始学习'
    },
    trainingResources: {
      title: '培训资源',
      description: '丰富的学习资源，助你快速提升技能',
      githubRepoTitle: 'GitHub 仓库',
      githubRepoDesc: '查看项目源码和贡献代码',
      visitGithub: '访问 GitHub',
      docsTitle: '技术文档',
      docsDesc: '详细的技术文档和API参考',
      viewDocs: '查看文档',
      videosTitle: '视频教程',
      videosDesc: '观看实战项目视频教程',
      watchVideos: '观看视频',
      communityTitle: '社区交流',
      communityDesc: '加入社区讨论和交流',
      joinDiscussion: '加入讨论'
    }
  },
  // 学习路径和技术路线翻译
  learning: learningTranslations.zh
};