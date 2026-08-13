#!/usr/bin/env node
/**
 * IndexNow URL 推送脚本
 *
 * 用法：
 *   # 推送所有 13 个核心 URL（默认）
 *   node scripts/indexnow-push.mjs
 *   node scripts/indexnow-push.mjs --all
 *
 *   # 推送指定 URL（多个用空格分隔）
 *   node scripts/indexnow-push.mjs --url https://www.newenergycoder.club/projects
 *   node scripts/indexnow-push.mjs --url /projects /events /team
 *
 *   # 从 sitemap 读取所有 URL 推送
 *   node scripts/indexnow-push.mjs --from-sitemap
 *
 *   # dry-run：只打印将要推送的 URL，不实际调用 API
 *   node scripts/indexnow-push.mjs --dry-run
 *
 * 环境变量：
 *   INDEXNOW_KEY    - 覆盖默认 API key（默认读 public/fe87794daa0e4f279328d8cb9d716dab.txt）
 *   INDEXNOW_HOST   - 覆盖默认 host（默认 www.newenergycoder.club）
 *   INDEXNOW_ENGINE - 覆盖默认引擎（默认 https://api.indexnow.org/indexnow）
 *                     可选：https://www.bing.com/indexnow
 *                           https://yandex.com/indexnow
 */

import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

// ============ 配置 ============
const DEFAULT_HOST = 'www.newenergycoder.club';
const KEY_FILE_NAME = 'fe87794daa0e4f279328d8cb9d716dab.txt';
const KEY_FILE_PATH = resolve(projectRoot, 'public', KEY_FILE_NAME);
const DEFAULT_ENGINE = 'https://api.indexnow.org/indexnow';

/** 站点核心 URL（与 scripts/generate-static-pages.mjs 中的 PAGES 保持一致） */
const CORE_PATHS = [
  '/',
  '/projects',
  '/events',
  '/team',
  '/innovation',
  '/join',
  '/resources',
  '/contact',
  '/learning/embedded',
  '/learning/mechanical',
  '/learning/gui',
  '/learning/algorithm',
  '/learning/designer',
];

// ============ 工具函数 ============
async function loadKey() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY.trim();
  const content = await readFile(KEY_FILE_PATH, 'utf8');
  return content.trim();
}

function normalizeUrl(input, host) {
  // 支持 /path 简写
  if (input.startsWith('/')) return `https://${host}${input}`;
  // 支持省略协议
  if (!input.startsWith('http')) return `https://${input}`;
  return input;
}

async function readSitemapUrls(host) {
  const sitemapPath = resolve(projectRoot, 'public', 'sitemap.xml');
  const xml = await readFile(sitemapPath, 'utf8');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  // 把 sitemap 里的 URL host 替换成实际 host（处理 www / apex 差异）
  return urls.map((u) => u.replace(/^https:\/\/[^/]+/, `https://${host}`));
}

async function pushIndexNow({ host, key, keyLocation, urlList, engine, dryRun }) {
  const payload = {
    host,
    key,
    keyLocation,
    urlList,
  };

  console.log(`[indexnow] 引擎: ${engine}`);
  console.log(`[indexnow] host: ${host}`);
  console.log(`[indexnow] key: ${key.slice(0, 8)}...${key.slice(-4)}`);
  console.log(`[indexnow] keyLocation: ${keyLocation}`);
  console.log(`[indexnow] 推送 ${urlList.length} 个 URL:`);
  urlList.forEach((u) => console.log(`  - ${u}`));

  if (dryRun) {
    console.log('\n[indexnow] DRY-RUN 模式，未实际调用 API');
    return { ok: true, status: 0, dryRun: true };
  }

  const resp = await fetch(engine, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  const text = await resp.text().catch(() => '');
  console.log(`\n[indexnow] HTTP ${resp.status}`);
  if (text) console.log(`[indexnow] 响应: ${text}`);

  return { ok: resp.ok || resp.status === 202, status: resp.status };
}

// ============ CLI 解析 ============
function parseArgs(argv) {
  const args = { urls: [], all: false, fromSitemap: false, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--all') args.all = true;
    else if (a === '--from-sitemap') args.fromSitemap = true;
    else if (a === '--dry-run') args.dryRun = true;
    else if (a === '--url') {
      // 收集连续的 url 参数
      i++;
      while (i < argv.length && !argv[i].startsWith('--')) {
        args.urls.push(argv[i]);
        i++;
      }
      i--;
    } else if (a === '--help' || a === '-h') {
      args.help = true;
    }
  }
  return args;
}

function printHelp() {
  console.log(`
IndexNow URL 推送脚本

用法：
  node scripts/indexnow-push.mjs                  # 推送 13 个核心 URL（默认）
  node scripts/indexnow-push.mjs --all            # 同上
  node scripts/indexnow-push.mjs --from-sitemap   # 从 public/sitemap.xml 读取所有 URL
  node scripts/indexnow-push.mjs --url /projects /events   # 推送指定路径
  node scripts/indexnow-push.mjs --dry-run        # 只打印不实际推送

环境变量：
  INDEXNOW_KEY      自定义 API key
  INDEXNOW_HOST     自定义 host（默认 ${DEFAULT_HOST}）
  INDEXNOW_ENGINE   自定义引擎（默认 ${DEFAULT_ENGINE}）
`);
}

// ============ 主流程 ============
async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const host = process.env.INDEXNOW_HOST || DEFAULT_HOST;
  const engine = process.env.INDEXNOW_ENGINE || DEFAULT_ENGINE;
  const key = await loadKey();
  const keyLocation = `https://${host}/${KEY_FILE_NAME}`;

  let urls;
  if (args.fromSitemap) {
    urls = await readSitemapUrls(host);
  } else if (args.urls.length > 0) {
    urls = args.urls.map((u) => normalizeUrl(u, host));
  } else {
    // 默认推送核心路径
    urls = CORE_PATHS.map((p) => `https://${host}${p}`);
  }

  const result = await pushIndexNow({
    host,
    key,
    keyLocation,
    urlList: urls,
    engine,
    dryRun: args.dryRun,
  });

  if (result.ok) {
    console.log('[indexnow] ✓ 推送成功');
    process.exit(0);
  } else {
    console.error(`[indexnow] ✗ 推送失败，HTTP ${result.status}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('[indexnow] 错误:', err.message || err);
  process.exit(1);
});
