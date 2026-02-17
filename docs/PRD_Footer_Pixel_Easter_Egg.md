# Footer 隐藏彩蛋 - 像素切割特效 PRD

## 1. 项目概述

### 1.1 概念
在 NEC 官网 Footer 区域植入一个**隐藏互动彩蛋**，当用户发现特定触发方式后，激活**像素切割特效**。鼠标移动如同"光剑"般切割 Footer 内容，露出下方隐藏的像素化 NEC 品牌世界，进一步强化品牌"像素化"的视觉 DNA。

### 1.2 设计哲学
**"代码即魔法，像素即原子"** - 每个像素都是构成数字世界的基本单元，正如每行代码都是构建 NEC 社区的基石。通过解构与重组的视觉隐喻，表达"从零到一"的创新精神。

### 1.3 目标
- 创造令人惊喜的品牌记忆点
- 强化 NEC "像素化/代码化" 视觉识别
- 提升用户停留时长和分享欲望
- 展示技术实力（Canvas/WebGL 能力）

---

## 2. 触发机制设计

### 2.1 触发方式（隐藏但可发现）

#### 方案 A:  Konami 代码变体（推荐）
```
键盘序列: ↑ ↑ ↓ ↓ ← → ← → B A
触发区域: 任意位置（经典游戏梗）
```

#### 方案 B: Logo 密文点击
```
触发条件: 连续点击 Footer Logo 5 次
视觉反馈: 第3次点击时 Logo 轻微抖动提示
```

#### 方案 C: 代码括号咒语
```
触发条件: 按顺序点击 Footer 中的 "{" "}" "{" "}" "NEC"
视觉反馈: 每次正确点击括号发光，错误重置
```

### 2.2 最终选择: 组合触发（三层难度）

| 层级 | 触发方式 | 解锁内容 | 目标用户 |
|------|----------|----------|----------|
| **Level 1** | 双击 Footer Logo | 简单像素化滤镜 | 普通访客 |
| **Level 2** | 5秒内点击 `{ } { } NEC` | 完整像素切割模式 | 细心用户 |
| **Level 3** | Konami 代码 | 隐藏成就 + 特殊粒子效果 | 游戏玩家 |

---

## 3. 视觉设计

### 3.1 特效概述

```
┌─────────────────────────────────────────────────────┐
│                    Footer 正常状态                    │
│  ┌─────┐  New Energy Coder Club                      │
│  │Logo │  { 代码塑造未来的能源世界 }                   │
│  └─────┘                                             │
│                                                      │
│  [导航链接] [联系方式] [社交媒体]                     │
└─────────────────────────────────────────────────────┘
                           ↓ 鼠标滑动
┌─────────────────────────────────────────────────────┐
│                    像素切割模式                       │
│  ┌─░─┐  N░w E░e░g░y C░d░r C░u░                    │
│  ░█░█░  ░░░░░░░░░░░░░░░░░░░░░░░                     │
│  └─░─┘  { ░░塑造░░来░░能源世界 }                     │
│                                                      │
│  ░░░░░░░░░ ░░░░░░░ ░░░░░░░░░░                       │
│      ↑ 鼠标轨迹留下切割痕迹                          │
│                                                      │
│  [底层露出: 8-bit 风格 NEC 像素世界]                  │
└─────────────────────────────────────────────────────┘
```

### 3.2 分层结构

```
Layer 3 (前景): 切割后的像素碎片（物理下落）
Layer 2 (中层): 鼠标光剑效果（发光轨迹）
Layer 1 (表层): Footer 内容（可被切割）
Layer 0 (背景): 8-bit 像素世界（隐藏内容）
```

### 3.3 色彩方案

**光剑颜色（跟随鼠标）:**
```css
--saber-primary: #10B981;    /* NEC 品牌绿 */
--saber-core: #FFFFFF;       /* 白热核心 */
--saber-glow: rgba(16, 185, 129, 0.6);  /* 光晕 */
```

**像素碎片:**
```css
--pixel-size: 8px;           /* 基础像素大小 */
--pixel-gap: 1px;            /* 像素间隙 */
--fragment-colors: [
  '#10B981', '#059669', '#047857',  /* 绿色系 */
  '#3B82F6', '#2563EB', '#1D4ED8',  /* 蓝色系 */
  '#F59E0B', '#D97706'              /* 点缀金色 */
];
```

**背景像素世界:**
- 8-bit 风格 NEC Logo
- 复古游戏机风格的代码雨
- 像素化太阳能板和风车动画

### 3.4 动画参数

```typescript
const PIXEL_EFFECT_CONFIG = {
  // 像素网格
  gridSize: 8,                    // 8x8px 像素块
  
  // 切割效果
  cutRadius: 60,                  // 光剑切割半径
  cutSmoothness: 0.3,             // 边缘平滑度
  
  // 物理效果
  gravity: 0.5,                   // 碎片下落速度
  bounce: 0.3,                    // 反弹系数
  friction: 0.98,                 // 空气阻力
  
  // 视觉
  glowIntensity: 20,              // 发光强度
  particleLife: 2000,             // 碎片存活时间(ms)
  
  // 恢复
  restoreDelay: 5000,             // 5秒后自动恢复
  restoreDuration: 1000           // 恢复动画时长
};
```

---

## 4. 技术架构

### 4.1 技术选型

```typescript
// 核心方案: HTML Canvas API
// 备选方案: WebGL (Three.js) - 用于 Level 3 高级效果

interface PixelEngine {
  // 初始化 Footer 像素映射
  initPixelMap(): PixelGrid;
  
  // 渲染循环
  render(): void;
  
  // 切割检测
  cut(x: number, y: number, radius: number): CutResult;
  
  // 物理模拟
  updatePhysics(deltaTime: number): void;
  
  // 恢复动画
  restore(): Promise<void>;
}
```

### 4.2 组件架构

```
Footer/
├── Footer.tsx                    # 主组件
├── PixelEasterEgg/
│   ├── PixelCanvas.tsx           # Canvas 画布层
│   ├── PixelRenderer.ts          # 渲染引擎
│   ├── PhysicsEngine.ts          # 物理模拟
│   ├── PixelFragment.ts          # 像素碎片类
│   ├── LightSaberCursor.tsx      # 光剑光标
│   ├── TriggerDetector.tsx       # 触发检测
│   └── RetroPixelWorld.tsx       # 8-bit 背景世界
├── hooks/
│   ├── usePixelGrid.ts           # 像素网格管理
│   ├── usePhysics.ts             # 物理引擎 Hook
│   └── useEasterEggTrigger.ts    # 彩蛋触发管理
└── utils/
    ├── pixelUtils.ts             # 像素处理工具
    └── konamiCode.ts             # Konami 代码检测
```

### 4.3 核心算法

#### 4.3.1 像素切割算法
```typescript
class PixelCutEngine {
  private grid: PixelGrid;
  private fragments: PixelFragment[] = [];
  
  /**
   * 执行像素切割
   * @param centerX 切割中心 X
   * @param centerY 切割中心 Y
   * @param radius 切割半径
   */
  cut(centerX: number, centerY: number, radius: number): void {
    const affectedPixels = this.grid.getPixelsInRadius(centerX, centerY, radius);
    
    affectedPixels.forEach(pixel => {
      if (!pixel.isCut && this.shouldCutPixel(pixel, centerX, centerY)) {
        // 创建碎片
        const fragment = new PixelFragment({
          x: pixel.x,
          y: pixel.y,
          color: pixel.color,
          size: this.grid.cellSize,
          // 随机初始速度（爆炸效果）
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10 - 5, // 向上爆炸
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2
        });
        
        this.fragments.push(fragment);
        pixel.isCut = true;
      }
    });
    
    this.createCutGlow(centerX, centerY, radius);
  }
  
  /**
   * 判断像素是否应该被切割（基于边缘检测）
   */
  private shouldCutPixel(pixel: Pixel, cx: number, cy: number): boolean {
    // 圆形切割区域
    const dx = pixel.centerX - cx;
    const dy = pixel.centerY - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // 添加噪声使边缘更自然
    const noise = Math.random() * 5;
    return distance < (this.cutRadius + noise);
  }
}
```

#### 4.3.2 物理引擎
```typescript
class PhysicsEngine {
  update(fragments: PixelFragment[], deltaTime: number): void {
    fragments.forEach(fragment => {
      // 重力
      fragment.vy += CONFIG.gravity;
      
      // 空气阻力
      fragment.vx *= CONFIG.friction;
      fragment.vy *= CONFIG.friction;
      
      // 更新位置
      fragment.x += fragment.vx * deltaTime;
      fragment.y += fragment.vy * deltaTime;
      
      // 旋转
      fragment.rotation += fragment.rotationSpeed * deltaTime;
      
      // 边界碰撞
      if (fragment.y > this.boundary.bottom) {
        fragment.y = this.boundary.bottom;
        fragment.vy *= -CONFIG.bounce;
        fragment.vx *= 0.8; // 地面摩擦
      }
      
      // 生命周期
      fragment.life -= deltaTime;
      fragment.opacity = Math.max(0, fragment.life / CONFIG.particleLife);
    });
    
    // 移除死亡碎片
    fragments = fragments.filter(f => f.life > 0);
  }
}
```

#### 4.3.3 Footer 到像素的转换
```typescript
/**
 * 将 DOM 元素转换为像素网格
 */
async function domToPixelGrid(element: HTMLElement): Promise<PixelGrid> {
  // 1. 使用 html2canvas 或 dom-to-image 截图
  const canvas = await html2canvas(element, {
    scale: 1, // 降低分辨率以提高性能
    backgroundColor: null
  });
  
  // 2. 获取像素数据
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  // 3. 降采样为像素块
  const grid = new PixelGrid({
    width: Math.ceil(canvas.width / CONFIG.gridSize),
    height: Math.ceil(canvas.height / CONFIG.gridSize),
    cellSize: CONFIG.gridSize
  });
  
  // 4. 填充像素数据
  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      const pixel = extractPixelColor(imageData, x, y, CONFIG.gridSize);
      grid.setPixel(x, y, pixel);
    }
  }
  
  return grid;
}
```

---

## 5. 交互设计

### 5.1 状态机

```typescript
type EasterEggState = 
  | 'IDLE'           // 正常状态
  | 'HINTED'         // 提示发现（第3次点击 Logo 抖动）
  | 'ACTIVATING'     // 激活中（过渡动画）
  | 'ACTIVE'         // 像素切割模式
  | 'RESTORING';     // 恢复中

const stateTransitions = {
  IDLE: {
    onLogoDoubleClick: 'ACTIVATING',
    onBracketSequence: 'ACTIVATING',
    onKonamiCode: 'ACTIVATING'
  },
  HINTED: {
    onLogoDoubleClick: 'ACTIVATING'
  },
  ACTIVATING: {
    onAnimationComplete: 'ACTIVE'
  },
  ACTIVE: {
    onTimeout: 'RESTORING',
    onClickRestore: 'RESTORING'
  },
  RESTORING: {
    onAnimationComplete: 'IDLE'
  }
};
```

### 5.2 鼠标交互

```typescript
interface MouseInteraction {
  // 移动切割
  onMove: (x: number, y: number) => void;
  
  // 点击爆炸（大范围切割）
  onClick: (x: number, y: number) => void;
  
  // 拖拽连续切割
  onDrag: (path: Point[]) => void;
  
  // 右键菜单（彩蛋提示）
  onRightClick: () => ContextMenu;
}

// 切割轨迹平滑
function smoothCutPath(points: Point[]): Point[] {
  // 使用 Catmull-Rom 样条曲线平滑
  return catmullRomSpline(points, { tension: 0.5 });
}
```

### 5.3 键盘快捷键（彩蛋模式下）

| 按键 | 功能 |
|------|------|
| `R` | 重置/恢复 Footer |
| `S` | 截图保存当前像素艺术 |
| `+` | 增大像素块 |
| `-` | 减小像素块 |
| `Esc` | 退出彩蛋模式 |
| `Space` | 全局爆炸效果 |

---

## 6. 视觉效果详解

### 6.1 激活过渡动画 (0.5s)

```
0.00s - 屏幕闪烁白光
0.10s - Footer 内容抖动（模拟信号干扰）
0.20s - 像素网格覆盖层淡入
0.30s - 光剑光标出现（从中心缩放）
0.50s - 背景 8-bit 世界渐显
```

### 6.2 光剑光标设计

```typescript
const lightsaberCursor = {
  // 核心光剑
  core: {
    width: 4,
    color: '#FFFFFF',
    blur: 0
  },
  // 内发光
  innerGlow: {
    width: 12,
    color: '#10B981',
    blur: 8
  },
  // 外发光
  outerGlow: {
    width: 30,
    color: 'rgba(16, 185, 129, 0.3)',
    blur: 20
  },
  // 挥舞轨迹
  trail: {
    length: 20,
    decay: 0.9,
    points: [] as Point[]
  }
};
```

### 6.3 8-bit 背景世界

```typescript
const retroWorld = {
  // 像素化 NEC Logo（巨大化）
  logo: {
    scale: 3,
    bobbing: true,      // 上下浮动
    rotation: 'slow'    // 缓慢旋转
  },
  
  // 代码雨效果（Matrix 风格但彩色）
  codeRain: {
    chars: ['0', '1', '{', '}', '<', '>', '/', '='],
    colors: ['#10B981', '#3B82F6', '#F59E0B'],
    speed: 2,
    density: 0.3
  },
  
  // 像素风车（新能源元素）
  windmill: {
    x: '20%',
    y: '60%',
    rotationSpeed: 0.02,
    bladeColor: '#10B981'
  },
  
  // 像素太阳能板
  solarPanel: {
    x: '80%',
    y: '70%',
    shimmer: true  // 闪光效果
  },
  
  // 漂浮的云朵（像素风格）
  clouds: [
    { x: 10, y: 20, speed: 0.5 },
    { x: 60, y: 15, speed: 0.3 },
    { x: 85, y: 25, speed: 0.7 }
  ]
};
```

### 6.4 碎片物理效果

| 属性 | 值 | 说明 |
|------|-----|------|
| 初始爆炸速度 | 5-15 px/frame | 随机方向 |
| 重力加速度 | 0.5 px/frame² | 模拟真实下落 |
| 旋转速度 | -0.1 ~ 0.1 rad/frame | 随机旋转 |
| 生命周期 | 2000-3000 ms | 渐变消失 |
| 碰撞反弹 | 0.3 | 弹性系数 |

---

## 7. 响应式与性能

### 7.1 响应式策略

```typescript
const responsiveConfig = {
  mobile: {
    gridSize: 12,           // 更大像素块
    maxFragments: 100,      // 限制碎片数量
    disablePhysics: true,   // 简化物理
    trigger: 'doubleTap'    // 双击触发
  },
  tablet: {
    gridSize: 10,
    maxFragments: 300,
    disablePhysics: false,
    trigger: 'doubleClick'
  },
  desktop: {
    gridSize: 8,
    maxFragments: 500,
    disablePhysics: false,
    trigger: 'all'          // 所有触发方式
  }
};
```

### 7.2 性能优化

```typescript
// 1. 使用 OffscreenCanvas（Web Worker）
const worker = new Worker('pixelWorker.js');

// 2. 节流渲染
const throttledRender = throttle(render, 1000 / 60); // 60fps

// 3. 对象池复用碎片
const fragmentPool = new ObjectPool<PixelFragment>({
  initialSize: 100,
  maxSize: 500,
  factory: () => new PixelFragment()
});

// 4. 仅渲染变化区域
const dirtyRect = new DirtyRectManager();

// 5. 检测低性能设备
const isLowEnd = navigator.hardwareConcurrency <= 4;
if (isLowEnd) {
  CONFIG.gridSize *= 2;  // 降低分辨率
}
```

### 7.3 性能指标

```
目标帧率: 60 FPS
内存占用: < 50 MB
初始化时间: < 500 ms
GPU 占用: < 30%（中端设备）
```

---

## 8. 无障碍设计

### 8.1 减少动画偏好

```typescript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  // 禁用物理动画，使用即时切换
  CONFIG.animations = false;
  CONFIG.transitions = 'instant';
}
```

### 8.2 键盘可访问

```
Tab       -> 聚焦 Footer
Shift+F10 -> 右键菜单（彩蛋提示）
Enter     -> 激活聚焦的元素
Esc       -> 退出彩蛋模式
```

### 8.3 屏幕阅读器

```tsx
<div 
  role="button"
  aria-label="发现隐藏彩蛋 - 双击激活像素切割特效"
  aria-pressed={isActive}
  onDoubleClick={activate}
>
  <Logo />
</div>

// 彩蛋激活通知
{isActive && (
  <div role="status" aria-live="polite" className="sr-only">
    像素切割模式已激活，鼠标移动可切割 Footer 内容
  </div>
)}
```

---

## 9. 数据结构

### 9.1 像素网格

```typescript
interface PixelGrid {
  width: number;           // 网格宽度（像素块数）
  height: number;          // 网格高度
  cellSize: number;        // 每个像素块大小
  pixels: Pixel[][];       // 二维像素数组
}

interface Pixel {
  x: number;              // 网格坐标 X
  y: number;              // 网格坐标 Y
  centerX: number;        // 实际像素中心 X
  centerY: number;        // 实际像素中心 Y
  color: ColorRGBA;       // 颜色值
  isCut: boolean;         // 是否被切割
  isEdge: boolean;        // 是否为边缘像素
  originalPosition: {     // 原始位置（用于恢复）
    x: number;
    y: number;
  };
}
```

### 9.2 像素碎片

```typescript
interface PixelFragment {
  // 位置
  x: number;
  y: number;
  
  // 速度
  vx: number;
  vy: number;
  
  // 旋转
  rotation: number;
  rotationSpeed: number;
  
  // 外观
  color: string;
  size: number;
  opacity: number;
  
  // 生命周期
  life: number;
  maxLife: number;
  
  // 物理属性
  mass: number;
  elasticity: number;
  
  update(deltaTime: number): void;
  render(ctx: CanvasRenderingContext2D): void;
}
```

### 9.3 切割轨迹

```typescript
interface CutPath {
  points: Point[];        // 轨迹点
  timestamp: number;      // 创建时间
  intensity: number;      // 切割强度
  glowColor: string;      // 光晕颜色
}

interface Point {
  x: number;
  y: number;
  pressure?: number;      // 压力值（用于笔触粗细）
  timestamp: number;
}
```

---

## 10. API 设计

### 10.1 组件 Props

```typescript
interface PixelEasterEggProps {
  // 触发配置
  trigger: {
    logoDoubleClick?: boolean;
    bracketSequence?: boolean;
    konamiCode?: boolean;
  };
  
  // 视觉效果
  visual: {
    gridSize?: number;
    lightSaberColor?: string;
    backgroundTheme?: 'retro' | 'cyberpunk' | 'matrix';
  };
  
  // 物理参数
  physics: {
    gravity?: number;
    bounce?: number;
    friction?: number;
  };
  
  // 行为
  behavior: {
    autoRestore?: boolean;
    restoreDelay?: number;
    maxFragments?: number;
  };
  
  // 回调
  onActivate?: () => void;
  onDeactivate?: () => void;
  onCut?: (fragmentCount: number) => void;
}
```

### 10.2 Hook API

```typescript
// 使用彩蛋功能
const {
  isActive,           // 是否激活
  activate,           // 手动激活
  deactivate,         // 手动关闭
  cutAt,              // 在指定位置切割
  reset,              // 重置
  fragmentCount,      // 当前碎片数量
  progress            // 切割进度 (0-1)
} = usePixelEasterEgg({
  containerRef,
  config: PIXEL_EFFECT_CONFIG
});
```

---

## 11. 实现步骤

### Phase 1: 基础架构 (2天)
- [ ] 创建 Canvas 基础架构
- [ ] 实现像素网格生成
- [ ] Footer 截图转换功能
- [ ] 基础渲染循环

### Phase 2: 核心特效 (3天)
- [ ] 像素切割算法
- [ ] 物理引擎实现
- [ ] 光剑光标效果
- [ ] 碎片下落动画

### Phase 3: 触发系统 (2天)
- [ ] Logo 双击检测
- [ ] 括号序列追踪
- [ ] Konami 代码监听
- [ ] 状态机管理

### Phase 4: 背景世界 (2天)
- [ ] 8-bit NEC Logo
- [ ] 代码雨效果
- [ ] 像素风车和太阳能板
- [ ] 云朵动画

### Phase 5: 优化与测试 (2天)
- [ ] 响应式适配
- [ ] 性能优化
- [ ] 无障碍支持
- [ ] 跨浏览器测试

---

## 12. 文件结构

```
src/
├── components/
│   └── layout/
│       ├── Footer.tsx
│       └── PixelEasterEgg/
│           ├── index.tsx
│           ├── PixelCanvas.tsx
│           ├── LightSaberCursor.tsx
│           ├── RetroPixelWorld.tsx
│           └── TriggerOverlay.tsx
├── lib/
│   └── pixel/
│       ├── PixelGrid.ts
│       ├── PixelRenderer.ts
│       ├── PhysicsEngine.ts
│       └── PixelFragment.ts
├── hooks/
│   └── usePixelEasterEgg.ts
└── utils/
    ├── konamiCode.ts
    ├── domToPixel.ts
    └── pixelUtils.ts
```

---

## 13. 测试方案

### 13.1 单元测试

```typescript
// 物理引擎测试
describe('PhysicsEngine', () => {
  it('should apply gravity to fragments', () => {
    const fragment = createFragment({ vy: 0 });
    engine.update([fragment], 16);
    expect(fragment.vy).toBe(CONFIG.gravity);
  });
  
  it('should handle boundary collision', () => {
    const fragment = createFragment({ y: 1000, vy: 10 });
    engine.update([fragment], 16);
    expect(fragment.vy).toBeLessThan(0); // 反弹
  });
});

// 切割算法测试
describe('PixelCutEngine', () => {
  it('should cut pixels within radius', () => {
    engine.cut(100, 100, 50);
    const cutPixels = grid.getPixels().filter(p => p.isCut);
    expect(cutPixels.length).toBeGreaterThan(0);
  });
});
```

### 13.2 性能测试

```typescript
// 帧率监控
const fpsMonitor = {
  frames: 0,
  lastTime: performance.now(),
  
  tick() {
    this.frames++;
    const now = performance.now();
    if (now - this.lastTime >= 1000) {
      console.log(`FPS: ${this.frames}`);
      this.frames = 0;
      this.lastTime = now;
    }
  }
};
```

### 13.3 浏览器兼容性

| 浏览器 | 版本 | 支持状态 |
|--------|------|----------|
| Chrome | 90+ | ✅ 完整支持 |
| Firefox | 88+ | ✅ 完整支持 |
| Safari | 14+ | ✅ 完整支持 |
| Edge | 90+ | ✅ 完整支持 |
| IE 11 | - | ❌ 不支持 |

---

## 14. 风险评估

| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| 性能问题（低端设备） | 中 | 高 | 动态降级，降低分辨率 |
| Canvas 跨域问题 | 低 | 高 | 使用 CORS 代理或 SVG 替代 |
| 内存泄漏 | 中 | 中 | 对象池，及时清理碎片 |
| 触发过于隐蔽 | 高 | 低 | 添加微妙的视觉提示 |
| 与现有样式冲突 | 低 | 中 | 严格的作用域隔离 |

---

## 15. 附录

### 15.1 参考资源

- [Pixel Art Tutorial](https://lospec.com/pixel-art-tutorials/)
- [Canvas Performance Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas)
- [Game Physics Engine](https://gafferongames.com/post/integration_basics/)
- [Retro Pixel Font](https://fonts.google.com/specimen/Press+Start+2P)

### 15.2 设计灵感

- **Star Wars 光剑**: 光标发光效果
- **Minecraft**: 像素化美学
- **Matrix 代码雨**: 背景动画
- **Tetris**: 碎片下落与堆叠

### 15.3 备选方案

如果 Canvas 方案性能不佳，可考虑：
1. **CSS Grid + Transform**: 简化版像素效果
2. **WebGL**: Three.js Points 粒子系统
3. **SVG Filters**: feMorphology 像素化滤镜

---

## 16. 验收标准

### 16.1 功能验收

- [ ] 三种触发方式均可正常工作
- [ ] 鼠标移动产生像素切割效果
- [ ] 碎片物理效果自然流畅
- [ ] 5秒后自动恢复或点击恢复
- [ ] 8-bit 背景世界正确显示

### 16.2 性能验收

- [ ] 桌面端 60 FPS 稳定
- [ ] 移动端 30 FPS 以上
- [ ] 内存占用不超过 50MB
- [ ] 初始化时间不超过 500ms

### 16.3 兼容性验收

- [ ] Chrome/Firefox/Safari/Edge 最新两版本
- [ ] iOS Safari 14+
- [ ] Android Chrome 90+
- [ ] 支持触摸和鼠标操作

---

**文档版本**: v1.0  
**最后更新**: 2026-02-18  
**作者**: AI Assistant  
**状态**: 待评审
