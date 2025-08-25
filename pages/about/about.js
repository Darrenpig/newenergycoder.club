// about.js
const app = getApp()

Page({
  data: {
    // 页面数据
    stats: {
      members: 50,
      projects: 15,
      completed: 8,
      commits: 200
    },
    // 时间线数据
    timeline: [
      {
        date: '2024年1月',
        event: '俱乐部成立',
        description: '由一群热爱新能源技术的开发者共同创立'
      },
      {
        date: '2024年3月',
        event: '首个项目启动',
        description: '新能源数据可视化平台项目正式启动'
      },
      {
        date: '2024年6月',
        event: '开源发布',
        description: '首个开源项目在GitHub上发布'
      },
      {
        date: '2024年9月',
        event: '社区扩张',
        description: '成员数量突破50人，项目数量达到10个'
      }
    ],
    // 合作伙伴数据
    partners: [
      {
        name: 'Gitee',
        type: '代码托管',
        logo: '../../assets/partners/gitee.png'
      },
      {
        name: 'GitHub',
        type: '开源社区',
        logo: '../../assets/partners/github.png'
      },
      {
        name: '腾讯云',
        type: '云服务',
        logo: '../../assets/partners/tencent.png'
      },
      {
        name: '开放原子',
        type: '开源基金会',
        logo: '../../assets/partners/opensource.png'
      }
    ],
    // 技术栈数据
    techStack: [
      { name: 'React', type: '前端框架' },
      { name: 'Node.js', type: '后端运行时' },
      { name: 'MongoDB', type: '数据库' },
      { name: 'Docker', type: '容器化' }
    ]
  },

  onLoad() {
    console.log('关于页面加载')
  },

  onShow() {
    console.log('关于页面显示')
  },

  onPullDownRefresh() {
    console.log('下拉刷新')
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },

  onShareAppMessage() {
    return app.onShareAppMessage()
  },

  onShareTimeline() {
    return app.onShareTimeline()
  },

  // 返回上一页
  navigateBack() {
    wx.navigateBack()
  },

  // 显示关于信息
  showAboutInfo() {
    wx.showModal({
      title: '关于信息',
      content: '新能源编程俱乐部 - 致力于新能源技术与软件开发的创新社区',
      showCancel: false
    })
  },

  // 联系邮箱
  contactEmail() {
    const email = 'contact@energy-coder-club.org'
    wx.setClipboardData({
      data: email,
      success: () => {
        wx.showToast({
          title: '邮箱已复制',
          icon: 'success'
        })
      }
    })
  },

  // 联系微信
  contactWechat() {
    const wechat = 'EnergyCoderClub'
    wx.setClipboardData({
      data: wechat,
      success: () => {
        wx.showToast({
          title: '微信号已复制',
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
    wx.switchTab({ url: '../team/team' })
  },

  switchToProjects() {
    wx.switchTab({ url: '../projects/projects' })
  },

  switchToJoin() {
    wx.switchTab({ url: '../join/join' })
  }
})