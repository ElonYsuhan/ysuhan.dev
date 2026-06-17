---
title: Projects
description: 精心打磨的每一个项目，从构思到落地的完整记录
layout: page
---

<script setup>
const projects = [
  {
    title: 'ysuhan.dev',
    description: '个人品牌网站 — 基于 VitePress 构建的数字花园、项目展示与博客平台，支持深色模式与 SEO 优化。',
    tech: ['VitePress', 'Vue 3', 'UnoCSS', 'TypeScript'],
    link: 'https://github.com/ysuhan/ysuhan.dev',
    github: 'https://github.com/ysuhan/ysuhan.dev',
  },
  {
    title: 'Quick CLI',
    description: '现代化命令行工具脚手架，内置 TypeScript 支持、交互式提示与插件系统，快速构建开发工具链。',
    tech: ['Node.js', 'TypeScript', 'Commander', 'Inquirer'],
    link: '#',
  },
  {
    title: 'UI Kit',
    description: '基于 Vue 3 + UnoCSS 的组件库，关注无障碍访问与主题定制，提供 30+ 常用组件。',
    tech: ['Vue 3', 'UnoCSS', 'Storybook', 'Vitest'],
    link: '#',
  },
  {
    title: 'Markdown Editor',
    description: '所见即所得的 Markdown 编辑器，支持实时预览、自定义主题与 Vim 模式。',
    tech: ['Vue 3', 'ProseMirror', 'TypeScript'],
    link: '#',
    github: '#',
  },
  {
    title: 'API Gateway',
    description: '轻量级 API 网关，支持路由、限流、认证与请求转换，适用于微服务架构。',
    tech: ['Go', 'gRPC', 'Redis', 'Docker'],
    link: '#',
  },
  {
    title: 'Design Token Manager',
    description: '设计令牌管理工具，自动从 Figma 同步并生成多平台样式变量。',
    tech: ['TypeScript', 'Figma API', 'Style Dictionary'],
    link: '#',
  },
]
</script>

<div class="page-container">

# Projects

<p class="page-subtitle">精心打磨的每一个项目，从构思到落地的完整记录</p>

<ProjectCard :projects="projects" />

</div>

<style scoped>
.page-container {
  max-width: 1152px;
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

