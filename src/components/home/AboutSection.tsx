import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/contexts/LanguageContext'

export function AboutSection() {
  const t = useTranslation();
  
  return (
    <section className="py-24 bg-gradient-to-br from-secondary/20 to-accent/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
      
      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight gradient-text">
              {t.about.title}
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                {t.about.paragraph1}
              </p>
              <p className="leading-relaxed">
                {t.about.paragraph2}
              </p>
              <p className="leading-relaxed">
                {t.about.paragraph3}
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild className="gradient-bg-secondary hover-lift glow-hover" variant="outline">
                <Link to="/about">
                  {t.about.learnMore}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 lg:gap-8">
            <div className="grid gap-4 lg:gap-8">
              <div className="overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 aspect-[3/4] h-full glass-card hover-lift"></div>
              <div className="overflow-hidden rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 aspect-[4/3] glass-card hover-lift"></div>
            </div>
            <div className="grid gap-4 lg:gap-8">
              <div className="overflow-hidden rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 aspect-[4/3] glass-card hover-lift"></div>
              <div className="overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 aspect-[3/4] h-full glass-card hover-lift"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}