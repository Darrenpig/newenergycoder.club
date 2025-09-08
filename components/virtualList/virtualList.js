// components/virtualList/virtualList.js
Component({
  properties: {
    // 列表数据
    items: {
      type: Array,
      value: []
    },
    // 每项高度
    itemHeight: {
      type: Number,
      value: 100
    },
    // 容器高度
    containerHeight: {
      type: Number,
      value: 600
    },
    // 缓冲区大小
    bufferSize: {
      type: Number,
      value: 5
    },
    // 是否启用分页加载
    enablePaging: {
      type: Boolean,
      value: true
    },
    // 每页大小
    pageSize: {
      type: Number,
      value: 20
    }
  },

  data: {
    scrollTop: 0,
    startIndex: 0,
    endIndex: 0,
    visibleItems: [],
    totalHeight: 0,
    offsetY: 0,
    currentPage: 1,
    isLoading: false,
    hasMore: true
  },

  lifetimes: {
    attached() {
      this.calculateVisibleItems();
    }
  },

  observers: {
    'items': function(newItems) {
      this.setData({
        totalHeight: newItems.length * this.data.itemHeight,
        hasMore: newItems.length >= this.data.currentPage * this.data.pageSize
      });
      this.calculateVisibleItems();
    }
  },

  methods: {
    // 计算可见项目
    calculateVisibleItems() {
      const { scrollTop, itemHeight, containerHeight, bufferSize, items } = this.data;
      
      // 计算可见范围
      const visibleCount = Math.ceil(containerHeight / itemHeight);
      const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - bufferSize);
      const endIndex = Math.min(items.length - 1, startIndex + visibleCount + bufferSize * 2);
      
      // 获取可见项目
      const visibleItems = items.slice(startIndex, endIndex + 1).map((item, index) => ({
        ...item,
        _index: startIndex + index,
        _top: (startIndex + index) * itemHeight
      }));
      
      this.setData({
        startIndex,
        endIndex,
        visibleItems,
        offsetY: startIndex * itemHeight
      });
    },

    // 滚动事件处理
    onScroll(e) {
      const scrollTop = e.detail.scrollTop;
      this.setData({ scrollTop });
      
      // 节流处理
      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer);
      }
      
      this.scrollTimer = setTimeout(() => {
        this.calculateVisibleItems();
        this.checkLoadMore(scrollTop);
      }, 16); // 约60fps
    },

    // 检查是否需要加载更多
    checkLoadMore(scrollTop) {
      if (!this.data.enablePaging || this.data.isLoading || !this.data.hasMore) {
        return;
      }
      
      const { totalHeight, containerHeight } = this.data;
      const threshold = totalHeight - containerHeight - 200; // 提前200px加载
      
      if (scrollTop >= threshold) {
        this.loadMore();
      }
    },

    // 加载更多数据
    loadMore() {
      if (this.data.isLoading || !this.data.hasMore) return;
      
      this.setData({ isLoading: true });
      
      // 触发加载更多事件
      this.triggerEvent('loadmore', {
        page: this.data.currentPage + 1,
        pageSize: this.data.pageSize
      });
    },

    // 加载完成回调
    onLoadComplete(newItems, hasMore = true) {
      const currentItems = this.data.items;
      const updatedItems = [...currentItems, ...newItems];
      
      this.setData({
        items: updatedItems,
        currentPage: this.data.currentPage + 1,
        isLoading: false,
        hasMore: hasMore && newItems.length === this.data.pageSize
      });
    },

    // 刷新列表
    refresh() {
      this.setData({
        currentPage: 1,
        isLoading: false,
        hasMore: true,
        scrollTop: 0
      });
      
      this.triggerEvent('refresh');
    },

    // 项目点击事件
    onItemTap(e) {
      const { item, index } = e.currentTarget.dataset;
      this.triggerEvent('itemtap', { item, index });
    },

    // 滚动到顶部
    scrollToTop() {
      this.setData({ scrollTop: 0 });
    }
  }
});