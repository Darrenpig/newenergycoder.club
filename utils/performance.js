// utils/performance.js - 小程序性能优化工具

/**
 * 启动性能优化管理器
 */
class PerformanceManager {
  constructor() {
    this.startTime = Date.now();
    this.metrics = {};
    this.preloadQueue = [];
    this.criticalResources = new Set();
  }

  /**
   * 记录性能指标
   */
  mark(name) {
    this.metrics[name] = Date.now() - this.startTime;
    console.log(`[Performance] ${name}: ${this.metrics[name]}ms`);
  }

  /**
   * 预加载关键资源
   */
  preloadCriticalResources() {
    // 预加载关键图片
    const criticalImages = [
      '/images/logo.png',
      '/images/hero-bg.jpg',
      '/images/default-avatar.png'
    ];

    criticalImages.forEach(src => {
      if (!this.criticalResources.has(src)) {
        this.preloadImage(src);
        this.criticalResources.add(src);
      }
    });
  }

  /**
   * 预加载图片
   */
  preloadImage(src) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src,
        success: resolve,
        fail: reject
      });
    });
  }

  /**
   * 延迟加载非关键资源
   */
  deferNonCriticalResources() {
    // 延迟加载非关键组件
    setTimeout(() => {
      this.loadNonCriticalComponents();
    }, 100);
  }

  /**
   * 加载非关键组件
   */
  loadNonCriticalComponents() {
    // 这里可以动态加载一些非首屏必需的组件
    console.log('[Performance] Loading non-critical components');
  }

  /**
   * 优化数据请求
   */
  optimizeDataFetching() {
    // 合并多个小请求
    this.batchRequests();
    
    // 使用请求缓存
    this.enableRequestCache();
  }

  /**
   * 批量请求处理
   */
  batchRequests() {
    this.requestQueue = [];
    this.batchTimer = null;
  }

  /**
   * 添加请求到批量队列
   */
  addToBatch(request) {
    this.requestQueue.push(request);
    
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
    }
    
    this.batchTimer = setTimeout(() => {
      this.executeBatchRequests();
    }, 50); // 50ms内的请求合并
  }

  /**
   * 执行批量请求
   */
  executeBatchRequests() {
    if (this.requestQueue.length === 0) return;
    
    const requests = [...this.requestQueue];
    this.requestQueue = [];
    
    // 这里可以实现具体的批量请求逻辑
    console.log(`[Performance] Executing ${requests.length} batched requests`);
  }

  /**
   * 启用请求缓存
   */
  enableRequestCache() {
    if (!wx.getStorageSync('requestCache')) {
      wx.setStorageSync('requestCache', {});
    }
  }

  /**
   * 获取缓存的请求结果
   */
  getCachedRequest(key) {
    const cache = wx.getStorageSync('requestCache') || {};
    const cached = cache[key];
    
    if (cached && Date.now() - cached.timestamp < 300000) { // 5分钟缓存
      return cached.data;
    }
    
    return null;
  }

  /**
   * 缓存请求结果
   */
  setCachedRequest(key, data) {
    const cache = wx.getStorageSync('requestCache') || {};
    cache[key] = {
      data,
      timestamp: Date.now()
    };
    
    wx.setStorageSync('requestCache', cache);
  }

  /**
   * 清理过期缓存
   */
  cleanExpiredCache() {
    const cache = wx.getStorageSync('requestCache') || {};
    const now = Date.now();
    
    Object.keys(cache).forEach(key => {
      if (now - cache[key].timestamp > 300000) {
        delete cache[key];
      }
    });
    
    wx.setStorageSync('requestCache', cache);
  }

  /**
   * 获取性能报告
   */
  getPerformanceReport() {
    return {
      metrics: this.metrics,
      totalTime: Date.now() - this.startTime,
      criticalResourcesCount: this.criticalResources.size
    };
  }
}

/**
 * 启动优化器
 */
class StartupOptimizer {
  constructor() {
    this.performanceManager = new PerformanceManager();
  }

  /**
   * 初始化启动优化
   */
  init() {
    this.performanceManager.mark('startup-init');
    
    // 预加载关键资源
    this.performanceManager.preloadCriticalResources();
    
    // 延迟加载非关键资源
    this.performanceManager.deferNonCriticalResources();
    
    // 优化数据请求
    this.performanceManager.optimizeDataFetching();
    
    // 清理过期缓存
    this.performanceManager.cleanExpiredCache();
    
    this.performanceManager.mark('startup-complete');
  }

  /**
   * 获取性能管理器实例
   */
  getPerformanceManager() {
    return this.performanceManager;
  }
}

// 创建全局实例
const startupOptimizer = new StartupOptimizer();

module.exports = {
  PerformanceManager,
  StartupOptimizer,
  startupOptimizer
};