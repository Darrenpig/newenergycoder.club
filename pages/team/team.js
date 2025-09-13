// team.js
const app = getApp()
const { createLoadMoreHelper, handlePullDownRefresh, handleReachBottom } = require('../../utils/loadMoreHelper.js')

Page({
  data: {
    // 当前选中的分类
    currentCategory: 'all',
    // 是否显示成员详情
    showMemberDetail: false,
    // 当前查看的成员
    currentMember: null,
    // 是否还有更多数据
    hasMore: true,
    // 是否正在加载
    loading: false,
    // 是否显示头像
    showAvatars: false,
    // 所有团队成员数据
    allMembers: [
      // 维护者
      {
        id: 1,
        name: 'DarrenPig',
        position: 'Club Founder & BSP 嵌软工程师',
        description: 'Renewable energy researcher with a focus on AI applications for energy optimization.',
        avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/maintainer/DarrenPig.jpg',
        role: 'maintainer',
        roleText: '维护者',
        skills: ['AI', 'BSP', '嵌入式', 'ROBOCON', '能源监测', 'openEuler'],
        projects: 15,
        contributions: 200,
        bio: 'Renewable energy researcher with a focus on AI applications for energy optimization.',
        contact: {
          email: '22230635@czu.cn',
          github: 'https://github.com/Darrenpig'
        }
      },
      {
        id: 2,
        name: '殷统创',
        position: 'Club Founder & BSP Expert',
        description: '专注于AI在能源优化应用的可再生能源研究员。',
        avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/maintainer/殷统创.jpg',
        role: 'maintainer',
        roleText: '维护者',
        skills: ['AI', 'BSP', '能源优化', '可再生能源', '华为云AI'],
        projects: 12,
        contributions: 180,
        bio: '专注于AI在能源优化应用的可再生能源研究员。',
        contact: {
          github: 'https://github.com/yintongchuang'
        }
      },
      {
        id: 3,
        name: '许珑译',
        position: '机器人算法工程师',
        description: '专注于机器人算法研发部署以及业务逻辑设计。',
        avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/maintainer/许珑译.jpg',
        role: 'maintainer',
        roleText: '维护者',
        skills: ['机器人算法', 'ROBOCON', '人形机器人', '算法部署', 'ROS'],
        projects: 10,
        contributions: 150,
        bio: '专注于机器人算法研发部署以及业务逻辑设计。',
        contact: {
          github: 'https://github.com/xulongyi'
        }
      },
      {
        id: 4,
        name: '张旺旺',
        position: '机器人运行时工程师',
        description: '负责项目的核心技术攻坚，保障电控系统的稳定运行。',
        avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/maintainer/张旺旺.jpg',
        role: 'maintainer',
        roleText: '维护者',
        skills: ['电控系统', '运行时', 'ROBOCON', '嵌入式', '系统稳定性'],
        projects: 8,
        contributions: 120,
        bio: '负责项目的核心技术攻坚，保障电控系统的稳定运行。',
        contact: {
          github: 'https://github.com/zhangwangwang'
        }
      },
      // 开发者
      {
        id: 5,
        name: '刘英琪',
        position: '嵌入式开发工程师',
        description: '专注于现代机器人技术栈，致力于构建高性能的机器人界面。',
        avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/developer/刘英琪.png',
        role: 'developer',
        roleText: '开发者',
        skills: ['React', 'TypeScript', 'Vue', '前端架构', 'UI/UX', 'Vite'],
        projects: 9,
        contributions: 130,
        bio: '专注于现代机器人技术栈，致力于构建高性能的机器人界面。',
        contact: {
          github: 'https://github.com/liuyingqi'
        }
      },
      {
        id: 6,
        name: '单广志',
        position: '嵌入式开发工程师',
        description: '机器人行业电控驱动开发以及硬件电路设计。',
        avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/developer/单广志.jpg',
        role: 'developer',
        roleText: '开发者',
        skills: ['嵌入式开发', '电控驱动', '硬件电路设计', '机器人', 'STM32', 'PCB设计'],
        projects: 7,
        contributions: 110,
        bio: '机器人行业电控驱动开发以及硬件电路设计。',
        contact: {
          github: 'https://github.com/shanguangzhi'
        }
      },
      {
        id: 7,
        name: '周志',
        position: '全栈开发工程师',
        description: '具备前后端开发能力，致力于端到端的解决方案开发。',
        avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/developer/周志.png',
        role: 'developer',
        roleText: '开发者',
        skills: ['全栈开发', 'JavaScript', 'Python', 'React', 'Node.js', '项目管理'],
        projects: 11,
        contributions: 160,
        bio: '具备前后端开发能力，致力于端到端的解决方案开发。',
        contact: {
          github: 'https://github.com/zhouzhi'
        }
      },
      {
        id: 8,
        name: '李硕',
        position: '硬件系统架构师',
        description: '专注于硬件系统架构设计和技术选型，为项目提供技术指导。',
        avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/developer/李硕.png',
        role: 'developer',
        roleText: '开发者',
        skills: ['系统架构', '技术选型', '分布式系统', '性能优化', '云原生', 'Kubernetes'],
        projects: 6,
        contributions: 90,
        bio: '专注于硬件系统架构设计和技术选型，为项目提供技术指导。',
        contact: {
          github: 'https://github.com/lishuo'
        }
      },
      {
        id: 9,
        name: '牛良旭',
        position: 'DevOps电池管理工程师',
        description: '负责项目的持续集成和部署，保障开发流程的高效运行。',
        avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/developer/牛良旭.jpg',
        role: 'developer',
        roleText: '开发者',
        skills: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'GitHub Actions', '自动化部署'],
        projects: 8,
        contributions: 120,
        bio: '负责项目的持续集成和部署，保障开发流程的高效运行。',
        contact: {
          github: 'https://github.com/niuliangxu'
        }
      },
      {
        id: 10,
        name: '郑钦文',
        position: '机电一体化开发工程师',
        description: '专注于机电设计开发，为用户提供优质的移动端体验。',
        avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/developer/郑钦文.jpg',
        role: 'developer',
        roleText: '开发者',
        skills: ['React Native', 'Flutter', 'iOS', 'Android', '移动端优化', '跨平台开发'],
        projects: 5,
        contributions: 80,
        bio: '专注于机电设计开发，为用户提供优质的移动端体验。',
        contact: {
          github: 'https://github.com/zhengqinwen'
        }
      },
      {
        id: 11,
        name: '杨力滔',
        position: '星闪手柄开发工程师',
        description: '星闪手柄开发专家，熟悉STM32+RTOS C语言开发。',
        avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/developer/杨力滔.JPG',
        role: 'developer',
        roleText: '开发者',
        skills: ['星闪手柄', 'STM32', 'RTOS', 'C语言', '嵌入式开发', '硬件控制'],
        projects: 4,
        contributions: 70,
        bio: '星闪手柄开发专家，熟悉STM32+RTOS C语言开发。',
        contact: {
          github: 'https://github.com/yanglitao'
        }
      },
      {
        id: 12,
        name: '彭柯颖',
        position: '机械R1机器人开发者',
        description: '新加入的开发团队成员，积极参与机器人项目开发，学习新技术。',
        avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/developer/彭柯颖.jpg',
        role: 'developer',
        roleText: '开发者',
        skills: ['新成员', '项目开发', '学习成长', 'Web开发', 'JavaScript', '团队协作'],
        projects: 3,
        contributions: 50,
        bio: '新加入的开发团队成员，积极参与机器人项目开发，学习新技术。',
        contact: {
          github: 'https://github.com/pengkeying'
        }
      },
      // 设计师
      {
        id: 13,
        name: 'Xiux',
        position: 'UI/UX设计师 & 仓库PM',
        description: '专注于开发者体验设计和界面优化，为可持续仓库创造美观易用的界面。',
        avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/designer/xiux.jpg',
        role: 'designer',
        roleText: '设计师',
        skills: ['UI设计', 'UX设计', 'Figma', 'Sketch', '原型设计', '用户研究'],
        projects: 6,
        contributions: 90,
        bio: '专注于开发者体验设计和界面优化，为可持续仓库创造美观易用的界面。',
        contact: {}
      },
      {
        id: 14,
        name: 'ikkOoOo',
        position: '工业/产品设计师',
        description: '专注于创意设计和视觉表达，为项目提供独特的设计视角。',
        avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/designer/ikkOoOo.jpg',
        role: 'designer',
        roleText: '设计师',
        skills: ['创意设计', '视觉表达', '设计创新', '艺术指导', '品牌设计', '视觉传达'],
        projects: 5,
        contributions: 80,
        bio: '专注于创意设计和视觉表达，为项目提供独特的设计视角。',
        contact: {}
      },
      {
        id: 15,
        name: '张若璐',
        position: '视觉设计师&财务分析师',
        description: '专注于品牌落地和财务分析，为项目提供专业的财务视角可行性落地设计。',
        avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/designer/张若璐.jpg',
        role: 'designer',
        roleText: '设计师',
        skills: ['品牌设计', 'Power BI', 'Logo设计', '色彩搭配'],
        projects: 4,
        contributions: 70,
        bio: '专注于品牌落地和财务分析，为项目提供专业的财务视角可行性落地设计。',
        contact: {}
      },
      {
        id: 16,
        name: '韦彩日',
        position: '工业产品设计师',
        description: '负责对接需求，专注于工业产品设计，为项目提供专业的设计解决方案。',
        avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/designer/韦彩日.jpg',
        role: 'designer',
        roleText: '设计师',
        skills: ['工业设计', '产品设计', '需求对接', '设计解决方案', '用户体验', '产品规划'],
        projects: 7,
        contributions: 100,
        bio: '负责对接需求，专注于工业产品设计，为项目提供专业的设计解决方案。',
        contact: {}
      },
      {
        id: 17,
        name: '张岩皓',
        position: '摄影&数据可视化&设计师&运营博主',
        description: '会摄影，学艺术设计，做漂亮餐，专注于摄影、数据可视化设计和运营推广。',
        avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/designer/张岩皓.jpg',
        role: 'designer',
        roleText: '设计师',
        skills: ['摄影', '数据可视化', '艺术设计', '运营博主', '视觉传达', '内容创作'],
        projects: 8,
        contributions: 110,
        bio: '会摄影，学艺术设计，做漂亮餐，专注于摄影、数据可视化设计和运营推广。',
        contact: {}
      },
      {
         id: 18,
         name: '李想',
         position: 'UX设计师',
         description: '一直在探索技术与设计边界的路上，以用户为中心，以体验为驱动。',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/designer/李想.jpg',
         role: 'designer',
         roleText: '设计师',
         skills: ['UX设计', '用户体验', '设计思维', 'Figma', '用户旅程', '信息架构'],
         projects: 6,
         contributions: 90,
         bio: '一直在探索技术与设计边界的路上，以用户为中心，以体验为驱动。',
         contact: {}
       },
       // 贡献者
       {
         id: 19,
         name: '卢永杰',
         position: '嵌入式&运控算法专家',
         description: '专注算法部署优化及BSP逻辑协同设计，在嵌入式和运控算法领域有深入研究。',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/contributer/卢永杰.jpg',
         role: 'contributor',
         roleText: '贡献者',
         skills: ['嵌入式开发', '运控算法', '算法部署', '协同设计', '算法优化'],
         projects: 5,
         contributions: 80,
         bio: '专注算法部署优化及BSP逻辑协同设计，在嵌入式和运控算法领域有深入研究。',
         contact: {
           github: 'https://github.com/luyongjie'
         }
       },
       {
         id: 20,
         name: '卢王淳',
         position: '25RC项管&机械&电控小白',
         description: '25RC项目管理，机械和电控领域的学习者，负责项目协调工作。',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/contributer/卢王淳.jpg',
         role: 'contributor',
         roleText: '贡献者',
         skills: ['项目管理', '机械设计', '电控学习', 'ROBOCON', '团队协调', '25RC'],
         projects: 3,
         contributions: 50,
         bio: '25RC项目管理，机械和电控领域的学习者，负责项目协调工作。',
         contact: {
           github: 'https://github.com/luwangchun'
         }
       },
       {
         id: 19,
         name: '韩祺冉',
         position: 'Contributor',
         description: '数据分析师，专注于数据处理和分析工作。',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/contributer/韩祺冉.jpg',
         role: 'contributor',
         roleText: '贡献者',
         skills: ['数据分析', '数据处理', '统计分析', '数据可视化', '业务分析'],
         projects: 3,
         contributions: 45,
         bio: '数据分析师，专注于数据处理和分析工作。',
         contact: {
           github: 'https://github.com/hanqiran'
         }
       },
       {
         id: 20,
         name: '王于豪',
         position: '成型组组长',
         description: '调试3D打印机帮助团队打印物品，负责成型组的管理和技术支持工作。',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/contributer/王于豪.jpg',
         role: 'contributor',
         roleText: '贡献者',
         skills: ['3D打印', '成型技术', '团队管理', '技术支持', '设备调试', '物品制作'],
         projects: 4,
         contributions: 60,
         bio: '调试3D打印机帮助团队打印物品，负责成型组的管理和技术支持工作。',
         contact: {
           github: 'https://github.com/wangyuhao'
         }
       },
       {
         id: 21,
         name: '崔正阳',
         position: '上位机测试工程师',
         description: '专注于上位机软件质量保证，确保项目的稳定性和可靠性。',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/contributer/崔正阳.png',
         role: 'contributor',
         roleText: '贡献者',
         skills: ['海鸥派', 'Liunx', 'openEuler', '自动化测试', '性能测试'],
         projects: 4,
         contributions: 60,
         bio: '专注于上位机软件质量保证，确保项目的稳定性和可靠性。',
         contact: {
           github: 'https://github.com/cuizhengyang'
         }
       },
       {
         id: 22,
         name: '闻志伟',
         position: 'Bronze Sponsor',
         description: '致力于推动可持续技术发展的个人赞助者。',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/developer/闻志伟.png',
         role: 'contributor',
         roleText: '贡献者',
         skills: ['技术赞助', '项目支持', '可持续发展', '创新资助', '社区建设', '人才培养'],
         projects: 2,
         contributions: 30,
         bio: '致力于推动可持续技术发展的个人赞助者。',
         contact: {}
       },
       {
         id: 23,
         name: '张旺旺',
         position: '新能源运维工程师',
         description: '负责核心项目的真机部署和运维工作，保障系统的稳定运行。',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/contributer/张旺旺.jpg',
         role: 'contributor',
         roleText: '贡献者',
         skills: ['运维部署', 'Linux', '服务器管理', '监控告警', '故障排查', '系统优化'],
         projects: 6,
         contributions: 90,
         bio: '负责核心项目的真机部署和运维工作，保障系统的稳定运行。',
         contact: {
           github: 'https://github.com/zhangwangwang'
         }
       },
       {
         id: 24,
         name: '吴洛斌',
         position: '开源贡献者&气动自动化专家',
         description: '积极参与开源项目，为社区贡献代码商业化文档。',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/contributer/吴洛斌.jpg',
         role: 'contributor',
         roleText: '贡献者',
         skills: ['气动自动化', '开源贡献', '工业控制', 'PLC', '自动化系统'],
         projects: 4,
         contributions: 70,
         bio: '积极参与开源项目，为社区贡献代码商业化文档。',
         contact: {
           github: 'https://github.com/wuluobin'
         }
       },
       {
         id: 25,
         name: '余浩铭',
         position: '机器人日志运营编辑',
         description: '专注于宣传和文字，让NEC的每一份理念都能被看见。',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/developer/余浩铭.jpg',
         role: 'contributor',
         roleText: '贡献者',
         skills: ['文艺工作', '运营编辑', '宣传策划', '文字编辑', 'NEC理念', '内容创作'],
         projects: 3,
         contributions: 50,
         bio: '专注于宣传和文字，让NEC的每一份理念都能被看见。',
         contact: {
           github: 'https://github.com/yuhaoming'
         }
       },
       {
         id: 26,
         name: '许子涵',
         position: '产品经理',
         description: '负责产品规划和需求分析，推动项目向正确方向发展。',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/contributer/许子涵.png',
         role: 'contributor',
         roleText: '贡献者',
         skills: ['产品规划', '需求分析', '用户研究', 'Axure', '原型设计', '数据分析'],
         projects: 5,
         contributions: 80,
         bio: '负责产品规划和需求分析，推动项目向正确方向发展。',
         contact: {
           github: 'https://github.com/xuzihan'
         }
       },
       {
         id: 27,
         name: '卞乐凌',
         position: '嵌入式学习贡献者',
         description: '嵌入式学习中，积极参与开源项目和社区建设。',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/contributer/卞乐凌.jpg',
         role: 'contributor',
         roleText: '贡献者',
         skills: ['嵌入式学习', '开源贡献', '社区建设', 'STM32', '硬件开发'],
         projects: 3,
         contributions: 40,
         bio: '嵌入式学习中，积极参与开源项目和社区建设。',
         contact: {
           github: 'https://github.com/bianleiling'
         }
       },
       {
         id: 28,
         name: '王彦君',
         position: '工业/产品设计师',
         description: '致力于通过设计解决实际问题，以更开放的态度寻找更多可能性。',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/contributer/王彦君.jpg',
         role: 'contributor',
         roleText: '贡献者',
         skills: ['工业设计', '产品设计', 'SolidWorks', 'Rhino', '3D建模', '材料工艺'],
         projects: 4,
         contributions: 60,
         bio: '致力于通过设计解决实际问题，以更开放的态度寻找更多可能性。',
         contact: {}
       },
       {
         id: 29,
         name: '徐海婷',
         position: '财务管理专员',
         description: '聚焦财务流程优化与数据支撑，通过合理预算、风险防控，助力技术实践、行稳致远。',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/designer/徐海婷.jpg',
         role: 'contributor',
         roleText: '贡献者',
         skills: ['财务管理', '预算控制', '风险防控', '数据分析', '流程优化', '成本管控'],
         projects: 2,
         contributions: 30,
         bio: '聚焦财务流程优化与数据支撑，通过合理预算、风险防控，助力技术实践、行稳致远。',
         contact: {}
       },
       {
         id: 30,
         name: '李一楠',
         position: '运营组长',
         description: '为NEC小队宣传以及主持，负责团队运营和对外宣传工作。',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/designer/李一楠.jpg',
         role: 'contributor',
         roleText: '贡献者',
         skills: ['团队运营', '宣传策划', '活动主持', 'NEC小队', '对外联络', '品牌推广'],
         projects: 4,
         contributions: 70,
         bio: '为NEC小队宣传以及主持，负责团队运营和对外宣传工作。',
         contact: {}
       },
       {
         id: 31,
         name: '郑绍恺',
         position: '算法竞赛选手',
         description: '专注于算法研究以及最优化问题',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/contributer/郑绍恺.jpg',
         role: 'contributor',
         roleText: '贡献者',
         skills: ['算法研究', '最优化', '竞赛选手', '问题求解', '算法优化', '数学建模'],
         projects: 5,
         contributions: 90,
         bio: '专注于算法研究以及最优化问题',
         contact: {
           github: 'https://github.com/zhengshaokai'
         }
       },
       {
         id: 32,
         name: '杨鑫海',
         position: 'Developer',
         description: '专注于Arduino和ESP32等开发板的代码例程开发。',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/contributer/杨鑫海.jpg',
         role: 'contributor',
         roleText: '贡献者',
         skills: ['Arduino', 'ESP32', '代码例程', '嵌入式开发', '物联网', '开发板'],
         projects: 6,
         contributions: 100,
         bio: '专注于Arduino和ESP32等开发板的代码例程开发。',
         contact: {
           github: 'https://github.com/yangxinhai'
         }
       },
       {
         id: 33,
         name: '殷子豪',
         position: 'Developer&文艺工作者',
         description: '运营宣传与文字编辑，负责团队内容创作和对外传播。',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/contributer/殷子豪.jpg',
         role: 'contributor',
         roleText: '贡献者',
         skills: ['运营宣传', '文字编辑', '内容创作', '团队传播', '文案策划', '品牌建设'],
         projects: 3,
         contributions: 50,
         bio: '运营宣传与文字编辑，负责团队内容创作和对外传播。',
         contact: {
           github: 'https://github.com/yinzihao'
         }
       },
       {
         id: 34,
         name: '孙如婕',
         position: '灵巧手横向开发贡献者',
         description: '专注于灵巧手的横向开发，为项目提供创新的技术解决方案和开发支持。',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/contributer/孙如婕.jpg',
         role: 'contributor',
         roleText: '贡献者',
         skills: ['灵巧手开发', '横向开发', '技术创新', '开发支持', '项目贡献', '技术解决方案'],
         projects: 4,
         contributions: 70,
         bio: '专注于灵巧手的横向开发，为项目提供创新的技术解决方案和开发支持。',
         contact: {
           github: 'https://github.com/sunrujie'
         }
       },
       // 赞助商
       {
         id: 35,
         name: '开源之夏',
         position: 'Gold Sponsor - ¥12,000',
         description: '中国科学院软件研究所、华为技术有限公司、中科南京软件技术研究院联合主办的开源活动。',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/sponsor/开源之夏Logo.png',
         role: 'sponsor',
         roleText: '赞助商',
         skills: ['开源软件', '供应链点亮', '学生项目', '技术孵化', '创新推动', '人才培养'],
         projects: 1,
         contributions: 12000,
         bio: '中国科学院软件研究所、华为技术有限公司、中科南京软件技术研究院联合主办的开源活动。',
         contact: {
           github: 'https://summer-ospp.ac.cn/'
         }
       },
       {
         id: 36,
         name: '立创开源硬件平台',
         position: 'Silver Sponsor - ¥8,000',
         description: '专业的开源硬件开发平台，提供丰富的开发板和技术资源。',
         avatar: 'https://raw.githubusercontent.com/Darrenpig/newenergycoder.club/main/src/image/sponsor/立创开源广场.png',
         role: 'sponsor',
         roleText: '赞助商',
         skills: ['开源硬件', '开发板', '技术资源', '硬件开发', '创客平台', '技术支持'],
         projects: 1,
         contributions: 8000,
         bio: '专业的开源硬件开发平台，提供丰富的开发板和技术资源。',
         contact: {
           github: 'https://oshwhub.com/explore'
         }
       }
     ],
    // 过滤后的成员列表
    filteredMembers: []
  },

  onLoad() {
    console.log('团队页面加载')
    // 初始化加载更多助手
    this.loadMoreHelper = createLoadMoreHelper({
      loadingTitle: '加载更多成员...',
      successTitle: '成员加载成功',
      noMoreTitle: '没有更多成员了',
      maxRetries: 3
    })
    this.initData()
  },

  onShow() {
    console.log('团队页面显示')
  },

  onPullDownRefresh() {
    handlePullDownRefresh(this, () => {
      this.initData()
      // 重置加载更多助手状态
      this.loadMoreHelper.reset()
      this.setData({ hasMore: true })
    })
  },

  onReachBottom() {
    handleReachBottom(
      this.loadMoreHelper,
      this,
      () => this.getMoreMembers(),
      {
        dataKey: 'filteredMembers',
        hasMoreKey: 'hasMore',
        loadingKey: 'loading',
        maxItems: 50 // 最多显示50个成员
      }
    )
  },

  onShareAppMessage() {
    return app.onShareAppMessage()
  },

  onShareTimeline() {
    return app.onShareTimeline()
  },

  // 初始化数据
  initData() {
    this.setData({
      filteredMembers: this.data.allMembers
    })
  },

  // 返回上一页
  navigateBack() {
    wx.navigateBack()
  },

  // 显示搜索
  showSearch() {
    wx.showToast({
      title: '搜索功能开发中',
      icon: 'none'
    })
  },

  // 显示筛选
  showFilter() {
    wx.showActionSheet({
      itemList: ['按项目数排序', '按贡献数排序', '按姓名排序'],
      success: (res) => {
        this.sortMembers(res.tapIndex)
      }
    })
  },

  // 切换分类
  switchCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({ currentCategory: category })
    
    if (category === 'all') {
      this.setData({ filteredMembers: this.data.allMembers })
    } else {
      const filtered = this.data.allMembers.filter(member => member.role === category)
      this.setData({ filteredMembers: filtered })
    }
  },

  // 排序成员
  sortMembers(type) {
    let sortedMembers = [...this.data.filteredMembers]
    
    switch (type) {
      case 0: // 按项目数排序
        sortedMembers.sort((a, b) => b.projects - a.projects)
        break
      case 1: // 按贡献数排序
        sortedMembers.sort((a, b) => b.contributions - a.contributions)
        break
      case 2: // 按姓名排序
        sortedMembers.sort((a, b) => a.name.localeCompare(b.name))
        break
    }
    
    this.setData({ filteredMembers: sortedMembers })
  },

  // 查看成员详情
  viewMemberDetail(e) {
    const member = e.currentTarget.dataset.member
    this.setData({
      currentMember: member,
      showMemberDetail: true
    })
  },

  // 隐藏成员详情
  hideMemberDetail() {
    this.setData({
      showMemberDetail: false,
      currentMember: null
    })
  },

  // 处理加载更多组件的事件
  onLoadMoreTrigger() {
    if (this.data.loading || !this.data.hasMore) {
      return
    }
    
    // 触发加载更多逻辑
    this.onReachBottom()
  },

  // 注意：loadMore方法已被通用的loadMoreHelper替代
  // 现在通过onReachBottom中的handleReachBottom函数处理加载更多逻辑

  // 获取更多成员数据（模拟）
  getMoreMembers() {
    return []
  },

  // 复制联系方式
  copyContact(e) {
    const type = e.currentTarget.dataset.type
    const value = e.currentTarget.dataset.value
    
    wx.setClipboardData({
      data: value,
      success: () => {
        wx.showToast({
          title: `${type === 'email' ? '邮箱' : 'GitHub'}已复制`,
          icon: 'success'
        })
      }
    })
  },

  // 底部导航切换
  switchToHome() {
    wx.switchTab({ url: '../index/index' })
  },

  switchToTeam() {
    // 当前页面，无需切换
  },

  switchToProjects() {
    wx.switchTab({ url: '../projects/projects' })
  },

  switchToJoin() {
    wx.switchTab({ url: '../join/join' })
  },

  // 切换头像显示状态
  toggleAvatars() {
    this.setData({
      showAvatars: !this.data.showAvatars
    })
  }
})