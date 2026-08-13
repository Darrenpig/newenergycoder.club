/**
 * 站点 AI 助手配置
 *
 * 通过环境变量 VITE_ASSISTANT_PROVIDER 切换实现：
 * - 'mintlify'（默认）：Mintlify 官方 Widget，回答基于 docs.newenergycoder.club 索引，按 credit 计费
 * - 'dify'：自建 Dify 聊天机器人（知识库抓取 llms-full.txt），模型可自选（DeepSeek/Qwen/Kimi 等）
 *
 * 切换时无需改代码，部署环境改一个环境变量即可。
 */

export type AssistantProvider = 'mintlify' | 'dify';

export const assistantConfig = {
  provider: (import.meta.env.VITE_ASSISTANT_PROVIDER ||
    'mintlify') as AssistantProvider,

  mintlify: {
    // Mintlify Dashboard → Widget 页面获取；allowed origins 也在那里管理
    widgetId: 'mint_widget_401a1c6d-bfc4-46ff-933f-d20e1da2cb7f',
    embedUrl:
      'https://cdn.jsdelivr.net/npm/@mintlify/assistant-widget@0.0/dist/browser/embed.js',
  },

  dify: {
    // Dify 应用 →「嵌入网站」生成的 token（公开令牌，官方 embed 就是前端明文使用）
    embedToken: import.meta.env.VITE_DIFY_EMBED_TOKEN || '',
    // Dify 云服务用 https://udify.app；自托管填自己的域名，如 https://dify.example.com
    baseUrl: import.meta.env.VITE_DIFY_BASE_URL || 'https://udify.app',
  },
} as const;
