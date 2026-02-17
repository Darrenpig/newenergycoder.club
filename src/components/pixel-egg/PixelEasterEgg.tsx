import { useState, useCallback, useEffect, useRef } from 'react'
import { PixelCanvas } from './PixelCanvas'
import { Sword, X, RefreshCw, Info } from 'lucide-react'

interface PixelEasterEggProps {
  containerRef?: React.RefObject<HTMLElement>
}

type EasterEggState = 'IDLE' | 'HINTED' | 'ACTIVE' | 'RESTORING'

export function PixelEasterEgg({ containerRef: _containerRef }: PixelEasterEggProps = {}) {
  const [state, setState] = useState<EasterEggState>('IDLE')
  const [showInstructions, setShowInstructions] = useState(false)
  const [logoClickCount, setLogoClickCount] = useState(0)
  const bracketSequenceRef = useRef<string[]>([])
  const konamiCodeRef = useRef<string[]>([])
  const resetTimerRef = useRef<NodeJS.Timeout>()

  const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
  const BRACKET_SEQUENCE = ['{', '}', '{', '}', 'N', 'E', 'C']

  // 激活彩蛋
  const activate = useCallback(() => {
    setState('ACTIVE')
    setShowInstructions(true)
    
    // 5秒后自动恢复提示
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    resetTimerRef.current = setTimeout(() => {
      setState('RESTORING')
      setTimeout(() => setState('IDLE'), 500)
    }, 30000)
  }, [])

  // 关闭彩蛋
  const deactivate = useCallback(() => {
    setState('RESTORING')
    setShowInstructions(false)
    setTimeout(() => setState('IDLE'), 500)
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
  }, [])

  // Logo 双击触发
  const handleLogoDoubleClick = useCallback(() => {
    if (state === 'IDLE') {
      activate()
    }
  }, [state, activate])

  // Logo 点击计数（用于提示）
  const handleLogoClick = useCallback(() => {
    setLogoClickCount(prev => {
      const newCount = prev + 1
      if (newCount === 3 && state === 'IDLE') {
        setState('HINTED')
        setTimeout(() => setState('IDLE'), 2000)
        return 0
      }
      // 2秒后重置计数
      setTimeout(() => setLogoClickCount(0), 2000)
      return newCount
    })
  }, [state])

  // 键盘监听（Konami 代码）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Konami 代码检测
      konamiCodeRef.current.push(e.key)
      if (konamiCodeRef.current.length > KONAMI_CODE.length) {
        konamiCodeRef.current.shift()
      }
      if (konamiCodeRef.current.join(',') === KONAMI_CODE.join(',')) {
        activate()
      }

      // ESC 关闭
      if (e.key === 'Escape' && state === 'ACTIVE') {
        deactivate()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activate, deactivate, state])

  // 点击括号检测
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const text = target.textContent?.trim()
      
      if (text && (text === '{' || text === '}' || text === 'NEC' || text === 'N' || text === 'E' || text === 'C')) {
        if (text === 'NEC') {
          bracketSequenceRef.current = ['N', 'E', 'C']
        } else {
          bracketSequenceRef.current.push(text)
        }
        
        if (bracketSequenceRef.current.length > BRACKET_SEQUENCE.length) {
          bracketSequenceRef.current.shift()
        }

        if (JSON.stringify(bracketSequenceRef.current.slice(-BRACKET_SEQUENCE.length)) === 
            JSON.stringify(BRACKET_SEQUENCE)) {
          activate()
          bracketSequenceRef.current = []
        }
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [activate])

  // 清理定时器
  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    }
  }, [])

  return (
    <>
      {/* Pixel Canvas 特效层 */}
      <PixelCanvas 
        isActive={state === 'ACTIVE'} 
        containerRef={_containerRef}
        onDeactivate={deactivate}
      />

      {/* 提示状态 */}
      {state === 'HINTED' && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-pulse">
          <div className="px-4 py-2 bg-emerald-500/90 text-white rounded-full text-sm font-medium shadow-lg">
            双击 Logo 试试？
          </div>
        </div>
      )}

      {/* 操作说明面板 */}
      {state === 'ACTIVE' && showInstructions && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[101] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-4 px-6 py-3 bg-slate-900/95 backdrop-blur-md 
                        border border-slate-700 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-2 text-emerald-400">
              <Sword className="w-5 h-5 animate-pulse" />
              <span className="font-medium text-sm">像素切割模式</span>
            </div>
            
            <div className="w-px h-6 bg-slate-700" />
            
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 bg-slate-800 rounded text-xs">移动鼠标</span>
                切割
              </span>
              <span className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 bg-slate-800 rounded text-xs">R</span>
                重置
              </span>
              <span className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 bg-slate-800 rounded text-xs">ESC</span>
                退出
              </span>
            </div>

            <div className="w-px h-6 bg-slate-700" />

            <button
              onClick={deactivate}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
              title="退出"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 提示按钮 */}
      {state === 'IDLE' && (
        <div className="hidden md:flex fixed bottom-8 right-8 z-40">
          <button
            onClick={() => setShowInstructions(prev => !prev)}
            className="p-3 bg-slate-900/80 backdrop-blur-sm border border-slate-700 
                     rounded-full text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50
                     transition-all duration-300 hover:scale-110"
            title="发现彩蛋"
          >
            <Info className="w-5 h-5" />
          </button>

          {showInstructions && (
            <div className="absolute bottom-full right-0 mb-3 w-72 p-4 bg-slate-900/95 
                          backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl
                          animate-in fade-in slide-in-from-bottom-2 duration-200">
              <h4 className="font-medium text-white mb-2">🎮 发现隐藏彩蛋</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  双击 Footer Logo
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  快速点击 <code className="px-1.5 py-0.5 bg-slate-800 rounded text-xs">{ } { } NEC</code>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  输入 Konami 代码
                </li>
              </ul>
              <button
                onClick={() => setShowInstructions(false)}
                className="mt-3 text-xs text-emerald-400 hover:text-emerald-300"
              >
                知道了
              </button>
            </div>
          )}
        </div>
      )}

      {/* 注入 Logo 点击处理器 */}
      {state === 'IDLE' && (
        <LogoClickInjector 
          onClick={handleLogoClick}
          onDoubleClick={handleLogoDoubleClick}
        />
      )}
    </>
  )
}

// Logo 点击注入器
interface LogoClickInjectorProps {
  onClick: () => void
  onDoubleClick: () => void
}

function LogoClickInjector({ onClick, onDoubleClick }: LogoClickInjectorProps) {
  useEffect(() => {
    const injectClicks = () => {
      const logos = document.querySelectorAll('footer a[href*="gitee"], footer .zap-icon, footer svg')
      logos.forEach(logo => {
        const el = logo as HTMLElement
        el.style.cursor = 'pointer'
        el.addEventListener('click', onClick)
        el.addEventListener('dblclick', onDoubleClick)
      })
    }

    // 延迟注入确保 Footer 已渲染
    const timer = setTimeout(injectClicks, 1000)
    return () => clearTimeout(timer)
  }, [onClick, onDoubleClick])

  return null
}

export default PixelEasterEgg
