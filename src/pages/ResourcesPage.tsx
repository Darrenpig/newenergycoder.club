import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  ExternalLink,
  Download,
  Search,
  Star,
  BookOpen,
  Code,
  Wrench,
  GraduationCap,
  FileText,
} from 'lucide-react'
import { useTranslation } from '@/contexts/LanguageContext'
import { PageLayout } from '@/components/layout/PageLayout'
import SEO from '@/components/SEO'
import { type AspectRatio } from '@/components/ui/floating-controls'
import { siteResources } from '@/data/siteResources'
import type {
  SiteResourceAccess as ResourceType,
  SiteResourceCategory as ResourceCategory,
  SiteResourceDifficulty as ResourceDifficulty,
} from '@/types/site-resource'
const categoryFilters = [
  { key: 'all' as ResourceCategory, labelKey: 'filterAll', icon: Search },
  { key: 'tutorials' as ResourceCategory, labelKey: 'filterTutorials', icon: BookOpen },
  { key: 'tools' as ResourceCategory, labelKey: 'filterTools', icon: Wrench },
  { key: 'books' as ResourceCategory, labelKey: 'filterBooks', icon: FileText },
  { key: 'courses' as ResourceCategory, labelKey: 'filterCourses', icon: GraduationCap },
  { key: 'documentation' as ResourceCategory, labelKey: 'filterDocumentation', icon: Code }
]

const getDifficultyColor = (difficulty: ResourceDifficulty) => {
  const colors = {
    beginner: 'bg-green-500/10 text-green-700 border-green-200',
    intermediate: 'bg-yellow-500/10 text-yellow-700 border-yellow-200',
    advanced: 'bg-red-500/10 text-red-700 border-red-200'
  }
  return colors[difficulty]
}

const getTypeColor = (type: ResourceType) => {
  const colors = {
    free: 'bg-blue-500/10 text-blue-700 border-blue-200',
    paid: 'bg-purple-500/10 text-purple-700 border-purple-200'
  }
  return colors[type]
}

export function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  // 显示比例状态管理 - 控制资源卡片图片的宽高比显示
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('aspect-[21/9]')
  // 排序状态管理
  const [sortBy] = useState<'rating' | 'title' | 'difficulty' | 'type'>('rating')
  const [sortOrder] = useState<'asc' | 'desc'>('desc')
  // 筛选框显示/隐藏状态管理
  const [, setIsFilterVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const t = useTranslation()

  const filteredResources = siteResources
    .filter(resource => {
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
      const matchesSearch = searchQuery === '' || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'rating':
          comparison = a.rating - b.rating
          break
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'difficulty': {
          const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 }
          comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
          break
        }
        case 'type':
          comparison = a.type.localeCompare(b.type)
          break
        default:
          comparison = 0
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

  // 滚动监听效果
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const scrollDifference = currentScrollY - lastScrollY
          
          // 只有在滚动距离超过阈值时才触发隐藏/显示
          if (Math.abs(scrollDifference) > 15) {
            if (scrollDifference > 0 && currentScrollY > 150) {
              // 向下滚动且超过150px时隐藏
              setIsFilterVisible(false)
            } else if (scrollDifference < 0 || currentScrollY <= 100) {
              // 向上滚动或接近顶部时显示
              setIsFilterVisible(true)
            }
            setLastScrollY(currentScrollY)
          }
          ticking = false
        })
        ticking = true
      }
    }

    // 添加防抖处理
    let timeoutId: NodeJS.Timeout
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 10)
    }

    // 检查是否在浏览器环境中
    if (typeof window === 'undefined') return;
    
    // 安全地添加事件监听器
    if (window && typeof window.addEventListener === 'function') {
      window.addEventListener('scroll', debouncedHandleScroll, { passive: true })
    }
    
    return () => {
      if (window && typeof window.removeEventListener === 'function') {
        window.removeEventListener('scroll', debouncedHandleScroll)
      }
      clearTimeout(timeoutId)
    }
  }, [lastScrollY])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-yellow-400' 
            : i < rating 
            ? 'text-yellow-400 fill-yellow-400/50'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <PageLayout
      showAspectRatio={true}
      aspectRatio={selectedRatio}
      onAspectRatioChange={setSelectedRatio}
    >
      <SEO
        title="学习资源"
        description="新能源编程俱乐部精选学习资源：嵌入式开发、机器人、算法、GUI 与机械设计教程、文档、工具与开源库。"
        path="/resources"
      />
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/5">
        {/* Hero Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-r from-primary/5 to-accent/5 relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          <div className="container relative text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-4">
              {t.resources.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.resources.description}
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-6 border-b bg-background/95 backdrop-blur-sm sticky top-16 z-40">
          <div className="container">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
              <div className="flex-1 max-w-md relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder={t.resources.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/40"
                />
              </div>
              <Badge variant="secondary" className="text-xs">
                {filteredResources.length} 个资源
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {categoryFilters.map((filter) => {
                const Icon = filter.icon
                const isActive = selectedCategory === filter.key
                return (
                  <Button
                    key={filter.key}
                    variant={isActive ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(filter.key)}
                    className={`transition-all duration-200 flex items-center justify-center gap-2 h-10 text-xs ${
                      isActive ? 'shadow-lg' : ''
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    <span className="hidden sm:inline">{t.resources[filter.labelKey]}</span>
                  </Button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-16">
          <div className="container">
            {filteredResources.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="glass-card hover-lift glow-hover group overflow-hidden h-full flex flex-col">
                    <div className="p-4 border-b border-border/50">
                      {/* Top Badges */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={`${getDifficultyColor(resource.difficulty)} border text-xs`}>
                          {t.resources[resource.difficulty]}
                        </Badge>
                        <Badge className={`${getTypeColor(resource.type)} border text-xs`}>
                          {t.resources[`${resource.type}Resource`]}
                        </Badge>
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                          ⭐ {resource.rating}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <div className="flex-1 flex flex-col p-4">
                      {/* Title and Description */}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3">
                          {resource.description}
                        </p>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs px-2 py-1">
                            {tag}
                          </Badge>
                        ))}
                        {resource.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs px-2 py-1">
                            +{resource.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      {/* Author and Rating */}
                      <div className="flex items-center justify-between pt-3 border-t border-border/50">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{resource.author}</div>
                          <div className="flex items-center gap-1 mt-1">
                            {renderStars(resource.rating)}
                            <span className="text-muted-foreground text-xs ml-1">({resource.rating})</span>
                          </div>
                        </div>
                        
                        {/* Quick Action Buttons */}
                        <div className="flex gap-2 ml-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 px-3 opacity-60 hover:opacity-100 text-xs"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(resource.url, '_blank')
                            }}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            查看
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 px-3 opacity-60 hover:opacity-100 text-xs"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(resource.downloadUrl || resource.url, '_blank')
                            }}
                          >
                            <Download className="h-3 w-3 mr-1" />
                            下载
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">
                  {t.resources.noResults}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
      

    </PageLayout>
  )
}
