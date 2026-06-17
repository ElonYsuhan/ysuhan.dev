---
title: About
description: 关于 Ysuhan — 构建者、创作者、终身学习者
layout: page
---

<div class="about-container">

# About Me

<div class="about-intro">

👋 Hi，我是 **Ysuhan** — 一个对技术与产品充满热情的构建者。

我相信**从想法到作品**的力量 —— 每一个创意都值得被构建，每一个项目都是成长的足迹。这里是我的数字家园，记录着我在技术、设计与创作领域的探索。

</div>

## 技能栈

<div class="skills-grid">

<div class="skill-group">
<h3>Frontend</h3>
<ul>
<li>Vue 3 / Nuxt 3</li>
<li>React / Next.js</li>
<li>TypeScript</li>
<li>UnoCSS / Tailwind CSS</li>
<li>Vite / Webpack</li>
</ul>
</div>

<div class="skill-group">
<h3>Backend</h3>
<ul>
<li>Node.js / Bun</li>
<li>Go</li>
<li>PostgreSQL / SQLite</li>
<li>Redis</li>
<li>Docker</li>
</ul>
</div>

<div class="skill-group">
<h3>Design</h3>
<ul>
<li>Figma</li>
<li>Design Systems</li>
<li>UI/UX Design</li>
<li>Motion Design</li>
<li>Accessibility</li>
</ul>
</div>

<div class="skill-group">
<h3>Tooling</h3>
<ul>
<li>Git / GitHub</li>
<li>CI/CD (GitHub Actions)</li>
<li>Vim / Neovim</li>
<li>macOS / Linux</li>
<li>AI-Assisted Dev</li>
</ul>
</div>

</div>

## 设计哲学

> **简单是终极的复杂。** — Leonardo da Vinci

我追求的设计与工程原则：

- **性能优先** — 每一毫秒都很重要，性能不是事后优化而是设计起点
- **渐进增强** — 基础功能对所有设备可用，增强体验为现代浏览器锦上添花
- **无障碍访问** — Web 是为每一个人而建的，a11y 不是附加功能
- **代码即文档** — 好的代码自解释，好的文档补全图景
- **简约不简单** — 去除一切可以去除的，直到剩下本质

## 当前关注

- 🏗️ 构建可维护的设计系统与组件库
- ⚡ Web 性能优化与 Core Web Vitals
- 🧩 开发者工具与 CLI 应用
- 🌐 边缘计算与 Serverless 架构
- 🤖 AI 辅助开发工作流

## 联系我

- **GitHub:** [github.com/ysuhan](https://github.com/ysuhan)
- **Email:** hi@ysuhan.dev

---

*这个站点使用 VitePress 构建，部署在 GitHub Pages。设计灵感来自 Linear、Raycast 与 Anthony Fu 的作品。*

</div>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}

.about-intro {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--vp-c-text-1);
  margin-bottom: 40px;
  padding: 24px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-bg-soft-up);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.skill-group {
  padding: 20px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-bg-soft-up);
}

.skill-group h3 {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--brand);
  margin: 0 0 10px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.skill-group ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.skill-group li {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  padding: 3px 0;
}

.skill-group li::before {
  content: '› ';
  color: var(--vp-c-text-3);
}

@media (max-width: 480px) {
  .skills-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>

