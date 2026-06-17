---
title: Showcase
description: 交互设计、视觉实验与创意工程精选
layout: page
---

<script setup>
const showcaseItems = [
  {
    title: 'Dashboard Redesign',
    description: '企业级数据看板的视觉重构 — 信息层级重组、暗色模式适配与交互动效设计。',
    category: 'UI/UX',
    link: '#',
  },
  {
    title: 'Animation Playground',
    description: 'Web 动效实验场 — CSS Animation、WAAPI 与 Canvas 动效的交互式探索。',
    category: 'Animation',
    link: '#',
  },
  {
    title: '3D Product Viewer',
    description: '基于 Three.js 的产品 3D 展示组件 — 实时渲染、材质切换与爆炸视图。',
    category: '3D / WebGL',
    link: '#',
  },
  {
    title: 'Design System',
    description: '从零构建的设计系统 — 色彩、排版、间距与组件规范的完整实现。',
    category: 'Design System',
    link: '#',
  },
  {
    title: 'Landing Page Lab',
    description: '着陆页设计实验系列 — 不同风格、排版与视觉语言的快速原型。',
    category: 'Web Design',
    link: '#',
  },
  {
    title: 'Data Visualization',
    description: '复杂数据集的叙事可视化 — 交互式图表、动态过滤与故事化呈现。',
    category: 'Data Viz',
    link: '#',
  },
]
</script>

<div class="page-container">

# Showcase

<p class="page-subtitle">交互设计、视觉实验与创意工程的精选合集</p>

<ShowcaseCard :items="showcaseItems" />

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

