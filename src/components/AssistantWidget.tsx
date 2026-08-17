import { useEffect } from 'react';
import { assistantConfig } from '@/config/assistant';

declare global {
  interface Window {
    MintlifyAssistant?: {
      init: (options: { id: string }) => Promise<void> | void;
    };
    difyChatbotConfig?: {
      token: string;
      baseUrl: string;
      isDev?: boolean;
    };
  }
}

// 模块级标记：防止 React StrictMode 下 effect 双重执行导致重复初始化
let initStarted = false;

function injectScript(src: string, id?: string, module = false): Promise<void> {
  return new Promise((resolve, reject) => {
    const selector = id ? `script#${CSS.escape(id)}` : `script[src="${src}"]`;
    const existing = document.querySelector<HTMLScriptElement>(selector);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    if (id) script.id = id;
    // Mintlify embed.js 是 ES Module，必须以 type="module" 注入，
    // 否则会报 "Cannot use 'import.meta' outside a module"
    if (module) script.type = 'module';
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`脚本加载失败: ${src}`));
    document.head.appendChild(script);
  });
}

async function initMintlify() {
  const { widgetId, embedUrl } = assistantConfig.mintlify;
  await injectScript(embedUrl, undefined, true);
  await window.MintlifyAssistant?.init({ id: widgetId });
}

async function initDify() {
  const { embedToken, baseUrl } = assistantConfig.dify;
  if (!embedToken) {
    console.warn(
      '[AssistantWidget] VITE_ASSISTANT_PROVIDER=dify 但未配置 VITE_DIFY_EMBED_TOKEN，跳过加载',
    );
    return;
  }
  window.difyChatbotConfig = { token: embedToken, baseUrl };
  // Dify 官方 embed 脚本：script id 必须等于 token
  await injectScript(`${baseUrl}/embed.min.js`, embedToken);
  // 品牌色对齐（Dify 官方推荐的覆盖方式）
  const style = document.createElement('style');
  style.textContent = `
    #dify-chatbot-bubble-button { background-color: #0066FF !important; }
    #dify-chatbot-bubble-window { width: 24rem !important; height: 40rem !important; }
  `;
  document.head.appendChild(style);
}

/**
 * 站点 AI 助手悬浮组件（全站挂载）
 * provider 由 src/config/assistant.ts 的 VITE_ASSISTANT_PROVIDER 控制：
 * - mintlify：Mintlify 官方 Widget（默认）
 * - dify：自建 Dify 机器人（知识库抓取 docs.newenergycoder.club/llms-full.txt）
 */
export function AssistantWidget() {
  useEffect(() => {
    if (initStarted) return;
    initStarted = true;

    const init =
      assistantConfig.provider === 'dify' ? initDify : initMintlify;
    init().catch((e) => {
      initStarted = false;
      console.warn('[AssistantWidget] 初始化失败：', e);
    });
  }, []);

  return null;
}

export default AssistantWidget;
