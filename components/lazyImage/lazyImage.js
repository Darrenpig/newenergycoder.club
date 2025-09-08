// components/lazyImage/lazyImage.js
Component({
  properties: {
    src: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: '../../assets/icons/loading.png'
    },
    width: {
      type: String,
      value: '100%'
    },
    height: {
      type: String,
      value: 'auto'
    },
    mode: {
      type: String,
      value: 'aspectFit'
    },
    lazy: {
      type: Boolean,
      value: true
    }
  },

  data: {
    imageSrc: '',
    isLoaded: false,
    isError: false,
    isIntersecting: false
  },

  lifetimes: {
    attached() {
      this.setData({
        imageSrc: this.data.lazy ? this.data.placeholder : this.data.src
      });
      
      if (this.data.lazy) {
        this.createIntersectionObserver();
      }
    },
    
    detached() {
      if (this.intersectionObserver) {
        this.intersectionObserver.disconnect();
      }
    }
  },

  methods: {
    // 创建交叉观察器实现懒加载
    createIntersectionObserver() {
      this.intersectionObserver = this.createIntersectionObserver({
        rootMargin: '50px'
      });
      
      this.intersectionObserver.relativeToViewport().observe('.lazy-image', (res) => {
        if (res.intersectionRatio > 0 && !this.data.isIntersecting) {
          this.setData({
            isIntersecting: true
          });
          this.loadImage();
        }
      });
    },

    // 加载图片
    loadImage() {
      if (!this.data.src || this.data.isLoaded) return;
      
      // 检查缓存
      const cachedImage = wx.getStorageSync(`img_cache_${this.data.src}`);
      if (cachedImage) {
        this.setData({
          imageSrc: cachedImage,
          isLoaded: true
        });
        return;
      }

      // 下载并缓存图片
      wx.downloadFile({
        url: this.data.src,
        success: (res) => {
          if (res.statusCode === 200) {
            // 缓存图片
            try {
              wx.setStorageSync(`img_cache_${this.data.src}`, res.tempFilePath);
            } catch (e) {
              console.warn('图片缓存失败:', e);
            }
            
            this.setData({
              imageSrc: res.tempFilePath,
              isLoaded: true
            });
          } else {
            this.handleError();
          }
        },
        fail: () => {
          this.handleError();
        }
      });
    },

    // 处理加载错误
    handleError() {
      this.setData({
        isError: true,
        imageSrc: this.data.placeholder
      });
    },

    // 图片加载完成
    onImageLoad() {
      this.setData({
        isLoaded: true
      });
      this.triggerEvent('load');
    },

    // 图片加载失败
    onImageError() {
      this.handleError();
      this.triggerEvent('error');
    },

    // 点击事件
    onImageTap() {
      this.triggerEvent('tap');
    }
  }
});