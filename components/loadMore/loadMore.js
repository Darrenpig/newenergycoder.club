// 加载更多组件
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示加载更多组件
    showLoadMore: {
      type: Boolean,
      value: true
    },
    // 是否正在加载
    loading: {
      type: Boolean,
      value: false
    },
    // 是否还有更多数据
    hasMore: {
      type: Boolean,
      value: true
    },
    // 加载中文字
    loadingText: {
      type: String,
      value: '加载中...'
    },
    // 按钮文字
    buttonText: {
      type: String,
      value: '加载更多'
    },
    // 结束文字
    endText: {
      type: String,
      value: '没有更多数据了'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 点击加载更多
     */
    onLoadMore() {
      if (this.properties.loading || !this.properties.hasMore) {
        return
      }
      
      // 触发父组件的加载更多事件
      this.triggerEvent('loadmore', {
        timestamp: Date.now()
      })
    }
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    attached() {
      console.log('LoadMore组件已挂载')
    },
    
    detached() {
      console.log('LoadMore组件已卸载')
    }
  }
})