---
title: 项目
description: 框架、引擎与数字系统
layout: page
---

<script setup>
const projects = [
  {
    title: 'AirGIS 示例中心',
    description: 'AirGIS 生态的在线示例平台，提供 Cesium 能力演示、组件示例、API 用法和最佳实践',
    tech: ['CesiumJS', 'Vue 3', 'TypeScript'],
    link: 'https://ysuhan-gis-cesium.pages.dev/',
    image: '/images/airgis-cesium.jpg',
    status: '积极维护',
    highlights: ['3D 能力演示', '组件示例', 'API 用法', '最佳实践'],
  },
  {
    title: 'Tactics Simulation',
    description: '面向推演与态势分析的仿真平台',
    tech: ['Simulation', 'C2', 'DSL'],
    link: 'https://tactics-sim-engine.pages.dev/',
    image: '/images/tactics-sim.jpg',
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
    image: '/images/cesium-repl.png',
    status: '积极维护',
    highlights: ['在线代码编辑', '实时 3D 预览', 'CesiumJS 沙箱', '代码分享'],
  },
  {
    title: 'Suhan DSH Forge',
    description: '面向 DeepSeek Harness (DSH) 的插件工厂与可视化插件平台，覆盖插件开发、验证、打包与在线市场展示',
    tech: ['Vue 3', 'TypeScript', 'DSH', 'Cloudflare Pages'],
    link: 'https://suhan-dsh-forge.pages.dev/',
    github: 'https://github.com/ElonYsuhan/suhan-dsh-forge',
    image: '/images/dsh-forge.png',
    status: '持续开发中',
    highlights: ['插件市场', '插件开发工作区', '发布门禁校验', '真实环境冒烟测试'],
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
