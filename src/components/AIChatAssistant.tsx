import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Bot, Send, MessageSquare, FileText, Wrench, Search, Settings, Rss, AlertTriangle, Layers } from 'lucide-react'
import promptContent from '@/components/新能源AI产线先知Prompt.md?raw'

type Message = { role: 'user' | 'assistant'; content: string }

export default function AIChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '您好！我是您的智能制造专家「产线先知」，专注于设备故障预测、质量检测与工艺优化。通过分析传感器数据与视觉图像，我能为您提供精准的设备健康评估、缺陷诊断与工艺改进建议。\n请在下方选择您的技术咨询类型，并阐明您的咨询意图，即可开启AI对话。' }
  ])
  const [input, setInput] = useState('')
  const [showPrompt, setShowPrompt] = useState(false)
  const quickPrompts = [
    { label: '设备故障诊断', text: '设备故障诊断：请提供设备型号、异常现象、相关传感器数据（振动/温度/电流）以及发生时间。', desc: '提供设备型号、异常现象、传感器数据、发生时间', icon: Wrench },
    { label: '质量检测方案', text: '质量检测方案：请提供产品类型、缺陷类别、样本数量、是否有标注数据与目标精度。', desc: '产品类型、缺陷类别、样本与标注、目标精度', icon: Search },
    { label: '工艺优化咨询', text: '工艺优化咨询：请提供工艺流程、瓶颈环节、关键指标（良率/周期/能耗）与目标改善方向。', desc: '流程与瓶颈、良率/周期/能耗、改善目标', icon: Settings },
    { label: '传感器选型', text: '传感器选型：请说明监测对象、量程、环境条件、采样频率与接口要求。', desc: '监测对象、量程、环境、采样频率、接口', icon: Rss },
    { label: '紧急处理', text: '紧急处理：请描述当前故障现状、影响范围、已采取措施与时间要求。', desc: '故障现状、影响范围、已采取措施、时间要求', icon: AlertTriangle },
    { label: '系统集成', text: '系统集成：请说明现有系统架构、接口协议、部署环境及集成目标。', desc: '架构与协议、部署环境、集成目标', icon: Layers }
  ]
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

  const handleQuick = (text: string) => {
    setInput(text)
    setTimeout(() => {
      const current = text.trim()
      if (!current) return
      setMessages(prev => [...prev, { role: 'user', content: current }])
      setInput('')
      const reply = `已根据“${current.split('：')[0]}”准备分析，请补充设备/工艺/数据细节以输出具体方案。`
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    }, 50)
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
          <Badge variant="secondary">EnergyAI Line Oracle</Badge>
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
        <div className="mb-3 space-y-3">
          <div className="text-sm text-muted-foreground">
            您好! 我是您的 <span className="font-semibold">智能制造专家「产线先知」</span>，请选择 <span className="font-semibold">技术咨询类型或直接输入问题</span>。
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {quickPrompts.map((q) => {
              const Icon = q.icon as any
              return (
                <li key={q.label}>
                  <a
                    href={`#${encodeURIComponent(q.label)}`}
                    onClick={(e) => { e.preventDefault(); handleQuick(q.text) }}
                    className="block rounded-md border border-primary/20 bg-background/60 px-3 py-2 hover:bg-primary/5 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-3 w-3 text-primary" />
                      <span className="text-xs">{q.label}</span>
                    </div>
                    <div className="mt-1 text-[11px] text-muted-foreground">
                      {q.desc}
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
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
