export interface Translations {
  // Navigation
  nav: {
    home: string;
    about: string;
    projects: string;
    events: string;
    resources: string;
    contact: string;
    login: string;
    logout: string;
    joinClub: string;
    dashboard: string;
  };
  
  // Hero Section
  hero: {
    tagline: string;
    title: string;
    titleHighlight: string;
    description: string;
    joinCommunity: string;
    viewGithub: string;
    codingWorkshops: string;
    codingWorkshopsDesc: string;
    innovationProjects: string;
    innovationProjectsDesc: string;
    industryConnections: string;
    industryConnectionsDesc: string;
  };
  
  // About Section
  about: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    learnMore: string;
  };
  
  // Features Section
  features: {
    title: string;
    subtitle: string;
    weeklyWorkshops: string;
    weeklyWorkshopsDesc: string;
    openSource: string;
    openSourceDesc: string;
    hackathons: string;
    hackathonsDesc: string;
    guestSpeakers: string;
    guestSpeakersDesc: string;
    networking: string;
    networkingDesc: string;
    conferences: string;
    conferencesDesc: string;
  };
  
  // Team Section
  team: {
    title: string;
    description: string;
    member1Name: string;
    member1Role: string;
    member1Bio: string;
    member2Name: string;
    member2Role: string;
    member2Bio: string;
    member3Name: string;
    member3Role: string;
    member3Bio: string;
    member4Name: string;
    member4Role: string;
    member4Bio: string;
  };
  
  // CTA Section
  cta: {
    title: string;
    description: string;
    getStarted: string;
  };
  
  // Join Page
  join: {
    title: string;
    subtitle: string;
    benefits: string;
    benefitsList: string[];
    requirements: string;
    requirementsList: string[];
    howToJoin: string;
    steps: string[];
    joinNow: string;
  };
  
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    edit: string;
    delete: string;
    back: string;
    next: string;
    previous: string;
  };
  
  // 404 Page
  notFound: {
    title: string;
    description: string;
    returnHome: string;
  };
  
  // Projects Page
  projects: {
    title: string;
    description: string;
    filterAll: string;
    filterWeb: string;
    filterMobile: string;
    filterAI: string;
    filterIoT: string;
    filterOther: string;
    viewProject: string;
    viewCode: string;
    technologies: string;
    author: string;
    date: string;
  };
  
  // Events Page
  events: {
    title: string;
    description: string;
    upcoming: string;
    past: string;
    noUpcoming: string;
    noPast: string;
    registerNow: string;
    learnMore: string;
    viewDetails: string;
    eventDate: string;
    location: string;
    participants: string;
    category: string;
    filterAll: string;
    filterWorkshop: string;
    filterHackathon: string;
    filterSeminar: string;
    filterCompetition: string;
    filterNetworking: string;
  };
  resources: {
    title: string;
    description: string;
    searchPlaceholder: string;
    filterAll: string;
    filterTutorials: string;
    filterTools: string;
    filterBooks: string;
    filterCourses: string;
    filterDocumentation: string;
    noResults: string;
    viewResource: string;
    downloadResource: string;
    freeResource: string;
    paidResource: string;
    difficulty: string;
    beginner: string;
    intermediate: string;
    advanced: string;
    category: string;
    author: string;
    rating: string;
  };
  contact: {
    title: string;
    description: string;
    getInTouch: string;
    contactInfo: string;
    followUs: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      subjectPlaceholder: string;
      messagePlaceholder: string;
      sendMessage: string;
      sending: string;
      messageSent: string;
      messageError: string;
    };
    info: {
      address: string;
      phone: string;
      email: string;
      hours: string;
    };
  };
  dashboard: {
    title: string;
    welcome: string;
    memberSince: string;
    logout: string;
    myProjects: {
      title: string;
      description: string;
      noProjects: string;
      viewGithub: string;
    };
    upcomingEvents: {
      title: string;
      description: string;
      noEvents: string;
      viewAll: string;
    };
    myActivity: {
      title: string;
      description: string;
      contributions: string;
      eventsAttended: string;
      projectsCompleted: string;
    };
    quickActions: {
      title: string;
      submitProject: string;
      registerEvent: string;
      viewResources: string;
      contactUs: string;
    };
  };
}

export const translations: Record<'en' | 'zh', Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      events: 'Events',
      resources: 'Resources',
      contact: 'Contact',
      login: 'Log in',
      logout: 'Log out',
      joinClub: 'Join Club',
      dashboard: 'Dashboard',
    },
    hero: {
      tagline: 'Where Code Meets Clean Energy',
      title: 'Coding for a',
      titleHighlight: 'Sustainable',
      description: 'Join a community of developers passionate about creating innovative software solutions for renewable energy, sustainability, and a greener tomorrow.',
      joinCommunity: 'Join Our Community',
      viewGithub: 'View on GitHub',
      codingWorkshops: 'Coding Workshops',
      codingWorkshopsDesc: 'Weekly sessions to learn sustainable tech development',
      innovationProjects: 'Innovation Projects',
      innovationProjectsDesc: 'Collaborate on open-source green energy solutions',
      industryConnections: 'Industry Connections',
      industryConnectionsDesc: 'Network with leading energy sector professionals',
    },
    about: {
      title: 'About Our Club',
      paragraph1: 'The New Energy Coder Club was founded in 2023 by a group of passionate developers and engineers who wanted to combine their love for coding with their commitment to sustainability and renewable energy.',
      paragraph2: 'Our mission is to build a community that develops open-source software solutions for renewable energy applications, smart grid technologies, energy efficiency, and sustainability.',
      paragraph3: 'Through workshops, hackathons, collaborative projects, and partnerships with energy companies, we aim to create a platform where technology meets sustainability for a better future.',
      learnMore: 'Learn More About Us',
    },
    features: {
      title: 'Why Join Our Community?',
      subtitle: 'Discover the benefits of being part of our sustainable coding community',
      weeklyWorkshops: 'Weekly Coding Workshops',
      weeklyWorkshopsDesc: 'Hands-on sessions covering sustainable tech development and green coding practices',
      openSource: 'Open Source Projects',
      openSourceDesc: 'Collaborate on real-world projects that make a positive environmental impact',
      hackathons: 'Green Tech Hackathons',
      hackathonsDesc: 'Participate in exciting competitions focused on solving environmental challenges',
      guestSpeakers: 'Industry Guest Speakers',
      guestSpeakersDesc: 'Learn from experts in renewable energy and sustainable technology sectors',
      networking: 'Professional Networking',
      networkingDesc: 'Connect with like-minded developers and industry professionals',
      conferences: 'Tech Conferences',
      conferencesDesc: 'Attend exclusive events and conferences on sustainable technology trends',
    },
    team: {
      title: 'Meet Our Team',
      description: 'The passionate individuals driving our mission forward',
      member1Name: 'Dr. Chen Wei',
      member1Role: 'Club Founder & AI Specialist',
      member1Bio: 'Renewable energy researcher with a focus on AI applications for energy optimization.',
      member2Name: 'Li Ming',
      member2Role: 'Technical Lead & Full-stack Developer',
      member2Bio: 'Passionate about creating software solutions for smart grid technologies and energy efficiency.',
      member3Name: 'Sarah Johnson',
      member3Role: 'Education Coordinator',
      member3Bio: 'Former teacher bringing technical education to sustainability enthusiasts and new coders.',
      member4Name: 'Alex Zhang',
      member4Role: 'Project Manager',
      member4Bio: 'Experience in managing renewable energy projects and coordinating developer teams.',
    },
    cta: {
      title: 'Ready to Make a Difference?',
      description: 'Join our community today and start building the sustainable future with code.',
      getStarted: 'Get Started Now',
    },
    join: {
      title: 'Join the New Energy Coder Club',
      subtitle: 'Become part of a community that\'s coding for a sustainable future',
      benefits: 'Member Benefits',
      benefitsList: [
        'Access to exclusive workshops and training sessions',
        'Collaboration opportunities on real-world projects',
        'Networking with industry professionals',
        'Career development and mentorship programs',
        'Priority access to events and conferences',
      ],
      requirements: 'Requirements',
      requirementsList: [
        'Basic programming knowledge in any language',
        'Passion for sustainability and clean energy',
        'Commitment to collaborative learning',
        'Willingness to contribute to open-source projects',
      ],
      howToJoin: 'How to Join',
      steps: [
        'Fill out the membership application form',
        'Attend an orientation session',
        'Complete a small coding challenge',
        'Get matched with a mentor',
        'Start contributing to projects!',
      ],
      joinNow: 'Join Now',
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
    },
    notFound: {
      title: '404',
      description: 'Page not found',
      returnHome: 'Return Home',
    },
    projects: {
      title: 'Member Projects',
      description: 'Explore innovative projects created by our talented club members',
      filterAll: 'All Projects',
      filterWeb: 'Web Development',
      filterMobile: 'Mobile Apps',
      filterAI: 'AI/ML',
      filterIoT: 'IoT',
      filterOther: 'Other',
      viewProject: 'View Project',
      viewCode: 'View Code',
      technologies: 'Technologies',
      author: 'Author',
      date: 'Date'
    },
    events: {
      title: 'Events & Activities',
      description: 'Join our exciting events, workshops, and competitions designed to enhance your coding skills and connect with fellow developers.',
      upcoming: 'Upcoming Events',
      past: 'Past Events',
      noUpcoming: 'No upcoming events at the moment.',
      noPast: 'No past events to display.',
      registerNow: 'Register Now',
      learnMore: 'Learn More',
      viewDetails: 'View Details',
      eventDate: 'Event Date',
      location: 'Location',
      participants: 'Participants',
      category: 'Category',
      filterAll: 'All Events',
      filterWorkshop: 'Workshops',
      filterHackathon: 'Hackathons',
      filterSeminar: 'Seminars',
      filterCompetition: 'Competitions',
      filterNetworking: 'Networking'
   },
   resources: {
     title: 'Learning Resources',
     description: 'Discover curated learning materials, tools, and resources to enhance your coding skills and stay updated with the latest technologies.',
     searchPlaceholder: 'Search resources...',
     filterAll: 'All Resources',
     filterTutorials: 'Tutorials',
     filterTools: 'Tools',
     filterBooks: 'Books',
     filterCourses: 'Courses',
     filterDocumentation: 'Documentation',
     noResults: 'No resources found matching your criteria.',
     viewResource: 'View Resource',
     downloadResource: 'Download',
     freeResource: 'Free',
     paidResource: 'Paid',
     difficulty: 'Difficulty',
     beginner: 'Beginner',
     intermediate: 'Intermediate',
     advanced: 'Advanced',
     category: 'Category',
     author: 'Author',
     rating: 'Rating'
    },
    contact: {
      title: 'Contact Us',
      description: 'Get in touch with us for any questions, suggestions, or collaboration opportunities. We\'d love to hear from you!',
      getInTouch: 'Get in Touch',
      contactInfo: 'Contact Information',
      followUs: 'Follow Us',
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        namePlaceholder: 'Your full name',
        emailPlaceholder: 'your.email@example.com',
        subjectPlaceholder: 'What is this about?',
        messagePlaceholder: 'Tell us more about your inquiry...',
        sendMessage: 'Send Message',
        sending: 'Sending...',
        messageSent: 'Message sent successfully!',
        messageError: 'Failed to send message. Please try again.'
      },
      info: {
        address: 'University Campus, Building A, Room 201',
        phone: '+1 (555) 123-4567',
        email: 'contact@energycoderclub.edu',
        hours: 'Mon-Fri: 9:00 AM - 6:00 PM'
      }
    },
    dashboard: {
      title: 'Dashboard',
      welcome: 'Welcome back',
      memberSince: 'Member since',
      logout: 'Logout',
      myProjects: {
        title: 'My Projects',
        description: 'Your recent coding projects and contributions',
        noProjects: 'No projects yet. Start by creating your first project!',
        viewGithub: 'View on GitHub'
      },
      upcomingEvents: {
        title: 'Upcoming Events',
        description: 'Events you\'re registered for',
        noEvents: 'No upcoming events. Check out our events page!',
        viewAll: 'View All Events'
      },
      myActivity: {
        title: 'My Activity',
        description: 'Your club participation summary',
        contributions: 'Contributions',
        eventsAttended: 'Events Attended',
        projectsCompleted: 'Projects Completed'
      },
      quickActions: {
        title: 'Quick Actions',
        submitProject: 'Submit Project',
        registerEvent: 'Register for Event',
        viewResources: 'Browse Resources',
        contactUs: 'Contact Support'
      }
    },
  },
  zh: {
    nav: {
      home: '首页',
      about: '关于我们',
      projects: '项目',
      events: '活动',
      resources: '资源',
      contact: '联系我们',
      login: '登录',
      logout: '退出登录',
      joinClub: '加入俱乐部',
      dashboard: '仪表板',
    },
    hero: {
      tagline: '代码与清洁能源的完美结合',
      title: '为',
      titleHighlight: '可持续',
      description: '加入一个充满激情的开发者社区，致力于为可再生能源、可持续发展和更绿色的未来创造创新的软件解决方案。',
      joinCommunity: '加入我们的社区',
      viewGithub: '查看 GitHub',
      codingWorkshops: '编程工作坊',
      codingWorkshopsDesc: '每周学习可持续技术开发的课程',
      innovationProjects: '创新项目',
      innovationProjectsDesc: '协作开发开源绿色能源解决方案',
      industryConnections: '行业联系',
      industryConnectionsDesc: '与领先的能源行业专业人士建立联系',
    },
    about: {
      title: '关于我们的俱乐部',
      paragraph1: '新能源编程俱乐部成立于2023年，由一群充满激情的开发者和工程师创立，他们希望将对编程的热爱与对可持续发展和可再生能源的承诺相结合。',
      paragraph2: '我们的使命是建立一个社区，开发用于可再生能源应用、智能电网技术、能源效率和可持续发展的开源软件解决方案。',
      paragraph3: '通过工作坊、黑客马拉松、协作项目以及与能源公司的合作伙伴关系，我们旨在创建一个技术与可持续发展相结合的平台，为更美好的未来而努力。',
      learnMore: '了解更多关于我们',
    },
    features: {
      title: '为什么加入我们的社区？',
      subtitle: '发现成为我们可持续编程社区一员的好处',
      weeklyWorkshops: '每周编程工作坊',
      weeklyWorkshopsDesc: '涵盖可持续技术开发和绿色编程实践的实践课程',
      openSource: '开源项目',
      openSourceDesc: '协作开发对环境产生积极影响的真实世界项目',
      hackathons: '绿色科技黑客马拉松',
      hackathonsDesc: '参与专注于解决环境挑战的激动人心的竞赛',
      guestSpeakers: '行业嘉宾演讲',
      guestSpeakersDesc: '向可再生能源和可持续技术领域的专家学习',
      networking: '专业网络',
      networkingDesc: '与志同道合的开发者和行业专业人士建立联系',
      conferences: '技术会议',
      conferencesDesc: '参加关于可持续技术趋势的独家活动和会议',
    },
    team: {
      title: '认识我们的团队',
      description: '推动我们使命前进的充满激情的个人',
      member1Name: 'DarrenPig',
      member1Role: '俱乐部创始人 & BSP专家',
      member1Bio: '专注于AI在能源优化应用的可再生能源研究员。',
      member2Name: '张旺旺',
      member2Role: '技术负责人 & 全栈开发者',
      member2Bio: '热衷于为智能电网技术和能源效率创建软件解决方案。',
      member3Name: '和尚',
      member3Role: '技术顾问',
      member3Bio: '前开发工程师，为可持续发展爱好者和新程序员带来技术教育。',
      member4Name: '张若璐',
      member4Role: '财务总监',
      member4Bio: '在管理可再生能源项目和协调开发团队方面经验丰富。',
    },
    cta: {
      title: '准备好做出改变了吗？',
      description: '今天就加入我们的社区，开始用代码构建可持续的未来。',
      getStarted: '立即开始',
    },
    join: {
      title: '加入新能源编程俱乐部',
      subtitle: '成为为可持续未来编程的社区的一员',
      benefits: '会员福利',
      benefitsList: [
        '参加独家工作坊和培训课程',
        '参与真实世界项目的协作机会',
        '与行业专业人士建立网络',
        '职业发展和导师计划',
        '优先参加活动和会议',
      ],
      requirements: '要求',
      requirementsList: [
        '任何编程语言的基础知识',
        '对可持续发展和清洁能源的热情',
        '致力于协作学习',
        '愿意为开源项目做出贡献',
      ],
      howToJoin: '如何加入',
      steps: [
        '填写会员申请表',
        '参加迎新会议',
        '完成一个小的编程挑战',
        '匹配导师',
        '开始为项目做贡献！',
      ],
      joinNow: '立即加入',
    },
    common: {
      loading: '加载中...',
      error: '错误',
      success: '成功',
      cancel: '取消',
      confirm: '确认',
      save: '保存',
      edit: '编辑',
      delete: '删除',
      back: '返回',
      next: '下一步',
      previous: '上一步',
    },
    notFound: {
      title: '404',
      description: '页面未找到',
      returnHome: '返回首页',
    },
    projects: {
      title: '会员项目',
      description: '探索我们才华横溢的俱乐部成员创建的创新项目',
      filterAll: '所有项目',
      filterWeb: 'Web开发',
      filterMobile: '移动应用',
      filterAI: 'AI/ML',
      filterIoT: '物联网',
      filterOther: '其他',
      viewProject: '查看项目',
      viewCode: '查看代码',
      technologies: '技术栈',
      author: '作者',
      date: '日期'
    },
    events: {
      title: '活动与赛事',
      description: '参加我们精彩的活动、工作坊和竞赛，提升您的编程技能并与其他开发者建立联系。',
      upcoming: '即将举行的活动',
      past: '往期活动',
      noUpcoming: '目前没有即将举行的活动。',
      noPast: '没有往期活动可显示。',
      registerNow: '立即报名',
      learnMore: '了解更多',
      viewDetails: '查看详情',
      eventDate: '活动日期',
      location: '地点',
      participants: '参与者',
      category: '类别',
      filterAll: '所有活动',
      filterWorkshop: '工作坊',
      filterHackathon: '黑客马拉松',
      filterSeminar: '研讨会',
      filterCompetition: '竞赛',
      filterNetworking: '交流活动'
   },
   resources: {
     title: '学习资源',
     description: '发现精选的学习材料、工具和资源，提升您的编程技能并了解最新技术动态。',
     searchPlaceholder: '搜索资源...',
     filterAll: '所有资源',
     filterTutorials: '教程',
     filterTools: '工具',
     filterBooks: '书籍',
     filterCourses: '课程',
     filterDocumentation: '文档',
     noResults: '未找到符合条件的资源。',
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
     rating: '评分'
    },
    contact: {
      title: '联系我们',
      description: '如有任何问题、建议或合作机会，请与我们联系。我们很乐意听到您的声音！',
      getInTouch: '联系我们',
      contactInfo: '联系信息',
      followUs: '关注我们',
      form: {
        name: '姓名',
        email: '邮箱',
        subject: '主题',
        message: '消息',
        namePlaceholder: '您的全名',
        emailPlaceholder: 'your.email@example.com',
        subjectPlaceholder: '这是关于什么的？',
        messagePlaceholder: '告诉我们更多关于您的询问...',
        sendMessage: '发送消息',
        sending: '发送中...',
        messageSent: '消息发送成功！',
        messageError: '发送消息失败，请重试。'
      },
      info: {
        address: '江苏省常州市新北区辽河路666号常州工学院，玉衡楼A栋 ，416仓库实验室',
        phone: '+86 15896000818',
        email: 'contact@energycoderclub.edu',
        hours: '周一至周五：上午9:00 - 下午6:00'
      }
    },
    dashboard: {
      title: '仪表板',
      welcome: '欢迎回来',
      memberSince: '会员自',
      logout: '退出登录',
      myProjects: {
        title: '我的项目',
        description: '您最近的编程项目和贡献',
        noProjects: '还没有项目。开始创建您的第一个项目吧！',
        viewGithub: '在GitHub上查看'
      },
      upcomingEvents: {
        title: '即将举行的活动',
        description: '您已报名的活动',
        noEvents: '没有即将举行的活动。查看我们的活动页面！',
        viewAll: '查看所有活动'
      },
      myActivity: {
        title: '我的活动',
        description: '您的俱乐部参与总结',
        contributions: '贡献',
        eventsAttended: '参加的活动',
        projectsCompleted: '完成的项目'
      },
      quickActions: {
        title: '快速操作',
        submitProject: '提交项目',
        registerEvent: '报名活动',
        viewResources: '浏览资源',
        contactUs: '联系支持'
      }
    },
  },
};

export type Language = 'en' | 'zh';

export const defaultLanguage: Language = 'en';