---
title: 产品
description: 真实产品，真实用户
layout: page
---

<script setup>
const projects = [
  {
    title: 'Tactics Sim Engine',
    description: '战术模拟引擎 — 在线策略推演与模拟平台。',
    tech: ['Cloudflare Pages', 'Game Engine', 'Simulation'],
    link: 'https://tactics-sim-engine.pages.dev/',
  },
]
</script>

<div class="page-container">

# 产品

<p class="page-subtitle">真实产品，真实用户</p>

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

