import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import { SITE } from './constants'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: SITE.title,
  description: SITE.description,
  lang: 'zh-CN',
  appearance: 'dark',
  outDir: 'docs/.vitepress/dist',
  head: [
    // ── SEO ──
    ['meta', { name: 'author', content: 'Ysuhan' }],
    ['meta', { name: 'keywords', content: 'WebGIS,Digital Twin,Open Source,空间计算,数字孪生,前端开发,引擎架构' }],
    ['meta', { name: 'theme-color', content: '#0d0f12' }],
    ['meta', { name: 'color-scheme', content: 'dark light' }],

    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:title', content: SITE.title }],
    ['meta', { property: 'og:description', content: SITE.description }],
    ['meta', { property: 'og:site_name', content: SITE.title }],
    ['meta', { property: 'og:image', content: `${SITE.url}/og-image.png` }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: SITE.title }],
    ['meta', { name: 'twitter:description', content: SITE.description }],
    ['meta', { name: 'twitter:image', content: `${SITE.url}/og-image.png` }],

    // JSON-LD
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Ysuhan',
        url: SITE.url,
        description: SITE.description,
        sameAs: [SITE.social.github],
      }),
    ],

    // Favicon
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'RSS', href: '/feed.xml' }],

    // Fonts
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
  ],

  // Vite plugin config
  vite: {
    plugins: [UnoCSS()],
    resolve: {
      alias: {
        '~': '/',
      },
    },
  },

  // Clean URLs
  cleanUrls: true,
  lastUpdated: true,

  // Sitemap
  sitemap: {
    hostname: SITE.url,
  },

  // Markdown config
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
  },

  // Theme config
  themeConfig: {
    logo: '/favicon.png',
    siteTitle: 'Ysuhan',

    // Navigation
    nav: [
      { text: '首页', link: '/' },
      { text: '项目', link: '/projects/' },
      { text: '案例', link: '/showcase/' },
      { text: '博客', link: '/blog/' },
      { text: '成长', link: '/career/' },
      { text: '开源', link: 'https://github.com/ysuhan' },
      { text: '关于', link: '/about/' },
    ],

    // Sidebar — contextual per section
    sidebar: {
      '/blog/': [
        {
          text: '博客',
          items: [
            { text: '全部文章', link: '/blog/' },
          ],
        },
      ],
    },

    // Doc footer
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    // Outline
    outline: {
      label: '页面导航',
      level: [2, 3],
    },
  },

  // Route rewrites for clean URLs
  rewrites: {
    'blog/posts/:post.md': 'blog/:post.md',
  },
})

