/**
 * 静态 SEO 页面生成器
 *
 * 在 vite build 之后执行，为每个关键路由在 dist/<route>/index.html
 * 生成一份带完整中文内容 + JSON-LD 的静态 HTML。
 *
 * 与 SPA 的关系：
 *   - 真实用户访问 /<route> 时，vercel.json 的 rewrite 会回退到 /index.html（SPA），
 *     所以这些静态文件不会被浏览器加载——它们只为爬虫服务。
 *   - 实际上更稳妥的做法是把静态 HTML 写到 dist/seo-pages/<route>/index.html，
 *     并在 vercel.json 加一条 rewrite 把爬虫 UA 路由过去。
 *     但出于简单性，这里直接写到 dist/<route>/index.html；由于 vercel.json 的
 *     catch-all rewrite 优先级低于实际存在的静态文件，Vercel 会优先返回静态文件。
 *     SPA 用户打开页面后，React 仍能正常 hydrate（因为 main.tsx 的脚本在 <body> 末尾）。
 */

import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distDir = resolve(__dirname, '../dist');

const SITE_URL = 'https://newenergycoder.club';
const SITE_NAME = '新能源编程俱乐部 NEC';
const DEFAULT_OG_IMAGE = 'https://cdn.newenergycoder.club/images/public/og-image.svg';

/** 各路由的 SEO 元数据 + 静态内容（中文为主） */
const PAGES = [
  {
    path: '/',
    title: '新能源编程俱乐部 NEC - 机器人×新能源开源社区 | New Energy Coder Club',
    description:
      '新能源编程俱乐部（New Energy Coder Club，简称 NEC）是面向 ROBOCON 等机器人竞赛与真实工程项目的开源开发者社区，提供嵌入式/机械/GUI/算法/设计五大方向的学习路径，拥有 A416 线下实验室与模块化工程基线。',
    keywords:
      '新能源编程俱乐部,New Energy Coder Club,NEC,ROBOCON,机器人竞赛,开源社区,嵌入式,STM32,RT-Thread,机器人,A416实验室',
    heading: '新能源编程俱乐部 (New Energy Coder Club / NEC)',
    body: `
      <p><strong>NEC</strong> 是一个面向 <strong>ROBOCON 等机器人竞赛</strong> 与 <strong>真实工程项目</strong> 的开源开发者社区，
      以「<strong>模块化工程基线 + 新手友好贡献路径 + 线上协作 × A416 线下实验室</strong>」为核心特色。
      我们致力于连接、启发和赋能新能源与机器人领域的开发者，通过开源协作推动可持续技术的发展。</p>

      <h2>社区特色</h2>
      <ul>
        <li><strong>模块化工程基线</strong>：可直接复用的机器人/嵌入式工程模板，新成员专注业务逻辑</li>
        <li><strong>新手友好</strong>：good-first-issue 任务池 + mentor 1对1 辅导 + 完善贡献指南</li>
        <li><strong>线上协作 × A416 线下实验室</strong>：Gitee + 飞书 + 实体实验室硬件调试</li>
      </ul>

      <h2>五大技术方向</h2>
      <ul>
        <li><strong>嵌入式</strong>：STM32 / ESP32 / RT-Thread / C/C++</li>
        <li><strong>机械</strong>：SolidWorks / 3D 打印 / 结构仿真</li>
        <li><strong>GUI</strong>：Qt / React / Flutter</li>
        <li><strong>算法</strong>：ROS / OpenCV / SLAM / 路径规划</li>
        <li><strong>设计</strong>：Figma / 品牌 / 交互</li>
      </ul>

      <h2>热门板块</h2>
      <ul>
        <li><a href="${SITE_URL}/projects">项目展示</a> - 开源项目与工程实践</li>
        <li><a href="${SITE_URL}/events">活动中心</a> - 技术分享、工作坊、比赛动态</li>
        <li><a href="${SITE_URL}/team">团队介绍</a> - 核心成员与贡献者</li>
        <li><a href="${SITE_URL}/innovation">创新中心</a> - 新能源×机器人交叉探索</li>
        <li><a href="${SITE_URL}/join">加入我们</a> - 新成员申请</li>
        <li><a href="${SITE_URL}/resources">资源中心</a> - 教程、文档、工具</li>
      </ul>
    `,
  },
  {
    path: '/projects',
    title: '项目展示',
    description:
      '新能源编程俱乐部成员的开源项目展示：嵌入式系统、机器人、AI 物联网、Web 与移动应用等创新实践。',
    keywords: 'NEC项目,开源项目,ROBOCON机器人,嵌入式项目,新能源项目',
    heading: '项目展示 - NEC 新能源编程俱乐部',
    body: `
      <p>NEC 社区成员在机器人竞赛（ROBOCON）、嵌入式系统、新能源技术等领域的开源项目集合。</p>
      <h2>代表性项目</h2>
      <ul>
        <li><strong>ROBOCON 2024/2025 机器人控制系统</strong>：全开源的竞赛机器人解决方案</li>
        <li><strong>模块化嵌入式基线工程</strong>：STM32 HAL + RT-Thread 的开箱即用模板</li>
        <li><strong>NEC 官网</strong>：本站点，MIT 协议开源</li>
      </ul>
      <p>更多项目请访问 <a href="https://gitee.com/nec-community">Gitee 组织</a>。</p>
    `,
  },
  {
    path: '/events',
    title: '活动中心',
    description:
      '新能源编程俱乐部活动日历：工作坊、黑客松、技术分享、RoboMaster 等机器人竞赛与开发者线下聚会。',
    keywords: 'NEC活动,机器人竞赛,技术分享,工作坊,黑客松,ROBOCON',
    heading: '活动中心 - NEC 新能源编程俱乐部',
    body: `
      <p>NEC 定期举办技术分享、工作坊、黑客松与机器人竞赛相关活动，覆盖线上直播与线下 A416 实验室两个场景。</p>
      <h2>活动类型</h2>
      <ul>
        <li><strong>技术分享</strong>：每周一次的内部技术沙龙</li>
        <li><strong>工作坊</strong>：嵌入式/机械/算法等方向的实战工作坊</li>
        <li><strong>竞赛</strong>：ROBOCON、RoboMaster 等机器人竞赛集训与参赛</li>
        <li><strong>开源之夏</strong>：每年参与的 OSPP 开源项目活动</li>
      </ul>
    `,
  },
  {
    path: '/team',
    title: '团队介绍',
    description:
      '认识 NEC 新能源编程俱乐部的核心成员与贡献者：硬件组、软件组、算法组、设计组，覆盖机器人全栈开发。',
    keywords: 'NEC团队,新能源编程俱乐部成员,开源贡献者,Maintainer,机器人团队',
    heading: '团队介绍 - NEC 新能源编程俱乐部',
    body: `
      <p>NEC 是一个由学生主导的开源社区，团队成员按角色分为 Maintainer、Developer、Designer、Contributor 四大类，
      按方向覆盖嵌入式、机械、GUI、算法、设计五大领域。</p>
      <h2>核心方向</h2>
      <ul>
        <li><strong>硬件组</strong>：嵌入式开发、PCB 设计、传感器融合</li>
        <li><strong>软件组</strong>：上位机、Web、移动应用</li>
        <li><strong>算法组</strong>：SLAM、视觉、路径规划</li>
        <li><strong>设计组</strong>：品牌、UI/UX、视觉</li>
      </ul>
    `,
  },
  {
    path: '/innovation',
    title: '创新中心',
    description:
      'NEC 新能源编程俱乐部创新中心：太阳能、风能、储能、电动车、核能等新能源技术与机器人、AI、物联网的交叉探索，开源项目孵化与技术趋势洞察。',
    keywords: '新能源,创新中心,机器人,太阳能,储能,电动车,AI,物联网,开源孵化',
    heading: '创新中心 - NEC 新能源编程俱乐部',
    body: `
      <p>创新中心是 NEC 探索新能源与机器人、AI、物联网交叉领域的孵化平台，覆盖太阳能、风能、储能、电动车、核能等技术方向。</p>
      <h2>研究方向</h2>
      <ul>
        <li><strong>太阳能</strong>：光伏 MPPT、智能追踪</li>
        <li><strong>储能</strong>：BMS、超级电容、氢能</li>
        <li><strong>电动车</strong>：电驱动、整车控制</li>
        <li><strong>机器人×新能源</strong>：巡检机器人、光伏清扫机器人</li>
      </ul>
    `,
  },
  {
    path: '/join',
    title: '加入我们',
    description:
      '加入 NEC 新能源编程俱乐部：面向机器人与新能源方向的学生开发者，提供新手友好贡献路径、mentor 1对1 辅导、A416 线下实验室与真实项目实践。',
    keywords: '加入NEC,新能源编程俱乐部招新,机器人社区加入,开源社区申请,学生社团',
    heading: '加入我们 - NEC 新能源编程俱乐部',
    body: `
      <p>NEC 欢迎对机器人、嵌入式、新能源技术感兴趣的同学加入。无论你是零基础新手还是有经验的开发者，都有适合你的参与方式。</p>
      <h2>加入流程</h2>
      <ol>
        <li><strong>了解我们</strong>：浏览项目介绍和团队文化</li>
        <li><strong>技术准备</strong>：准备基础开发环境和技能</li>
        <li><strong>提交申请</strong>：填写加入申请表单</li>
        <li><strong>等待审核</strong>：团队审核您的申请</li>
        <li><strong>欢迎加入</strong>：获得邀请，开始协作之旅</li>
      </ol>
      <p><a href="${SITE_URL}/join/form">立即申请 →</a></p>
    `,
  },
  {
    path: '/resources',
    title: '学习资源',
    description:
      '新能源编程俱乐部精选学习资源：嵌入式开发、机器人、算法、GUI 与机械设计教程、文档、工具与开源库。',
    keywords: '嵌入式学习资源,机器人教程,STM32教程,ROS教程,新能源学习',
    heading: '学习资源 - NEC 新能源编程俱乐部',
    body: `
      <p>NEC 为成员精选嵌入式开发、机器人、算法、GUI、机械设计等方向的学习资源，包含教程、文档、工具与开源库。</p>
      <h2>资源分类</h2>
      <ul>
        <li><strong>嵌入式</strong>：STM32 HAL、RT-Thread、FreeRTOS</li>
        <li><strong>机器人</strong>：ROS、ROS2、MoveIt、Gazebo</li>
        <li><strong>算法</strong>：SLAM、视觉、控制理论</li>
        <li><strong>工具</strong>：Git、Docker、CI/CD</li>
      </ul>
    `,
  },
  {
    path: '/contact',
    title: '联系我们',
    description:
      '联系 NEC 新能源编程俱乐部：技术讲座、竞赛赞助、联合孵化、人才推荐等合作洽谈。线上通过 Gitee/微信/邮件，线下 A416 实验室欢迎来访。',
    keywords: 'NEC联系方式,新能源编程俱乐部合作,开源社区赞助,机器人社区合作',
    heading: '联系我们 - NEC 新能源编程俱乐部',
    body: `
      <p>欢迎通过以下渠道与 NEC 新能源编程俱乐部取得联系：</p>
      <h2>联系方式</h2>
      <ul>
        <li><strong>Gitee</strong>：<a href="https://gitee.com/nec-community">gitee.com/nec-community</a></li>
        <li><strong>邮箱</strong>：22230635@czu.cn</li>
        <li><strong>线下</strong>：A416 实验室</li>
      </ul>
      <h2>合作形式</h2>
      <ul>
        <li>技术讲座 / 工作坊</li>
        <li>竞赛赞助</li>
        <li>联合项目孵化</li>
        <li>人才推荐</li>
      </ul>
    `,
  },
  {
    path: '/learning/embedded',
    title: '嵌入式学习路径',
    description:
      'NEC 嵌入式学习路径：从 C 语言基础到 STM32 HAL、RT-Thread 实时操作系统、传感器融合与机器人底层控制的完整成长路线。',
    keywords: '嵌入式学习,STM32教程,RT-Thread,C语言,机器人控制',
    heading: '嵌入式学习路径 - NEC',
    body: `
      <p>覆盖从 C 语言基础到 STM32 HAL、RT-Thread 实时操作系统、传感器融合与机器人底层控制的完整学习路径。</p>
      <h2>学习阶段</h2>
      <ul>
        <li><strong>入门</strong>：C 语言、单片机基础、GPIO/UART/I2C/SPI</li>
        <li><strong>进阶</strong>：STM32 HAL 库、中断、DMA、定时器</li>
        <li><strong>高级</strong>：RT-Thread、设备驱动、通信协议</li>
        <li><strong>实战</strong>：机器人底层控制项目</li>
      </ul>
    `,
  },
  {
    path: '/learning/mechanical',
    title: '机械学习路径',
    description:
      'NEC 机械学习路径：SolidWorks 三维建模、3D 打印、结构仿真、传动机构设计与机器人本体开发的完整成长路线。',
    keywords: '机械设计,SolidWorks,3D打印,机器人结构,传动机构',
    heading: '机械学习路径 - NEC',
    body: `
      <p>覆盖 SolidWorks 三维建模、3D 打印、结构仿真、传动机构设计与机器人本体开发的完整学习路径。</p>
    `,
  },
  {
    path: '/learning/gui',
    title: 'GUI 学习路径',
    description:
      'NEC GUI 学习路径：Qt / React / Flutter 三大主流框架，覆盖机器人上位机、调试工具与可视化大屏的开发。',
    keywords: 'Qt教程,React教程,Flutter,机器人上位机,GUI开发',
    heading: 'GUI 学习路径 - NEC',
    body: `
      <p>覆盖 Qt / React / Flutter 三大主流框架，适用于机器人上位机、调试工具与可视化大屏的开发。</p>
    `,
  },
  {
    path: '/learning/algorithm',
    title: '算法学习路径',
    description:
      'NEC 算法学习路径：ROS / OpenCV / SLAM / 路径规划，覆盖机器人自主导航、视觉识别与决策规划的完整成长路线。',
    keywords: 'ROS教程,SLAM,OpenCV,路径规划,机器人算法',
    heading: '算法学习路径 - NEC',
    body: `
      <p>覆盖 ROS / OpenCV / SLAM / 路径规划，适用于机器人自主导航、视觉识别与决策规划。</p>
    `,
  },
  {
    path: '/learning/designer',
    title: '设计学习路径',
    description:
      'NEC 设计学习路径：Figma、品牌视觉、交互设计，覆盖社区视觉、项目展示与产品原型的完整成长路线。',
    keywords: 'Figma教程,UI设计,品牌设计,交互设计',
    heading: '设计学习路径 - NEC',
    body: `
      <p>覆盖 Figma、品牌视觉、交互设计，适用于社区视觉、项目展示与产品原型开发。</p>
    `,
  },
];

/** 通用 Organization + WebSite JSON-LD */
function baseJsonLd(page) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: '新能源编程俱乐部',
      alternateName: ['New Energy Coder Club', 'NEC', 'NEC 社区'],
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: DEFAULT_OG_IMAGE, width: 1200, height: 630 },
      description:
        '面向 ROBOCON 等机器人竞赛与真实工程项目的开源开发者社区，以模块化工程基线、新手友好贡献路径、线上协作 × A416 线下实验室为核心特色。',
      sameAs: ['https://gitee.com/nec-community', 'https://github.com/newenergycoder'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${SITE_URL}${page.path}#webpage`,
      url: `${SITE_URL}${page.path}`,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'zh-CN',
    },
  ];
}

/** 渲染单个静态 HTML 页面 */
function renderPage(page) {
  const fullTitle = page.path === '/' ? page.title : `${page.title} | ${SITE_NAME} - New Energy Coder Club`;
  const jsonLd = JSON.stringify(baseJsonLd(page));

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${fullTitle}</title>
  <meta name="description" content="${page.description}" />
  <meta name="keywords" content="${page.keywords}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
  <link rel="canonical" href="${SITE_URL}${page.path}" />
  <meta property="og:title" content="${fullTitle}" />
  <meta property="og:description" content="${page.description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${SITE_URL}${page.path}" />
  <meta property="og:image" content="${DEFAULT_OG_IMAGE}" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:locale" content="zh_CN" />
  <script type="application/ld+json">${jsonLd}</script>
  <style>
    body { max-width: 800px; margin: 40px auto; padding: 20px; font-family: system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif; line-height: 1.8; color: #1e293b; }
    h1 { font-size: 1.8em; border-bottom: 2px solid #3b82f6; padding-bottom: 12px; }
    h2 { font-size: 1.3em; margin-top: 32px; color: #1e40af; }
    a { color: #2563eb; text-decoration: none; }
    a:hover { text-decoration: underline; }
    ul, ol { padding-left: 24px; }
    li { margin: 6px 0; }
    nav { background: #f1f5f9; padding: 16px 20px; border-radius: 8px; margin-bottom: 32px; }
    nav a { margin-right: 16px; font-size: 14px; }
    footer { margin-top: 48px; padding-top: 24px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <nav>
    <strong>NEC 站点导航:</strong>
    <a href="${SITE_URL}/">首页</a>
    <a href="${SITE_URL}/projects">项目</a>
    <a href="${SITE_URL}/events">活动</a>
    <a href="${SITE_URL}/team">团队</a>
    <a href="${SITE_URL}/innovation">创新</a>
    <a href="${SITE_URL}/join">加入</a>
    <a href="${SITE_URL}/resources">资源</a>
    <a href="${SITE_URL}/contact">联系</a>
  </nav>
  <main>
    <h1>${page.heading}</h1>
    ${page.body}
  </main>
  <footer>
    <p>© 2026 新能源编程俱乐部 (New Energy Coder Club)。本页面为 SEO 静态版本，完整交互体验请访问 <a href="${SITE_URL}${page.path}">${SITE_URL}${page.path}</a>。</p>
    <p>LLM 站点说明：<a href="${SITE_URL}/llms.txt">/llms.txt</a> | <a href="${SITE_URL}/llms-full.txt">/llms-full.txt</a> | <a href="${SITE_URL}/ai-summary.txt">/ai-summary.txt</a></p>
  </footer>
</body>
</html>`;
}

async function main() {
  console.log('[seo-pages] 开始生成静态 SEO 页面...');

  // 先读取 SPA 的 index.html 作为参考，确保 dist 存在
  try {
    await readFile(join(distDir, 'index.html'));
  } catch {
    console.error('[seo-pages] 错误：dist/index.html 不存在，请先运行 vite build');
    process.exit(1);
  }

  let written = 0;
  for (const page of PAGES) {
    const html = renderPage(page);
    // 写入 dist/seo/<path>/index.html，避免覆盖 SPA 的 index.html
    // 部署时通过 vercel.json 的 rewrite 把爬虫路由到这里
    const targetPath = page.path === '/' ? '/index' : page.path;
    const filePath = join(distDir, 'seo', targetPath, 'index.html');
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, html, 'utf8');
    written++;
    console.log(`[seo-pages] ✓ ${page.path} → dist/seo${targetPath}/index.html`);
  }

  console.log(`[seo-pages] 完成，共生成 ${written} 个静态页面`);
}

main().catch((err) => {
  console.error('[seo-pages] 失败：', err);
  process.exit(1);
});
