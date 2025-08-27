/**
 * 加载更多辅助工具类
 * 提供统一的加载状态管理、错误处理和防抖功能
 */

class LoadMoreHelper {
  constructor(options = {}) {
    this.page = options.page || null
    this.pageSize = options.pageSize || 10
    this.debounceTime = options.debounceTime || 300
    this.maxRetries = options.maxRetries || 3
    this.retryDelay = options.retryDelay || 1000
    
    // 状态管理
    this.isLoading = false
    this.hasMore = true
    this.currentPage = 0
    this.retryCount = 0
    this.lastLoadTime = 0
    
    // 防抖定时器
    this.debounceTimer = null
    
    // 视觉反馈配置
    this.showLoadingToast = options.showLoadingToast !== false
    this.showSuccessToast = options.showSuccessToast !== false
    this.showErrorToast = options.showErrorToast !== false
    
    this.options = {
      // 默认配置
      loadingDelay: 1500, // 模拟加载延迟
      loadingTitle: '加载中...', // 加载提示文字
      successTitle: '加载成功', // 成功提示文字
      errorTitle: '加载失败，请重试', // 错误提示文字
      noMoreTitle: '没有更多数据了', // 无更多数据提示
      ...options
    }
  }

  /**
   * 执行加载更多操作
   * @param {Function} loadFunction - 加载数据的函数
   * @param {Object} params - 加载参数
   * @returns {Promise} 加载结果
   */
  async loadMore(loadFunction, params = {}) {
    if (this.isLoading) {
      console.log('正在加载中，跳过重复请求')
      return
    }

    this.isLoading = true
    
    // 更新页面loading状态
    if (this.page) {
      this.page.setData({ loading: true })
    }
    
    try {
      // 显示加载提示
      if (this.showLoadingToast) {
        wx.showLoading({
          title: this.options.loadingTitle,
          mask: true
        })
      }

      // 执行加载函数
      const result = await loadFunction({
        page: this.currentPage + 1,
        pageSize: this.pageSize,
        ...params
      })

      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, this.options.loadingDelay))

      // 更新状态
      this.currentPage++
      this.retryCount = 0
      this.lastLoadTime = Date.now()

      // 隐藏加载提示
      if (this.showLoadingToast) {
        wx.hideLoading()
      }

      // 显示成功提示
      if (this.showSuccessToast) {
        wx.showToast({
          title: this.options.successTitle,
          icon: 'success',
          duration: 1500
        })
      }

      return result

    } catch (error) {
      console.error('加载失败:', error)
      
      // 隐藏加载提示
      if (this.showLoadingToast) {
        wx.hideLoading()
      }

      // 重试逻辑
      if (this.retryCount < this.maxRetries) {
        this.retryCount++
        
        if (this.showErrorToast) {
          wx.showToast({
            title: `加载失败，正在重试(${this.retryCount}/${this.maxRetries})`,
            icon: 'none',
            duration: 2000
          })
        }

        // 延迟重试
        await new Promise(resolve => setTimeout(resolve, this.retryDelay))
        return this.loadMore(loadFunction, params)
      } else {
        // 显示错误提示
        if (this.showErrorToast) {
          wx.showToast({
            title: this.options.errorTitle,
            icon: 'none',
            duration: 2000
          })
        }
        
        throw error
      }
    } finally {
      this.isLoading = false
      
      // 更新页面loading状态
      if (this.page) {
        this.page.setData({ loading: false })
      }
    }
  }

  /**
   * 执行实际的加载操作
   * @private
   */
  async _executeLoad(context, dataLoader, config) {
    const {
      hasMoreKey = 'hasMore',
      loadingKey = 'loading',
      dataKey = 'filteredProjects',
      maxItems = 50
    } = config

    this.isLoading = true
    
    // 设置加载状态
    context.setData({ [loadingKey]: true })
    
    // 显示加载提示
    wx.showLoading({
      title: this.options.loadingTitle,
      mask: true
    })

    try {
      // 模拟加载延迟
      await this._delay(this.options.loadingDelay)
      
      // 执行数据加载
      const newData = await dataLoader()
      
      if (!Array.isArray(newData)) {
        throw new Error('数据加载函数必须返回数组')
      }

      // 合并新数据
      const currentData = context.data[dataKey] || []
      const mergedData = [...currentData, ...newData]
      
      // 检查是否还有更多数据
      const hasMore = mergedData.length < maxItems && newData.length > 0
      
      // 更新页面数据
      context.setData({
        [dataKey]: mergedData,
        [hasMoreKey]: hasMore
      })

      // 显示成功提示
      wx.showToast({
        title: this.options.successTitle,
        icon: 'success',
        duration: 1000
      })

      // 重置重试计数
      this.retryCount = 0
      
      return true
      
    } catch (error) {
      console.error('加载更多数据失败:', error)
      
      // 处理重试逻辑
      if (this.retryCount < this.options.maxRetries) {
        this.retryCount++
        
        wx.showModal({
          title: '加载失败',
          content: `加载失败，是否重试？(${this.retryCount}/${this.options.maxRetries})`,
          success: async (res) => {
            if (res.confirm) {
              await this._delay(this.options.retryDelay)
              return this._executeLoad(context, dataLoader, config)
            }
          }
        })
      } else {
        // 超过最大重试次数
        wx.showToast({
          title: this.options.errorTitle,
          icon: 'none',
          duration: 2000
        })
        this.retryCount = 0
      }
      
      return false
      
    } finally {
      // 清理加载状态
      wx.hideLoading()
      context.setData({ [loadingKey]: false })
      this.isLoading = false
    }
  }

  /**
   * 延迟函数
   * @private
   */
  _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * 重置加载状态
   */
  reset() {
    this.retryCount = 0
    this.lastLoadTime = 0
    this.isLoading = false
  }

  /**
   * 更新配置
   */
  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions }
  }
}

/**
 * 创建加载更多助手实例
 * @param {Object} options - 配置选项
 * @returns {LoadMoreHelper}
 */
function createLoadMoreHelper(options = {}) {
  return new LoadMoreHelper(options)
}

/**
 * 通用的下拉刷新处理函数
 * @param {Object} context - 页面上下文
 * @param {Function} refreshCallback - 刷新回调函数
 * @param {number} delay - 刷新延迟时间
 */
function handlePullDownRefresh(context, refreshCallback, delay = 1000) {
  console.log('下拉刷新')
  
  setTimeout(async () => {
    try {
      if (typeof refreshCallback === 'function') {
        await refreshCallback()
      }
    } catch (error) {
      console.error('刷新失败:', error)
      wx.showToast({
        title: '刷新失败',
        icon: 'none'
      })
    } finally {
      wx.stopPullDownRefresh()
    }
  }, delay)
}

/**
 * 通用的触底加载处理函数
 * @param {LoadMoreHelper} helper - 加载助手实例
 * @param {Object} context - 页面上下文
 * @param {Function} dataLoader - 数据加载函数
 * @param {Object} config - 配置参数
 */
function handleReachBottom(helper, context, dataLoader, config = {}) {
  console.log('滚动到底部')
  return helper.loadMore(context, dataLoader, config)
}

module.exports = {
  LoadMoreHelper,
  createLoadMoreHelper,
  handlePullDownRefresh,
  handleReachBottom
}