import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/layout/PageLayout'
import { useTranslation } from '@/contexts/LanguageContext'

function NotFoundPage() {
  const navigate = useNavigate()
  const t = useTranslation()

  return (
    <PageLayout>
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 gradient-text">{t.notFound.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{t.notFound.description}</p>
          <Button onClick={() => navigate('/')} size="lg" className="glass-card hover-lift">
            {t.notFound.returnHome}
          </Button>
        </div>
      </div>
    </PageLayout>
  )
}

export default NotFoundPage