// CSDN 博客统计 API
// 获取用户博客的总访问量等数据

export default async function handler(req: any, res: any) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const { username } = req.query
  
  if (!username) {
    res.status(400).json({ error: 'Missing username parameter' })
    return
  }

  try {
    // 获取 CSDN 用户主页
    const response = await fetch(`https://blog.csdn.net/${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch CSDN page: ${response.status}`)
    }

    const html = await response.text()

    // 解析总访问量
    // CSDN 页面中访问量的格式通常是: 总访问量\n\n\n- 538,475
    const visitMatch = html.match(/总访问量[\s\S]*?(\d[\d,]*)/)
    const totalVisits = visitMatch ? parseInt(visitMatch[1].replace(/,/g, ''), 10) : null

    // 解析粉丝数
    const fanMatch = html.match(/粉丝[\s\n\r]*-?[\s\n\r]*(\d[\d,]*)/)
    const fans = fanMatch ? parseInt(fanMatch[1].replace(/,/g, ''), 10) : null

    // 解析原创文章数
    const articleMatch = html.match(/原创[\s\n\r]*-?[\s\n\r]*(\d[\d,]*)/)
    const originalArticles = articleMatch ? parseInt(articleMatch[1].replace(/,/g, ''), 10) : null

    // 解析排名
    const rankMatch = html.match(/排名[\s\n\r]*-?[\s\n\r]*(\d[\d,]*)/)
    const rank = rankMatch ? parseInt(rankMatch[1].replace(/,/g, ''), 10) : null

    res.status(200).json({
      username,
      totalVisits,
      fans,
      originalArticles,
      rank,
      updatedAt: new Date().toISOString(),
    })
  } catch (err: any) {
    console.error('CSDN stats fetch error:', err)
    res.status(500).json({ 
      error: err?.message || 'Failed to fetch CSDN stats',
      username,
    })
  }
}
