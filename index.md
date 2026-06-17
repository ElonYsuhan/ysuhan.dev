---
layout: page
---

<script setup>
import { useData } from 'vitepress'

const { isDark } = useData()

const featuredProjects = [
  {
    title: 'AirGIS',
    description: '面向时空数据与仿真场景的 GIS 引擎体系。',
    tech: ['GIS', 'Cesium', 'Spatial'],
    link: '/projects/',
  },
  {
    title: 'Workflow Engine',
    description: '用于复杂业务编排与流程驱动的工作流引擎。',
    tech: ['Engine', 'Orchestration', 'DSL'],
    link: '/projects/',
  },
  {
    title: 'Tactics Simulation',
    description: '面向推演与态势分析的仿真平台。',
    tech: ['Simulation', 'C2', 'Analysis'],
    link: 'https://tactics-sim-engine.pages.dev/',
  },
  {
    title: 'Open Source',
    description: '长期维护的开源工具与组件库。',
    tech: ['Tools', 'Libraries', 'Community'],
    link: '/projects/',
  },
]

const showcaseItems = [
  {
    title: '卫星星座可视化',
    description: '大规模卫星星座轨道计算与三维可视化平台。',
    category: 'Satellite',
    link: '/showcase/',
  },
  {
    title: '空中对抗态势',
    description: '实时空中作战态势感知与交战推演系统。',
    category: 'Air Combat',
    link: '/showcase/',
  },
  {
    title: '数字孪生城市',
    description: '城市级数字孪生平台 — 数据融合与实时渲染。',
    category: 'Digital Twin',
    link: '/showcase/',
  },
  {
    title: 'GIS 基础平台',
    description: '二三维一体化 GIS 平台，支持多源数据接入与分析。',
    category: 'GIS Platform',
    link: '/showcase/',
  },
]

const latestPosts = [
  {
    title: '构建现代化个人网站：VitePress 深度定制指南',
    date: '2026-06-10',
    excerpt: '从零开始，使用 VitePress + Vue 3 + UnoCSS 构建一个性能极致、可深度定制的个人品牌网站。',
    tags: ['VitePress', 'Vue 3', 'Engineering'],
    url: '#',
  },
]
</script>

<!-- ═══════════ Hero ═══════════ -->
<section class="hero">
  <div class="hero-content">
    <h1 class="hero-name">Ysuhan</h1>
    <p class="hero-subtitle">从想法到作品，从创意到体系</p>
    <p class="hero-desc">构建框架、引擎与数字系统。<br>专注于 GIS、Simulation、Engineering 与 AI。</p>
    <div class="hero-actions">
      <a href="/projects/" class="hero-btn hero-btn-primary">浏览作品</a>
      <a href="/blog/" class="hero-btn hero-btn-secondary">阅读博客</a>
    </div>
  </div>
</section>

<!-- ═══════════ Featured Projects ═══════════ -->
<section class="section">
  <div class="section-header">
    <span class="section-label">Selected Work</span>
    <h2 class="section-title">Featured Projects</h2>
  </div>
  <div class="featured-grid">
    <a
      v-for="(p, i) in featuredProjects"
      :key="i"
      :href="p.link"
      class="featured-card animate-fade-in-up"
      :style="{ animationDelay: `${i * 0.08}s` }"
      :target="p.link.startsWith('http') ? '_blank' : undefined"
      :rel="p.link.startsWith('http') ? 'noopener noreferrer' : undefined"
    >
      <h3 class="featured-card-title">{{ p.title }}</h3>
      <p class="featured-card-desc">{{ p.description }}</p>
      <div class="featured-card-tags">
        <span v-for="t in p.tech" :key="t" class="featured-tag">{{ t }}</span>
      </div>
    </a>
  </div>
</section>

<!-- ═══════════ Showcase ═══════════ -->
<section class="section">
  <div class="section-header">
    <span class="section-label">Real Cases</span>
    <h2 class="section-title">Showcase</h2>
  </div>
  <div class="showcase-grid">
    <a
      v-for="(item, i) in showcaseItems"
      :key="i"
      :href="item.link"
      class="showcase-card animate-fade-in-up"
      :style="{ animationDelay: `${i * 0.06}s` }"
    >
      <div class="showcase-img" />
      <div class="showcase-body">
        <span class="showcase-category">{{ item.category }}</span>
        <h3 class="showcase-title">{{ item.title }}</h3>
        <p class="showcase-text">{{ item.description }}</p>
      </div>
    </a>
  </div>
  <div class="section-more">
    <a href="/showcase/">浏览全部案例 →</a>
  </div>
</section>

<!-- ═══════════ Latest Posts ═══════════ -->
<section class="section">
  <div class="section-header">
    <span class="section-label">Writing</span>
    <h2 class="section-title">Latest Posts</h2>
  </div>
  <div class="posts-list">
    <article
      v-for="(post, i) in latestPosts"
      :key="i"
      class="post-item animate-fade-in-up"
      :style="{ animationDelay: `${i * 0.08}s` }"
    >
      <time class="post-date">{{ post.date }}</time>
      <div class="post-content">
        <a :href="post.url" class="post-title-link">
          <h3 class="post-title">{{ post.title }}</h3>
        </a>
        <p class="post-excerpt">{{ post.excerpt }}</p>
        <div class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="post-tag">{{ tag }}</span>
        </div>
      </div>
    </article>
  </div>
  <div class="section-more">
    <a href="/blog/">浏览全部文章 →</a>
  </div>
</section>

<!-- ═══════════ About ═══════════ -->
<section class="section about-section">
  <div class="about-grid">
    <div class="about-avatar-wrap">
      <img src="/logo.png" alt="Ysuhan" class="about-avatar" />
    </div>
    <div class="about-text">
      <h2 class="about-name">易水寒 <span class="about-alias">Ysuhan</span></h2>
      <div class="about-roles">
        <span>GIS Developer</span>
        <span class="about-dot">·</span>
        <span>System Builder</span>
        <span class="about-dot">·</span>
        <span>Open Source Creator</span>
      </div>
      <p class="about-focus">
        长期关注 GIS、Simulation、Architecture 与 AI 领域，<br>致力于构建可维护的框架、引擎与数字系统。
      </p>
      <div class="about-links">
        <a href="/about/" class="about-link">了解更多 →</a>
        <a href="mailto:ysuhan@yeah.net" class="about-link about-link-dim">ysuhan@yeah.net</a>
      </div>
    </div>
  </div>
</section>

<style scoped>
/* ── Hero ── */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
}
.hero-content {
  max-width: 800px;
  text-align: center;
}
.hero-name {
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: var(--text-primary);
  margin: 0;
  line-height: 1;
}
.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin: 16px 0 0;
  font-weight: 400;
}
.hero-desc {
  font-size: 0.9375rem;
  color: var(--text-tertiary);
  margin: 12px 0 0;
  line-height: 1.8;
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
  height: 42px;
  padding: 0 22px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s var(--ease-out);
}
.hero-btn-primary {
  background: var(--gold);
  color: #fff;
}
.hero-btn-primary:hover {
  background: var(--gold-hover);
  color: #fff;
}
.hero-btn-secondary {
  border: 1px solid var(--border-default);
  color: var(--text-secondary);
}
.hero-btn-secondary:hover {
  border-color: var(--gold-border);
  color: var(--text-primary);
}

@media (max-width: 640px) {
  .hero-name { font-size: 2.75rem; }
  .hero-subtitle { font-size: 1.125rem; }
}

/* ── Section shared ── */
.section {
  max-width: 1080px;
  margin: 0 auto;
  padding: 120px 24px 0;
}
.section-header {
  margin-bottom: 40px;
}
.section-label {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--gold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-family: var(--font-mono);
}
.section-title {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin: 8px 0 0;
}
.section-more {
  margin-top: 32px;
}
.section-more a {
  font-size: 0.875rem;
  color: var(--gold);
  text-decoration: none;
  transition: color 0.2s;
}
.section-more a:hover { color: var(--gold-hover); }

/* ── Featured Projects 2×2 ── */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  overflow: hidden;
  background: var(--border-subtle);
}
.featured-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px;
  background: var(--bg-base);
  text-decoration: none;
  color: inherit;
  transition: background 0.25s var(--ease-out);
  min-height: 180px;
}
.featured-card:hover {
  background: var(--bg-surface);
}
.featured-card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px;
  letter-spacing: -0.02em;
}
.featured-card-desc {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}
.featured-card-tags {
  margin-top: 20px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.featured-tag {
  font-size: 0.6875rem;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  letter-spacing: 0.02em;
  padding: 2px 8px;
  background: var(--bg-elevated);
  border-radius: 4px;
}

@media (max-width: 640px) {
  .featured-grid { grid-template-columns: 1fr; }
  .featured-card { padding: 24px; min-height: auto; }
}

/* ── Showcase grid ── */
.showcase-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  overflow: hidden;
  background: var(--border-subtle);
}
.showcase-card {
  background: var(--bg-base);
  text-decoration: none;
  color: inherit;
  transition: background 0.25s var(--ease-out);
}
.showcase-card:hover {
  background: var(--bg-surface);
}
.showcase-img {
  aspect-ratio: 16 / 10;
  background: var(--bg-elevated);
}
.showcase-body {
  padding: 20px 24px 28px;
}
.showcase-category {
  font-size: 0.625rem;
  font-weight: 600;
  color: var(--gold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-family: var(--font-mono);
}
.showcase-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 8px 0 4px;
}
.showcase-text {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 640px) {
  .showcase-grid { grid-template-columns: 1fr; }
}

/* ── Posts ── */
.posts-list {
  display: flex;
  flex-direction: column;
}
.post-item {
  display: flex;
  gap: 24px;
  padding: 18px 0;
  border-bottom: 1px solid var(--border-subtle);
}
.post-item:first-child { padding-top: 0; }
.post-date {
  flex-shrink: 0;
  width: 100px;
  font-size: 0.75rem;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  padding-top: 2px;
}
.post-content { flex: 1; min-width: 0; }
.post-title-link { text-decoration: none; color: inherit; }
.post-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 4px;
  transition: color 0.2s;
}
.post-item:hover .post-title { color: var(--gold); }
.post-excerpt {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 8px;
}
.post-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.post-tag {
  font-size: 0.6875rem;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
}

@media (max-width: 640px) {
  .post-item { flex-direction: column; gap: 6px; }
  .post-date { width: auto; }
}

/* ── About ── */
.about-section {
  padding-bottom: 100px;
}
.about-grid {
  display: flex;
  align-items: center;
  gap: 48px;
}
.about-avatar-wrap {
  flex-shrink: 0;
}
.about-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border-default);
}
.about-text {
  flex: 1;
}
.about-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  margin: 0 0 6px;
}
.about-alias {
  font-weight: 400;
  color: var(--text-tertiary);
  font-size: 1rem;
  font-family: var(--font-mono);
}
.about-roles {
  font-size: 0.8125rem;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  margin-bottom: 12px;
}
.about-dot {
  margin: 0 6px;
  color: var(--text-disabled);
}
.about-focus {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0 0 16px;
}
.about-links {
  display: flex;
  gap: 20px;
}
.about-link {
  font-size: 0.8125rem;
  color: var(--gold);
  text-decoration: none;
  transition: color 0.2s;
}
.about-link:hover { color: var(--gold-hover); }
.about-link-dim {
  color: var(--text-tertiary);
  font-family: var(--font-mono);
}
.about-link-dim:hover { color: var(--text-secondary); }

@media (max-width: 640px) {
  .about-grid { flex-direction: column; text-align: center; gap: 24px; }
  .about-avatar { width: 96px; height: 96px; }
  .about-links { justify-content: center; flex-wrap: wrap; }
}
</style>

