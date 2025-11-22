import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { FloatingControls, type AspectRatio } from '@/components/ui/floating-controls'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Bot } from 'lucide-react'
import AIChatAssistant from '@/components/AIChatAssistant'

interface PageLayoutProps {
  children: ReactNode
  showAspectRatio?: boolean
  aspectRatio?: AspectRatio
  onAspectRatioChange?: (ratio: AspectRatio) => void
}

export function PageLayout({ 
  children, 
  showAspectRatio = false, 
  aspectRatio, 
  onAspectRatioChange 
}: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingControls 
        showAspectRatio={showAspectRatio}
        aspectRatio={aspectRatio}
        onAspectRatioChange={onAspectRatioChange}
      />
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-6 right-6 rounded-full h-12 w-12 p-0 shadow-lg" aria-label="AI对话">
            <Bot className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>新能源AI产线先知</DialogTitle>
            <DialogDescription>悬浮窗对话</DialogDescription>
          </DialogHeader>
          <AIChatAssistant />
        </DialogContent>
      </Dialog>
    </div>
  )
}
