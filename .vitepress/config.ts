import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import { SITE } from './constants'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: SITE.title,
  description: SITE.description,
  lang: 'zh-CN',
  outDir: 'docs/.vitepress/dist',
  head: [
    // ── SEO ──
    ['meta', { name: 'author', content: 'Ysuhan' }],
    ['meta', { name: 'keywords', content: '技术博客,个人作品集,数字花园,前端开发,创意工程,开源项目' }],
    ['meta', { name: 'theme-color', content: '#c08c54' }],
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
      { text: '成长', link: '/career/' },
      { text: '博客', link: '/blog/' },
      { text: '关于', link: '/about/' },
    ],

    // Social links (shown in nav)
    socialLinks: [
      { icon: 'github', link: SITE.social.github },
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

    // Footer
    footer: {
      message: '基于 MIT 许可证发布。',
      copyright: `© 2024–${new Date().getFullYear()} Ysuhan`,
    },

    // Search
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    // Edit link
    editLink: {
      pattern: 'https://github.com/ysuhan/ysuhan.dev/edit/main/:path',
      text: '在 GitHub 上编辑此页',
    },

    // Last updated
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    // Dark mode
    darkModeSwitchLabel: '深色模式',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

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

