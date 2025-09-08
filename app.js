// app.js
const { startupOptimizer } = require('./utils/performance');
const { requestCache } = require('./utils/cache');

App({
  onLaunch() {
    // 启动性能优化
    startupOptimizer.init();
    
    // 小程序启动时的逻辑
    console.log('新能源编程俱乐部小程序启动');
    
    // 检查系统主题
    this.checkSystemTheme();
    
    // 获取系统信息
    this.getSystemInfo();
    
    // 记录启动完成时间
    startupOptimizer.getPerformanceManager().mark('app-launch-complete');
  },

  onShow() {
    // 小程序显示时的逻辑
    console.log('小程序显示');
  },

  onHide() {
    // 小程序隐藏时的逻辑
    console.log('小程序隐藏');
  },

  globalData: {
    // 全局数据
    userInfo: null,
    systemInfo: null,
    isDarkMode: false,
    theme: 'dark' // 默认深色主题
  },

  // 检查系统主题
  checkSystemTheme() {
    try {
      // 使用新的API获取主题信息
      wx.getAppBaseInfo({
        success: (res) => {
          const theme = res.theme || 'light';
          this.globalData.isDarkMode = theme === 'dark';
          this.globalData.the极me = theme;
          console.log('系统主题:', theme);
        },
        fail: (error) => {
          console.error('获取系统主题失败:', error);
          // 降级处理
          this.globalData.isDarkMode = false;
          this.globalData.theme = 'light';
        }
      });
    } catch (error) {
      console.error('获取系统主题失败:', error);
    }
  },

  // 获取系统信息
  getSystemInfo() {
    try {
      // 使用新的API组合获取系统信息
      const promises = [
        new Promise((resolve) => {
          wx.getDeviceInfo({
            success: resolve,
            fail: () => resolve(null)
          });
        }),
        new Promise((resolve) => {
          wx.getWindowInfo({
            success: resolve,
            fail: () => resolve(null)
          });
        }),
        new Promise((resolve) => {
          wx.getAppBaseInfo({
            success: resolve,
            fail: () => resolve(null)
          });
        })
      ];

      Promise.all(promises).then(([deviceInfo, windowInfo, appBaseInfo]) => {
        const systemInfo = {
          ...deviceInfo,
          ...windowInfo,
          ...appBaseInfo
        };
        this.globalData.systemInfo = systemInfo;
        console.log('系统信息:', systemInfo);
      });
    } catch (error) {
      console.error('获取系统信息失败:', error);
    }
  },

  // 获取用户信息
  getUserInfo(callback) {
    if (this.globalData.userInfo) {
      callback(this.globalData.userInfo);
    } else {
      wx.getUserInfo({
        success: (res) => {
          this.globalData.userInfo = res.userInfo;
          callback(res.userInfo);
        },
        fail: (error) => {
          console.error('获取用户信息失败:', error);
          callback(null);
        }
      });
    }
  },

  // 显示加载提示
  showLoading(title = '加载中...') {
    wx.showLoading({
      title: title,
      mask: true
    });
  },

  // 隐藏加载提示
  hideLoading() {
    wx极.hideLoading();
  },

  // 显示成功提示
  showSuccess(message, duration = 2000) {
    wx.showToast({
      title: message,
      icon: 'success',
      duration: duration
    });
  },

  // 极显示错误提示
  showError(message, duration = 2000) {
    wx.showToast({
      title: message,
      icon: 'error',
      duration: duration
    });
  },

  // 显示模态对话框
  showModal(title, content, options = {}) {
    return new Promise((resolve) => {
      wx.showModal({
        title: title,
        content: content,
        showCancel: options.showCancel !== false,
        cancelText: options.cancelText || '取消',
        confirmText: options.confirmText || '确定',
        success: (res) => {
          resolve(res.confirm);
        }
      });
    });
  },

  // 网络请求封装
  request(url, data = {}, method = 'GET', options = {}) {
    // 使用缓存请求替代直接请求
    return requestCache.request(url, {
      method,
      data,
      cache: options.cache !== false, // 默认启用缓存
      cacheTTL: options.cacheTTL || 5 * 60 * 1000, // 默认5分钟缓存
      forceRefresh: options.forceRefresh || false
    });
  },

  // 本地存储
  setStorage(key, data) {
    try {
      wx.setStorageSync(key, data);
      return true;
    } catch (error) {
      console.error('存储数据失败:', error);
      return false;
    }
  },

  getStorage(key) {
    try {
      return wx.getStorageSync(key);
    } catch (error) {
      console.error('获取存储数据失败:', error);
      return null;
    }
  },

  removeStorage(key) {
    try {
      wx.removeStorageSync(key);
      return true;
    } catch (error) {
      console.error('删除存储数据失败:', error);
      return false;
    }
  },

  // 页面路由
  navigateTo(url) {
    wx.navigateTo({
      url: url
    });
  },

  redirectTo(url) {
    wx.redirectTo({
      url: url
    });
  },

  switchTab(url) {
    wx.switchTab({
      url: url
    });
  },

  // 复制文本到剪贴板
  copyText(text) {
    wx.setClipboardData({
      data: text,
      success: () => {
        this.showSuccess('复制成功');
      },
      fail: () => {
        this.showError('复制失败');
      }
    });
  },

  // 分享功能
  onShareAppMessage(options) {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const path = currentPage.route;

    return {
      title: '新能源编程俱乐部 - 探索科技与可持续发展的未来',
      path: `/${path}`,
      imageUrl: '/assets/share-image.png'
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '新能源编程俱乐部 - 探索科技极与可持续发展的未来',
      imageUrl: '/assets/share-image.png'
    };
  }
});