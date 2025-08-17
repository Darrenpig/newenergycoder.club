import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Github, Calendar, User } from 'lucide-react'
import { useTranslation } from '@/contexts/LanguageContext'
import { PageLayout } from '@/components/layout/PageLayout'

type ProjectCategory = 'all' | 'web' | 'mobile' | 'ai' | 'iot' | 'other'

interface Project {
  id: string
  title: string
  description: string
  image: string
  category: ProjectCategory
  technologies: string[]
  author: string
  date: string
  projectUrl?: string
  githubUrl?: string
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Smart Campus IoT System',
    description: 'An intelligent campus management system using IoT sensors to monitor energy consumption, air quality, and space utilization.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
    category: 'iot',
    technologies: ['Arduino', 'Raspberry Pi', 'Node.js', 'MongoDB', 'React'],
    author: 'Zhang Wei',
    date: '2024-01-15',
    projectUrl: 'https://example.com/smart-campus',
    githubUrl: 'https://github.com/example/smart-campus'
  },
  {
    id: '2',
    title: 'AI-Powered Study Assistant',
    description: 'A machine learning application that helps students optimize their study schedules and provides personalized learning recommendations.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    category: 'ai',
    technologies: ['Python', 'TensorFlow', 'Flask', 'React', 'PostgreSQL'],
    author: 'Li Ming',
    date: '2024-02-20',
    projectUrl: 'https://example.com/study-assistant',
    githubUrl: 'https://github.com/example/study-assistant'
  },
  {
    id: '3',
    title: 'EcoTracker Mobile App',
    description: 'A mobile application that tracks personal carbon footprint and suggests eco-friendly alternatives for daily activities.',
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=250&fit=crop',
    category: 'mobile',
    technologies: ['React Native', 'Firebase', 'Node.js', 'Express'],
    author: 'Wang Xiaoli',
    date: '2024-03-10',
    projectUrl: 'https://example.com/ecotracker',
    githubUrl: 'https://github.com/example/ecotracker'
  },
  {
    id: '4',
    title: 'Green Energy Dashboard',
    description: 'A comprehensive web platform for monitoring and analyzing renewable energy production and consumption patterns.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=250&fit=crop',
    category: 'web',
    technologies: ['Vue.js', 'D3.js', 'Python', 'Django', 'PostgreSQL'],
    author: 'Chen Hao',
    date: '2024-01-28',
    projectUrl: 'https://example.com/energy-dashboard',
    githubUrl: 'https://github.com/example/energy-dashboard'
  },
  {
    id: '5',
    title: 'Blockchain Voting System',
    description: 'A secure and transparent voting system built on blockchain technology for student government elections.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop',
    category: 'other',
    technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'IPFS'],
    author: 'Liu Jie',
    date: '2024-02-05',
    projectUrl: 'https://example.com/blockchain-voting',
    githubUrl: 'https://github.com/example/blockchain-voting'
  },
  {
    id: '6',
    title: 'Campus Food Delivery App',
    description: 'A mobile application connecting students with campus food vendors, featuring real-time ordering and delivery tracking.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop',
    category: 'mobile',
    technologies: ['Flutter', 'Firebase', 'Google Maps API', 'Stripe'],
    author: 'Zhao Mei',
    date: '2024-03-15',
    projectUrl: 'https://example.com/campus-food',
    githubUrl: 'https://github.com/example/campus-food'
  }
]

const categoryFilters = [
  { key: 'all' as ProjectCategory, labelKey: 'filterAll' },
  { key: 'web' as ProjectCategory, labelKey: 'filterWeb' },
  { key: 'mobile' as ProjectCategory, labelKey: 'filterMobile' },
  { key: 'ai' as ProjectCategory, labelKey: 'filterAI' },
  { key: 'iot' as ProjectCategory, labelKey: 'filterIoT' },
  { key: 'other' as ProjectCategory, labelKey: 'filterOther' }
]

export function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all')
  const t = useTranslation()

  const filteredProjects = selectedCategory === 'all' 
    ? mockProjects 
    : mockProjects.filter(project => project.category === selectedCategory)

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/5">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_75%_75%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
        
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl font-bold gradient-text sm:text-5xl lg:text-6xl mb-6">
            {t.projects.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.projects.description}
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 border-b bg-background/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {categoryFilters.map((filter) => (
              <Button
                key={filter.key}
                variant={selectedCategory === filter.key ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(filter.key)}
                className="hover-lift transition-all duration-200"
              >
                {t.projects[filter.labelKey]}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="glass-card hover-lift glow-hover group overflow-hidden">
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      {project.projectUrl && (
                        <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {t.projects.viewProject}
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button size="sm" variant="outline" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30">
                          <Github className="h-4 w-4 mr-2" />
                          {t.projects.viewCode}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-primary">{t.projects.technologies}</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{project.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(project.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
      </div>
    </PageLayout>
  )
}