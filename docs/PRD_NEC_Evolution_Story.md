# NEC 演进历程叙事页面 - 产品需求文档 (PRD)

## 1. 项目概述

### 1.1 背景
新能源程序员俱乐部 (NEC) 需要一个沉浸式的叙事页面，展示从成立至今的重要里程碑、技术演进和社区成长历程。通过 GSAP ScrollTrigger 驱动的叙事式布局，让访客能够像阅读故事一样了解 NEC 的发展轨迹。

### 1.2 目标
- 创建沉浸式的时间线叙事体验
- 通过视觉化方式展示 NEC 的关键里程碑
- 提升品牌故事的信息吸引力和情感共鸣
- 确保在各种设备上的完美响应式体验

### 1.3 目标受众
- 潜在社区成员
- 合作伙伴和赞助商
- 新能源领域开发者
- 技术爱好者

---

## 2. 设计愿景

### 2.1 设计理念
**"能量流动，代码生长"** - 以新能源的流动性和代码的生命力为灵感，创造一个动态、有机、充满能量的叙事体验。

### 2.2 视觉风格
- **主色调**: NEC 品牌绿 (`#10B981`) + 深色科技蓝 (`#0F172A`)
- **辅助色**: 渐变金 (`#F59E0B` → `#FBBF24`) 表示里程碑高光
- **能量线**: 贯穿全页的发光曲线，象征 NEC 的成长轨迹
- **粒子效果**: 代表社区成员和数据流动的微小光点

### 2.3 叙事结构
```
序幕 (Hero) → 萌芽期 (2023) → 成长期 (2024) → 繁荣期 (2025) → 未来愿景
```

---

## 3. 技术架构

### 3.1 核心技术栈
```typescript
// 新增依赖
"gsap": "^3.12.5"
"@gsap/react": "^2.1.1"

// 现有依赖（已具备）
"react": "^18.3.1"
"framer-motion": "^12.23.14"
"tailwindcss": "^3.4.1"
```

### 3.2 组件架构
```
EvolutionStoryPage/
├── StoryHero.tsx           # 沉浸式开场动画
├── EnergyLine.tsx          # 贯穿全页的能量线动画
├── MilestoneSection.tsx    # 里程碑章节容器
│   ├── MilestoneCard.tsx   # 单个里程碑卡片
│   └── ParticleField.tsx   # 粒子背景效果
├── TimelineNavigation.tsx  # 时间线导航锚点
├── StoryFooter.tsx         # 故事结尾 CTA
└── hooks/
    ├── useScrollProgress.ts    # 滚动进度追踪
    ├── useParallax.ts          # 视差效果
    └── useReducedMotion.ts     # 无障碍适配
```

### 3.3 GSAP ScrollTrigger 配置
```typescript
// 核心动画配置
const scrollConfig = {
  // 平滑滚动
  smoothScroll: {
    duration: 1.2,
    ease: "power2.out"
  },
  
  // 固定章节
  pinSections: {
    trigger: ".milestone-section",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1)
  },
  
  // 视差层级
  parallaxLayers: [
    { speed: 0.2, elements: '.bg-layer' },
    { speed: 0.5, elements: '.mid-layer' },
    { speed: 1.0, elements: '.fg-layer' }
  ]
};
```

---

## 4. 页面结构详解

### 4.1 Hero 序幕区
**功能**: 吸引用户进入故事

**视觉元素**:
- 全屏渐变背景（深蓝到品牌绿）
- 中央发光 Logo 脉动动画
- 副标题逐字打字机效果
- 滚动指示器（弹跳箭头）

**动画序列**:
```
0.0s - 背景渐变淡入
0.5s - Logo 从中心缩放出现 + 发光效果
1.0s - 主标题文字从下方滑入
1.5s - 副标题打字机效果
2.5s - 滚动指示器淡入 + 持续弹跳
```

**交互**:
- 点击滚动指示器平滑滚动到第一章
- 鼠标移动产生微妙视差

---

### 4.2 能量时间线 (Energy Timeline)
**功能**: 贯穿全页的视觉主线

**设计**:
- SVG 曲线路径，随滚动绘制
- 路径颜色从蓝到绿渐变
- 节点光晕效果在到达视口时激活
- 粒子沿路径流动动画

**技术实现**:
```typescript
// SVG 路径绘制动画
const pathAnimation = {
  trigger: ".timeline-path",
  start: "top 80%",
  end: "bottom 20%",
  scrub: true,
  onUpdate: (self) => {
    // 根据滚动进度绘制路径
    path.style.strokeDashoffset = totalLength * (1 - self.progress);
  }
};
```

---

### 4.3 里程碑章节

#### 章节 1: 萌芽期 (2023 Q1-Q2)
**主题**: "从零到一"

**内容**:
- 2023年1月: 创始团队组建
- 2023年3月: 第一次线下 Meetup (10人)
- 2023年5月: GitHub 组织创建
- 2023年6月: 首个开源项目发布

**视觉设计**:
- 左侧：手绘风格的代码编辑器插图
- 右侧：卡片式时间线
- 背景：淡淡的电路板纹理
- 能量线：从细到粗，颜色偏冷

**ScrollTrigger 动画**:
```typescript
// 卡片依次进入
gsap.from(".milestone-card", {
  scrollTrigger: {
    trigger: ".chapter-2023",
    start: "top 60%",
    end: "center center",
    scrub: 1
  },
  y: 100,
  opacity: 0,
  stagger: 0.2,
  rotateX: 15
});
```

#### 章节 2: 成长期 (2023 Q3 - 2024 Q2)
**主题**: "社区发芽"

**内容**:
- 2023年8月: 成员突破 50 人
- 2023年10月: 第一次技术 Workshop
- 2024年1月: 官方网站 V1 上线
- 2024年3月: 与高校建立合作
- 2024年5月: 首个企业赞助

**视觉设计**:
- 中心放射状布局
- 成员头像云动态聚合
- 数据可视化：增长曲线动画
- 能量线：变粗变亮，出现分支

**特色动画**:
- 数字计数器动画 (0 → 50+)
- 成员头像从四周飞向中心
- 合作 Logo 依次点亮

#### 章节 3: 繁荣期 (2024 Q3 - 2025)
**主题**: "能量爆发"

**内容**:
- 2024年7月: 成员突破 200 人
- 2024年9月: 新能源黑客松
- 2024年11月: 技术博客发布
- 2025年1月: AI 助手上线
- 2025年3月: 国际化启动

**视觉设计**:
- 全屏沉浸式布局
- 3D 卡片堆叠效果
- 实时数据仪表盘风格
- 能量线：最粗最亮，形成网络状

**高级动画**:
- 3D 卡片翻转展示详情
- 数据仪表盘指针摆动
- 黑客松照片墙瀑布流

#### 章节 4: 未来愿景
**主题**: "无限可能"

**内容**:
- 2025年目标：500+ 成员
- 愿景：连接 1000+ 新能源开发者
- 使命：推动可持续发展技术创新

**视觉设计**:
- 星空背景 + 地球轮廓
- 粒子汇聚成 NEC Logo
- 无限符号 ∞ 动画

---

### 4.4 时间线导航
**功能**: 快速跳转到不同章节

**设计**:
- 右侧悬浮圆点导航
- 当前章节高亮显示
- 悬停显示章节标题
- 点击平滑滚动

**响应式**:
- 桌面：右侧悬浮
- 平板：底部横条
- 移动：隐藏（使用原生滚动）

---

## 5. 响应式设计规范

### 5.1 断点策略
```typescript
const breakpoints = {
  mobile: "320px - 639px",     // 单列，简化动画
  tablet: "640px - 1023px",    // 双列，保留核心动画
  desktop: "1024px - 1439px",  // 完整体验
  wide: "1440px+"              // 增强视觉效果
};
```

### 5.2 各端适配策略

#### 移动端 (< 640px)
```
布局:
- 单列垂直布局
- 时间线移至左侧
- 卡片全宽显示

动画调整:
- 禁用复杂视差
- 简化粒子效果（最多 20 个）
- 缩短动画时长 50%
- 禁用 3D 变换

交互:
- 触摸滑动主导
- 底部固定导航
- 点击展开详情
```

#### 平板端 (640px - 1023px)
```
布局:
- 双列交替布局
- 时间线居中
- 卡片 80% 宽度

动画调整:
- 保留核心滚动动画
- 粒子数量减少 50%
- 视差强度降低
```

#### 桌面端 (1024px+)
```
完整体验:
- 三列丰富布局
- 完整视差效果
- 全部粒子效果
- 3D 变换启用
```

### 5.3 性能优化
```typescript
// 条件性加载动画
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// 移动端检测
const isMobile = window.innerWidth < 640;

// 动态调整
if (prefersReducedMotion || isMobile) {
  // 使用简单淡入淡出
  gsap.globalTimeline.timeScale(2); // 加速动画
}
```

---

## 6. 动画规范

### 6.1 缓动函数
```typescript
const easings = {
  // 入场
  enter: "power3.out",
  // 出场
  exit: "power2.in",
  // 弹性
  bounce: "elastic.out(1, 0.5)",
  // 平滑
  smooth: "power2.inOut",
  // 戏剧性
  dramatic: "expo.inOut"
};
```

### 6.2 时长规范
```typescript
const durations = {
  micro: 0.15,      // 微交互
  fast: 0.3,        // 快速反馈
  normal: 0.6,      // 标准动画
  slow: 1.0,        // 强调动画
  dramatic: 1.5     // 场景切换
};
```

### 6.3 交错延迟
```typescript
const staggers = {
  tight: 0.05,      // 紧凑列表
  normal: 0.1,      // 标准卡片
  loose: 0.2        // 重要元素
};
```

---

## 7. 数据结构

### 7.1 里程碑数据
```typescript
interface Milestone {
  id: string;
  date: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  type: 'milestone' | 'achievement' | 'event' | 'project';
  icon: string;
  stats?: {
    label: string;
    value: number;
    suffix?: string;
  };
  images?: string[];
  links?: {
    label: string;
    url: string;
  }[];
  tags: string[];
}

interface Chapter {
  id: string;
  period: string;
  theme: string;
  themeEn: string;
  color: string;
  milestones: Milestone[];
}

const evolutionData: Chapter[] = [
  {
    id: "chapter-2023",
    period: "2023",
    theme: "从零到一",
    themeEn: "From Zero to One",
    color: "#3B82F6",
    milestones: [
      {
        id: "m-2023-01",
        date: "2023-01",
        title: "创始团队组建",
        titleEn: "Founding Team Formed",
        description: "5位来自不同高校的新能源爱好者汇聚一堂...",
        type: "milestone",
        icon: "Users",
        tags: ["founding", "team"]
      },
      // ...
    ]
  },
  // ...
];
```

---

## 8. 无障碍设计

### 8.1 减少动画偏好
```typescript
// 检测用户偏好
const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  
  return reduced;
};
```

### 8.2 键盘导航
- 所有交互元素可通过 Tab 访问
- Enter/Space 触发点击
- 方向键在时间线间导航
- ESC 关闭模态框

### 8.3 屏幕阅读器
- 语义化 HTML 结构
- ARIA 标签完整
- 动态内容 aria-live 通知
- 跳过导航链接

---

## 9. 性能指标

### 9.1 目标性能
```
LCP (最大内容绘制): < 2.5s
FID (首次输入延迟): < 100ms
CLS (累积布局偏移): < 0.1
FCP (首次内容绘制): < 1.5s
```

### 9.2 优化策略
```typescript
// 1. 代码分割
const EvolutionStoryPage = lazy(() => 
  import('./pages/EvolutionStoryPage')
);

// 2. 图片懒加载
const MilestoneImage = ({ src, alt }) => (
  <img 
    src={src} 
    alt={alt}
    loading="lazy"
    decoding="async"
  />
);

// 3. 动画性能
// 使用 transform 和 opacity
// 添加 will-change 提示
// 使用 Intersection Observer 触发动画
```

---

## 10. 实现步骤

### Phase 1: 基础设施 (第 1-2 天)
- [ ] 安装 GSAP 和相关依赖
- [ ] 创建基础组件架构
- [ ] 配置 ScrollTrigger 全局设置
- [ ] 搭建响应式断点系统

### Phase 2: 核心组件 (第 3-5 天)
- [ ] 实现 StoryHero 组件
- [ ] 开发 EnergyLine SVG 动画
- [ ] 创建 MilestoneCard 组件
- [ ] 实现 TimelineNavigation

### Phase 3: 内容填充 (第 6-7 天)
- [ ] 整理 NEC 历史里程碑数据
- [ ] 准备图片和图标资源
- [ ] 编写中英文文案
- [ ] 配置 i18n 翻译

### Phase 4: 响应式适配 (第 8-9 天)
- [ ] 移动端布局优化
- [ ] 平板端适配
- [ ] 动画性能优化
- [ ] 无障碍支持

### Phase 5: 测试与优化 (第 10 天)
- [ ] 跨浏览器测试
- [ ] 性能测试
- [ ] 用户体验测试
- [ ] Bug 修复

---

## 11. 文件结构

```
src/
├── pages/
│   └── EvolutionStoryPage.tsx
├── components/
│   └── evolution/
│       ├── StoryHero.tsx
│       ├── EnergyLine.tsx
│       ├── MilestoneSection.tsx
│       ├── MilestoneCard.tsx
│       ├── ParticleField.tsx
│       ├── TimelineNavigation.tsx
│       └── StoryFooter.tsx
├── hooks/
│   ├── useScrollProgress.ts
│   ├── useParallax.ts
│   ├── useReducedMotion.ts
│   └── useInView.ts
├── data/
│   └── evolutionData.ts
├── styles/
│   └── evolution.css
└── lib/
    └── gsap.ts
```

---

## 12. 风险评估

| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| GSAP 学习曲线 | 中 | 中 | 提前准备示例代码，预留学习时间 |
| 性能问题 | 中 | 高 | 使用 Intersection Observer，条件加载 |
| 移动端适配复杂 | 高 | 中 | 优先完成移动端，渐进增强 |
| 内容不足 | 低 | 高 | 提前收集历史资料，准备备选方案 |

---

## 13. 附录

### 13.1 参考资源
- [GSAP ScrollTrigger 文档](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Awwwards 叙事网站案例](https://www.awwwards.com/websites/?text=storytelling)
- [Web 动画无障碍指南](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)

### 13.2 设计稿链接
- Figma: [待补充]
- 原型: [待补充]

---

**文档版本**: v1.0  
**最后更新**: 2026-02-18  
**作者**: AI Assistant  
**状态**: 待评审
