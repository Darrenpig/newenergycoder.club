import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Banknote, Cpu, Users, Trophy, AlertTriangle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function OriginStory() {
  const { language } = useLanguage()
  const isEn = language === 'en'
  const [showDetails, setShowDetails] = useState(false)

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* 工程蓝图背景 */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="blueprint" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint)"/>
        </svg>
      </div>

      <div className="container relative z-10">
        {/* 标题 */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amber-500/20 text-amber-400 border-amber-500/30">
            {isEn ? 'Origin Story' : '起源故事'}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isEn ? 'The 20-Hour Marathon' : '5月12日：那20小时'}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {isEn 
              ? 'How we built a competition robot on 200 RMB, two bricked ESP32s, and pure stubbornness'
              : '账上200块生活费、两块变砖的ESP32、还有凌晨4:30实验室的呼噜声'
            }
          </p>
        </div>

        {/* 关键数据卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <Banknote className="h-8 w-8 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-amber-400">¥200</div>
              <div className="text-xs text-slate-400">
                {isEn ? 'Remaining budget' : '剩余生活费'}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">20h</div>
              <div className="text-xs text-slate-400">
                {isEn ? 'Non-stop work' : '连续奋战'}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <Cpu className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-emerald-400">2</div>
              <div className="text-xs text-slate-400">
                {isEn ? 'Bricked ESP32s' : '变砖的板子'}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">#12</div>
              <div className="text-xs text-slate-400">
                {isEn ? 'School ranking' : '校赛排名'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 故事时间线 */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-slate-800/30 border-slate-700 mb-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">
                    {isEn ? 'The Crisis' : '至暗时刻'}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {isEn 
                      ? 'Chemical design materials rejected. Account balance: 200 RMB. Two ESP32s bricked. Motors spinning like gyroscopes at 3:30 AM.'
                      : '化工设计材料被毙，账上只剩200块。两块ESP32成了砖头，凌晨3:30闻志伟的电机像陀螺一样空转。'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700 mb-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">
                    {isEn ? 'The MVP Returns' : 'MVP归来'}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {isEn 
                      ? 'Zhang Ruolu came back at 10:30 PM. Darren took over motor debugging. Xu Hailing watched them with "it\'s going to fail again" eyes. By 4:30 AM, Zhang was snoring next to the Visio diagrams.'
                      : '晚上10:30张若璐回来，Darren接手电机调试，徐海婷用"又要失败"的眼神看着。凌晨4:30，张若璐在旁边打呼噜，图纸散落一地。'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {showDetails && (
            <>
              <Card className="bg-slate-800/30 border-slate-700 mb-6">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Trophy className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">
                        {isEn ? 'The Result' : '结果'}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {isEn 
                          ? 'Ranked 12th in school competition. Missed top 3 national spots by a hair. But the team was forged in that 20-hour fire. We learned: documentation > perfect hardware, and community > individual heroes.'
                          : '校赛第12名，差3个名额进国赛。但团队在那20小时里淬炼出来了。我们学到：记录>完美硬件，社区>个人英雄。'
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
                <p className="text-slate-300 italic mb-4">
                  "{isEn 
                    ? 'All I have is an active community'
                    : 'All I have 一个活跃的社群'
                  }"
                </p>
                <p className="text-sm text-slate-500">
                  — Darren, 2025
                </p>
              </div>
            </>
          )}

          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => setShowDetails(!showDetails)}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              {showDetails 
                ? (isEn ? 'Show Less' : '收起详情')
                : (isEn ? 'Read Full Story' : '阅读完整故事')
              }
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
