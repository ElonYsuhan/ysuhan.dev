---
title: Notes
description: 持续生长的数字花园 — 半成型的想法、阅读摘要与即兴洞见
layout: page
---

<script setup>
const notes = [
  {
    title: 'CSS Container Queries 使用心得',
    date: '2026-06-12',
    excerpt: 'Container Queries 改变了组件级响应式的范式。记录几个实际项目中的使用模式与踩坑经验。',
    tags: ['CSS', 'Responsive', 'Patterns'],
    url: '#',
    stage: 'seedling',
  },
  {
    title: 'Rust 学习路径与资源推荐',
    date: '2026-06-05',
    excerpt: '从 JavaScript/TypeScript 开发者的视角，整理 Rust 学习的最佳路径与高质量资源。',
    tags: ['Rust', 'Learning', 'Resources'],
    url: '#',
    stage: 'seedling',
  },
  {
    title: '设计评审 Checklist',
    date: '2026-05-28',
    excerpt: '一套可复用的设计评审清单，覆盖视觉、交互、无障碍与性能四个维度。',
    tags: ['Design', 'Review', 'Checklist'],
    url: '#',
    stage: 'budding',
  },
  {
    title: 'Monorepo 工具链对比 2026',
    date: '2026-05-15',
    excerpt: 'Turborepo vs Nx vs pnpm workspace vs Bun — 在不同规模项目中的实际体验对比。',
    tags: ['Monorepo', 'Tooling', 'Comparison'],
    url: '#',
    stage: 'evergreen',
  },
  {
    title: 'Web Audio API 可视化入门',
    date: '2026-05-08',
    excerpt: '使用 Web Audio API 创建实时音频可视化效果 — 从基础概念到交互式频谱图。',
    tags: ['Web Audio', 'Visualization', 'Tutorial'],
    url: '#',
    stage: 'seedling',
  },
  {
    title: '阅读笔记：The Pragmatic Programmer',
    date: '2026-04-20',
    excerpt: '《程序员修炼之道》20 周年版 — 核心原则提炼与当代工程实践的对照反思。',
    tags: ['Reading', 'Engineering', 'Principles'],
    url: '#',
    stage: 'evergreen',
  },
  {
    title: 'Git 工作流最佳实践',
    date: '2026-04-10',
    excerpt: 'Conventional Commits + 线性历史 + 自动化发布 — 一套经过验证的 Git 协作流程。',
    tags: ['Git', 'Workflow', 'CI/CD'],
    url: '#',
    stage: 'budding',
  },
  {
    title: '终端配色方案设计笔记',
    date: '2026-03-30',
    excerpt: '设计一个舒适的终端配色方案 — 对比度计算、无障碍考量与常见终端模拟器适配。',
    tags: ['Terminal', 'Color', 'Design'],
    url: '#',
    stage: 'seedling',
  },
]
</script>

<div class="page-container">

# 🪴 Digital Garden

<p class="page-subtitle">
  这里是持续生长的数字花园。笔记按成熟度分为三个阶段：
  <span class="stage-info">🌱 seedling</span> 刚种下的想法 ·
  <span class="stage-info">🌿 budding</span> 正在生长的思考 ·
  <span class="stage-info">🌲 evergreen</span> 相对完整的知识
</p>

<NoteCard :notes="notes" />

</div>

<style scoped>
.page-container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}

.page-subtitle {
  font-size: 0.9375rem;
  color: var(--vp-c-text-2);
  margin: -16px 0 36px;
  line-height: 1.7;
}

.stage-info {
  white-space: nowrap;
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
}
</style>

