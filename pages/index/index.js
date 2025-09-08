// index.js
const app = getApp()

Page({
  data: {
    // 页面数据
    features: [
      {
        id: 1,
        icon: '../../assets/icons/code.png',
        title: '编程工作坊',
        description: '学习最新编程技术，提升开发技能',
        route: '../join/join'
      },
      {
        id: 2,
        icon: '../../assets/icons/lightbulb.png',
        title: '创新项目',
        description: '参与新能源相关的技术项目开发',
        route: '../projects/projects'
      },
      {
        id: 3,
        icon: '../../assets/icons/connection.png',
        title: '行业连接',
        description: '与行业专家和企业建立合作关系',
        route: '../team/team'
      }
    ],
    news: [
      {
        id: 1,
        title: '2025流体工作站 初步交付',
        date: '2025-09-07',
        isNew: true,
        route: '../projects/projects'
      },
      {
        id: 2,
        title: '嘉立创悬赏计划球型机器人合作',
        date: '2025-09-15',
        isNew: true,
        route: '../projects/projects'
      },
      {
        id: 3,
        title: '2025NEC研究生线下Lab加入',
        date: '2025-09-8',
        isNew: true,
        route: '../projects/projects'
      },
      {
        id: 4,
        title: '2025开源之夏项目启动',
        date: '2025-05-20',
        isNew: false,
        route: '../projects/projects'
      },
      {
        id: 5,
        title: '2025ROBOCON成功完赛',
        date: '2025-07-15',
        isNew: false,
        route: '../projects/projects'
      }
    ],
    stats: {
      members: 50,
      projects: 20,
      partners: 10
    }
  },

  onLoad() {
    console.log('首页加载')
    this.setNavigationBarTitle()
  },

  onShow() {
    // 页面显示时的逻辑
    console.log('首页显示')
  },

  onPullDownRefresh() {
    // 下拉刷新
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

  // 设置导航栏标题
  setNavigationBarTitle() {
    wx.setNavigationBarTitle({
      title: '新能源编程俱乐部'
    })
  },

  // 导航到加入页面
  navigateToJoin() {
    wx.navigateTo({
      url: '../join/join'
    })
  },

  // 导航到项目页面
  navigateToProjects() {
    wx.navigateTo({
      url: '../projects/projects'
    })
  },

  // 导航到团队页面
  navigateToTeam() {
    wx.navigateTo({
      url: '../team/team'
    })
  },

  // 查看Gitee代码库
  viewGitee() {
    wx.showModal({
      title: '打开Gitee',
      content: '将在浏览器中打开Gitee代码库',
      success: (res) => {
        if (res.confirm) {
          wx.setClipboardData({
            data: 'https://gitee.com/Darrenpig/new_energy_coder_club',
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

  // 查看全部新闻
  viewAllNews() {
    wx.showModal({
      title: '功能提示',
      content: '新闻列表功能正在开发中',
      showCancel: false
    })
  },

  // 底部导航切换
  switchToHome() {
    wx.switchTab({
      url: '../index/index'
    })
  },

  switchToTeam() {
    wx.switchTab({
      url: '../team/team'
    })
  },

  switchToProjects() {
    wx.switchTab({
      url: '../projects/projects'
    })
  },

  switchToJoin() {
    wx.switchTab({
      url: '../join/join'
    })
  },

  // 拨打电话
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: '00000000000'
    })
  },

  // 发送邮件
  sendEmail() {
    wx.setClipboardData({
      data: 'contact@energy-coder-club.org',
      success: () => {
        wx.showToast({
          title: '邮箱已复制',
          icon: 'success'
        })
      }
    })
  },

  // 复制文本
  copyText(text) {
    wx.setClipboardData({
      data: text,
      success: () => {
        wx.showToast({
          title: '复制成功',
          icon: 'success'
        })
      }
    })
  },

  // 预览图片
  previewImage(url) {
    wx.previewImage({
      urls: [url],
      current: url
    })
  },

  // 振动反馈
  vibrate() {
    wx.vibrateShort({
      type: 'medium'
    })
  },

  // 显示加载
  showLoading() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    
    setTimeout(() => {
      wx.hideLoading()
    }, 2000)
  },

  // 显示操作菜单
  showActionSheet() {
    wx.showActionSheet({
      itemList: ['分享给好友', '收藏', '举报'],
      success: (res) => {
        console.log('选中项目:', res.tapIndex)
      },
      fail: (err) => {
        console.log('操作失败:', err)
      }
    })
  }
})