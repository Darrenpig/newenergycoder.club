import { maintainers, developers, designers, contributors, sponsors } from '../constants/team';
import { Translations } from '../types/translations';
import { learningTranslations } from '../constants/learning';

export const zhTranslations: Translations = {
  joinPage: {
    title: '加入我们的编程俱乐部',
    subtitle: '成为我们可持续编程社区的一员？',
    wechat: {
      title: '微信群',
      description: '加入我们的技术群，了解最新更新、项目计划和社区活动',
      id: 'NEC新能源开发者俱乐部',
      copyButton: '复制群名',
      copied: '已复制！',
      addTips: '如何加入？',
      addTipsList: [
        '复制上面的群名',
        '打开微信',
        '搜索群名',
        '申请加入'
      ]
    },
    roadmap: {
      title: '你的路线',
      description: '从申请到成为我们社区活跃成员的路径？',
      steps: [
        {
          title: '提交申请',
          description: '填写我们的会员申请表，告诉我们你的背景、技能和动机',
          duration: '5-10分钟'
        },
        {
          title: '初步联系',
          description: '我们的团队成员将在24小时内通过电子邮件与您联系，安排介绍会议',
          duration: '24小时内？'
        },
        {
          title: '介绍会议',
          description: '参加介绍会议，了解我们的项目、社区规则以及如何开始',
          duration: '30-45分钟'
        },
        {
          title: '项目分配',
          description: '根据你的兴趣和技能，我们将为你分配一个合适的项目团队',
          duration: '1-2天？'
        },
        {
          title: '开始贡献',
          description: '开始参与您的项目团队，参加每周会议，并开始为开源项目做贡献',
          duration: '立即开始？'
        }
      ]
    },
    cta: {
      title: '准备好加入了吗？',
      description: '迈出第一步，成为我们致力于可持续技术的充满活力的社区的一部分',
      addWechat: '添加微信群',
      viewProject: '查看我们的项目',
      tip: '我们迫不及待地想见到你！'
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
      title: '加入NEC新能源开发者俱乐部？',
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
        otherPlaceholder: '请说明其他技术',
        options: ['前端', '后端', '移动开发', 'AI/ML', 'DevOps', '数据科学']
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
        successMessage: '感谢您的申请，我们将尽快回复您。',
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
    tagline: '欢迎来到NEC新能源开发者俱乐部！',
    title: '构建可持续',
    titleHighlight: '未来',
    description: '加入我们的社区，通过开源项目、技术研讨会和工作学习，推动可再生能源和可持续技术的发展。',
    joinCommunity: '加入社区',
    viewGithub: '查看Gitee',
    codingWorkshops: '编程工作坊',
    codingWorkshopsDesc: '每周动手编程工作坊',
    innovationProjects: '创新项目',
    innovationProjectsDesc: '可再生能源开源项目',
    industryConnections: '行业联系',
    industryConnectionsDesc: '与可持续技术倡导者建立联系'
  },
  about: {
    title: '关于我们',
    paragraph1: 'NEC新能源开发者俱乐部是一个由学生主导的技术社区，致力于通过开源项目和协作学习推动可持续技术的发展。我们的使命是弥合可再生能源与开发者之间的差距。',
    paragraph2: '成立于2024年，我们已经从一个小型学习小组发展成为一个充满活力的社区，拥有来自不同学科的活跃贡献者，包括计算机科学、电气工程、环境科学等。',
    paragraph3: '我们的项目涵盖人工智能、物联网、嵌入式系统和数据分析，所有这些都专注于解决可再生能源、能源效率和可持续技术方面的实际挑战。',
    learnMore: '了解更多',
    projectOrigin: {
      title: '项目起源',
      content: '我们的编程俱乐部最初是一个专注于太阳能监测的小型项目，现在已发展成为一个综合性的可持续技术社区。我们的成长是由学生、教育工作者和行业专业人士的合作努力推动的。'
    },
    phase2: {
      title: '第二阶段：社区扩展',
      description: '超越初始项目',
      content: '随着我们早期项目的成功，我们将扩展到包括风能优化、智能电网技术和可持续交通解决方案，同时保持对开源开发的热情关注。'
    },
    contributing: {
      title: '贡献',
      description: '我们如何构建社区',
      howToContribute: '如何贡献',
      steps: [
        '通过我们的Gitee仓库加入',
        '参加每周工作坊',
        '参与开源项目',
        '与团队成员合作',
        '分享知识和最佳实践'
      ],
      codeOfConduct: '行为准则',
      reportIssues: '报告问题',
      submitPR: '提交拉取请求'
    },
    license: {
      title: '许可证',
      description: '开源许可',
      openSource: '我们所有的项目都在MIT许可证下开源',
      permissions: ['商业使用', '修改', '分发', '个人使用'],
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
    openSourceDesc: '为真正的可持续技术项目做贡献',
    hackathons: '黑客马拉松',
    hackathonsDesc: '参加专注的编程竞赛',
    guestSpeakers: '客座演讲者',
    guestSpeakersDesc: '向行业专家学习',
    networking: '网络交流',
    networkingDesc: '与志同道合的人建立联系',
    conferences: '会议',
    conferencesDesc: '参加可持续技术活动'
  },
  team: {
    title: '我们是谁？',
    description: '一群在代码与理想交织中相遇的人。这里有痴迷编程的学生，有追求卓越的开发者，有热衷于「如何让世界更高效、更清洁」的可持续技术信徒。我们不同——专业、背景、喜爱的编程语言都可能不一样。但我们相同——向着技术方向，怀着协作的力量，怀着可持续不是选择而是必须的信念。在这里，好奇心是通行证，实践是通用语。我们不只是构建产品，更是在构建心中那个更绿色、更公平、更智能的未来。我们，是一个行动的证明。',
    maintainerTitle: '维护者',
    developerTitle: '开发者',
    designerTitle: '设计师',
    preMaintainerTitle: '预备维护者',
    researcherTitle: '研究员',
    contributorTitle: '贡献者',
    sponsorTitle: '赞助商',
    viewFullTeam: '查看完整团队',
    teamPhoto: '团队照片',
    analytics: {
      title: '团队分析',
      description: '我们社区成长的详细统计',
      totalMembers: '总成员',
      activeContributors: '活跃贡献者',
      giteeReference: 'Gitee参考',
      lastUpdated: '最后更新',
      roleDistribution: '角色分布',
      contributionStats: '贡献统计',
      mainResponsibilities: '主要职责',
      maintainerResponsibilities: '项目管理、代码审查、技术决策',
      developerResponsibilities: '功能开发、Bug修复、技术实现',
      designerResponsibilities: '界面设计、用户体验、视觉规范',
      contributorResponsibilities: '文档编写、测试反馈、社区支持'
    },
    teamPhotoDescription: '团队成员在项目开发过程中的合影，记录了我们共同努力和合作的美好时光。',
    researchers: [
      {
        name: '寰愬悍',
        role: 'Researcher',
        bio: '擅长3D打印建模/结构电机驱动，专注于艺术研究。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/researcher/寰愬悍.jpg',
        tags: ['3D打印', '建模', 'SolidWorks', '艺术研究']
      },
      {
        name: '闄嗗畤璞?',
        role: 'Researcher',
        bio: '在读研究学生，专注于化学与Aspen V8及AI技术研究。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/researcher/闄嗗畤璞.jpg',
        tags: ['研究学生', '艺术研究', '技术探索']
      }
    ],
    preMaintainers: [
      {
        name: '鍗㈢帇娣?',
        role: '25RC项目经理&结构&电控',
        bio: '25RC项目管理，机械和电控领域的学习者，Pre-Maintainer培养中。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/preMaintainer/鍗㈢帇娣.jpg',
        tags: ['项目管理', '结构设计', '电控学习', 'ROBOCON', 'Pre-Maintainer', '25RC'],
        github: 'https://github.com/luwangchun'
      },
      {
        name: '寰愭捣濠?',
        role: 'Pre-Maintainer&财务管理',
        bio: '专注财务流程优化与数据展示，通过合理计算、风险防控，助力技术落地、执行落地、Pre-Maintainer培养中。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/preMaintainer/寰愭捣濠.jpg',
        tags: ['财务管理', '计算控制', '风险防控', 'Pre-Maintainer', '成本控制']
      },
      {
        name: '鍗曞箍蹇?',
        role: 'Pre-Maintainer&嵌入式开发',
        bio: '机器人行业电气自动化开发以及总线电路设计，Pre-Maintainer培养中。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/preMaintainer/鍗曞箍蹇.png',
        tags: ['嵌入式开发', '电气驱动', '硬件电路设计', 'Pre-Maintainer', '机器人', 'STM32'],
        github: 'https://github.com/shanguangzhi'
      },
      {
        name: '璁稿瓙娑?',
        role: 'Pre-Maintainer&产品经理',
        bio: '负责产品规划和需求分析，推动项目向正确方向发展，Pre-Maintainer培养中。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/preMaintainer/璁稿瓙娑.png',
        tags: ['产品规划', '需求分析', '用户研究', 'Pre-Maintainer', '原型设计'],
        github: 'https://github.com/xuzihan'
      }
    ],
    maintainers: [
      {
        name: 'DarrenPig',
        role: 'Club Founder & BSP 底层驱动工程师',
        bio: 'Renewable energy researcher with a focus on AI applications for energy optimization.',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/maintainer/DarrenPig.jpg',
        tags: ['AI', 'BSP', '嵌入式', 'ROBOCON', '能源监测', 'openEuler'],
        github: 'https://github.com/Darrenpig',
        email: '22230635@czu.cn'
      },
      {
        name: '娈风粺鍒?',
        role: 'Club Founder & BSP Expert',
        bio: '专注于AI在能源优化应用的可再生能源研究员。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/maintainer/娈风粺鍒.jpg',
        tags: ['AI', 'BSP', '能源优化', '可再生能源', '华为云AI'],
        github: 'https://github.com/yintongchuang'
      },
      {
        name: '璁哥彂璇?',
        role: '机器人算法工程师',
        bio: '专注于机器人算法开发及优化以及业务总体设计。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/maintainer/璁哥彂璇.jpg',
        tags: ['机器人算法', 'ROBOCON', '人形机器人', '算法优化', 'ROS'],
        github: 'https://github.com/xulongyi'
      },
      {
        name: '寮犳椇鏃?',
        role: '机器人运行时工程师',
        bio: '负责项目的核心技术架构，确保电控系统的稳定运行。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/maintainer/寮犳椇鏃.jpg',
        tags: ['电控系统', '运行时', 'ROBOCON', '嵌入式', '系统稳定性'],
        github: 'https://github.com/zhangwangwang'
      }
    ],
    developers: [
      {
        name: '鍒樿嫳鐞?',
        role: '嵌入式开发工程师',
        bio: '专注于现代机器人技术栈，致力于构建高性能的机器人界面。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/developer/鍒樿嫳鐞.png',
        tags: ['React', 'TypeScript', 'Vue', '前端架构', 'UI/UX', 'Vite'],
        github: 'https://github.com/liuyingqi'
      },

      {
        name: '鍛ㄥ織',
        role: '全栈开发工程师',
        bio: '具备前后端开发能力，致力于端到端的解决方案开发。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/developer/鍛ㄥ織.png',
        tags: ['全栈开发', 'JavaScript', 'Python', 'React', 'Node.js', '项目管理'],
        github: 'https://github.com/zhouzhi'
      },
      {
        name: '鏉庣',
        role: '系统架构师',
        bio: '专注于总线系统架构设计和技术选型，为项目提供技术指导。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/developer/鏉庣.png',
        tags: ['系统架构', '技术选型', '分布式系统', '性能优化', '原生开发', 'Kubernetes'],
        github: 'https://github.com/lishuo'
      },
      {
        name: '鐗涜壇鏃?',
        role: 'DevOps基础设施管理员',
        bio: '负责项目的持续集成和部署，确保开发流程的高效运行。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/developer/鐗涜壇鏃.jpg',
        tags: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'GitHub Actions', '自动化部署'],
        github: 'https://github.com/niuliangxu'
      },
      {
        name: '閮戦挦鏂?',
        role: '移动一体化开发工程师',
        bio: '专注于移动应用开发，为用户提供优质的移动体验。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/developer/閮戦挦鏂.jpg',
        tags: ['React Native', 'Flutter', 'iOS', 'Android', '移动优化', '跨平台开发'],
        github: 'https://github.com/zhengqinwen'
      },
      {
        name: '鏉ㄥ姏婊?',
        role: '嵌入式开发工程师',
        bio: '嵌入式开发专家，熟练STM32+RTOS C语言开发。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/developer/鏉ㄥ姏婊.JPG',
        tags: ['嵌入式', 'STM32', 'RTOS', 'C语言', '驱动开发', '硬件控制'],
        github: 'https://github.com/yanglitao'
      },
      {
        name: '褰煰棰?',
        role: '结构R1机器人开发者',
        bio: '新加入的开发团队成员，积极参与机器人项目开发，学习新技术。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/developer/褰煰棰.jpg',
        tags: ['新成员', '项目开发', '学习成长', 'Web开发', 'JavaScript', '团队合作'],
        github: 'https://github.com/pengkeying'
      },
      {
        name: '瀛熸磥',
        role: '嵌入式驱动工程师',
        bio: '专注于STM32、RTOS 与驱动开发，擅长 C/C++。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/developer/瀛熸磥.jpg',
        tags: ['STM32', 'RTOS', 'C/C++', '驱动开发']
      },
      {
        name: '鏂囬挵濠?',
        role: '嵌入式驱动工程师',
        bio: '熟练实时操作系统与驱动开发，精通 C/C++ 与 STM32。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/developer/鏂囬挵濠.jpg',
        tags: ['STM32', 'RTOS', 'C/C++', '驱动开发']
      },
      {
        name: '寮犻練杞?',
        role: '物流自动化系统工程师',
        bio: '精通 PLC、机器视觉与智能分拣系统的工程实现与优化。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/developer/寮犻練杞.jpg',
        tags: ['物流自动化', 'PLC', '机器视觉', '分拣系统', '工业控制']
      }
    ],
    designers: [
      {
        name: 'Xiux',
        role: 'UI/UX设计师& 仓库PM',
        bio: '专注于开发者体验设计和界面优化，为可持续项目创造美观易用的界面。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/designer/xiux.jpg',
        tags: ['UI设计', 'UX设计', 'Figma', 'Sketch', '原型设计', '用户研究']
      },
      {
        name: 'ikkOoOo',
        role: '工业/产品设计师',
        bio: '专注于创意设计和视觉传达，为项目提供独特的设计视角。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/designer/ikkOoOo.jpg',
        tags: ['创意设计', '视觉传达', '设计创新', '艺术指导', '品牌设计', '视觉传达']
      },
      {
        name: '寮犺嫢鐠?',
        role: '视觉设计师 数据分析师',
        bio: '专注于品牌定位和数据分析，为项目提供专业的市场视觉可行定位设计。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/designer/寮犺嫢鐠.jpg',
        tags: ['品牌设计', 'Power BI', 'Logo设计', '色彩搭配']
      },
      {
        name: '闊﹀僵鏃?',
        role: '工业产品设计师',
        bio: '负责对接需求，专注于工业产品设计，为项目提供专业的设计解决方案。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/designer/闊﹀僵鏃.jpg',
        tags: ['工业设计', '产品设计', '需求对接', '设计解决方案', '用户体验', '产品规划']
      },
      {
        name: '鏉庝竴妤?',
        role: '运营总监',
        bio: 'NEC小队传播以及支持，负责团队运营和对外传播工作。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/designer/鏉庝竴妤.jpg',
        tags: ['团队运营', '传播策略', '活动支持', 'NEC小队', '对外网络', '品牌推广']
      },
      {
        name: '鏉庢兂',
        role: 'UX设计师',
        bio: '一直走在探索技术与设计边界的路上，以用户为中心，以体验为驱动。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/designer/鏉庢兂.jpg',
        tags: ['UX设计', '用户体验', '设计思维', 'Figma', '用户流程', '信息架构']
      },
      {
        name: '鐜嬪溅鍚?',
        role: '工业/产品设计师',
        bio: '致力于通过设计解决实际问题，以更开放的态度寻找更多可能性。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/contributer/鐜嬪溅鍚.jpg',
        tags: ['工业设计', '产品设计', 'SolidWorks', 'Rhino', '3D建模', '材料工艺']
      }
    ],
    contributors: [
      {
        name: '鍗㈡案鏉?',
        role: '嵌入式 运动控制算法专家',
        bio: '专注控制算法优化与BSP总体协同设计，在嵌入式和运动控制算法领域有深入研究。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/contributer/鍗㈡案鏉.jpg',
        tags: ['嵌入式开发', '运动控制算法', '算法优化', '协同设计', '算法优化'],
        github: 'https://github.com/luyongjie'
      },

      {
        name: '宕旀闃?',
        role: 'Developer',
        bio: '专注于上位机软件质量保证，确保项目的稳定性和可靠性。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/contributer/宕旀闃.jpg',
        tags: ['性能测试', 'Liunx', 'openEuler', '自动化测试', '性能测试'],
        github: 'https://github.com/cuizhengyang'
      },
      {
        name: '鐜嬩簬璞?',
        role: '制造组长',
        bio: '测试3D打印设备帮助团队打样，负责制造组的管理和技术支持工作。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/鐜嬩簬璞.jpg',
        tags: ['3D打印', '制造技术', '团队管理', '技术支持', '设备测试', '产品制作'],
        github: 'https://github.com/wangyuhao'
      },
      {
        name: '闂诲織浼?',
        role: 'Bronze Sponsor',
        bio: '致力于推动可持续技术发展的个人赞助者。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/developer/闂诲織浼.jpg',
        tags: ['技术赞助', '项目支持', '可持续发展', '创新支持', '社区建设', '人才培养']
      },
      {
        name: '寮犳椇鏃?',
        role: '新能源运维工程师',
        bio: '负责核心项目的现场部署和运维工作，确保系统的稳定运行。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/contributer/寮犳椇鏃.jpg',
        tags: ['运维部署', 'Linux', '服务器管理', '调试培训', '故障排查', '系统优化'],
        github: 'https://github.com/zhangwangwang'
      },
      {
        name: '鍚存礇鏂?',
        role: '开源贡献者 风力自动化专家',
        bio: '积极参与开源项目，为社区提供代码商业化文档。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/contributer/鍚存礇鏂.jpg',
        tags: ['风力自动化', '开源贡献', '工业控制', 'PLC', '自动化系统'],
        github: 'https://github.com/wuluobin'
      },
      {
        name: '浣欐旦閾?',
        role: '机器人日常运营编辑',
        bio: '专注于推广和文案，让NEC的每一个理念都能被看到。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/developer/浣欐旦閾.jpg',
        tags: ['文案工作', '运营编辑', '传播策略', '文字编辑', 'NEC理念', '内容创作'],
        github: 'https://github.com/yuhaoming'
      },


      {
        name: '鍗炰箰鍑?',
        role: '嵌入式学习贡献者',
        bio: '嵌入式学习中，积极参与开源项目和社区建设。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/contributer/鍗炰箰鍑.jpg',
        tags: ['嵌入式学习', '开源贡献', '社区建设', 'STM32', '硬件开发'],
        github: 'https://github.com/bianleiling'
      },


      {
        name: '寮犲博鐨?',
        role: '策划&数据可视化设计师 运营专员',
        bio: '会剪视频，学习设计，做过直播，专注于策划、数据可视化设计和运营推广。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/designer/寮犲博鐨.jpg',
        tags: ['策划', '数据可视化', '艺术设计', '运营专员', '视觉传达', '内容创作']
      },
      {
        name: '閮戠粛鎭?',
        role: '算法竞赛选手',
        bio: '专注于数学研究以及优化问题',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/閮戠粛鎭.png',
        tags: ['算法研究', '优化', '竞赛选手', '问题求解', '算法优化', '数学建模'],
        github: 'https://github.com/zhengshaokai'
      },
      {
        name: '鏉ㄩ懌娴?',
        role: 'Developer',
        bio: '专注于Arduino和ESP32等开发板的代码示例开发。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/contributer/鏉ㄩ懌娴.jpg',
        tags: ['Arduino', 'ESP32', '代码示例', '嵌入式开发', '硬件开发', '开发板'],
        github: 'https://github.com/yangxinhai'
      },
      {
        name: '娈峰瓙璞?',
        role: 'Developer&文案工作者',
        bio: '运营传播与文字编辑，负责团队内容创作和对外传播工作。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/contributer/娈峰瓙璞.jpg',
        tags: ['运营传播', '文字编辑', '内容创作', '团队宣传', '文档策划', '品牌建设'],
        github: 'https://github.com/yinzihao'
      },
      {
        name: '瀛欏濠?',
        role: '开源贡献者',
        bio: '专注于开源项目的贡献，为社区提供技术支持和代码。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/contributer/瀛欏濠.jpg',
        tags: ['开源贡献', '技术支持', '项目开发', '代码提交'],
        github: 'https://github.com/sunrujie'
      },
      {
        name: '鏉ㄥ僵濡?',
        role: 'Contributor',
        bio: 'AIC工业视觉SIG pre-sponsor，专注于工业视觉技术的研究和应用。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/鏉ㄥ僵濡.jpg',
        tags: ['工业视觉', 'AIC', 'SIG', 'pre-sponsor', '视觉技术', '技术研究'],
        github: 'https://github.com/yangcaini'
      },
      {
        name: '瀛欒瘲鐫?',
        role: 'Contributor',
        bio: 'AIC工业视觉SIG 嵌入式-单板机专家，专注于嵌入式系统和单板机开发。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/瀛欒瘲鐫.jpg',
        tags: ['嵌入式系统', '单板机', 'AIC', '工业视觉', 'SIG', '硬件开发'],
        github: 'https://github.com/sunshirui'
      },
      {
        name: '闊╃ズ鍐?',
        role: 'Contributor',
        bio: '数据分析员，专注于数据处理和可视化分析工作。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/闊╃ズ鍐.jpg',
        tags: ['数据分析', '数据处理', '统计分析', '数据可视化', '业务分析'],
        gitee: 'https://gitee.com/han-qiran'
      },
      {
        name: '閮绔?',
        role: '场地FD',
        bio: '专注于嵌入式、机器视觉与硬件开发。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/閮绔.jpg',
        tags: ['场地FD', '嵌入式', '机器视觉', '硬件'],
        gitee: 'https://gitee.com/guo--tongtong'
      },
      {
        name: '鍚存ⅵ濠?',
        role: '贡献者',
        bio: '大型的汽车发动机/电机创新项目进行中。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/鍚存ⅵ濠.jpg',
        tags: ['创新', '汽车发动机', '电机', '创新项目']
      },
      {
        name: '闄堟槬鏋?',
        role: '视觉算法',
        bio: '高二在读化学竞赛生，RC27预备队员。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/闄堟槬鏋.jpg',
        tags: ['视觉算法', '化学竞赛', 'RC27', '预备队员']
      },
      {
        name: '鐧介€搁福',
        role: '贡献者',
        bio: 'RC 全国机器人大赛参与者，仓库数字化，AI食堂原生开发。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/鐧介€搁福.jpg',
        tags: ['RC', '全国机器人大赛', '仓库数字化', 'AI食堂', '原生开发']
      },
      {
        name: '涓ユ枃棰?',
        role: '贡献者',
        bio: '负责数据库管理与运维工作。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/涓ユ枃棰.jpg',
        tags: ['数据库', '运维', '数据管理']
      },
      {
        name: '鏉庡槈娑?',
        role: '贡献者',
        bio: '获得国家奖学金，会SolidWorks、CATIA等软件，目前在做创新。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/鏉庡槈娑.jpg',
        tags: ['国家奖学金', 'SolidWorks', 'CATIA', '创新']
      },
      {
        name: '榛勫畤闆?',
        role: '贡献者',
        bio: '使用三维建模软件进行结构设计、动态仿真。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/榛勫畤闆.jpg',
        tags: ['三维建模', '结构设计', '动画演示']
      },
      {
        name: '榄忓崼',
        role: '贡献者',
        bio: '满腔热血的半吊子全栈 不务正业硬件。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/榄忓崼.jpg',
        tags: ['全栈开发', '硬件开发']
      },
      {
        name: '姊佹柊闆?',
        role: '成员',
        bio: '毫无经验的一只小白，正在努力学习中。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/姊佹柊闆.jpg',
        tags: ['小白', '成员', '学习中']
      },
      {
        name: '椤句匠娆?',
        role: 'Contributor',
        bio: '专注于数据库与Unity数据传输技术。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/椤句匠娆.jpg',
        tags: ['数据库', 'Unity', '数据传输']
      },

      {
        name: '鐜嬫鎬?',
        role: '电控组成员',
        bio: '只是学习结构中的电控部分，学习过51，32单板机以及sw建模。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/鐜嬫鎬.jpg',
        tags: ['电控', '51单板机', 'STM32', 'SW建模']
      },
      {
        name: '姹甯?',
        role: 'Contributor',
        bio: '目前在视觉赛道，探索计算机视觉技术。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/姹甯.jpg',
        tags: ['视觉', '计算机视觉', '算法']
      },
      {
        name: '宀虫坊淇?',
        role: 'Contributor',
        bio: '专注于C语言开发与学习。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/宀虫坊淇.jpg',
        tags: ['C语言', '编程', '软件开发']
      },
      {
        name: '鏉庣晠鐣?',
        role: 'Contributor',
        bio: '负责电控与场地相关工作。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/鏉庣晠鐣.jpg',
        tags: ['电控', '场地运维', '硬件维护']
      },
      {
        name: '瀛欓洴鑹?',
        role: 'Designer',
        bio: '对机械方面了解较多，熟练sw建模，参加过3d设计大赛和农业智能装备大赛，自学单板机。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/contributer/瀛欓洴鑹.jpg',
        tags: ['机械设计', 'SW建模', '3D设计', '单板机', '智能装备']
      }
    ],
    sponsors: [
      {
        name: '开源之夏',
        role: 'Gold Sponsor - 楼12,000',
        bio: '中国科学院软件研究所、阿里云有限公司、中国软件行业协会联合主办的开源活动。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/sponsor/寮€婧愪箣澶廘ogo.png',
        tags: ['开源贡献', '社区节点', '学生项目', '技术社区', '创新驱动', '人才培养'],
        github: 'https://summer-ospp.ac.cn/'
      },
      {
        name: '创客开源硬件平台',
        role: 'Silver Sponsor - 楼8,000',
        bio: '专业的开源硬件开发平台，提供丰富的开发板和技术资源。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/public/image/sponsor/绔嬪垱寮€婧愬箍鍦.png',
        tags: ['开源硬件', '开发板', '技术资源', '硬件开发', '创新平台', '技术支持'],
        github: 'https://oshwhub.com/explore'
      },
      // {
      //   name: 'GPUfree 算力平台',
      //   role: 'Computing Power Partner',
      //   bio: '提供1000元算力优惠券，助力AI模型训练与科研回归。',
      //   image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/assets/logo_GPU_Free.png',
      //   tags: ['GPU算力', '免费算力', 'AI训练', '科研支持', '合作优惠'],
      //   github: 'https://gpufree.org/'
      // },
      {
        name: 'CubeMars',
        role: 'Motor Partner - 无限量电机',
        bio: '专业电机解决方案供应商，为机器人项目提供高性能电机支持。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/sponsor/CubeMars.png',
        tags: ['电机', '无刷电机', '机器人动力', '高性能电机', '赞助商']
      },
      {
        name: '钀濆崪灏忛叡',
        role: 'Tool Sponsor - 精密螺丝刀',
        bio: '专业工具品牌，为团队提供精密螺丝刀等工具支持。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/sponsor/钀濆崪灏忛叡.png',
        tags: ['工具', '精密螺丝刀', '精密工具', '硬件维护', '赞助商']
      },
      // {
      //   name: '鑴夊鏅鸿兘',
      //   role: 'RMD电机1W采购额度',
      //   bio: '专业RMD电机及驱动解决方案供应商，提供1万元电机采购额度支持。',
      //   image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/sponsor/鑴夊鏅鸿兘绉戞妧.png',
      //   tags: ['RMD电机', '驱动器', '电机控制', '采购额度', '赞助商']
      // },
      // {
      //   name: '华为云',
      //   role: 'Hardware Sponsor - 鸿蒙开发板',
      //   bio: '华为云提供鸿蒙开发板支持，助力嵌入式开发与边缘计算项目。',
      //   image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/sponsor/鍗庝负浜.png',
      //   tags: ['华为云', '鸿蒙', '开发板', '嵌入式', '边缘计算', '赞助商']
      // },
      {
        name: '华威濉戜笟',
        role: 'Hardware Sponsor - 精密加工支持',
        bio: '提供精密加工支持，助力机器人结构件制作。',
        image: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/public/image/sponsor/鍗庤壓濉戜笟.png',
        tags: ['精密加工', '结构件', '加工支持', '赞助商'],
        github: 'https://m.tb.cn/h.7C6uKBnRQ1NxAMB'
      }
    ]
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
    description: '您查找的页面不存在。',
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
    description: '参加我们即将举办的可持续技术活动和研讨会',
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
    description: '获取可持续技术开发的优质资源',
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
    totalResources: '共{count} 个资源'
  },
  contact: {
    title: '联系我们',
    description: '如有问题、合作或咨询，请与我们的团队联系',
    getInTouch: '联系我们',
    contactInfo: '联系信息',
    followUs: '关注我们',
    channelsDescription: '您也可以通过以下方式与我们取得联系：',
    followUsDescription: '在社交媒体关注我们，获取最新动态与新闻。',
    form: {
      name: '姓名',
      email: '邮箱',
      subject: '主题',
      message: '消息',
      namePlaceholder: '您的姓名',
      emailPlaceholder: 'your.email@example.com',
      subjectPlaceholder: '我们如何帮助您？',
      messagePlaceholder: '请详细说明您的问题...',
      sendMessage: '发送消息',
      sending: '发送中...',
      messageSent: '消息发送成功！',
      messageError: '消息发送失败。请重试。',
      introText: '请填写下方表单，我们将尽快与您联系。',
      toastSuccessDescription: '我们将尽快与您取得联系。',
      toastErrorDescription: '请检查您的网络连接并重试。'
    },
    info: {
      address: '江苏省常州市新北区辽河路666号玉衡楼A416',
      phone: '+86 158 9600 0818',
      email: '22230635@czu.cn',
      hours: '周一至周六：上午9点- 下午6点'
    },
    infoLabels: {
      address: '地址',
      phone: '电话',
      email: '邮箱',
      hours: '工作时间'
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
    welcome: '欢迎回来！',
    memberSince: '会员自',
    logout: '退出',
    myProjects: {
      title: '我的项目',
      description: '管理和跟踪您对我们开源项目的贡献',
      noProjects: '无项目',
      viewGithub: '查看Gitee'
    },
    upcomingEvents: {
      title: '即将开始的活动',
      description: '及时了解即将开始的工作坊和活动',
      noEvents: '无即将开始的活动',
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
    clubName: 'NEC新能源开发者俱乐部',
    description: '通过合作开发构建可持续技术',
    navigation: '导航',
    resources: '资源',
    contact: '联系',
    learningMaterials: '学习材料',
    joinClub: '加入NEC仓库实验室',
    gettingStarted: '入门文档',
    techRoadmap: {
      title: '技术路线',
      description: '专业的技术发展指导'
    },
    address: '江苏省常州市新北区辽河路666号',
    copyright: '漏 2025 NEC新能源开发者俱乐部。保留所有权利。'
  },
  displayRatio: {
    title: '显示比例调整器',
    description: '调整屏幕显示比例，查看不同比例下的视觉效果',
    aspectRatioLabel: '显示比例',
    viewDetails: '查看详情',
    noMatchingContent: '没有找到匹配的内容',
    aspectRatios: {
      square: '正方形 (1:1)',
      video: '视频比例 (16:9)',
      traditional: '传统比例 (4:3)',
      portrait: '竖屏比例 (3:4)',
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
      title: '选择您的技术方向',
      description: '根据您的兴趣和职业规划，选择最适合的学习路径',
      coreSkills: '核心技能',
      projectsSuffix: '个项目',
      startLearning: '开始学习',
      embedded: {
        title: '嵌入式开发',
        description: '学习嵌入式系统开发，掌握硬件与软件结合的核心技术',
        skills: ['C/C++', 'FreeRTOS', '硬件测试', '通信协议'],
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
      description: '跟随我们的指南，快速开始您的编程之旅',
      stepsLabel: '步骤：',
      items: {
        setup: {
          title: '环境搭建',
          description: '快速搭建开发环境，开始您的编程之时',
          steps: [
            '选择合适的开发工具',
            '安装必要的依赖包',
            '配置开发环境',
            '运行第一个程序'
          ],
          estimatedTime: '30分钟'
        },
        firstGoodIssue: {
          title: '第一个好的问题',
          description: '寻找并解决您的第一个Good Issue，开始为开源项目做贡献',
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
          description: '通过实际项目快速上手，掌握完整开发流程',
          steps: [
            '选择开源项目',
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
            '注册社区账号',
            '加入相关讨论组',
            '参与线上活动',
            '分享您的知识',
            '与其他开发者交流'
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
  learning: learningTranslations.zh
};
