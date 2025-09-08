// utils/cache.js - 数据缓存管理工具

/**
 * 缓存管理器
 */
class CacheManager {
  constructor() {
    this.memoryCache = new Map();
    this.cacheConfig = {
      defaultTTL: 5 * 60 * 1000, // 默认5分钟
      maxMemoryItems: 100, // 内存缓存最大条目数
      storagePrefix: 'nec_cache_' // 本地存储前缀
    };
  }

  /**
   * 生成缓存键
   */
  generateKey(url, params = {}) {
    const paramStr = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    return `${url}${paramStr ? '?' + paramStr : ''}`;
  }

  /**
   * 获取缓存数据
   */
  async get(key, options = {}) {
    const { useMemory = true, useStorage = true } = options;
    
    // 先检查内存缓存
    if (useMemory && this.memoryCache.has(key)) {
      const cached = this.memoryCache.get(key);
      if (this.isValid(cached)) {
        console.log(`[Cache] Memory hit: ${key}`);
        return cached.data;
      } else {
        this.memoryCache.delete(key);
      }
    }
    
    // 检查本地存储缓存
    if (useStorage) {
      try {
        const storageKey = this.cacheConfig.storagePrefix + key;
        const cached = wx.getStorageSync(storageKey);
        if (cached && this.isValid(cached)) {
          console.log(`[Cache] Storage hit: ${key}`);
          // 同步到内存缓存
          if (useMemory) {
            this.setMemoryCache(key, cached.data, cached.ttl);
          }
          return cached.data;
        } else if (cached) {
          // 清理过期的存储缓存
          wx.removeStorageSync(storageKey);
        }
      } catch (error) {
        console.warn(`[Cache] Storage read error: ${error.message}`);
      }
    }
    
    return null;
  }

  /**
   * 设置缓存数据
   */
  async set(key, data, options = {}) {
    const {
      ttl = this.cacheConfig.defaultTTL,
      useMemory = true,
      useStorage = true
    } = options;
    
    const cacheItem = {
      data,
      timestamp: Date.now(),
      ttl
    };
    
    // 设置内存缓存
    if (useMemory) {
      this.setMemoryCache(key, data, ttl);
    }
    
    // 设置本地存储缓存
    if (useStorage) {
      try {
        const storageKey = this.cacheConfig.storagePrefix + key;
        wx.setStorageSync(storageKey, cacheItem);
        console.log(`[Cache] Stored: ${key}`);
      } catch (error) {
        console.warn(`[Cache] Storage write error: ${error.message}`);
      }
    }
  }

  /**
   * 设置内存缓存
   */
  setMemoryCache(key, data, ttl) {
    // 检查内存缓存大小限制
    if (this.memoryCache.size >= this.cacheConfig.maxMemoryItems) {
      // 删除最旧的缓存项
      const firstKey = this.memoryCache.keys().next().value;
      this.memoryCache.delete(firstKey);
    }
    
    this.memoryCache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  /**
   * 检查缓存是否有效
   */
  isValid(cached) {
    if (!cached || !cached.timestamp) return false;
    return Date.now() - cached.timestamp < cached.ttl;
  }

  /**
   * 删除缓存
   */
  async remove(key) {
    // 删除内存缓存
    this.memoryCache.delete(key);
    
    // 删除本地存储缓存
    try {
      const storageKey = this.cacheConfig.storagePrefix + key;
      wx.removeStorageSync(storageKey);
      console.log(`[Cache] Removed: ${key}`);
    } catch (error) {
      console.warn(`[Cache] Remove error: ${error.message}`);
    }
  }

  /**
   * 清理过期缓存
   */
  async cleanup() {
    // 清理内存缓存
    for (const [key, cached] of this.memoryCache.entries()) {
      if (!this.isValid(cached)) {
        this.memoryCache.delete(key);
      }
    }
    
    // 清理本地存储缓存
    try {
      const storageInfo = wx.getStorageInfoSync();
      const expiredKeys = [];
      
      for (const key of storageInfo.keys) {
        if (key.startsWith(this.cacheConfig.storagePrefix)) {
          const cached = wx.getStorageSync(key);
          if (cached && !this.isValid(cached)) {
            expiredKeys.push(key);
          }
        }
      }
      
      expiredKeys.forEach(key => {
        wx.removeStorageSync(key);
      });
      
      if (expiredKeys.length > 0) {
        console.log(`[Cache] Cleaned up ${expiredKeys.length} expired items`);
      }
    } catch (error) {
      console.warn(`[Cache] Cleanup error: ${error.message}`);
    }
  }

  /**
   * 清空所有缓存
   */
  async clear() {
    // 清空内存缓存
    this.memoryCache.clear();
    
    // 清空本地存储缓存
    try {
      const storageInfo = wx.getStorageInfoSync();
      const cacheKeys = storageInfo.keys.filter(key => 
        key.startsWith(this.cacheConfig.storagePrefix)
      );
      
      cacheKeys.forEach(key => {
        wx.removeStorageSync(key);
      });
      
      console.log(`[Cache] Cleared ${cacheKeys.length} cache items`);
    } catch (error) {
      console.warn(`[Cache] Clear error: ${error.message}`);
    }
  }

  /**
   * 获取缓存统计信息
   */
  getStats() {
    let storageCount = 0;
    let storageSize = 0;
    
    try {
      const storageInfo = wx.getStorageInfoSync();
      storageCount = storageInfo.keys.filter(key => 
        key.startsWith(this.cacheConfig.storagePrefix)
      ).length;
      storageSize = storageInfo.currentSize;
    } catch (error) {
      console.warn(`[Cache] Stats error: ${error.message}`);
    }
    
    return {
      memoryItems: this.memoryCache.size,
      storageItems: storageCount,
      storageSize,
      maxMemoryItems: this.cacheConfig.maxMemoryItems
    };
  }
}

/**
 * 网络请求缓存装饰器
 */
class RequestCache {
  constructor(cacheManager) {
    this.cache = cacheManager;
    this.pendingRequests = new Map();
  }

  /**
   * 带缓存的请求方法
   */
  async request(url, options = {}) {
    const {
      method = 'GET',
      data = {},
      cache = true,
      cacheTTL = 5 * 60 * 1000,
      forceRefresh = false
    } = options;
    
    const cacheKey = this.cache.generateKey(url, { method, ...data });
    
    // 如果不使用缓存或强制刷新，直接请求
    if (!cache || forceRefresh) {
      return this.makeRequest(url, options);
    }
    
    // 检查缓存
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }
    
    // 检查是否有相同的请求正在进行
    if (this.pendingRequests.has(cacheKey)) {
      console.log(`[RequestCache] Waiting for pending request: ${cacheKey}`);
      return this.pendingRequests.get(cacheKey);
    }
    
    // 发起新请求
    const requestPromise = this.makeRequest(url, options)
      .then(result => {
        // 缓存结果
        this.cache.set(cacheKey, result, { ttl: cacheTTL });
        this.pendingRequests.delete(cacheKey);
        return result;
      })
      .catch(error => {
        this.pendingRequests.delete(cacheKey);
        throw error;
      });
    
    this.pendingRequests.set(cacheKey, requestPromise);
    return requestPromise;
  }

  /**
   * 实际的网络请求
   */
  makeRequest(url, options) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method: options.method || 'GET',
        data: options.data || {},
        header: options.header || {},
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(new Error(`Request failed with status ${res.statusCode}`));
          }
        },
        fail: reject
      });
    });
  }
}

// 创建全局实例
const cacheManager = new CacheManager();
const requestCache = new RequestCache(cacheManager);

// 定期清理过期缓存
setInterval(() => {
  cacheManager.cleanup();
}, 10 * 60 * 1000); // 每10分钟清理一次

module.exports = {
  CacheManager,
  RequestCache,
  cacheManager,
  requestCache
};