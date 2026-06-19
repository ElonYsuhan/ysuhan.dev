---
layout: page
---

<script setup>
const featuredProjects = [
  {
    title: 'AirGIS',
    description: '面向时空数据与仿真场景的 GIS 引擎体系。',
    tech: ['GIS', 'Cesium', 'Engine'],
    link: '/projects/',
    year: '2026',
    status: 'Active',
  },
  {
    title: 'Workflow Engine',
    description: '用于复杂业务编排的工作流引擎。',
    tech: ['DSL', 'Flow', 'Architecture'],
    link: '/projects/',
    year: '2026',
    status: 'Planning',
  },
  {
    title: 'Tactics Simulation',
    description: '面向推演与态势分析的仿真平台。',
    tech: ['Simulation', 'C2', 'Analysis'],
    link: 'https://tactics-sim-engine.pages.dev/',
    year: '2025',
    status: 'Active',
  },
  {
    title: 'Open Source',
    description: '长期维护的开源工具与组件库。',
    tech: ['Tools', 'Libraries', 'Community'],
    link: '/projects/',
    year: '2024',
    status: 'Active',
  },
]

const statusLabel = {
  Active: '进行中',
  Planning: '规划中',
}

const showcaseItems = [
  {
    title: '卫星星座可视化',
    description: '大规模卫星星座轨道计算与三维可视化。',
    category: 'Satellite',
    tech: ['Cesium', 'TLE', 'WebGL'],
    link: '/showcase/',
  },
  {
    title: '空中对抗态势',
    description: '实时空中作战态势感知与交战推演。',
    category: 'Air Combat',
    tech: ['C2', 'Real-time', '3D'],
    link: '/showcase/',
  },
  {
    title: '数字孪生城市',
    description: '城市级数字孪生 — 数据融合与实时渲染。',
    category: 'Digital Twin',
    tech: ['GIS', 'IoT', 'BIM'],
    link: '/showcase/',
  },
  {
    title: 'GIS 基础平台',
    description: '二三维一体化 GIS 平台，多源数据接入。',
    category: 'GIS Platform',
    tech: ['Spatial', 'Analysis', '3D'],
    link: '/showcase/',
  },
]

const latestPosts = [
  {
    title: '构建现代个人网站：VitePress 深度实践',
    date: '2026-06-18',
    excerpt: '从零开始，使用 VitePress + Vue 3 构建性能极致、可深度定制的个人品牌网站。',
    url: '#',
  },
]

const showPosts = latestPosts.length >= 3
</script>

<!-- ═══════════ Hero ═══════════ -->
<section class="hero">
  <div class="hero-content">
    <h1 class="hero-name">Ysuhan</h1>
    <p class="hero-en">构建空间智能系统</p>
    <p class="hero-slogan">
      <span>从想法到作品</span>
      <span>从创意到体系</span>
    </p>
    <p class="hero-desc">
      探索 GIS、仿真与系统工程。<br>
      将复杂问题沉淀为作品，将零散创意演化为体系。
    </p>
    <div class="hero-actions">
      <a href="/projects/" class="hero-btn hero-btn-primary">浏览项目</a>
      <a href="/blog/" class="hero-btn hero-btn-secondary">阅读博客</a>
    </div>
  </div>
</section>

<!-- ═══════════ Featured Projects ═══════════ -->
<section class="section">
  <div class="section-header">
    <span class="section-label">精选项目</span>
    <h2 class="section-title">项目</h2>
  </div>
  <div class="featured-grid">
    <a
      v-for="(p, i) in featuredProjects"
      :key="i"
      :href="p.link"
      class="featured-card"
      :target="p.link.startsWith('http') ? '_blank' : undefined"
      :rel="p.link.startsWith('http') ? 'noopener noreferrer' : undefined"
    >
      <div class="featured-body">
        <h3 class="featured-title">{{ p.title }}</h3>
        <p class="featured-desc">{{ p.description }}</p>
      </div>
      <div class="featured-meta">
        <div class="featured-tags">
          <span v-for="t in p.tech" :key="t" class="featured-tag">{{ t }}</span>
        </div>
        <div class="featured-info">
          <span class="featured-year">{{ p.year }}</span>
          <span class="featured-status">{{ statusLabel[p.status] || p.status }}</span>
        </div>
      </div>
    </a>
  </div>
</section>

<!-- ═══════════ Showcase ═══════════ -->
<section class="section">
  <div class="section-header">
    <span class="section-label">真实案例</span>
    <h2 class="section-title">案例</h2>
  </div>
  <div class="showcase-grid">
    <a
      v-for="(item, i) in showcaseItems"
      :key="i"
      :href="item.link"
      class="showcase-card"
    >
      <div class="showcase-img">
        <span class="showcase-img-label">{{ item.category }}</span>
      </div>
      <div class="showcase-body">
        <span class="showcase-category">{{ item.category }}</span>
        <h3 class="showcase-title">{{ item.title }}</h3>
        <p class="showcase-text">{{ item.description }}</p>
        <div class="showcase-tags">
          <span v-for="t in item.tech" :key="t" class="showcase-tag">{{ t }}</span>
        </div>
        <span class="showcase-link">查看详情 →</span>
      </div>
    </a>
  </div>
  <div class="section-more">
    <a href="/showcase/">浏览全部案例 →</a>
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
      class="post-item"
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

<!-- ═══════════ About ═══════════ -->
<section class="section about-section">
  <div class="about-grid">
    <div class="about-avatar-wrap">
      <img src="/favicon.png" alt="Ysuhan" class="about-avatar" />
    </div>
    <div class="about-text">
      <h2 class="about-name">易水寒 <span class="about-alias">Ysuhan</span></h2>
      <div class="about-roles">
        <span>GIS Developer</span>
        <span class="about-dot">·</span>
        <span>System Builder</span>
      </div>
      <p class="about-focus">
        长期关注 GIS、Simulation、Architecture、AI。<br>
        持续记录：从想法到作品，从创意到体系。
      </p>
      <div class="about-links">
        <a href="mailto:ysuhan@yeah.net" class="about-link about-link-dim">ysuhan@yeah.net</a>
        <a href="https://github.com/ysuhan" class="about-link about-link-dim">GitHub</a>
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
  max-width: 720px;
  text-align: center;
}
.hero-name {
  font-size: 3.75rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: var(--text-primary);
  margin: 0;
  line-height: 1;
}
.hero-en {
  font-size: 0.8125rem;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
  margin: 12px 0 0;
}
.hero-slogan {
  margin: 20px 0 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.hero-slogan span {
  font-size: 1.125rem;
  color: var(--text-secondary);
  font-weight: 400;
  letter-spacing: -0.01em;
}
.hero-desc {
  font-size: 0.9375rem;
  color: var(--text-tertiary);
  margin: 20px 0 0;
  line-height: 1.9;
}
.hero-actions {
  margin-top: 40px;
  display: flex;
  gap: 12px;
  justify-content: center;
}
.hero-btn {
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 20px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
.hero-btn-primary {
  background: var(--gold);
  color: #fff;
}
.hero-btn-primary:hover { background: var(--gold-hover); color: #fff; }
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
  .hero-slogan span { font-size: 1rem; }
}

/* ── Section shared ── */
.section {
  max-width: 960px;
  margin: 0 auto;
  padding: 140px 24px 0;
}
.section-header { margin-bottom: 48px; }
.section-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--gold);
  letter-spacing: 0.04em;
}
.section-title {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin: 6px 0 0;
}
.section-more { margin-top: 40px; }
.section-more a {
  font-size: 0.875rem;
  color: var(--gold);
  text-decoration: none;
  transition: color 0.2s;
}
.section-more a:hover { color: var(--gold-hover); }

/* ── Featured Projects ── */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  border: 1px solid var(--border-subtle);
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
  transition: transform 0.2s, background 0.2s;
  min-height: 200px;
}
.featured-card:hover {
  background: var(--bg-surface);
  transform: translateY(-4px);
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
  margin: 0;
}
.featured-meta {
  margin-top: 24px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.featured-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.featured-tag {
  font-size: 0.6875rem;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
}
.featured-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}
.featured-year {
  font-size: 0.6875rem;
  color: var(--text-disabled);
  font-family: var(--font-mono);
}
.featured-status {
  font-size: 0.625rem;
  font-weight: 500;
  color: var(--gold);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 2px 8px;
  background: var(--gold-subtle);
  border-radius: 3px;
}

@media (max-width: 640px) {
  .featured-grid { grid-template-columns: 1fr; }
  .featured-card { padding: 24px; min-height: auto; }
}

/* ── Showcase ── */
.showcase-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  border: 1px solid var(--border-subtle);
  overflow: hidden;
  background: var(--border-subtle);
}
.showcase-card {
  background: var(--bg-base);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}
.showcase-card:hover { transform: translateY(-4px); }
.showcase-img {
  aspect-ratio: 16 / 9;
  background: var(--bg-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.showcase-img-label {
  font-size: 0.75rem;
  color: var(--text-disabled);
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
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
  margin: 0 0 12px;
}
.showcase-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
.showcase-tag {
  font-size: 0.6875rem;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
}
.showcase-link {
  font-size: 0.75rem;
  color: var(--gold);
  font-weight: 500;
}

@media (max-width: 640px) {
  .showcase-grid { grid-template-columns: 1fr; }
}

/* ── Posts ── */
.posts-list { display: flex; flex-direction: column; }
.post-item {
  display: flex;
  gap: 32px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border-subtle);
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
  transition: color 0.2s;
}
.post-item:hover .post-title { color: var(--gold); }
.post-excerpt {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 640px) {
  .post-item { flex-direction: column; gap: 4px; }
  .post-date { width: auto; }
}

/* ── About ── */
.about-section { padding-bottom: 100px; }
.about-grid {
  display: flex;
  align-items: center;
  gap: 48px;
}
.about-avatar-wrap { flex-shrink: 0; }
.about-avatar {
  width: 100px;
  height: 100px;
  border-radius: 16px;
  object-fit: cover;
}
.about-name {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  margin: 0 0 6px;
}
.about-alias {
  font-weight: 400;
  color: var(--text-tertiary);
  font-size: 0.9375rem;
  font-family: var(--font-mono);
}
.about-roles {
  font-size: 0.8125rem;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  margin-bottom: 12px;
}
.about-dot { margin: 0 5px; color: var(--text-disabled); }
.about-focus {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.9;
  margin: 0 0 16px;
}
.about-links { display: flex; gap: 24px; }
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
  .about-avatar { width: 80px; height: 80px; }
  .about-links { justify-content: center; flex-wrap: wrap; }
}
</style>

