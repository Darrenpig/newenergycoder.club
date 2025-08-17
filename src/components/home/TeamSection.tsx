import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useTranslation } from '@/contexts/LanguageContext'

const getTeamMembers = (t: any) => [
  {
    name: t.team.member1Name,
    role: t.team.member1Role,
    image: 'https://darrenpig.github.io/files/news10.jpg',
    bio: t.team.member1Bio,
  },
  {
    name: t.team.member2Name,
    role: t.team.member2Role,
    image: 'https://gitee.com/darrenpig/new_energy_coder_club/raw/master/shared/images/Image/Duma_image.png',
    bio: t.team.member2Bio,
  },
  {
    name: t.team.member3Name,
    role: t.team.member3Role,
    image: 'https://gitee.com/darrenpig/new_energy_coder_club/raw/master/shared/images/team/%E6%A0%A1%E6%97%97%E5%90%88%E5%BD%B1.JPG',
    bio: t.team.member3Bio,
  },
  {
    name: t.team.member4Name,
    role: t.team.member4Role,
    image: 'https://gitee.com/darrenpig/new_energy_coder_club/raw/master/shared/images/team/%E6%AE%B7%E7%BB%9F%E5%88%9B%E5%9C%A8%E8%B0%83%E8%AF%95VM%E8%99%9A%E6%8B%9F%E6%9C%BA%E6%A1%8C%E9%9D%A2.JPG',
    bio: t.team.member4Bio,
  }
]

export function TeamSection() {
  const t = useTranslation();
  const teamMembers = getTeamMembers(t);
  
  return (
    <section className="py-24 bg-gradient-to-br from-accent/10 to-secondary/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_75%_75%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold gradient-text sm:text-4xl">{t.team.title}</h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.team.description}
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, i) => (
            <Card key={i} className="glass-card hover-lift glow-hover group overflow-hidden">
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardHeader className="pb-3">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-sm gradient-text font-semibold">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{member.bio}</p>
                <div className="flex gap-3">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover-lift">
                    <Github className="h-4 w-4" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover-lift">
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover-lift">
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}