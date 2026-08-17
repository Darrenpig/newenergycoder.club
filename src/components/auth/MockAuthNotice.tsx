import { Info } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface MockAuthNoticeProps {
  scope: 'dashboard' | 'admin'
}

const scopeLabel = {
  dashboard: '用户仪表板',
  admin: '管理控制台',
} satisfies Record<MockAuthNoticeProps['scope'], string>

export function MockAuthNotice({ scope }: MockAuthNoticeProps) {
  return (
    <Card className="mb-6 border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
      <CardContent className="flex items-start gap-3 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0" />
        <div className="space-y-1 text-sm">
          <p className="font-medium">{scopeLabel[scope]}当前处于演示态</p>
          <p>当前访问控制依赖本地持久化的 mock 登录状态，仅用于页面演示，不代表真实鉴权与权限系统。</p>
        </div>
      </CardContent>
    </Card>
  )
}
