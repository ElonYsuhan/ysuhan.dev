---
layout: page
---

<script setup>
/* ═══════════ Now ═══════════ */
const nowItems = {
  building: [
    { text: '推演引擎', desc: '仿真核心' },
    { text: '时间轨道编辑器', desc: 'Timeline UI' },
    { text: 'GIS SDK', desc: '通用 GIS 能力封装' },
  ],
  learning: [
    { text: 'ECS 架构', desc: 'Entity Component System' },
    { text: '游戏引擎设计', desc: '渲染与场景管理' },
  ],
  thinking: [
    { text: '数字孪生编辑器体系', desc: '低代码 + 可扩展' },
  ],
}

/* ═══════════ Recent Activity ═══════════ */
const activities = [
  { month: '2026.06', items: [
    '完成时间轨道编辑器重构',
    '推演引擎支持 DSL 驱动',
    'GIS SDK 发布 v0.3',
  ]},
  { month: '2026.05', items: [
    'Tactics Simulation 接入实时数据流',
    'ECS 架构原型验证通过',
  ]},
  { month: '2026.04', items: [
    'AirGIS 渲染管线重构',
    '开始研究 Command 系统',
  ]},
]

/* ═══════════ Growth Timeline ═══════════ */
const timeline = [
  { year: '2023', title: '进入 WebGIS', desc: '参与多个 GIS 项目交付，建立空间数据与地图渲染的基础认知。', accent: true },
  { year: '2024', title: '深入 Cesium', desc: '开始研究三维 GIS 与数字孪生，解决多窗口渲染、离线方案等核心问题。', accent: false },
  { year: '2025', title: '构建 GIS SDK', desc: '尝试封装自己的前端 GIS 体系，沉淀引擎能力与组件规范。', accent: false },
  { year: '2026', title: '开发推演引擎', desc: '探索 ECS 与 DSL 驱动架构，构建面向态势推演的仿真系统。', accent: false },
]

/* ═══════════ Tech Map (network style) ═══════════ */
const techNodes = [
  { id: 'webgis', label: 'WebGIS', x: 50, y: 10 },
  { id: 'cesium', label: 'Cesium', x: 20, y: 45 },
  { id: 'sdk', label: 'GIS SDK', x: 80, y: 45 },
  { id: 'digitaltwin', label: '数字孪生', x: 50, y: 55 },
  { id: 'ecs', label: 'ECS', x: 20, y: 70 },
  { id: 'dsl', label: 'DSL', x: 80, y: 70 },
  { id: 'engine', label: '推演引擎', x: 50, y: 85 },
  { id: 'engineering', label: '工程化', x: 50, y: 95 },
]

/* ═══════════ Featured Projects ═══════════ */
const featuredProjects = [
  {
    title: 'AirGIS',
    description: '面向数字孪生与空间分析的 GIS 引擎体系',
    tech: ['Cesium', 'Vue 3', 'TypeScript'],
    link: '/projects/',
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
]

/* ═══════════ Latest Posts ═══════════ */
const latestPosts = [
  {
    title: '构建现代个人网站：VitePress 深度实践',
    date: '2026-06-18',
    excerpt: '从零开始，使用 VitePress + Vue 3 构建性能极致、可深度定制的个人品牌网站。',
    url: '#',
  },
]

const showPosts = latestPosts.length >= 1
</script>

<NetworkBg />

<!-- ═══════════ Hero ═══════════ -->
<section class="hero">
  <div class="hero-content">
    <div class="hero-avatar">
      <img src="/favicon.png" alt="Ysuhan" class="hero-avatar-img" />
    </div>
    <h1 class="hero-name">Ysuhan</h1>
    <div class="hero-roles">
      <span>WebGIS Engineer</span>
      <span class="hero-dot">·</span>
      <span>Digital Twin Developer</span>
      <span class="hero-dot">·</span>
      <span>Open Source Creator</span>
    </div>
    <p class="hero-tagline">构建面向空间计算与数字孪生的前端系统</p>
    <div class="hero-actions">
      <a href="/career/" class="hero-btn hero-btn-primary">成长轨迹</a>
      <a href="/projects/" class="hero-btn hero-btn-secondary">精选项目</a>
    </div>
  </div>
</section>

<!-- ═══════════ Now ═══════════ -->
<section class="section">
  <div class="section-header">
    <span class="section-label">现在</span>
    <h2 class="section-title">正在做什么</h2>
  </div>
  <div class="now-grid">
    <div class="now-card glass-card">
      <h3 class="now-card-title">正在开发</h3>
      <ul class="now-list">
        <li v-for="item in nowItems.building" :key="item.text" class="now-item">
          <span class="now-item-text">{{ item.text }}</span>
          <span class="now-item-desc">{{ item.desc }}</span>
        </li>
      </ul>
    </div>
    <div class="now-card glass-card">
      <h3 class="now-card-title">正在学习</h3>
      <ul class="now-list">
        <li v-for="item in nowItems.learning" :key="item.text" class="now-item">
          <span class="now-item-text">{{ item.text }}</span>
          <span class="now-item-desc">{{ item.desc }}</span>
        </li>
      </ul>
    </div>
    <div class="now-card glass-card">
      <h3 class="now-card-title">正在思考</h3>
      <ul class="now-list">
        <li v-for="item in nowItems.thinking" :key="item.text" class="now-item">
          <span class="now-item-text">{{ item.text }}</span>
          <span class="now-item-desc">{{ item.desc }}</span>
        </li>
      </ul>
    </div>
  </div>
</section>

<!-- ═══════════ Philosophy ═══════════ -->
<section class="section">
  <div class="section-header">
    <span class="section-label">理念</span>
    <h2 class="section-title">我相信</h2>
  </div>
  <div class="philosophy-card glass-card">
    <p class="philosophy-text">
      GIS 不应该只是地图展示。<br>
      数字孪生不应该只是三维可视化。
    </p>
    <p class="philosophy-core">
      真正的数字孪生系统，<br>
      应该具备<span class="philosophy-accent">感知</span>、<span class="philosophy-accent">推演</span>、<span class="philosophy-accent">决策</span>与<span class="philosophy-accent">交互</span>能力。
    </p>
  </div>
</section>

<!-- ═══════════ Recent Activity ═══════════ -->
<section class="section">
  <div class="section-header">
    <span class="section-label">动态</span>
    <h2 class="section-title">最近在做</h2>
  </div>
  <div class="activity-list">
    <div v-for="(group, i) in activities" :key="i" class="activity-group glass-card">
      <div class="activity-month">{{ group.month }}</div>
      <ul class="activity-items">
        <li v-for="(item, j) in group.items" :key="j" class="activity-item">
          <span class="activity-check">✓</span>
          <span class="activity-text">{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</section>

<!-- ═══════════ Growth Timeline ═══════════ -->
<section class="section">
  <div class="section-header">
    <span class="section-label">成长</span>
    <h2 class="section-title">成长轨迹</h2>
  </div>
  <div class="timeline-track">
    <div v-for="(item, i) in timeline" :key="i" class="tl-node" :class="{ 'tl-accent': item.accent }">
      <div class="tl-year">{{ item.year }}</div>
      <div class="tl-dot-wrap">
        <span class="tl-dot"></span>
        <span v-if="i < timeline.length - 1" class="tl-line"></span>
      </div>
      <div class="tl-card glass-card">
        <h3 class="tl-title">{{ item.title }}</h3>
        <p class="tl-desc">{{ item.desc }}</p>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ Tech Map — network style ═══════════ -->
<section class="section">
  <div class="section-header">
    <span class="section-label">知识体系</span>
    <h2 class="section-title">技术地图</h2>
  </div>
  <div class="techmap-network">
    <div class="tm-node tm-node-core">
      <span class="tm-label">空间智能</span>
    </div>
    <div class="tm-branches">
      <div class="tm-branch tm-branch-left">
        <div class="tm-node"><span class="tm-label">Cesium</span></div>
        <div class="tm-node"><span class="tm-label">GIS SDK</span></div>
        <div class="tm-node"><span class="tm-label">ECS</span></div>
      </div>
      <div class="tm-branch tm-branch-right">
        <div class="tm-node"><span class="tm-label">数字孪生</span></div>
        <div class="tm-node"><span class="tm-label">DSL</span></div>
        <div class="tm-node"><span class="tm-label">推演引擎</span></div>
      </div>
    </div>
    <div class="tm-node tm-node-bottom">
      <span class="tm-label">工程化</span>
    </div>
  </div>
</section>

<!-- ═══════════ Featured Projects ═══════════ -->
<section class="section">
  <div class="section-header">
    <span class="section-label">精选</span>
    <h2 class="section-title">项目</h2>
  </div>
  <ProjectCard :projects="featuredProjects" />
  <div class="section-more">
    <a href="/projects/">浏览全部项目 →</a>
  </div>
</section>

<!-- ═══════════ Latest Posts ═══════════ -->
<section v-if="showPosts" class="section">
  <div class="section-header">
    <span class="section-label">文章</span>
    <h2 class="section-title">最新文章</h2>
  </div>
  <div class="posts-list">
    <article
      v-for="(post, i) in latestPosts"
      :key="i"
      class="post-item glass-card"
    >
      <time class="post-date">{{ post.date }}</time>
      <div class="post-content">
        <a :href="post.url" class="post-title-link">
          <h3 class="post-title">{{ post.title }}</h3>
        </a>
        <p class="post-excerpt">{{ post.excerpt }}</p>
      </div>
    </article>
  </div>
  <div class="section-more">
    <a href="/blog/">浏览全部文章 →</a>
  </div>
</section>

<!-- ═══════════ Footer CTA ═══════════ -->
<section class="section footer-cta">
  <div class="cta-card glass-card">
    <p class="cta-text">从 WebGIS 到数字孪生，从 SDK 到推演引擎。</p>
    <p class="cta-text-dim">持续构建，长期沉淀。</p>
    <a href="/career/" class="cta-link">查看完整成长轨迹 →</a>
  </div>
</section>

<style scoped>
/* ── Hero — 80vh, with avatar anchor ── */
.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 24px 60px;
  position: relative;
  z-index: 1;
}

.hero-content {
  max-width: 640px;
  text-align: center;
  position: relative;
}

/* Radial glow behind logo — the "sun" */
.hero-content::before {
  content: '';
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(212,165,116,0.10) 0%, transparent 65%);
  pointer-events: none;
  z-index: -1;
}

.hero-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 28px;
  overflow: hidden;
  border: 3px solid var(--accent-border);
}

.hero-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-name {
  font-size: 3.25rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: var(--text-primary);
  margin: 0;
  line-height: 1;
}

.hero-roles {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 14px;
  font-size: 0.8125rem;
  font-family: var(--font-mono);
  color: var(--accent);
  letter-spacing: 0.02em;
}

.hero-dot {
  color: var(--text-disabled);
  font-family: var(--font-sans);
}

.hero-tagline {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  margin-top: 22px;
  line-height: 1.6;
  font-weight: 400;
}

.hero-actions {
  margin-top: 34px;
  display: flex;
  gap: 12px;
  justify-content: center;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  height: 42px;
  padding: 0 22px;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 300ms var(--ease-out);
}

.hero-btn-primary {
  background: var(--accent);
  color: #fff;
  border: none;
}

.hero-btn-primary:hover {
  background: var(--accent-hover);
  color: #fff;
}

.hero-btn-secondary {
  background: var(--glass-card-bg);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--glass-card-border);
  color: var(--text-secondary);
}

.hero-btn-secondary:hover {
  border-color: var(--accent-border);
  color: var(--text-primary);
  background: var(--glass-card-hover-bg);
}

@media (max-width: 640px) {
  .hero { min-height: 70vh; padding: 80px 24px 50px; }
  .hero-name { font-size: 2.25rem; }
  .hero-tagline { font-size: 0.8125rem; }
  .hero-roles { font-size: 0.6875rem; }
  .hero-avatar { width: 64px; height: 64px; margin-bottom: 22px; }
}

/* ── Section shared ── */
.section {
  max-width: 960px;
  margin: 0 auto;
  padding: 90px 24px 0;
  position: relative;
  z-index: 1;
}

.section-header { margin-bottom: 40px; }

.section-label {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-family: var(--font-mono);
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin: 6px 0 0;
}

.section-more { margin-top: 28px; }

.section-more a {
  font-size: 0.8125rem;
  color: var(--accent);
  text-decoration: none;
  transition: color 300ms var(--ease-out);
}

.section-more a:hover { color: var(--accent-hover); }

/* ── Now — 3-column glass cards ── */
.now-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.now-card { padding: 26px; }

.now-card-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-family: var(--font-mono);
  margin: 0 0 18px;
}

.now-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.now-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.now-item-text {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.now-item-desc {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
}

@media (max-width: 768px) {
  .now-grid { grid-template-columns: 1fr; }
}

/* ── Philosophy ── */
.philosophy-card {
  padding: 40px;
  text-align: center;
}

.philosophy-text {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  line-height: 2;
  margin: 0 0 24px;
}

.philosophy-core {
  font-size: 1.125rem;
  color: var(--text-primary);
  font-weight: 500;
  line-height: 2;
  margin: 0;
  letter-spacing: -0.01em;
}

.philosophy-accent {
  color: var(--accent);
  font-weight: 600;
}

@media (max-width: 640px) {
  .philosophy-card { padding: 28px 24px; }
  .philosophy-text { font-size: 0.9375rem; }
  .philosophy-core { font-size: 1rem; }
}

/* ── Recent Activity ── */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-group {
  display: flex;
  gap: 32px;
  padding: 24px 28px;
}

.activity-month {
  flex-shrink: 0;
  width: 80px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--accent);
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
  padding-top: 1px;
}

.activity-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.activity-check {
  color: var(--accent);
  font-size: 0.75rem;
  flex-shrink: 0;
}

.activity-text { color: var(--text-primary); }

@media (max-width: 640px) {
  .activity-group { flex-direction: column; gap: 12px; padding: 20px; }
  .activity-month { width: auto; }
}

/* ── Growth Timeline ── */
.timeline-track {
  display: flex;
  flex-direction: column;
}

.tl-node {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.tl-year {
  flex-shrink: 0;
  width: 48px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent);
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
  padding-top: 20px;
  text-align: right;
}

.tl-dot-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 12px;
}

.tl-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
  margin-top: 22px;
  border: 2px solid var(--bg-primary);
  box-shadow: 0 0 0 2px var(--accent-border);
}

.tl-accent .tl-dot {
  width: 14px;
  height: 14px;
  margin-top: 21px;
  box-shadow: 0 0 0 4px var(--accent-subtle), 0 0 0 2px var(--accent-border);
}

.tl-line {
  width: 2px;
  flex: 1;
  background: var(--border-default);
  min-height: 24px;
  margin-top: 4px;
}

.tl-card {
  flex: 1;
  padding: 20px 24px;
  margin-bottom: 8px;
  min-width: 0;
}

.tl-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 4px;
  letter-spacing: -0.01em;
}

.tl-desc {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.tl-accent .tl-card {
  border-color: var(--accent-border);
}

@media (max-width: 640px) {
  .tl-year { width: 40px; font-size: 0.6875rem; }
  .tl-card { padding: 16px 18px; }
}

/* ── Tech Map — network style ── */
.techmap-network {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  padding: 20px 0;
}

.tm-node {
  display: inline-flex;
  padding: 8px 20px;
  border-radius: 999px;
  border: 1px solid var(--accent-border);
  background: var(--glass-card-bg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.tm-node-core {
  border-color: var(--accent);
  background: var(--accent-subtle);
  padding: 10px 24px;
  margin-bottom: 4px;
}

.tm-node-core .tm-label {
  color: var(--accent);
  font-weight: 600;
}

.tm-label {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  white-space: nowrap;
}

.tm-branches {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 480px;
}

.tm-branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
}

.tm-branch .tm-node {
  border-radius: 999px;
}

.tm-node-bottom {
  margin-top: 4px;
  border-color: var(--border-default);
}

@media (max-width: 480px) {
  .tm-branches { flex-direction: column; align-items: center; gap: 8px; }
  .tm-branch { flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 8px; padding: 6px 0; }
  .tm-node { padding: 6px 16px; }
  .tm-node .tm-label { font-size: 0.75rem; }
}

/* ── Posts ── */
.posts-list { display: flex; flex-direction: column; gap: 16px; }

.post-item {
  display: flex;
  gap: 32px;
  padding: 24px;
}

.post-date {
  flex-shrink: 0;
  width: 100px;
  font-size: 0.75rem;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  padding-top: 1px;
}

.post-content { flex: 1; min-width: 0; }
.post-title-link { text-decoration: none; color: inherit; }

.post-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 4px;
  transition: color 300ms var(--ease-out);
}

.post-item:hover .post-title { color: var(--accent); }

.post-excerpt {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 640px) {
  .post-item { flex-direction: column; gap: 4px; padding: 20px; }
  .post-date { width: auto; }
}

/* ── Footer CTA ── */
.footer-cta { padding-bottom: 80px; }

.cta-card {
  padding: 36px;
  text-align: center;
}

.cta-text {
  font-size: 1.0625rem;
  color: var(--text-primary);
  font-weight: 500;
  letter-spacing: -0.02em;
  margin: 0 0 6px;
}

.cta-text-dim {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 400;
}

.cta-link {
  display: inline-block;
  margin-top: 22px;
  font-size: 0.8125rem;
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
  transition: color 300ms var(--ease-out);
}

.cta-link:hover { color: var(--accent-hover); }
</style>
