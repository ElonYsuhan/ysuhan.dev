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

/* ═══════════ Growth Timeline ═══════════ */
const timeline = [
  { year: '2023', title: '进入 WebGIS', desc: 'React · OpenLayers · GeoServer，政务 GIS 系统实战', accent: true },
  { year: '2024', title: '深入 Cesium', desc: 'Vue 3 · 实体系统 · 多窗口渲染 · 离线方案', accent: false },
  { year: '2025', title: '构建 GIS SDK', desc: '引擎封装 · 组件体系 · 数据交换规范', accent: false },
  { year: '2026', title: '开发推演引擎', desc: 'Tactics Simulation · DSL · Workflow · Architecture', accent: false },
]

/* ═══════════ Tech Map ═══════════ */
const techMap = [
  {
    domain: 'WebGIS',
    items: ['Cesium', 'OpenLayers', 'GeoServer', 'PostGIS'],
  },
  {
    domain: '数字孪生',
    items: ['ECS', '实体编辑器', '场景管理', '实时数据'],
  },
  {
    domain: '工程化',
    items: ['Monorepo', 'pnpm', 'NPM', 'CI/CD'],
  },
]

/* ═══════════ Featured Projects (only 2) ═══════════ */
const featuredProjects = [
  {
    title: 'AirGIS',
    description: '面向时空数据与仿真场景的 GIS 引擎体系。支持大规模地理数据管理、实时渲染与 spatial analysis 管线。',
    tech: ['GIS', 'Cesium', 'Spatial', 'TypeScript'],
    link: '/projects/',
  },
  {
    title: 'Tactics Simulation',
    description: '面向推演与态势分析的仿真平台。支持多方对抗、实时态势感知与复盘分析。',
    tech: ['Simulation', 'C2', 'Analysis', 'Cloudflare'],
    link: 'https://tactics-sim-engine.pages.dev/',
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

<!-- ═══════════ Tech Map ═══════════ -->
<section class="section">
  <div class="section-header">
    <span class="section-label">知识体系</span>
    <h2 class="section-title">技术地图</h2>
  </div>
  <div class="techmap-grid">
    <div v-for="domain in techMap" :key="domain.domain" class="techmap-card glass-card">
      <h3 class="techmap-domain">{{ domain.domain }}</h3>
      <div class="techmap-items">
        <span v-for="item in domain.items" :key="item" class="techmap-tag">{{ item }}</span>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ Featured Projects ═══════════ -->
<section class="section">
  <div class="section-header">
    <span class="section-label">精选</span>
    <h2 class="section-title">项目</h2>
  </div>
  <div class="featured-grid">
    <a
      v-for="(p, i) in featuredProjects"
      :key="i"
      :href="p.link"
      class="featured-card glass-card"
      :target="p.link.startsWith('http') ? '_blank' : undefined"
      :rel="p.link.startsWith('http') ? 'noopener noreferrer' : undefined"
    >
      <h3 class="featured-title">{{ p.title }}</h3>
      <p class="featured-desc">{{ p.description }}</p>
      <div class="featured-tags">
        <span v-for="t in p.tech" :key="t" class="featured-tag">{{ t }}</span>
      </div>
    </a>
  </div>
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
    <p class="cta-text cta-text-dim">持续构建，长期沉淀。</p>
    <a href="/career/" class="cta-link">查看完整成长轨迹 →</a>
  </div>
</section>

<style scoped>
/* ── Hero — compact, not full-screen ── */
.hero {
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 80px;
  position: relative;
  z-index: 1;
}

.hero-content {
  max-width: 640px;
  text-align: center;
}

.hero-name {
  font-size: 3.5rem;
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
  margin-top: 16px;
  font-size: 0.875rem;
  font-family: var(--font-mono);
  color: var(--accent);
  letter-spacing: 0.02em;
}

.hero-dot {
  color: var(--text-disabled);
  font-family: var(--font-sans);
}

.hero-tagline {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-top: 24px;
  line-height: 1.6;
  font-weight: 400;
}

.hero-actions {
  margin-top: 36px;
  display: flex;
  gap: 12px;
  justify-content: center;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  height: 44px;
  padding: 0 24px;
  border-radius: 999px;
  font-size: 0.875rem;
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
  .hero { min-height: 75vh; padding: 100px 24px 60px; }
  .hero-name { font-size: 2.5rem; }
  .hero-tagline { font-size: 0.875rem; }
  .hero-roles { font-size: 0.75rem; }
}

/* ── Section shared ── */
.section {
  max-width: 960px;
  margin: 0 auto;
  padding: 100px 24px 0;
  position: relative;
  z-index: 1;
}

.section-header { margin-bottom: 48px; }

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

.section-more { margin-top: 32px; }

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

.now-card {
  padding: 28px;
}

.now-card-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-family: var(--font-mono);
  margin: 0 0 20px;
}

.now-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
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

/* ── Growth Timeline — horizontal-ish, cards with dots ── */
.timeline-track {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.tl-node {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.tl-year {
  flex-shrink: 0;
  width: 52px;
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
  margin: 0;
  line-height: 1.6;
}

.tl-accent .tl-card {
  border-color: var(--accent-border);
}

@media (max-width: 640px) {
  .tl-year { width: 44px; font-size: 0.6875rem; }
  .tl-card { padding: 16px 18px; }
}

/* ── Tech Map ── */
.techmap-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.techmap-card {
  padding: 28px;
}

.techmap-domain {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 16px;
  letter-spacing: -0.01em;
}

.techmap-items {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.techmap-tag {
  font-size: 0.75rem;
  color: var(--accent);
  font-family: var(--font-mono);
  padding: 3px 12px;
  border: 1px solid var(--accent-border);
  border-radius: 999px;
}

@media (max-width: 768px) {
  .techmap-grid { grid-template-columns: 1fr; }
}

/* ── Featured Projects — only 2 ── */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.featured-card {
  display: flex;
  flex-direction: column;
  padding: 32px;
  text-decoration: none;
  color: inherit;
}

.featured-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px;
  letter-spacing: -0.02em;
}

.featured-desc {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 20px;
  flex: 1;
}

.featured-tags { display: flex; gap: 8px; flex-wrap: wrap; }

.featured-tag {
  font-size: 0.6875rem;
  color: var(--accent);
  font-family: var(--font-mono);
  padding: 3px 10px;
  border: 1px solid var(--accent-border);
  border-radius: 999px;
}

@media (max-width: 640px) {
  .featured-grid { grid-template-columns: 1fr; }
  .featured-card { padding: 24px; }
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
  padding: 40px;
  text-align: center;
}

.cta-text {
  font-size: 1.125rem;
  color: var(--text-primary);
  font-weight: 500;
  letter-spacing: -0.02em;
  margin: 0 0 8px;
}

.cta-text-dim {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  font-weight: 400;
}

.cta-link {
  display: inline-block;
  margin-top: 24px;
  font-size: 0.875rem;
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
  transition: color 300ms var(--ease-out);
}

.cta-link:hover { color: var(--accent-hover); }
</style>
