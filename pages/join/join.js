// join.js
const app = getApp()

Page({
  data: {
    // 表单数据
    formData: {
      name: '',
      email: '',
      phone: '',
      skills: '',
      experience: '',
      motivation: '',
      timeCommitment: 0,
      github: ''
    },
    // 选中的角色
    selectedRole: '',
    // 时间投入选项
    timeOptions: [
      '少于5小时',
      '5-10小时',
      '10-20小时',
      '20-30小时',
      '30小时以上'
    ],
    // FAQ展开状态
    faqOpen: [false, false, false],
    // 是否正在提交
    isSubmitting: false,
    // 是否显示成功模态框
    showSuccessModal: false
  },

  onLoad() {
    console.log('加入页面加载')
  },

  onShow() {
    console.log('加入页面显示')
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

  // 显示信息
  showInfo() {
    wx.showModal({
      title: '关于申请',
      content: '填写完整信息可以提高申请通过率。我们会在3个工作日内回复您的申请。',
      showCancel: false
    })
  },

  // 选择角色
  selectRole(e) {
    const role = e.currentTarget.dataset.role
    this.setData({ selectedRole: role })
  },

  // 输入框变化
  onInput(e) {
    const field = e.currentTarget.dataset.field
    const value = e.detail.value
    this.setData({
      [`formData.${field}`]: value
    })
  },

  // 选择器变化
  onPickerChange(e) {
    const field = e.currentTarget.dataset.field
    const value = e.detail.value
    this.setData({
      [`formData.${field}`]: value
    })
  },

  // 切换FAQ
  toggleFAQ(e) {
    const index = parseInt(e.currentTarget.dataset.index)
    const newFaqOpen = [...this.data.faqOpen]
    newFaqOpen[index] = !newFaqOpen[index]
    this.setData({ faqOpen: newFaqOpen })
  },

  // 提交表单
  submitForm() {
    if (!this.isFormValid()) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }

    this.setData({ isSubmitting: true })

    // 模拟提交过程
    setTimeout(() => {
      this.setData({
        isSubmitting: false,
        showSuccessModal: true
      })
      
      // 重置表单
      this.resetForm()
    }, 2000)
  },

  // 检查表单是否有效
  isFormValid() {
    const { formData, selectedRole } = this.data
    return formData.name && 
           formData.email && 
           formData.phone && 
           formData.skills && 
           formData.experience && 
           formData.motivation && 
           selectedRole
  },

  // 重置表单
  resetForm() {
    this.setData({
      formData: {
        name: '',
        email: '',
        phone: '',
        skills: '',
        experience: '',
        motivation: '',
        timeCommitment: 0,
        github: ''
      },
      selectedRole: ''
    })
  },

  // 隐藏成功模态框
  hideSuccessModal() {
    this.setData({ showSuccessModal: false })
  },

  // 发送邮件
  sendEmail() {
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

  // 加入QQ群
  joinQQGroup() {
    const groupNumber = '123456789'
    wx.setClipboardData({
      data: groupNumber,
      success: () => {
        wx.showToast({
          title: '群号已复制',
          icon: 'success'
        })
      }
    })
  },

  // 关注微信公众号
  followWechat() {
    wx.showModal({
      title: '关注公众号',
      content: '请在微信搜索"新能源编程俱乐部"关注我们的公众号',
      showCancel: false
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
    // 当前页面，无需切换
  }
})