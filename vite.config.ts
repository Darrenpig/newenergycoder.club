import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // 确保只加载单实例的 React，避免依赖中重复引入导致运行时异常
    dedupe: ["react", "react-dom"],
  },
  server: {
    // 配置静态文件服务，允许访问docs目录
    fs: {
      allow: ['..', 'docs']
    },
    proxy: {
      // 高德地图API代理配置
      '/_AMapService': {
        target: 'https://restapi.amap.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/_AMapService/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, _req, _res) => {
            // 添加安全密钥到请求参数
            const url = new URL(proxyReq.path || '', 'https://restapi.amap.com')
            url.searchParams.append('jscode', '56b9003040769f3afb14593ca6c4a8ae')
            proxyReq.path = url.pathname + url.search
          })
        }
      }
    }
  },
  // 配置静态文件服务
  publicDir: 'public',
  assetsInclude: ['**/*.md'],
  build: {
    // 启用代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-avatar', '@radix-ui/react-checkbox', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-label', '@radix-ui/react-progress', '@radix-ui/react-radio-group', '@radix-ui/react-select', '@radix-ui/react-separator', '@radix-ui/react-slot', '@radix-ui/react-tabs', '@radix-ui/react-toast', '@radix-ui/react-tooltip', 'lucide-react', 'class-variance-authority', 'clsx', 'tailwind-merge'],
          'framer-motion': ['framer-motion'],
          'markdown': ['react-markdown', 'react-syntax-highlighter', 'remark-gfm'],
        }
      }
    },
    // 启用压缩
    minify: 'terser',
    // 移除 console 和 debugger
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // 启用 gzip 压缩提示
    reportCompressedSize: true,
    // 设置 chunk 大小警告限制 (KB) - 调整以适应当前文件大小
    chunkSizeWarningLimit: 1000,
    // 优化构建性能
    target: 'esnext',
    sourcemap: false,
    // CSS 代码分割
    cssCodeSplit: true,
    // 预加载模块
    modulePreload: {
      polyfill: true
    },
    // 资源内联阈值
    assetsInlineLimit: 4096,
  }
})
