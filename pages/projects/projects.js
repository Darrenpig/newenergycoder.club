// projects.js
const app = getApp()

Page({
  data: {
    // 当前选中的分类
    currentCategory: 'all',
    // 是否显示项目详情
    showProjectDetail: false,
    // 当前查看的项目
    currentProject: null,
    // 是否还有更多数据
    hasMore: true,
    // 所有项目数据
    allProjects: [
      {
        id: 1,
        title: '新能源数据可视化平台',
        description: '基于React和D3.js的能源数据实时监控与分析系统',
        fullDescription: '这是一个综合性的能源数据可视化平台，能够实时监控和分析各种能源数据。系统采用现代化的Web技术栈，提供直观的数据展示和深入的分析功能，帮助用户更好地理解能源使用情况。',
        cover: '../../assets/projects/energy-dashboard.png',
        status: 'active',
        statusText: '进行中',
        technologies: ['React', 'TypeScript', 'D3.js', 'Node.js', 'MongoDB'],
        date: '2024-03-15',
        teamSize: 5,
        progress: 75,
        demoUrl: 'https://demo.energy-coder-club.org',
        codeUrl: 'https://github.com/energy-coder-club/energy-dashboard',
        docsUrl: 'https://docs.energy-coder-club.org',
        category: 'web',
        teamMembers: [
          { id: 1, name: 'DarrenPig', role: '项目负责人', avatar: '../../assets/avatars/darrenpig.png' },
          { id: 2, name: '许珑译', role: '后端开发', avatar: '../../assets/avatars/xulongyi.png' }
        ],
        achievements: [
          '完成核心数据可视化模块',
          '实现实时数据更新功能',
          '优化移动端适配体验'
        ]
      },
      {
        id: 2,
        title: '智能电网监控系统',
        description: '基于物联网技术的电网状态实时监控与预警系统',
        fullDescription: '智能电网监控系统利用先进的物联网技术，实时监控电网运行状态，提供预警和故障诊断功能。系统能够有效提高电网运行的可靠性和安全性。',
        cover: '../../assets/projects/smart-grid.png',
        status: 'completed',
        statusText: '已完成',
        technologies: ['IoT', 'Python', 'Django', 'PostgreSQL', 'Docker'],
        date: '2024-01-10',
        teamSize: 8,
        progress: 100,
        demoUrl: 'https://grid.energy-coder-club.org',
        codeUrl: 'https://github.com/energy-coder-club/smart-grid',
        docsUrl: 'https://grid-docs.energy-coder-club.org',
        category: 'iot',
        teamMembers: [
          { id: 3, name: '殷统创', role: '前端开发', avatar: '../../assets/avatars/yintongchuang.png' },
          { id: 4, name: '张旺旺', role: '全栈开发', avatar: '../../assets/avatars/zhangwangwang.png' }
        ],
        achievements: [
          '成功部署生产环境',
          '处理超过100万条实时数据',
          '获得行业合作伙伴认可'
        ]
      },
      {
        id: 3,
        title: '能源移动助手',
        description: '跨平台能源管理移动应用，支持iOS和Android',
        fullDescription: '能源移动助手是一款功能全面的跨平台移动应用，帮助用户管理家庭或企业的能源使用，提供节能建议和实时监控功能。',
        cover: '../../assets/projects/energy-app.png',
        status: 'active',
        statusText: '进行中',
        technologies: ['Flutter', 'Dart', 'Firebase', 'REST API'],
        date: '2024-02-20',
        teamSize: 4,
        progress: 60,
        demoUrl: 'https://app.energy-coder-club.org',
        codeUrl: 'https://github.com/energy-coder-club/energy-app',
        docsUrl: 'https://app-docs.energy-coder-club.org',
        category: 'mobile',
        teamMembers: [
          { id: 5, name: '郑绍恺', role: '移动开发', avatar: '../../assets/avatars/zhengshaokai.png' }
        ],
        achievements: [
          '完成核心UI组件开发',
          '实现用户认证系统',
          '优化应用性能'
        ]
      },
      {
        id: 4,
        title: 'AI能源预测模型',
        description: '基于机器学习的能源需求预测和优化系统',
        fullDescription: '利用先进的机器学习算法，对能源需求进行精准预测，为能源分配和调度提供数据支持，提高能源利用效率。',
        cover: '../../assets/projects/ai-energy.png',
        status: 'planning',
        statusText: '规划中',
        technologies: ['Python', 'TensorFlow', 'scikit-learn', 'Pandas'],
        date: '2024-05-01',
        teamSize: 3,
        progress: 20,
        demoUrl: 'https://ai.energy-coder-club.org',
        codeUrl: 'https://github.com/energy-coder-club/ai-energy',
        docsUrl: 'https://ai-docs.energy-coder-club.org',
        category: 'ai',
        teamMembers: [
          { id: 6, name: '卞乐凌', role: '数据分析', avatar: '../../assets/avatars/bianleling.png' }
        ],
        achievements: [
          '完成数据收集和清洗',
          '建立初步预测模型',
          '开始模型优化工作'
        ]
      },
      {
        id: 5,
        title: '区块链能源交易平台',
        description: '基于区块链技术的去中心化能源交易系统',
        fullDescription: '创新的区块链能源交易平台，实现点对点的能源交易，提高交易透明度和效率，促进可再生能源的发展。',
        cover: '../../assets/projects/blockchain-energy.png',
        status: 'active',
        statusText: '进行中',
        technologies: ['Ethereum', 'Solidity', 'Web3.js', 'Node.js'],
        date: '2024-04-10',
        teamSize: 6,
        progress: 45,
        demoUrl: 'https://blockchain.energy-coder-club.org',
        codeUrl: 'https://github.com/energy-coder-club/blockchain-energy',
        docsUrl: 'https://blockchain-docs.energy-coder-club.org',
        category: 'blockchain',
        teamMembers: [
          { id: 1, name: 'DarrenPig', role: '区块链开发', avatar: '../../assets/avatars/darrenpig.png' }
        ],
        achievements: [
          '完成智能合约开发',
          '实现基础交易功能',
          '开始安全性测试'
        ]
      }
    ],
    // 过滤后的项目列表
    filteredProjects: []
  },

  onLoad() {
    console.log('项目页面加载')
    this.initData()
  },

  onShow() {
    console.log('项目页面显示')
  },

  onPullDownRefresh() {
    console.log('下拉刷新')
    setTimeout(() => {
      wx.stopPullDownRefresh()
      this.initData()
    }, 1000)
  },

  onReachBottom() {
    console.log('滚动到底部')
    this.loadMore()
  },

  onShareAppMessage() {
    return app.onShareAppMessage()
  },

  onShareTimeline() {
    return app.onShareTimeline()
  },

  // 初始化数据
  initData() {
    this.setData({
      filteredProjects: this.data.allProjects
    })
  },

  // 返回上一页
  navigateBack() {
    wx.navigateBack()
  },

  // 显示搜索
  showSearch() {
    wx.showToast({
      title: '搜索功能开发中',
      icon: 'none'
    })
  },

  // 显示筛选
  showFilter() {
    wx.showActionSheet({
      itemList: ['按进度排序', '按时间排序', '按团队规模排序'],
      success: (res) => {
        this.sortProjects(res.tapIndex)
      }
    })
  },

  // 切换分类
  switchCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({ currentCategory: category })
    
    if (category === 'all') {
      this.setData({ filteredProjects: this.data.allProjects })
    } else {
      const filtered = this.data.allProjects.filter(project => project.category === category)
      this.setData({ filteredProjects: filtered })
    }
  },

  // 排序项目
  sortProjects(type) {
    let sortedProjects = [...this.data.filteredProjects]
    
    switch (type) {
      case 0: // 按进度排序
        sortedProjects.sort((a, b) => b.progress - a.progress)
        break
      case 1: // 按时间排序
        sortedProjects.sort((a, b) => new Date(b.date) - new Date(a.date))
        break
      case 2: // 按团队规模排序
        sortedProjects.sort((a, b) => b.teamSize - a.teamSize)
        break
    }
    
    this.setData({ filteredProjects: sortedProjects })
  },

  // 查看项目详情
  viewProjectDetail(e) {
    const project = e.currentTarget.dataset.project
    this.setData({
      currentProject: project,
      showProjectDetail: true
    })
  },

  // 隐藏项目详情
  hideProjectDetail() {
    this.setData({
      showProjectDetail: false,
      currentProject: null
    })
  },

  // 查看演示
  viewDemo(e) {
    const url = e.currentTarget.dataset.url
    this.openLink(url)
  },

  // 查看代码
  viewCode(e) {
    const url = e.currentTarget.dataset.url
    this.openLink(url)
  },

  // 打开链接
  openLink(url) {
    wx.showModal({
      title: '打开链接',
      content: '将在浏览器中打开链接',
      success: (res) => {
        if (res.confirm) {
          wx.setClipboardData({
            data: url,
            success: () => {
              wx.showToast({
                title: '链接已复制',
                icon: 'success'
              })
            }
          })
        }
      }
    })
  },

  // 加载更多
  loadMore() {
    if (!this.data.hasMore) return
    
    wx.showLoading({ title: '加载中...' })
    
    setTimeout(() => {
      // 模拟加载更多数据
      const newProjects = [...this.data.filteredProjects, ...this.getMoreProjects()]
      this.setData({
        filteredProjects: newProjects,
        hasMore: newProjects.length < 10 // 假设最多10个项目
      })
      
      wx.hideLoading()
    }, 1500)
  },

  // 获取更多项目数据（模拟）
  getMoreProjects() {
    return [
      {
        id: 6,
        title: '太阳能监控系统',
        description: '实时监控太阳能发电系统的性能和效率',
        cover: '../../assets/projects/solar-monitor.png',
        status: 'active',
        statusText: '进行中',
        technologies: ['React', 'Python', 'MySQL'],
        date: '2024-05-15',
        teamSize: 3,
        progress: 30,
        category: 'iot'
      },
      {
        id: 7,
        title: '能源数据分析平台',
        description: '大数据分析平台，处理海量能源数据',
        cover: '../../assets/projects/data-analysis.png',
        status: 'planning',
        statusText: '规划中',
        technologies: ['Spark', 'Hadoop', 'Java'],
        date: '2024-06-01',
        teamSize: 4,
        progress: 10,
        category: 'ai'
      }
    ]
  },

  // 底部导航切换
  switchToHome() {
    wx.switchTab({ url: '../index/index' })
  },

  switchToTeam() {
    wx.switchTab({ url: '../team/team' })
  },

  switchToProjects() {
    // 当前页面，无需切换
  },

  switchToJoin() {
    wx.switchTab({ url: '../join/join' })
  }
})