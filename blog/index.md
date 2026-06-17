---
title: Blog
description: 深度技术文章，从底层原理到上层架构
layout: page
---

<script setup>
const posts = [
  {
    title: '构建现代化个人网站：VitePress 深度定制指南',
    date: '2026-06-10',
    excerpt: '从零开始，使用 VitePress + Vue 3 + UnoCSS 构建一个性能极致、可深度定制的个人品牌网站。涵盖自定义主题、暗色模式、SEO 优化与自动化部署的完整实践。',
    tags: ['VitePress', 'Vue 3', 'UnoCSS', 'Web Dev'],
    url: '/blog/hello-world',
  },
  {
    title: 'TypeScript 类型体操：从入门到放弃再到精通',
    date: '2026-05-20',
    excerpt: '深入 TypeScript 类型系统的核心概念，通过实际案例理解条件类型、映射类型、模板字面量类型与 infer 关键字的强大组合。',
    tags: ['TypeScript', 'Advanced', 'Tutorial'],
    url: '#',
  },
  {
    title: '前端性能优化实战：从 3s 到 300ms 的旅程',
    date: '2026-05-01',
    excerpt: '记录一个企业级应用从首次加载 3 秒优化到 300 毫秒的全过程 — 资源加载策略、渲染性能分析与构建工具链调优。',
    tags: ['Performance', 'Web Vitals', 'Optimization'],
    url: '#',
  },
  {
    title: 'CSS 动画的艺术：流畅、自然与可访问',
    date: '2026-04-15',
    excerpt: '探索现代 CSS 动画的最佳实践 — prefers-reduced-motion、滚动驱动动画、View Transitions API 与高性能动画技巧。',
    tags: ['CSS', 'Animation', 'Accessibility'],
    url: '#',
  },
  {
    title: '设计系统从零到一：Token 化与工程化',
    date: '2026-03-28',
    excerpt: '如何构建一个可扩展的设计系统 — Design Token 设计、组件 API 规范、主题化方案与文档自动化。',
    tags: ['Design System', 'Architecture', 'CSS'],
    url: '#',
  },
]
</script>

<div class="page-container">

# Blog

<p class="page-subtitle">深度技术文章，分享开发中的思考与沉淀</p>

<BlogPost :posts="posts" />

</div>

<style scoped>
.page-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}

.page-subtitle {
  font-size: 1.0625rem;
  color: var(--vp-c-text-2);
  margin: -16px 0 40px;
  line-height: 1.6;
}
</style>

