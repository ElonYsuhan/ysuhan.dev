---
title: 项目
description: 框架、引擎与数字系统
layout: page
---

<script setup>
const projects = [
  {
    title: 'AirGIS',
    description: '面向数字孪生与空间分析的 GIS 引擎体系',
    tech: ['Cesium', 'Vue 3', 'TypeScript'],
    link: '#',
    github: '#',
    image: '/tactics-sim.jpg',
    status: '持续开发中',
    highlights: ['3D GIS 引擎', '数字孪生渲染', '空间分析管线', '实时数据融合'],
  },
  {
    title: 'Tactics Simulation',
    description: '面向推演与态势分析的仿真平台',
    tech: ['Simulation', 'C2', 'DSL'],
    link: 'https://tactics-sim-engine.pages.dev/',
    image: '/tactics-sim.jpg',
    status: '持续开发中',
    highlights: ['多方对抗推演', '实时态势感知', 'DSL 驱动', '复盘回放'],
  },
  {
    title: 'Workflow Engine',
    description: '用于复杂业务编排与流程驱动的工作流引擎',
    tech: ['Engine', 'Orchestration', 'DSL', 'Node.js'],
    link: '#',
    github: '#',
    status: '规划中',
    highlights: ['DSL 定义', 'DAG 调度', '状态持久化', '可视化编排'],
  },
  {
    title: 'Cesium REPL',
    description: 'CesiumJS 在线交互式 Playground，浏览器中编写、运行和分享 Cesium 代码',
    tech: ['CesiumJS', 'Vue 3', 'TypeScript', 'Monaco Editor'],
    link: 'https://cesium-repl.stuxu.com/',
    github: 'https://github.com/ysuhan/cesium-repl',
    image: '/cesium-repl.png',
    status: '积极维护',
    highlights: ['在线代码编辑', '实时 3D 预览', 'CesiumJS 沙箱', '代码分享'],
  },
]
</script>

<div class="page-container">

# 项目

<p class="page-subtitle">框架、引擎与数字系统</p>

<ProjectCard :projects="projects" />

</div>

<style scoped>
.page-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 80px 24px 80px;
  position: relative;
  z-index: 1;
}
.page-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 4px 0 40px;
  line-height: 1.6;
}
</style>
