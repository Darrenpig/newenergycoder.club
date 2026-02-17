import { useState, useRef, useEffect } from 'react';
import { PixelSliceEffect, PixelTextSlice } from '@/components/PixelSliceEffect';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Zap, 
  RefreshCw, 
  Image as ImageIcon, 
  MousePointer,
  Scroll,
  Play,
  Grid3x3,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type AnimationType = 'explode' | 'dissolve' | 'shuffle' | 'wave' | 'glitch';
type TriggerType = 'hover' | 'click' | 'auto' | 'scroll';

const teamImages = [
  { src: '/image/校门合照.jpg', label: '校门合影', caption: 'NEC 团队在校门口的合影' },
  { src: '/image/横向项目合照.jpg', label: '项目组合影', caption: '项目组成员的珍贵瞬间' },
  { src: '/image/合照1.jpg', label: '团队活动 1', caption: '2024 团队建设活动' },
  { src: '/image/合照2.jpg', label: '团队活动 2', caption: 'ROBOCON 备赛期间' },
];

const animationTypes: { value: AnimationType; label: string; icon: typeof Zap; description: string }[] = [
  { value: 'explode', label: '爆炸扩散', icon: Zap, description: '像素块向外爆炸飞散' },
  { value: 'dissolve', label: '溶解消失', icon: Sparkles, description: '随机溶解消失效果' },
  { value: 'shuffle', label: '打乱重组', icon: RefreshCw, description: '像素打乱后重新组合' },
  { value: 'wave', label: '波浪传递', icon: Scroll, description: '波浪状逐行动画' },
  { value: 'glitch', label: '故障闪烁', icon: Grid3x3, description: '数字故障风格' },
];

export default function PixelSliceDemoPage() {
  const [selectedImage, setSelectedImage] = useState(teamImages[0]);
  const [animationType, setAnimationType] = useState<AnimationType>('explode');
  const [trigger, setTrigger] = useState<TriggerType>('hover');
  const [rows, setRows] = useState(8);
  const [cols, setCols] = useState(8);
  const [duration, setDuration] = useState([1]);
  const [key, setKey] = useState(0); // 用于强制重新渲染
  const scrollRef = useRef<HTMLDivElement>(null);

  // 自动触发演示
  useEffect(() => {
    if (trigger === 'auto') {
      const timer = setTimeout(() => {
        setKey(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [trigger, animationType, rows, cols]);

  const handleReplay = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Grid3x3 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Visual Effects</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                像素切割特效
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              使用 GSAP 驱动的高性能像素级图像切割动画<br/>
              支持多种触发方式和动画效果
            </p>
          </motion.div>

          {/* Pixel Text Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <PixelTextSlice 
              text="PIXEL SLICE" 
              pixelSize={8}
              className="text-5xl md:text-7xl font-black"
              colors={['#3b82f6', '#06b6d4', '#10b981', '#8b5cf6', '#f59e0b']}
            />
          </motion.div>
        </div>
      </section>

      {/* Main Demo Area */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Controls Panel */}
            <motion.div 
              className="space-y-6 lg:sticky lg:top-24 lg:self-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="p-6 rounded-2xl bg-card border border-border/50 space-y-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  效果配置
                </h2>

                {/* Animation Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">动画类型</label>
                  <Select value={animationType} onValueChange={(v) => setAnimationType(v as AnimationType)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {animationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="w-4 h-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {animationTypes.find(t => t.value === animationType)?.description}
                  </p>
                </div>

                {/* Trigger Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">触发方式</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'hover', label: '悬停', icon: MousePointer },
                      { value: 'click', label: '点击', icon: Zap },
                      { value: 'auto', label: '自动', icon: Play },
                      { value: 'scroll', label: '滚动', icon: Scroll },
                    ].map((t) => (
                      <button
                        key={t.value}
                        onClick={() => setTrigger(t.value as TriggerType)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                          trigger === t.value
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        <t.icon className="w-4 h-4" />
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid Size */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-muted-foreground">网格尺寸</label>
                    <span className="text-sm font-mono">{cols} × {rows}</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>列数</span>
                        <span>{cols}</span>
                      </div>
                      <Slider
                        value={[cols]}
                        onValueChange={(v) => setCols(v[0])}
                        min={4}
                        max={16}
                        step={1}
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>行数</span>
                        <span>{rows}</span>
                      </div>
                      <Slider
                        value={[rows]}
                        onValueChange={(v) => setRows(v[0])}
                        min={4}
                        max={12}
                        step={1}
                      />
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-muted-foreground">动画时长</label>
                    <span className="text-sm font-mono">{duration[0]}s</span>
                  </div>
                  <Slider
                    value={duration}
                    onValueChange={setDuration}
                    min={0.3}
                    max={2}
                    step={0.1}
                  />
                </div>

                {/* Replay Button */}
                <Button 
                  onClick={handleReplay} 
                  className="w-full gap-2"
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4" />
                  重新播放
                </Button>
              </div>

              {/* Image Selector */}
              <div className="p-6 rounded-2xl bg-card border border-border/50 space-y-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-primary" />
                  选择图片
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {teamImages.map((img) => (
                    <button
                      key={img.src}
                      onClick={() => setSelectedImage(img)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage.src === img.src
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-transparent hover:border-muted-foreground/30'
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.label}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs">{img.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Preview Area */}
            <motion.div 
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              {/* Main Preview */}
              <div 
                ref={scrollRef}
                className="relative rounded-2xl overflow-hidden border border-border/50 bg-card p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedImage.label}</h3>
                    <p className="text-sm text-muted-foreground">{selectedImage.caption}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Grid3x3 className="w-4 h-4" />
                    <span>{cols} × {rows}</span>
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden bg-muted">
                  <PixelSliceEffect
                    key={`${key}-${animationType}-${trigger}-${rows}-${cols}`}
                    src={selectedImage.src}
                    rows={rows}
                    cols={cols}
                    animationType={animationType}
                    trigger={trigger}
                    duration={duration[0]}
                    className="w-full rounded-xl"
                  />
                </div>

                {/* Grid overlay indicator */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-5"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, currentColor 1px, transparent 1px),
                      linear-gradient(to bottom, currentColor 1px, transparent 1px)
                    `,
                    backgroundSize: `${100 / cols}% ${100 / rows}%`,
                  }}
                />
              </div>

              {/* Multiple Effects Gallery */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {animationTypes.slice(0, 4).map((type, index) => (
                  <motion.div
                    key={type.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="rounded-xl overflow-hidden border border-border/50 bg-card"
                  >
                    <div className="p-3 border-b border-border/50 flex items-center justify-between">
                      <span className="text-sm font-medium">{type.label}</span>
                      <type.icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <PixelSliceEffect
                      src={teamImages[index % teamImages.length].src}
                      rows={6}
                      cols={6}
                      animationType={type.value}
                      trigger="hover"
                      duration={0.8}
                      className="w-full"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Usage Code Example */}
              <div className="rounded-xl bg-muted p-4 font-mono text-sm overflow-x-auto">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                  <span>// 使用示例</span>
                </div>
                <pre className="text-foreground">
{`<PixelSliceEffect
  src="/image/photo.jpg"
  rows={${rows}}
  cols={${cols}}
  animationType="${animationType}"
  trigger="${trigger}"
  duration={${duration[0]}}
/>`}
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">特效特性</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: '高性能渲染',
                desc: '使用 GSAP 驱动，60fps 流畅动画，支持大量像素块同时动画',
              },
              {
                icon: Grid3x3,
                title: '灵活网格',
                desc: '可自定义网格密度，从 4×4 到 16×12，适应不同精度需求',
              },
              {
                icon: MousePointer,
                title: '多种触发',
                desc: '支持悬停、点击、自动播放、滚动触发等多种交互方式',
              },
              {
                icon: RefreshCw,
                title: '5 种动画',
                desc: '爆炸、溶解、打乱、波浪、故障，满足各种视觉需求',
              },
              {
                icon: Sparkles,
                title: '像素文字',
                desc: '额外的像素化文字效果，支持彩色闪烁动画',
              },
              {
                icon: Play,
                title: '易于集成',
                desc: '简单的组件 API，支持回调函数，易于嵌入任何页面',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border/50"
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
