import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Sun, Wind, Battery, Zap, Car, Atom, Leaf, Mountain, 
  Search, Filter, GitCompare, Play, ExternalLink, 
  TrendingUp, Calendar, Users, Award,
  ChevronRight, CheckCircle, Clock, AlertCircle
} from 'lucide-react';
import { 
  InnovationTechnology, 
  TechnologyCategory, 
  TechnologyMaturity,
  TECHNOLOGY_CATEGORIES,
  MATURITY_LEVELS,
  InnovationFilters
} from '@/types/innovation';
import { useTranslation } from '@/contexts/LanguageContext';
import AIChatAssistant from '@/components/AIChatAssistant';

// 图标映射
const iconMap = {
  Sun, Wind, Battery, Zap, Car, Atom, Leaf, Mountain
};

// 模拟数据
const mockTechnologies: InnovationTechnology[] = [
  {
    id: '1',
    name: '电动车72V换电计算',
    category: TechnologyCategory.ELECTRIC_VEHICLE,
    description: '针对72V电动车系统的高效换电与能量计算方案',
    detailedDescription: '该技术方案专注于72V电动车换电系统的能量管理与效率优化。通过精确的电池状态监测（SOC/SOH）算法，结合快速换电接口设计，实现电池包的快速更换与即时能量匹配。系统包含智能充电柜、电池BMS通信协议及云端调度平台，有效解决电动车续航焦虑，提升运营效率。',
    maturity: TechnologyMaturity.PILOT,
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=electric%20scooter%20battery%20swap%20station%2072V%20system%20modern%20technology&image_size=landscape_4_3',
    metrics: {
      efficiency: '98%',
      capacity: '72V/50Ah',
      cost: '¥3000/组',
      lifespan: '2000次循环'
    },
    applications: [
      {
        id: 'app1',
        name: '外卖配送',
        description: '为外卖骑手提供快速换电服务',
        benefits: ['零等待', '无限续航', '降低成本']
      },
      {
        id: 'app2',
        name: '共享电动车',
        description: '共享出行场景下的能源补给',
        benefits: ['集中管理', '高效运维', '提升周转率']
      }
    ],
    advantages: ['换电速度快', '电池寿命长', '安全性高', '智能化管理'],
    challenges: ['电池标准化', '网点布局', '初期投入'],
    developmentTeam: '智能交通能源团队',
    developmentDate: '2023-08-10',
    lastUpdated: '2024-02-01',
    tags: ['换电', '72V', '电动车', '能源管理'],
    relatedTechnologies: ['3', '5']
  },
  {
    id: '2',
    name: '房车光伏改装系统',
    category: TechnologyCategory.SOLAR,
    description: '专为房车设计的柔性光伏发电与储能一体化方案',
    detailedDescription: '针对房车车顶曲面及空间限制，采用轻量化柔性CIGS或高效单晶硅组件，配合MPPT控制器与磷酸铁锂电池组，构建离网电力系统。系统支持行车充电、市电互补及太阳能优先供电模式，满足房车驻车期间的空调、冰箱及生活用电需求，实现绿色出行。',
    maturity: TechnologyMaturity.COMMERCIAL,
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=RV%20camper%20with%20flexible%20solar%20panels%20on%20roof%20nature%20background&image_size=landscape_4_3',
    metrics: {
      efficiency: '22%',
      capacity: '800W',
      cost: '¥12000/套',
      lifespan: '15年'
    },
    applications: [
      {
        id: 'app3',
        name: '房车露营',
        description: '野外无市电环境下的电力保障',
        benefits: ['电力自给', '静音环保', '延长驻车时间']
      }
    ],
    advantages: ['安装灵活', '轻量化', '抗震设计', '智能监控'],
    challenges: ['阴雨天发电', '安装面积限制', '系统匹配'],
    developmentTeam: '绿色出行改装实验室',
    developmentDate: '2023-05-20',
    lastUpdated: '2024-01-25',
    tags: ['房车', '光伏', '离网系统', 'MPPT'],
    relatedTechnologies: ['1', '3']
  },
  {
    id: '3',
    name: '电动船舶动力系统',
    category: TechnologyCategory.ELECTRIC_VEHICLE,
    description: '纯电动船舶推进与能源管理系统',
    detailedDescription: '面向内河航运及近海作业船舶的纯电动化解决方案。核心包括大容量船用动力电池包、高压直流配电系统及高效电力推进电机。系统集成能量管理策略，优化船舶在不同工况下的能耗，实现零排放、低噪音航行，符合绿色航运发展趋势。',
    maturity: TechnologyMaturity.PILOT,
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=electric%20ship%20vessel%20on%20water%20futuristic%20design%20clean%20energy&image_size=landscape_4_3',
    metrics: {
      efficiency: '95%',
      capacity: '2MWh',
      lifespan: '10年',
      cost: '¥500万/套'
    },
    applications: [
      {
        id: 'app4',
        name: '内河渡轮',
        description: '城市内河客运及观光船舶',
        benefits: ['零污染', '低噪音', '运营成本低']
      },
      {
        id: 'app5',
        name: '港口作业船',
        description: '拖轮及辅助作业船舶',
        benefits: ['响应速度快', '动力强劲', '节能减排']
      }
    ],
    advantages: ['环保零排', '静音舒适', '维护简单', '能源成本低'],
    challenges: ['续航里程', '充电设施', '电池安全'],
    developmentTeam: '海洋新能源动力所',
    developmentDate: '2023-11-15',
    lastUpdated: '2024-02-10',
    tags: ['电动船舶', '电力推进', '绿色航运', '船用电池'],
    relatedTechnologies: ['5', '6']
  },
  {
    id: '4',
    name: '智能微电网系统',
    category: TechnologyCategory.SMART_GRID,
    description: '分布式智能微电网，实现能源的智能调度和优化配置',
    detailedDescription: '基于物联网和人工智能技术的智能微电网系统，能够整合多种分布式能源，实现能源的智能调度、储存和分配。系统具备自愈能力，能够在故障时自动切换和恢复。',
    maturity: TechnologyMaturity.COMMERCIAL,
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=smart%20microgrid%20system%20intelligent%20energy%20management%20distributed%20renewable%20energy&image_size=landscape_4_3',
    metrics: {
      efficiency: '92%',
      capacity: '10MW',
      cost: '¥8000/kW',
      carbonReduction: '80%'
    },
    applications: [
      {
        id: 'app5',
        name: '工业园区供电',
        description: '为工业园区提供稳定可靠的电力供应',
        benefits: ['供电稳定', '成本降低', '绿色环保']
      }
    ],
    advantages: ['智能调度', '自愈能力', '高可靠性', '节能减排'],
    challenges: ['系统复杂', '标准化', '互操作性'],
    developmentTeam: '智能电网技术中心',
    developmentDate: '2022-12-05',
    lastUpdated: '2024-01-05',
    tags: ['微电网', '智能调度', '分布式', '自愈'],
    relatedTechnologies: ['2', '3']
  },
  {
    id: '5',
    name: '超快充电桩技术',
    category: TechnologyCategory.ELECTRIC_VEHICLE,
    description: '350kW超快充电桩，15分钟充电80%',
    detailedDescription: '采用液冷技术和先进功率电子器件的超快充电桩，充电功率可达350kW，能够在15分钟内为电动汽车充电至80%。配备智能充电管理系统，确保充电安全和效率。',
    maturity: TechnologyMaturity.COMMERCIAL,
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=ultra%20fast%20charging%20station%20electric%20vehicle%20350kW%20advanced%20technology&image_size=landscape_4_3',
    metrics: {
      efficiency: '96%',
      capacity: '350kW',
      cost: '¥15万/台',
      lifespan: '15年'
    },
    applications: [
      {
        id: 'app6',
        name: '高速公路服务区',
        description: '为长途出行提供快速充电服务',
        benefits: ['充电速度快', '用户体验好', '运营效率高']
      }
    ],
    advantages: ['充电速度快', '兼容性强', '智能管理', '安全可靠'],
    challenges: ['电网负荷', '设备成本', '标准统一'],
    developmentTeam: '电动汽车充电技术团队',
    developmentDate: '2023-01-15',
    lastUpdated: '2024-01-12',
    tags: ['超快充', '液冷', '智能管理', '高功率'],
    relatedTechnologies: ['3', '4']
  },
  {
    id: '6',
    name: '绿氢制备技术',
    category: TechnologyCategory.HYDROGEN,
    description: '电解水制氢技术，利用可再生能源生产绿色氢气',
    detailedDescription: '采用先进电解技术，利用太阳能、风能等可再生能源电力进行电解水制氢，生产过程零碳排放。系统集成度高，能耗低，制氢纯度可达99.9%以上。',
    maturity: TechnologyMaturity.PILOT,
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=green%20hydrogen%20production%20electrolysis%20renewable%20energy%20clean%20technology&image_size=landscape_4_3',
    metrics: {
      efficiency: '75%',
      capacity: '1000Nm³/h',
      cost: '¥25/kg',
      carbonReduction: '100%'
    },
    applications: [
      {
        id: 'app7',
        name: '工业原料',
        description: '为化工、钢铁等行业提供清洁原料',
        benefits: ['零碳排放', '纯度高', '供应稳定']
      }
    ],
    advantages: ['零碳排放', '纯度高', '可储存', '应用广泛'],
    challenges: ['制备成本', '储运技术', '基础设施'],
    developmentTeam: '氢能技术研发中心',
    developmentDate: '2023-07-20',
    lastUpdated: '2024-01-08',
    tags: ['绿氢', '电解水', '零碳', '可再生'],
    relatedTechnologies: ['1', '2']
  }
];

export function InnovationShowcasePage() {
  const t = useTranslation();
  const [filters, setFilters] = useState<InnovationFilters>({
    categories: [],
    maturity: [],
    searchQuery: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });
  const [selectedTechnology, setSelectedTechnology] = useState<InnovationTechnology | null>(null);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('showcase');

  // 过滤和排序技术
  const filteredTechnologies = useMemo(() => {
    let filtered = mockTechnologies.filter(tech => {
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(tech.category);
      const matchesMaturity = filters.maturity.length === 0 || filters.maturity.includes(tech.maturity);
      const matchesSearch = filters.searchQuery === '' || 
        tech.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        tech.tags.some(tag => tag.toLowerCase().includes(filters.searchQuery.toLowerCase()));
      
      return matchesCategory && matchesMaturity && matchesSearch;
    });

    // 排序
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
          break;
        case 'maturity':
          const maturityOrder = [TechnologyMaturity.RESEARCH, TechnologyMaturity.PROTOTYPE, TechnologyMaturity.PILOT, TechnologyMaturity.COMMERCIAL];
          comparison = maturityOrder.indexOf(a.maturity) - maturityOrder.indexOf(b.maturity);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
      }
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [filters]);

  // 处理分类筛选
  const handleCategoryFilter = (category: TechnologyCategory) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  // 处理成熟度筛选
  const handleMaturityFilter = (maturity: TechnologyMaturity) => {
    setFilters(prev => ({
      ...prev,
      maturity: prev.maturity.includes(maturity)
        ? prev.maturity.filter(m => m !== maturity)
        : [...prev.maturity, maturity]
    }));
  };

  // 处理对比选择
  const handleComparisonSelect = (techId: string) => {
    if (selectedForComparison.includes(techId)) {
      setSelectedForComparison(prev => prev.filter(id => id !== techId));
    } else if (selectedForComparison.length < 3) {
      setSelectedForComparison(prev => [...prev, techId]);
    }
  };

  // 获取成熟度状态图标
  const getMaturityIcon = (maturity: TechnologyMaturity) => {
    switch (maturity) {
      case TechnologyMaturity.RESEARCH:
        return <AlertCircle className="h-4 w-4" />;
      case TechnologyMaturity.PROTOTYPE:
        return <Clock className="h-4 w-4" />;
      case TechnologyMaturity.PILOT:
        return <TrendingUp className="h-4 w-4" />;
      case TechnologyMaturity.COMMERCIAL:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* 英雄区域 */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Award className="h-4 w-4" />
              创新技术展示
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              新能源AI产线先知
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              探索前沿的新能源技术，从太阳能、风能到储能系统，了解我们如何通过技术创新推动可持续发展的未来。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" onClick={() => setActiveTab('showcase')}>
                <TrendingUp className="h-5 w-5" />
                探索技术
              </Button>
              <Button size="lg" variant="outline" className="gap-2" onClick={() => setActiveTab('roadmap')}>
                <Calendar className="h-5 w-5" />
                技术路线图
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="default" className="gap-2 bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
                    <Users className="h-5 w-5" />
                    AI对话
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>新能源AI产线先知</DialogTitle>
                    <DialogDescription>基于提示词的对话助手</DialogDescription>
                  </DialogHeader>
                  <AIChatAssistant />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        {/* 主要内容区域 */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="showcase">技术展示</TabsTrigger>
                <TabsTrigger value="comparison">技术对比</TabsTrigger>
                <TabsTrigger value="roadmap">发展路线图</TabsTrigger>
              </TabsList>

              {/* 技术展示标签页 */}
              <TabsContent value="showcase" className="space-y-8">
                {/* 搜索和筛选 */}
                <div className="space-y-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="technology-search"
                          name="search"
                          aria-label="搜索技术"
                          placeholder="搜索技术名称、描述或标签..."
                          value={filters.searchQuery}
                          onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <select
                        id="sortBy"
                        name="sortBy"
                        aria-label="排序方式"
                        value={filters.sortBy}
                        onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                        className="px-3 py-2 border rounded-md bg-background"
                      >
                        <option value="name">按名称排序</option>
                        <option value="date">按更新时间</option>
                        <option value="maturity">按成熟度</option>
                        <option value="category">按分类</option>
                      </select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFilters(prev => ({ ...prev, sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' }))}
                      >
                        {filters.sortOrder === 'asc' ? '↑' : '↓'}
                      </Button>
                    </div>
                  </div>

                  {/* 分类筛选 */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      技术分类
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                      {TECHNOLOGY_CATEGORIES.map((category) => {
                        const IconComponent = iconMap[category.icon as keyof typeof iconMap];
                        const isSelected = filters.categories.includes(category.key);
                        return (
                          <Button
                            key={category.key}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            className="flex flex-col gap-1 h-auto py-3"
                            onClick={() => handleCategoryFilter(category.key)}
                          >
                            <IconComponent className="h-4 w-4" />
                            <span className="text-xs">{category.label}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 成熟度筛选 */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">技术成熟度</h3>
                    <div className="flex flex-wrap gap-2">
                      {MATURITY_LEVELS.map((level) => {
                        const isSelected = filters.maturity.includes(level.key);
                        return (
                          <Button
                            key={level.key}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            className="gap-2"
                            onClick={() => handleMaturityFilter(level.key)}
                          >
                            {getMaturityIcon(level.key)}
                            {level.label}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 技术卡片网格 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTechnologies.map((tech) => {
                    const categoryConfig = TECHNOLOGY_CATEGORIES.find(c => c.key === tech.category);
                    const maturityConfig = MATURITY_LEVELS.find(m => m.key === tech.maturity);
                    const IconComponent = iconMap[categoryConfig?.icon as keyof typeof iconMap];
                    
                    return (
                      <Card key={tech.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                        <div className="relative">
                          <img
                            src={tech.image}
                            alt={tech.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge variant="secondary" className="gap-1">
                              <IconComponent className="h-3 w-3" />
                              {categoryConfig?.label}
                            </Badge>
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge variant="outline" className={`gap-1 ${maturityConfig?.color}`}>
                              {getMaturityIcon(tech.maturity)}
                              {maturityConfig?.label}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="flex items-start justify-between">
                            <span className="line-clamp-2">{tech.name}</span>
                            {comparisonMode && (
                              <Button
                                size="sm"
                                variant={selectedForComparison.includes(tech.id) ? "default" : "outline"}
                                onClick={() => handleComparisonSelect(tech.id)}
                                disabled={!selectedForComparison.includes(tech.id) && selectedForComparison.length >= 3}
                              >
                                <GitCompare className="h-4 w-4" />
                              </Button>
                            )}
                          </CardTitle>
                          <CardDescription className="line-clamp-3">
                            {tech.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* 关键指标 */}
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {Object.entries(tech.metrics).slice(0, 4).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-muted-foreground">
                                  {key === 'efficiency' ? '效率' :
                                   key === 'capacity' ? '容量' :
                                   key === 'cost' ? '成本' :
                                   key === 'lifespan' ? '寿命' :
                                   key === 'carbonReduction' ? '减排' : key}:
                                </span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>

                          {/* 标签 */}
                          <div className="flex flex-wrap gap-1">
                            {tech.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {tech.tags.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{tech.tags.length - 3}
                              </Badge>
                            )}
                          </div>

                          {/* 操作按钮 */}
                          <div className="flex gap-2 pt-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" className="flex-1" onClick={() => setSelectedTechnology(tech)}>
                                  查看详情
                                  <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    <IconComponent className="h-5 w-5" />
                                    {tech.name}
                                  </DialogTitle>
                                  <DialogDescription>
                                    {tech.description}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6">
                                  <img
                                    src={tech.image}
                                    alt={tech.name}
                                    className="w-full h-64 object-cover rounded-lg"
                                  />
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                      <h4 className="font-semibold">详细描述</h4>
                                      <p className="text-sm text-muted-foreground">{tech.detailedDescription}</p>
                                      
                                      <h4 className="font-semibold">技术优势</h4>
                                      <ul className="text-sm space-y-1">
                                        {tech.advantages.map((advantage, index) => (
                                          <li key={index} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            {advantage}
                                          </li>
                                        ))}
                                      </ul>
                                      
                                      <h4 className="font-semibold">面临挑战</h4>
                                      <ul className="text-sm space-y-1">
                                        {tech.challenges.map((challenge, index) => (
                                          <li key={index} className="flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4 text-orange-500" />
                                            {challenge}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    
                                    <div className="space-y-4">
                                      <h4 className="font-semibold">技术指标</h4>
                                      <div className="space-y-2">
                                        {Object.entries(tech.metrics).map(([key, value]) => (
                                          <div key={key} className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                              {key === 'efficiency' ? '转换效率' :
                                               key === 'capacity' ? '装机容量' :
                                               key === 'cost' ? '建设成本' :
                                               key === 'lifespan' ? '使用寿命' :
                                               key === 'carbonReduction' ? '碳减排率' :
                                               key === 'energyOutput' ? '能源输出' : key}:
                                            </span>
                                            <span className="font-medium">{value}</span>
                                          </div>
                                        ))}
                                      </div>
                                      
                                      <h4 className="font-semibold">应用场景</h4>
                                      <div className="space-y-3">
                                        {tech.applications.map((app) => (
                                          <div key={app.id} className="border rounded-lg p-3">
                                            <h5 className="font-medium text-sm">{app.name}</h5>
                                            <p className="text-xs text-muted-foreground mb-2">{app.description}</p>
                                            <div className="flex flex-wrap gap-1">
                                              {app.benefits.map((benefit, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                  {benefit}
                                                </Badge>
                                              ))}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                      
                                      <div className="text-xs text-muted-foreground space-y-1">
                                        <p>开发团队: {tech.developmentTeam}</p>
                                        <p>开发时间: {tech.developmentDate}</p>
                                        <p>最后更新: {tech.lastUpdated}</p>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {tech.videoUrl && (
                                    <div className="flex gap-2">
                                      <Button size="sm" className="gap-2" asChild>
                                        <a href={tech.videoUrl} target="_blank" rel="noopener noreferrer">
                                          <Play className="h-4 w-4" />
                                          观看演示视频
                                        </a>
                                      </Button>
                                      {tech.demoUrl && (
                                        <Button size="sm" variant="outline" className="gap-2" asChild>
                                          <a href={tech.demoUrl} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                            在线演示
                                          </a>
                                        </Button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                            {tech.videoUrl && (
                              <Button size="sm" variant="outline" asChild>
                                <a href={tech.videoUrl} target="_blank" rel="noopener noreferrer">
                                  <Play className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {filteredTechnologies.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-muted-foreground mb-4">
                      <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>未找到匹配的技术</p>
                      <p className="text-sm">请尝试调整搜索条件或筛选器</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setFilters({
                        categories: [],
                        maturity: [],
                        searchQuery: '',
                        sortBy: 'name',
                        sortOrder: 'asc'
                      })}
                    >
                      清除所有筛选
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* 技术对比标签页 */}
              <TabsContent value="comparison" className="space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold">技术对比分析</h2>
                  <p className="text-muted-foreground">
                    选择最多3项技术进行详细对比分析
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button
                      variant={comparisonMode ? "default" : "outline"}
                      onClick={() => {
                        setComparisonMode(!comparisonMode);
                        if (!comparisonMode) {
                          setSelectedForComparison([]);
                        }
                      }}
                      className="gap-2"
                    >
                      <GitCompare className="h-4 w-4" />
                      {comparisonMode ? '退出对比模式' : '进入对比模式'}
                    </Button>
                    {selectedForComparison.length > 0 && (
                      <Badge variant="secondary">
                        已选择 {selectedForComparison.length}/3 项技术
                      </Badge>
                    )}
                  </div>
                </div>

                {comparisonMode && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockTechnologies.map((tech) => {
                      const categoryConfig = TECHNOLOGY_CATEGORIES.find(c => c.key === tech.category);
                      const IconComponent = iconMap[categoryConfig?.icon as keyof typeof iconMap];
                      const isSelected = selectedForComparison.includes(tech.id);
                      const isDisabled = !isSelected && selectedForComparison.length >= 3;
                      
                      return (
                        <Card 
                          key={tech.id} 
                          className={`cursor-pointer transition-all duration-300 ${
                            isSelected ? 'ring-2 ring-primary border-primary' : 
                            isDisabled ? 'opacity-50' : 'hover:shadow-lg'
                          }`}
                          onClick={() => !isDisabled && handleComparisonSelect(tech.id)}
                        >
                          <div className="relative">
                            <img
                              src={tech.image}
                              alt={tech.name}
                              className="w-full h-32 object-cover rounded-t-lg"
                            />
                            <div className="absolute top-2 right-2">
                              {isSelected && (
                                <Badge className="bg-primary">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  已选择
                                </Badge>
                              )}
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <IconComponent className="h-4 w-4" />
                              {tech.name}
                            </CardTitle>
                            <CardDescription className="text-sm line-clamp-2">
                              {tech.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 text-sm">
                              {Object.entries(tech.metrics).slice(0, 3).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    {key === 'efficiency' ? '效率' :
                                     key === 'capacity' ? '容量' :
                                     key === 'cost' ? '成本' : key}:
                                  </span>
                                  <span className="font-medium">{value}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}

                {selectedForComparison.length >= 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-center">对比结果</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-border">
                        <thead>
                          <tr className="bg-muted">
                            <th className="border border-border p-3 text-left">对比项目</th>
                            {selectedForComparison.map(techId => {
                              const tech = mockTechnologies.find(t => t.id === techId);
                              return (
                                <th key={techId} className="border border-border p-3 text-center">
                                  {tech?.name}
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-border p-3 font-medium">技术分类</td>
                            {selectedForComparison.map(techId => {
                              const tech = mockTechnologies.find(t => t.id === techId);
                              const categoryConfig = TECHNOLOGY_CATEGORIES.find(c => c.key === tech?.category);
                              return (
                                <td key={techId} className="border border-border p-3 text-center">
                                  {categoryConfig?.label}
                                </td>
                              );
                            })}
                          </tr>
                          <tr>
                            <td className="border border-border p-3 font-medium">成熟度</td>
                            {selectedForComparison.map(techId => {
                              const tech = mockTechnologies.find(t => t.id === techId);
                              const maturityConfig = MATURITY_LEVELS.find(m => m.key === tech?.maturity);
                              return (
                                <td key={techId} className="border border-border p-3 text-center">
                                  <Badge variant="outline" className={maturityConfig?.color}>
                                    {maturityConfig?.label}
                                  </Badge>
                                </td>
                              );
                            })}
                          </tr>
                          {['efficiency', 'capacity', 'cost', 'lifespan'].map(metric => (
                            <tr key={metric}>
                              <td className="border border-border p-3 font-medium">
                                {metric === 'efficiency' ? '转换效率' :
                                 metric === 'capacity' ? '装机容量' :
                                 metric === 'cost' ? '建设成本' :
                                 metric === 'lifespan' ? '使用寿命' : metric}
                              </td>
                              {selectedForComparison.map(techId => {
                                const tech = mockTechnologies.find(t => t.id === techId);
                                return (
                                  <td key={techId} className="border border-border p-3 text-center">
                                    {tech?.metrics[metric] || '-'}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* 技术路线图标签页 */}
              <TabsContent value="roadmap" className="space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold">新能源技术发展路线图</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    展示我们在新能源技术领域的发展历程和未来规划，从基础研究到商业化应用的完整路径。
                  </p>
                </div>

                <div className="relative">
                  {/* 时间轴 */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-primary/50 to-primary/20"></div>
                  
                  <div className="space-y-12">
                    {[
                      {
                        date: '2022 Q4',
                        title: '项目启动',
                        description: '新能源编程俱乐部成立，开始基础技术研究',
                        status: 'completed' as const,
                        milestones: ['团队组建', '技术调研', '项目规划']
                      },
                      {
                        date: '2023 Q2',
                        title: '核心技术突破',
                        description: '在太阳能和储能技术方面取得重要进展',
                        status: 'completed' as const,
                        milestones: ['钙钛矿电池原型', '智能控制算法', '数据分析平台']
                      },
                      {
                        date: '2023 Q4',
                        title: '技术集成与优化',
                        description: '多项技术集成，系统性能优化',
                        status: 'completed' as const,
                        milestones: ['系统集成测试', '性能优化', '稳定性验证']
                      },
                      {
                        date: '2024 Q1',
                        title: '试点项目部署',
                        description: '在实际场景中部署试点项目',
                        status: 'in_progress' as const,
                        milestones: ['试点选址', '设备安装', '运行监测']
                      },
                      {
                        date: '2024 Q3',
                        title: '商业化准备',
                        description: '准备技术商业化，寻求产业合作',
                        status: 'planned' as const,
                        milestones: ['商业模式设计', '合作伙伴洽谈', '市场推广']
                      },
                      {
                        date: '2025 Q1',
                        title: '规模化应用',
                        description: '技术大规模商业化应用',
                        status: 'planned' as const,
                        milestones: ['批量生产', '市场投放', '用户反馈']
                      }
                    ].map((node, index) => (
                      <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                        <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                          <Card className="inline-block max-w-md">
                            <CardHeader>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">{node.date}</Badge>
                                <Badge 
                                  variant={node.status === 'completed' ? 'default' : 
                                          node.status === 'in_progress' ? 'secondary' : 'outline'}
                                  className="gap-1"
                                >
                                  {node.status === 'completed' && <CheckCircle className="h-3 w-3" />}
                                  {node.status === 'in_progress' && <Clock className="h-3 w-3" />}
                                  {node.status === 'planned' && <Calendar className="h-3 w-3" />}
                                  {node.status === 'completed' ? '已完成' :
                                   node.status === 'in_progress' ? '进行中' : '计划中'}
                                </Badge>
                              </div>
                              <CardTitle className="text-lg">{node.title}</CardTitle>
                              <CardDescription>{node.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <h5 className="font-medium text-sm">关键里程碑:</h5>
                                <ul className="text-sm space-y-1">
                                  {node.milestones.map((milestone, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                      {node.status === 'completed' ? (
                                        <CheckCircle className="h-3 w-3 text-green-500" />
                                      ) : node.status === 'in_progress' ? (
                                        <Clock className="h-3 w-3 text-blue-500" />
                                      ) : (
                                        <Calendar className="h-3 w-3 text-gray-400" />
                                      )}
                                      {milestone}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        {/* 时间轴节点 */}
                        <div className="relative z-10">
                          <div className={`w-4 h-4 rounded-full border-4 ${
                            node.status === 'completed' ? 'bg-green-500 border-green-200' :
                            node.status === 'in_progress' ? 'bg-blue-500 border-blue-200' :
                            'bg-gray-300 border-gray-100'
                          }`}></div>
                        </div>
                        
                        <div className="w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
  );
}
