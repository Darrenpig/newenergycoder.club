// GSAP 配置与导出
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// 注册插件
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// 全局配置
gsap.config({
  nullTargetWarn: false,
})

// 根据用户偏好设置动画速度
const prefersReducedMotion = typeof window !== 'undefined' && 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (prefersReducedMotion) {
  gsap.globalTimeline.timeScale(10) // 大幅减少动画时长
}

// 响应式配置
export const getResponsiveConfig = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 640 && window.innerWidth < 1024
  
  return {
    isMobile,
    isTablet,
    isDesktop: typeof window !== 'undefined' && window.innerWidth >= 1024,
    // 根据设备调整动画强度
    parallaxIntensity: isMobile ? 0.3 : isTablet ? 0.6 : 1,
    staggerDelay: isMobile ? 0.05 : 0.1,
    duration: isMobile ? 0.4 : 0.6,
  }
}

// 默认缓动函数
export const easings = {
  enter: 'power3.out',
  exit: 'power2.in',
  bounce: 'elastic.out(1, 0.5)',
  smooth: 'power2.inOut',
  dramatic: 'expo.inOut',
}

// 时长配置
export const durations = {
  micro: 0.15,
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  dramatic: 1.5,
}

// 默认导出
gsap.defaults({
  ease: 'power2.out',
  duration: 0.6,
})

export { gsap, ScrollTrigger }
export default gsap
