import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  /** 页面标题（不带站点后缀），如 "项目展示"。与 fullTitle 二选一 */
  title?: string;
  /** 完整标题（含站点名），如 "新能源编程俱乐部 | New Energy Coder Club"。优先级高于 title */
  fullTitle?: string;
  /** 页面描述，50-160 字符 */
  description?: string;
  /** 页面关键词，逗号分隔 */
  keywords?: string;
  /** 当前路径（用于 canonical 和 og:url），默认从 useLocation() 获取 */
  path?: string;
  /** 自定义 canonical URL（覆盖 path） */
  canonical?: string;
  /** Open Graph 图片 */
  ogImage?: string;
  /** Open Graph 类型 */
  ogType?: 'website' | 'article' | 'profile';
  /** 是否禁止索引 */
  noindex?: boolean;
  /** 额外的 JSON-LD 结构化数据（已序列化的对象或对象数组） */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_NAME = '新能源编程俱乐部 NEC';
const SITE_NAME_EN = 'New Energy Coder Club';
const SITE_URL = 'https://newenergycoder.club';
const DEFAULT_OG_IMAGE = 'https://cdn.newenergycoder.club/images/public/og-image.svg';
const DEFAULT_DESCRIPTION =
  '新能源编程俱乐部（New Energy Coder Club，简称 NEC）是面向 ROBOCON 等机器人竞赛与真实工程项目的开源开发者社区。';

/**
 * 页面级 SEO 组件
 *
 * 使用方式：
 * <SEO title="项目展示" description="..." path="/projects" />
 * <SEO fullTitle="新能源编程俱乐部 | ..." path="/" jsonLd={orgAndWebsiteJsonLd()} />
 * <SEO title="页面未找到" noindex />
 */
export default function SEO({
  title,
  fullTitle,
  description = DEFAULT_DESCRIPTION,
  keywords,
  path,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  jsonLd,
}: SEOProps) {
  const location = useLocation();
  const currentPath = path ?? location.pathname;

  const computedTitle =
    fullTitle ??
    (title ? `${title} | ${SITE_NAME} - ${SITE_NAME_EN}` : `${SITE_NAME} - ${SITE_NAME_EN}`);
  const canonicalUrl = canonical ?? `${SITE_URL}${currentPath}`;

  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{computedTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={computedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="zh_CN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={computedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD 结构化数据 */}
      {jsonLdArray.map((ld, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
}

/**
 * 生成 Organization + WebSite 的 JSON-LD 结构化数据
 * 供首页或关键页面引用
 */
export function orgAndWebsiteJsonLd(): Record<string, unknown>[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: '新能源编程俱乐部',
      alternateName: ['New Energy Coder Club', 'NEC', 'NEC 社区'],
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
      },
      description:
        '面向 ROBOCON 等机器人竞赛与真实工程项目的开源开发者社区，以模块化工程基线、新手友好贡献路径、线上协作 × A416 线下实验室为核心特色。',
      sameAs: ['https://gitee.com/nec-community', 'https://github.com/newenergycoder'],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'community support',
        url: `${SITE_URL}/contact`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: SITE_NAME_EN,
      description: '机器人×新能源开源社区',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'zh-CN',
    },
  ];
}
