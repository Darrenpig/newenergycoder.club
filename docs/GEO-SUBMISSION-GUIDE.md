# GEO（生成式引擎优化）提交指南

> 本文档列出 NEC 官网（https://newenergycoder.club）已被国内主流 AI 检索所需的提交渠道与操作步骤。
>
> **本文档面向站点维护者**，无需修改代码。所有 GEO 基础设施（llms.txt / robots / sitemap / 静态 SEO 页 / JSON-LD / noscript）已在代码侧完成。

---

## 一、本次 GEO 优化已完成的工作

| 项目 | 文件 | 作用 |
|------|------|------|
| LLM 站点地图（简版） | `public/llms.txt` | 给 AI 模型的"站点说明书"，被 GPTBot、ClaudeBot、PerplexityBot 等优先抓取 |
| LLM 站点地图（详版） | `public/llms-full.txt` | 详细社区介绍，AI 生成回答时的主要引用源 |
| 中文摘要 | `public/ai-summary.txt` | 不支持 llms.txt 标准的爬虫保底 |
| AI 爬虫白名单 | `public/robots.txt` | 显式放行 DeepSeekBot / Bytespider / MoonshotBot / TongyiBot / GPTBot / ClaudeBot / PerplexityBot 等 |
| Sitemap | `public/sitemap.xml` + `sitemap-index.xml` | 加了 `lastmod`/`changefreq`，提升搜索引擎抓取频率 |
| 首页元数据 | `index.html` | 中英双语 title/description/keywords，利于中文检索 |
| 结构化数据 | `index.html` | JSON-LD `Organization` + `WebSite` + `FAQPage`（含常见问答） |
| noscript 兜底 | `index.html` | 无 JS 时仍可被爬虫读取完整中文介绍 |
| 页面级 SEO | `src/components/SEO.tsx` + 9 个核心页面 | 每个路由独立的 title/description/canonical |
| 静态 SEO 页面 | `dist/seo/<route>/index.html`（构建产物） | 构建时自动生成的纯静态 HTML 版本，无需 JS 即可被爬虫读取 |

---

## 二、需要你手动完成的提交（按优先级排序）

### 1. 百度搜索资源平台（**最重要**，文心一言的主要中文语料源）

1. 访问：https://ziyuan.baidu.com/
2. 注册并验证站点所有权（HTML 文件验证 / DNS 验证 / CNAME 验证任选其一）
3. 提交 sitemap：`https://newenergycoder.club/sitemap.xml`
4. 同时提交 IndexNow 风格的"快速收录"申请（如站点符合条件）
5. 开启"主动推送"（可选，加快收录）

### 2. 搜狗搜索（**腾讯元宝**的主要引用源）

1. 访问：https://zhanzhang.sogou.com/
2. 验证站点所有权
3. 提交 sitemap：`https://newenergycoder.club/sitemap.xml`

### 3. 360 搜索（**360 AI** 的引用源）

1. 访问：https://zhanzhang.so.com/
2. 验证站点所有权
3. 提交 sitemap

### 4. 神马搜索（**夸克 / UC** 的引用源）

1. 访问：https://zhanzhang.sm.cn/
2. 验证站点所有权
3. 提交 sitemap

### 5. 必应 Bing（**Copilot** 的国际引用源，国内也可访问）

1. 访问：https://www.bing.com/webmasters/
2. 用微软账号登录 → 添加站点
3. 验证所有权（推荐 DNS CNAME 验证）
4. 提交 sitemap：`https://newenergycoder.club/sitemap.xml`
5. **开启 IndexNow**（必应/Yandex 即时收录协议）：
   - 生成 API key（任意 UUID）
   - 把 `<key>.txt` 放到 `public/` 下，内容就是 key 本身
   - 提交 URL 时调用 `https://api.indexnow.org/indexnow?url=<url>&key=<key>`

### 6. Google Search Console（**Gemini** 的国际引用源）

1. 访问：https://search.google.com/search-console/
2. 添加站点 → 验证所有权
3. 提交 sitemap：`https://newenergycoder.club/sitemap.xml`

### 7. 头条搜索（**字节豆包**的主要引用源）

1. 访问：https://zhanzhang.toutiao.com/
2. 验证站点所有权
3. 提交 sitemap

---

## 三、AI 平台主动收录渠道

部分 AI 平台提供官方收录/反馈渠道：

| 平台 | 收录方式 | 链接 |
|------|----------|------|
| **DeepSeek** | 通过百度/必应收录后自动被抓取，robots.txt 已放行 DeepSeekBot | - |
| **Kimi (月之暗面)** | 通过必应收录 + robots.txt 已放行 MoonshotBot | - |
| **豆包 (字节)** | 通过头条搜索收录 + robots.txt 已放行 Bytespider | - |
| **通义千问 (阿里)** | 通过神马搜索收录 + robots.txt 已放行 TongyiBot | - |
| **文心一言 (百度)** | 通过百度搜索资源平台提交 | 见上文 |
| **元宝 (腾讯)** | 通过搜狗搜索收录 | 见上文 |
| **ChatGPT** | robots.txt 已放行 GPTBot + OAI-SearchBot；可在 https://openai.com/index/searchgpt-publisher-program/ 申请出版商计划 | - |
| **Claude** | robots.txt 已放行 ClaudeBot | - |
| **Perplexity** | robots.txt 已放行 PerplexityBot；可在 https://perplexity.ai/publisher 申请出版商计划 | - |
| **秘塔搜索** | 通过 bing/百度收录，无需单独提交 | - |

---

## 四、验证优化是否生效

### 立即可验证（部署后）

```bash
# 检查 llms.txt 是否可访问
curl https://newenergycoder.club/llms.txt

# 检查 robots.txt 是否含 AI 爬虫白名单
curl https://newenergycoder.club/robots.txt

# 检查 sitemap
curl https://newenergycoder.club/sitemap.xml

# 检查静态 SEO 页面（构建产物）
curl https://newenergycoder.club/seo/team/index.html
```

### 几周后验证（收录后）

1. **百度**：搜索 `site:newenergycoder.club` 查看收录情况
2. **必应**：搜索 `site:newenergycoder.club`
3. **AI 直接问答**：
   - 打开 DeepSeek / Kimi / 豆包 / 通义千问 / 文心一言 / 元宝
   - 提问：「新能源编程俱乐部是什么」「NEC 社区」「ROBOCON 新能源编程俱乐部」
   - 看 AI 是否会引用 https://newenergycoder.club

---

## 五、持续优化建议

1. **内容持续更新**：AI 偏好近期更新的站点。建议至少每月更新一次首页/项目页内容（`lastmod` 会自动更新）
2. **外链建设**：
   - 在 Gitee 组织 README、知乎、CSDN、掘金、小红书发布文章并引用官网链接
   - 在 ROBOCON 相关论坛/社区留下官网链接
3. **保持 llms.txt 同步**：新增重要页面时，记得更新 `public/llms.txt` 和 `public/llms-full.txt`
4. **监控抓取日志**：通过 Vercel Analytics 或服务器日志查看 `DeepSeekBot` `Bytespider` 等 UA 的访问情况

---

## 六、常见问题

**Q: 已经做了 GEO，多久能被 AI 引用？**
A: 通常 2-4 周被搜索引擎收录，AI 平台在下次更新语料时（月度/季度）开始引用。持续更新内容可加速。

**Q: 静态 SEO 页面（/seo/<route>/index.html）会被真实用户看到吗？**
A: 不会。vercel.json 的 catch-all rewrite 会把浏览器请求路由到 SPA 的 /index.html，这些静态文件只供爬虫通过 sitemap 或直接 URL 访问。

**Q: 需要付费推广吗？**
A: 不需要。所有 AI 爬虫都遵循 robots.txt 协议，免费放行即可。付费推广是搜索引擎的 SEM 服务，与 GEO 无关。

**Q: 是否要屏蔽某些 AI 爬虫？**
A: 当前 robots.txt 全部放行。如未来想限制某些 AI（如不希望被训练的），把对应 `Allow: /` 改为 `Disallow: /` 即可。

---

**最后更新**：2026-08-12
**维护者**：NEC 团队
