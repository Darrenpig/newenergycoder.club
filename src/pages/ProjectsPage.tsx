import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Calendar, User, Code2, Bot, Cpu, Cog, Plane, Microscope, Boxes } from 'lucide-react'
import { GiteeIcon } from '@/components/ui/gitee-icon'
import { useLanguage } from '@/contexts/LanguageContext'
import { PageLayout } from '@/components/layout/PageLayout'
import { FloatingControls, type AspectRatio } from '@/components/ui/floating-controls'

type ProjectCategory = 'all' | 'robocon' | 'embedded' | 'aerospace' | 'mechanical' | 'control'

interface Project {
  id: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  image?: string
  category: ProjectCategory
  technologies: string[]
  technologiesEn: string[]
  author: string
  date: string
  githubUrl?: string
  status: 'active' | 'archived' | 'prototype'
}

// 诚实展示ROBOCON和机器人项目，删除"新能源"虚假宣传
const projects: Project[] = [
  {
    id: '1',
    title: 'ROBOCON 2025 竞技机器人',
    titleEn: 'ROBOCON 2025 Competition Robot',
    description: '全国大学生机器人大赛参赛项目，包括机械结构、电控系统和视觉识别模块。',
    descriptionEn: 'National College Robot Competition entry, including mechanical structure, control systems, and vision modules.',
    category: 'robocon',
    technologies: ['STM32', 'ROS2', 'OpenCV', 'SolidWorks'],
    technologiesEn: ['STM32', 'ROS2', 'OpenCV', 'SolidWorks'],
    author: 'NEC Robotics Team',
    date: '2024-2025',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/competitions/2025/robocon',
    status: 'active'
  },
  {
    id: '2',
    title: '人形机器人控制平台',
    titleEn: 'Humanoid Robot Control Platform',
    description: '双足机器人运动控制与平衡算法研究，基于ROS的仿真与实机测试。',
    descriptionEn: 'Bipedal robot motion control and balance algorithms, ROS-based simulation and hardware testing.',
    category: 'control',
    technologies: ['ROS', 'MATLAB', 'C++', '动力学建模'],
    technologiesEn: ['ROS', 'MATLAB', 'C++', 'Dynamics Modeling'],
    author: 'NEC Robotics Team',
    date: '2024',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/robotics/humanoid-robot',
    status: 'active'
  },
  {
    id: '3',
    title: '星闪无线控制模块',
    titleEn: 'NearLink Wireless Control Module',
    description: '基于华为星闪技术的低延迟遥控方案，用于机器人无线通信。',
    descriptionEn: 'Low-latency wireless control using Huawei NearLink technology for robot communication.',
    category: 'embedded',
    technologies: ['WS63', 'NearLink', 'C', '无线通信'],
    technologiesEn: ['WS63', 'NearLink', 'C', 'Wireless Communication'],
    author: 'NEC Embedded Team',
    date: '2024-2025',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/embedded/nearlink',
    status: 'prototype'
  },
  {
    id: '4',
    title: '流体动力实验平台',
    titleEn: 'Fluid Power Test Platform',
    description: '液压与气动系统教学实验台，用于机器人抓取与驱动机构测试。',
    descriptionEn: 'Hydraulic and pneumatic teaching platform for robot gripper and actuator testing.',
    category: 'mechanical',
    technologies: ['液压系统', '气动控制', 'PLC', '传感器'],
    technologiesEn: ['Hydraulics', 'Pneumatics', 'PLC', 'Sensors'],
    author: 'NEC Mechanical Team',
    date: '2025',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/ai/energy-monitoring',
    status: 'active'
  },
  {
    id: '5',
    title: '飞行汽车飞控系统',
    titleEn: 'eVTOL Flight Control System',
    description: '电动垂直起降飞行器通信与控制系统，空地协同数据传输。',
    descriptionEn: 'eVTOL communication and control system, air-ground data link.',
    category: 'aerospace',
    technologies: ['飞控算法', '无线通信', '嵌入式', '传感器融合'],
    technologiesEn: ['Flight Control', 'Wireless Comm', 'Embedded', 'Sensor Fusion'],
    author: 'NEC Aerospace Team',
    date: '2024',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/aerospace/flight-control-comm',
    status: 'prototype'
  },
  {
    id: '6',
    title: 'UMI低成本灵巧手',
    titleEn: 'UMI Low-Cost Dexterous Hand',
    description: '面向人形机器人的低成本抓取末端执行器，3D打印结构件。',
    descriptionEn: 'Low-cost end-effector for humanoid robots, 3D-printed structural parts.',
    category: 'mechanical',
    technologies: ['3D打印', '舵机控制', '抓取算法', '机械设计'],
    technologiesEn: ['3D Printing', 'Servo Control', 'Grasping', 'Mechanical Design'],
    author: 'NEC Robotics Team',
    date: '2024',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/robotics/umi-dexterous-hand',
    status: 'active'
  },
  {
    id: '7',
    title: 'MICA实时系统验证',
    titleEn: 'MICA Real-Time System Verification',
    description: '混合关键级嵌入式系统可靠性验证，用于机器人安全关键模块。',
    descriptionEn: 'Mixed-criticality embedded system verification for robot safety-critical modules.',
    category: 'control',
    technologies: ['实时系统', '形式化验证', 'C/C++', '安全关键'],
    technologiesEn: ['Real-Time Systems', 'Formal Verification', 'C/C++', 'Safety-Critical'],
    author: 'NEC System Team',
    date: '2024',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/system/mica-verification',
    status: 'active'
  },
  {
    id: '8',
    title: '3D打印快速成型服务',
    titleEn: '3D Printing Rapid Prototyping',
    description: '机器人结构件快速制造，支持FDM/光固化多种工艺。',
    descriptionEn: 'Rapid prototyping for robot parts, supporting FDM and resin printing.',
    category: 'mechanical',
    technologies: ['FDM', '光固化', 'CAD', '材料工艺'],
    technologiesEn: ['FDM', 'Resin Printing', 'CAD', 'Material Science'],
    author: 'NEC Fabrication Team',
    date: '2024',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/科研「横向项目」/3d-printing-team',
    status: 'active'
  }
]

const categoryFilters = [
  { key: 'all' as ProjectCategory, label: '全部项目', labelEn: 'All Projects', icon: Boxes },
  { key: 'robocon' as ProjectCategory, label: 'ROBOCON', labelEn: 'ROBOCON', icon: Bot },
  { key: 'mechanical' as ProjectCategory, label: '机械结构', labelEn: 'Mechanical', icon: Cog },
  { key: 'embedded' as ProjectCategory, label: '嵌入式', labelEn: 'Embedded', icon: Cpu },
  { key: 'control' as ProjectCategory, label: '控制系统', labelEn: 'Control Systems', icon: Code2 },
  { key: 'aerospace' as ProjectCategory, label: '飞行器', labelEn: 'Aerospace', icon: Plane },
]

const statusColors = {
  active: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  prototype: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  archived: 'bg-gray-500/10 text-gray-600 border-gray-500/20'
}

const statusLabels = {
  active: { zh: '进行中', en: 'Active' },
  prototype: { zh: '原型阶段', en: 'Prototype' },
  archived: { zh: '已归档', en: 'Archived' }
}

export function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all')
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('aspect-video')
  const { language } = useLanguage()
  const isEn = language === 'en'

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <PageLayout 
      showAspectRatio={true}
      aspectRatio={selectedRatio}
      onAspectRatioChange={setSelectedRatio}
    >
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Hero Section - 诚实定位 */}
        <section className="py-16 lg:py-20 bg-slate-900 text-white relative overflow-hidden">
          {/* 工程蓝图背景 */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00FF88" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)"/>
            </svg>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                {isEn ? 'ROBOCON & Robotics Projects' : 'ROBOCON 与机器人项目'}
              </h1>
              <p className="text-lg text-slate-400 mb-4 leading-relaxed">
                {isEn 
                  ? 'Open-source hardware and software projects for the National College Robot Competition (ROBOCON) and robotics research.'
                  : '全国大学生机器人大赛（ROBOCON）参赛项目与机器人技术研究开源硬件及软件方案。'
                }
              </p>
              <p className="text-sm text-slate-500">
                {isEn 
                  ? 'Based at Changzhou Institute of Technology, A416 Lab'
                  : '常州工学院 A416 实验室出品'
                }
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categoryFilters.map((filter) => (
                <Button
                  key={filter.key}
                  variant={selectedCategory === filter.key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(filter.key)}
                  className={`transition-all duration-200 ${
                    selectedCategory === filter.key 
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' 
                      : 'border-slate-300 dark:border-slate-700'
                  }`}
                >
                  <filter.icon className="h-4 w-4 mr-1.5" />
                  {isEn ? filter.labelEn : filter.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProjects.map((project) => (
                <Card 
                  key={project.id} 
                  className="group overflow-hidden border-slate-200 dark:border-slate-800 
                    hover:shadow-lg hover:-translate-y-1 transition-all duration-300
                    bg-white dark:bg-slate-900 flex flex-col"
                >
                  {/* 项目图标/标识 */}
                  <div className={`${selectedRatio} bg-slate-100 dark:bg-slate-800 
                    flex items-center justify-center relative overflow-hidden
                    group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors`}
                  >
                    {/* 状态标签 */}
                    <Badge 
                      className={`absolute top-3 left-3 ${statusColors[project.status]} border`}
                    >
                      {isEn ? statusLabels[project.status].en : statusLabels[project.status].zh}
                    </Badge>
                    
                    {/* 项目类型图标 */}
                    <div className="text-slate-400 dark:text-slate-600">
                      {project.category === 'robocon' && <Bot className="h-16 w-16" />}
                      {project.category === 'mechanical' && <Cog className="h-16 w-16" />}
                      {project.category === 'embedded' && <Cpu className="h-16 w-16" />}
                      {project.category === 'control' && <Code2 className="h-16 w-16" />}
                      {project.category === 'aerospace' && <Plane className="h-16 w-16" />}
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <h3 className="font-bold text-lg line-clamp-1">
                      {isEn ? project.titleEn : project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{project.date}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                      {isEn ? project.descriptionEn : project.description}
                    </p>

                    {/* 技术栈标签 */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(isEn ? project.technologiesEn : project.technologies).slice(0, 4).map((tech) => (
                        <span 
                          key={tech}
                          className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 
                            text-slate-600 dark:text-slate-400 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* 代码链接 */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2 
                          bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700
                          rounded-md text-sm font-medium transition-colors"
                      >
                        <GiteeIcon className="h-4 w-4" />
                        {isEn ? 'View Code' : '查看代码'}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
