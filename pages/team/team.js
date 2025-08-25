// team.js
const app = getApp()

Page({
  data: {
    // 当前选中的分类
    currentCategory: 'all',
    // 是否显示成员详情
    showMemberDetail: false,
    // 当前查看的成员
    currentMember: null,
    // 是否还有更多数据
    hasMore: true,
    // 所有团队成员数据
    allMembers: [
      {
        id: 1,
        name: 'DarrenPig',
        position: '项目负责人 & 全栈开发',
        description: '负责项目整体架构和技术指导，专注于新能源技术创新',
        avatar: '../../assets/avatars/darrenpig.png',
        role: 'maintainer',
        roleText: '维护者',
        skills: ['React', 'Node.js', 'Python', 'AI', '区块链'],
        projects: 15,
        contributions: 200,
        bio: '资深全栈开发者，专注于新能源技术与软件开发的结合，拥有丰富的项目管理和技术架构经验。',
        projectsList: [
          { id: 1, name: '新能源数据平台', description: '基于AI的新能源数据分析与预测系统' },
          { id: 2, name: '智能电网监控', description: '实时电网状态监控与优化系统' }
        ],
        contact: {
          email: 'darren@energy-coder-club.org',
          github: 'DarrenPig'
        }
      },
      {
        id: 2,
        name: '许珑译',
        position: '后端开发工程师',
        description: '专注于分布式系统和数据库优化',
        avatar: '../../assets/avatars/xulongyi.png',
        role: 'developer',
        roleText: '开发者',
        skills: ['Java', 'Spring Boot', 'MySQL', 'Redis'],
        projects: 8,
        contributions: 120,
        bio: '后端开发专家，擅长构建高并发分布式系统，对数据库优化有深入研究。',
        projectsList: [
          { id: 3, name: '分布式能源交易系统', description: '基于区块链的能源交易平台' }
        ],
        contact: {
          email: 'xulongyi@energy-coder-club.org',
          github: 'xulongyi-dev'
        }
      },
      {
        id: 3,
        name: '殷统创',
        position: '前端开发工程师',
        description: '专注于现代Web技术和用户体验设计',
        avatar: '../../assets/avatars/yintongchuang.png',
        role: 'developer',
        roleText: '开发者',
        skills: ['Vue', 'React', 'TypeScript', 'UI/UX'],
        projects: 10,
        contributions: 150,
        bio: '前端技术专家，致力于打造优秀的用户界面和交互体验，对性能优化有独到见解。',
        projectsList: [
          { id: 4, name: '能源监控仪表盘', description: '实时能源数据可视化平台' }
        ],
        contact: {
          email: 'yintongchuang@energy-coder-club.org',
          github: 'yintongchuang'
        }
      },
      {
        id: 4,
        name: '张旺旺',
        position: '全栈开发工程师',
        description: '全栈技术专家，擅长快速原型开发',
        avatar: '../../assets/avatars/zhangwangwang.png',
        role: 'developer',
        roleText: '开发者',
        skills: ['JavaScript', 'Node.js', 'MongoDB', 'Docker'],
        projects: 12,
        contributions: 180,
        bio: '全栈开发工程师，具备快速学习和解决问题的能力，热爱开源技术。',
        projectsList: [
          { id: 5, name: '智能家居能源管理', description: '基于IoT的家居能源优化系统' }
        ],
        contact: {
          email: 'zhangwangwang@energy-coder-club.org',
          github: 'wangwang-dev'
        }
      },
      {
        id: 5,
        name: '李想',
        position: 'UI/UX设计师',
        description: '专注于用户体验和界面视觉设计',
        avatar: '../../assets/avatars/lixiang.png',
        role: 'designer',
        roleText: '设计师',
        skills: ['Figma', 'Sketch', 'Adobe XD', '用户体验'],
        projects: 6,
        contributions: 90,
        bio: '资深UI/UX设计师，擅长将复杂的技术概念转化为直观的用户界面。',
        projectsList: [
          { id: 6, name: '能源应用界面设计', description: '多平台能源应用的用户体验设计' }
        ],
        contact: {
          email: 'lixiang@energy-coder-club.org',
          github: 'lixiang-design'
        }
      },
      {
        id: 6,
        name: '徐海婷',
        position: '产品设计师',
        description: '专注于产品规划和用户体验研究',
        avatar: '../../assets/avatars/xuhaiting.png',
        role: 'designer',
        roleText: '设计师',
        skills: ['产品设计', '用户研究', '原型设计', '产品管理'],
        projects: 5,
        contributions: 80,
        bio: '产品设计师，擅长用户需求分析和产品规划，致力于打造有价值的产品解决方案。',
        projectsList: [
          { id: 7, name: '能源产品需求分析', description: '新能源产品的市场调研和需求分析' }
        ],
        contact: {
          email: 'xuhaiting@energy-coder-club.org',
          github: 'xuhaiting-pd'
        }
      },
      {
        id: 7,
        name: '卞乐凌',
        position: '数据分析师',
        description: '专注于能源数据分析和机器学习',
        avatar: '../../assets/avatars/bianleling.png',
        role: 'contributor',
        roleText: '贡献者',
        skills: ['Python', 'Pandas', '机器学习', '数据可视化'],
        projects: 7,
        contributions: 110,
        bio: '数据分析专家，擅长从海量数据中提取有价值的信息，为决策提供数据支持。',
        projectsList: [
          { id: 8, name: '能源消耗预测模型', description: '基于机器学习的能源需求预测' }
        ],
        contact: {
          email: 'bianleling@energy-coder-club.org',
          github: 'bianleling-data'
        }
      },
      {
        id: 8,
        name: '郑绍恺',
        position: '移动开发工程师',
        description: '专注于跨平台移动应用开发',
        avatar: '../../assets/avatars/zhengshaokai.png',
        role: 'developer',
        roleText: '开发者',
        skills: ['Flutter', 'React Native', 'iOS', 'Android'],
        projects: 9,
        contributions: 130,
        bio: '移动开发工程师，擅长构建高性能的跨平台移动应用，关注用户体验和性能优化。',
        projectsList: [
          { id: 9, name: '能源移动应用', description: '跨平台能源管理移动应用' }
        ],
        contact: {
          email: 'zhengshaokai@energy-coder-club.org',
          github: 'shaokai-mobile'
        }
      }
    ],
    // 过滤后的成员列表
    filteredMembers: []
  },

  onLoad() {
    console.log('团队页面加载')
    this.initData()
  },

  onShow() {
    console.log('团队页面显示')
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
      filteredMembers: this.data.allMembers
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
      itemList: ['按项目数排序', '按贡献数排序', '按姓名排序'],
      success: (res) => {
        this.sortMembers(res.tapIndex)
      }
    })
  },

  // 切换分类
  switchCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({ currentCategory: category })
    
    if (category === 'all') {
      this.setData({ filteredMembers: this.data.allMembers })
    } else {
      const filtered = this.data.allMembers.filter(member => member.role === category)
      this.setData({ filteredMembers: filtered })
    }
  },

  // 排序成员
  sortMembers(type) {
    let sortedMembers = [...this.data.filteredMembers]
    
    switch (type) {
      case 0: // 按项目数排序
        sortedMembers.sort((a, b) => b.projects - a.projects)
        break
      case 1: // 按贡献数排序
        sortedMembers.sort((a, b) => b.contributions - a.contributions)
        break
      case 2: // 按姓名排序
        sortedMembers.sort((a, b) => a.name.localeCompare(b.name))
        break
    }
    
    this.setData({ filteredMembers: sortedMembers })
  },

  // 查看成员详情
  viewMemberDetail(e) {
    const member = e.currentTarget.dataset.member
    this.setData({
      currentMember: member,
      showMemberDetail: true
    })
  },

  // 隐藏成员详情
  hideMemberDetail() {
    this.setData({
      showMemberDetail: false,
      currentMember: null
    })
  },

  // 加载更多
  loadMore() {
    if (!this.data.hasMore) return
    
    wx.showLoading({ title: '加载中...' })
    
    setTimeout(() => {
      // 模拟加载更多数据
      const newMembers = [...this.data.filteredMembers, ...this.getMoreMembers()]
      this.setData({
        filteredMembers: newMembers,
        hasMore: newMembers.length < 20 // 假设最多20个成员
      })
      
      wx.hideLoading()
    }, 1500)
  },

  // 获取更多成员数据（模拟）
  getMoreMembers() {
    return [
      {
        id: 9,
        name: '新成员1',
        position: '开发工程师',
        description: '新加入的团队成员',
        avatar: '../../assets/avatars/default.png',
        role: 'developer',
        roleText: '开发者',
        skills: ['Java', 'Python'],
        projects: 3,
        contributions: 40
      },
      {
        id: 10,
        name: '新成员2',
        position: '设计师',
        description: '新加入的设计团队成员',
        avatar: '../../assets/avatars/default.png',
        role: 'designer',
        roleText: '设计师',
        skills: ['UI设计', '用户体验'],
        projects: 2,
        contributions: 30
      }
    ]
  },

  // 复制联系方式
  copyContact(e) {
    const type = e.currentTarget.dataset.type
    const value = e.currentTarget.dataset.value
    
    wx.setClipboardData({
      data: value,
      success: () => {
        wx.showToast({
          title: `${type === 'email' ? '邮箱' : 'GitHub'}已复制`,
          icon: 'success'
        })
      }
    })
  },

  // 底部导航切换
  switchToHome() {
    wx.switchTab({ url: '../index/index' })
  },

  switchToTeam() {
    // 当前页面，无需切换
  },

  switchToProjects() {
    wx.switchTab({ url: '../projects/projects' })
  },

  switchToJoin() {
    wx.switchTab({ url: '../join/join' })
  }
})