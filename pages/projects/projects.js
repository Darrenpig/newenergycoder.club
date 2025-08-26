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
        id: '1',
        title: '20250319流体工作站',
        description: '流体工作站监控系统，实现对流体设备的实时监控和数据采集，提供高精度的流体参数测量和控制功能。',
        image: 'https://gitee.com/darrenpig/new_energy_coder_club/raw/master/projects/%E7%A7%91%E7%A0%94%E3%80%8C%E6%A8%AA%E5%90%91%E9%A1%B9%E7%9B%AE%E3%80%8D/image/JIDINAQI.png',
        category: 'ai',
        technologies: ['嵌入式系统', '传感器技术', 'C/C++', '数据采集', 'SCADA'],
        author: '新能源编程俱乐部',
        date: '2025-03-19',
        githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/ai/energy-monitoring/20250319流体工作站',
        status: 'active',
        statusText: '开发中'
      },
      {
        id: '2',
        title: '20250426星闪手柄',
        description: '基于WS63的星闪手柄开发项目，采用星闪技术实现低延迟、高可靠性的无线通信，为游戏和控制应用提供优质体验。',
        image: 'https://gitee.com/jumuwa/new_energy_coder_club/raw/master/Nearlink_handle.jpg',
        category: 'embedded',
        technologies: ['WS63', '星闪技术', 'NearLink', '嵌入式开发', '无线通信'],
        author: '新能源编程俱乐部',
        date: '2025-04-26',
        githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/embedded/nearlink/20250426星闪手柄',
        status: 'active',
        statusText: '开发中'
      },
      {
        id: '3',
        title: '20241201人形机器人主线',
        description: '人形机器人核心开发项目，涵盖机器人运动控制、感知系统、决策算法等关键技术，致力于打造智能化的人形机器人平台。',
        image: 'https://gitee.com/darrenpig/new_energy_coder_club/raw/master/shared/images/Image/Duma_image.png',
        category: 'robotics',
        technologies: ['ROS', '运动控制', '计算机视觉', '深度学习', '传感器融合'],
        author: '新能源编程俱乐部',
        date: '2024-12-01',
        githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/robotics/humanoid-robot/人形机器人主线',
        status: 'active',
        statusText: '开发中'
      },
      {
        id: '4',
        title: '20241115飞控通讯（飞行汽车项目组）',
        description: '无人机飞控系统通讯项目，实现无人机与地面站之间的可靠数据传输，支持实时遥测、遥控和任务规划功能。',
        image: 'https://gitee.com/darrenpig/new_energy_coder_club/raw/master/projects/%E7%A7%91%E7%A0%94%E3%80%8C%E6%A8%AA%E5%90%91%E9%A1%B9%E7%9B%AE%E3%80%8D/image/PhotoelectricKG.png',
        category: 'robotics',
        technologies: ['飞控系统', '无线通信', 'MAVLink', '实时系统', '嵌入式开发'],
        author: '新能源编程俱乐部',
        date: '2024-11-15',
        githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/robotics/250510飞控通讯',
        status: 'active',
        statusText: '开发中'
      },
      {
        id: '5',
        title: 'NEC 横向项目（真实需求企业级命题）',
        description: '产学研合作项目，与企业和科研院所合作开展技术研发，将理论研究与实际应用相结合，推动科技成果转化。',
        image: 'https://gitee.com/darrenpig/new_energy_coder_club/raw/master/shared/images/Image/Roadmap.png',
        category: 'research',
        technologies: ['产学研合作', '技术转化', '项目管理', '创新研发'],
        author: '新能源编程俱乐部',
        date: '2024-10-01',
        githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/科研「横向项目」',
        status: 'active',
        statusText: '开发中'
      },
      {
        id: '6',
        title: '人形机器人UMI低成本灵巧手',
        description: '高性价比灵巧手研发项目，通过优化设计和制造工艺，降低灵巧手成本，提高其在教育和研究领域的普及性。',
        image: 'https://ww2.mathworks.cn/help/examples/robotics/win64/DesignManipulatorPathsUsingIKDesignerExample_03.png',
        category: 'research',
        technologies: ['机械设计', '3D打印', '控制算法', '成本优化', 'UMI'],
        author: '新能源编程俱乐部',
        date: '2024-09-20',
        githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/科研「横向项目」/dexterous-hand',
        status: 'active',
        statusText: '开发中'
      },
      {
        id: '7',
        title: '20241015气缸控制系统',
        description: '高精度气动控制系统，实现对气缸运动的精确控制，广泛应用于自动化生产线和机器人系统中。',
        image: 'https://gitee.com/darrenpig/new_energy_coder_club/raw/master/projects/%E7%A7%91%E7%A0%94%E3%80%8C%E6%A8%AA%E5%90%91%E9%A1%B9%E7%9B%AE%E3%80%8D/image/%E9%80%89%E5%9E%8B%E8%B5%84%E6%96%99.png',
        category: 'research',
        technologies: ['气动控制', 'PLC', '精密控制', '自动化', '工业控制'],
        author: '新能源编程俱乐部',
        date: '2024-10-15',
        githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/科研「横向项目」/pneumatic-system',
        status: 'active',
        statusText: '开发中'
      },
      {
        id: '8',
        title: '3D打印成型SIG',
        description: '专业3D打印服务团队，提供从设计到成型的一站式3D打印解决方案，支持多种材料和复杂结构的打印需求。',
        image: 'https://gitee.com/darrenpig/new_energy_coder_club/raw/master/projects/%E7%A7%91%E7%A0%94%E3%80%8C%E6%A8%AA%E5%90%91%E9%A1%B9%E7%9B%AE%E3%80%8D/image/%E9%99%90%E4%BD%8D%E5%99%A8.jpg',
        category: 'research',
        technologies: ['3D打印', 'CAD设计', '材料科学', '快速成型', '后处理工艺'],
        author: '新能源编程俱乐部',
        date: '2024-07-10',
        githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/科研「横向项目」/3d-printing-team',
        status: 'active',
        statusText: '开发中'
      },
      {
        id: '9',
        title: 'MICA混合关键系统验证',
        description: '混合关键部署框架验证项目，研究和验证MICA框架在混合关键系统中的应用效果和性能表现。',
        image: 'https://darrenpig.github.io/files/news10.jpg',
        category: 'research',
        technologies: ['MICA框架', '混合关键系统', '系统验证', '性能分析', '安全关键'],
        author: '新能源编程俱乐部',
        date: '2024-06-25',
        githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/科研「横向项目」/mica-validation',
        status: 'active',
        statusText: '开发中'
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
      itemList: ['全部项目', 'AI智能', '物联网', '嵌入式', '机器人', '科研项目', 'Web开发', '移动应用', '其他'],
      success: (res) => {
        const categories = ['all', 'ai', 'iot', 'embedded', 'robotics', 'research', 'web', 'mobile', 'other']
        this.setData({ currentCategory: categories[res.tapIndex] })
        this.filterByCategory(categories[res.tapIndex])
      }
    })
  },

  // 按分类筛选
  filterByCategory(category) {
    if (category === 'all') {
      this.setData({ filteredProjects: this.data.allProjects })
    } else {
      const filtered = this.data.allProjects.filter(project => project.category === category)
      this.setData({ filteredProjects: filtered })
    }
  },

  // 切换分类
  switchCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({ currentCategory: category })
    this.filterByCategory(category)
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