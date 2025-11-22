import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Bot, Send, MessageSquare, FileText } from 'lucide-react'
import promptContent from '@/components/新能源AI产线先知Prompt.md?raw'

type Message = { role: 'user' | 'assistant'; content: string }

export default function AIChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '已加载提示词，准备就绪。请描述你的新能源产线问题。' }
  ])
  const [input, setInput] = useState('')
  const [showPrompt, setShowPrompt] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight
  }, [messages])

  const handleSend = () => {
    const content = input.trim()
    if (!content) return
    setMessages(prev => [...prev, { role: 'user', content }])
    setInput('')
    const reply = `依据提示词准则，已接收你的问题：“${content}”。请提供数据、约束或期望产线阶段，以便分析。`
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    }, 300)
  }

  const header = useMemo(() => {
    return '新能源AI产线先知'
  }, [])

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{header}</CardTitle>
          <Badge variant="secondary">/innovation</Badge>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowPrompt(v => !v)} className="gap-2">
          <FileText className="h-4 w-4" />
          {showPrompt ? '隐藏提示词' : '查看提示词'}
        </Button>
      </CardHeader>
      {showPrompt && (
        <CardContent className="max-h-40 overflow-y-auto whitespace-pre-wrap text-sm mb-2">
          {promptContent}
        </CardContent>
      )}
      <CardContent>
        <div ref={containerRef} className="h-80 overflow-y-auto rounded-md border p-3 space-y-3 bg-background">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {m.role === 'assistant' && (
                  <div className="flex items-center gap-1 mb-1 text-xs opacity-80">
                    <MessageSquare className="h-3 w-3" />
                    助手
                  </div>
                )}
                {m.content}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Input
            placeholder="输入你的问题，例如：规划储能产线测试流程"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
          />
          <Button onClick={handleSend} className="gap-2">
            <Send className="h-4 w-4" />
            发送
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

