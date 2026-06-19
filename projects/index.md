---
title: 项目
description: 框架、引擎与数字系统
layout: page
---

<script setup>
const projects = [
  {
    title: 'AirGIS',
    description: '面向时空数据与仿真场景的 GIS 引擎体系。支持大规模地理数据管理、实时渲染与 spatial analysis 管线。',
    tech: ['GIS', 'Cesium', 'Spatial', 'TypeScript'],
    link: '#',
    github: '#',
  },
  {
    title: 'Workflow Engine',
    description: '用于复杂业务编排与流程驱动的工作流引擎。支持 DSL 定义、DAG 调度、状态持久化与可视化编排面板。',
    tech: ['Engine', 'Orchestration', 'DSL', 'Node.js'],
    link: '#',
    github: '#',
  },
  {
    title: 'Tactics Simulation',
    description: '面向推演与态势分析的仿真平台。支持多方对抗、实时态势感知与复盘分析。',
    tech: ['Simulation', 'C2', 'Analysis', 'Cloudflare'],
    link: 'https://tactics-sim-engine.pages.dev/',
  },
  {
    title: 'Open Source',
    description: '长期维护的开源工具与组件库。涵盖 CLI 工具、Vue 3 组件、GIS 实用函数与开发效率工具。',
    tech: ['Tools', 'Libraries', 'Community', 'Vue 3'],
    link: '#',
    github: '#',
  },
]
</script>

<div class="page-container">

# Projects

<p class="page-subtitle">框架、引擎与数字系统</p>

<ProjectCard :projects="projects" />

</div>

<style scoped>
.page-container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}
.page-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: -16px 0 40px;
  line-height: 1.6;
}
</style>

