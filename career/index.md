---
title: Career
description: 从 GIS 开发者到系统构建者的成长轨迹
layout: page
---

<script setup>
const timeline = [
  {
    year: '2021',
    role: 'GIS Developer',
    tags: ['React', 'OpenLayers', 'GeoServer'],
    projects: ['松阳县民情地图', '云森防松材线虫病平台'],
    insight: '理解 GIS 数据，掌握地图可视化，参与政务 GIS 项目。',
  },
  {
    year: '2022 - 2023',
    role: 'Simulation Developer',
    tags: ['Vue 3', 'Cesium', 'TypeScript'],
    projects: ['体系概念场景构建平台'],
    highlights: [
      '负责实体系统、场景系统、动画系统、数据交换体系',
      '解决 Cesium 多窗口渲染性能问题',
      '引入 Off-Screen Rendering',
    ],
    insight: '开始进入仿真领域，从功能开发走向系统设计。',
  },
  {
    year: '2023 - 2024',
    role: 'Platform Builder',
    tags: [],
    projects: ['需求分析与场景推演平台'],
    highlights: [
      '负责 GIS 引擎封装',
      '负责动画控制体系',
      '负责通用组件体系',
    ],
    insight: '从项目开发转向平台建设，构建统一 GIS 能力层。',
  },
  {
    year: '2024 - Now',
    role: 'Engine Builder',
    tags: ['Engine', 'Framework', 'Architecture'],
    projects: [],
    highlights: [
      '从平台走向引擎',
      '思考 Entity、Command、Timeline、Trajectory、Workflow 等核心抽象',
    ],
    insight: '不再只做功能，开始设计可复用的引擎与框架。',
  },
  {
    year: 'Future',
    role: 'Spatial Intelligence Explorer',
    tags: ['GIS', 'Simulation', 'AI', 'System Engineering'],
    projects: ['AirGIS', 'Tactics Simulation', 'Workflow Engine'],
    insight: '构建属于自己的引擎体系生态。',
  },
]

const currentFocus = [
  { title: 'AirGIS', desc: '面向时空数据与仿真场景的 GIS 引擎体系。' },
  { title: 'Tactics Simulation', desc: '面向战术推演与态势分析的场景构建平台。' },
  { title: 'Workflow Engine', desc: '面向复杂业务流程编排的工作流体系。' },
  { title: 'Monorepo Architecture', desc: '统一产品、引擎与项目的工程体系。' },
]

const techLandscape = [
  { group: 'Frontend', items: ['Vue', 'React', 'TypeScript', 'Vite'] },
  { group: 'GIS', items: ['Cesium', 'OpenLayers', 'GeoServer', 'Turf'] },
  { group: 'Simulation', items: ['Entity', 'Timeline', 'Trajectory', 'Scenario'] },
  { group: 'Engineering', items: ['Monorepo', 'pnpm', 'Node.js', 'CI/CD'] },
  { group: 'Architecture', items: ['Engine Design', 'Workflow', 'DSL', 'System Design'] },
]
</script>

<div class="page">

<section class="hero">
  <h1 class="hero-title">Career</h1>
  <p class="hero-sub">从 GIS 开发者到系统构建者</p>
  <p class="hero-desc">持续探索 GIS、Simulation、Architecture、AI。</p>
  <p class="hero-desc">将复杂问题沉淀为作品，将零散创意演化为体系。</p>
</section>

<section class="section">
  <h2 class="section-title">Evolution</h2>
  <div class="timeline">
    <div v-for="(item, i) in timeline" :key="i" class="tl-item">
      <div class="tl-marker">
        <span class="tl-dot"></span>
        <span v-if="i < timeline.length - 1" class="tl-line"></span>
      </div>
      <div class="tl-content">
        <div class="tl-head">
          <span class="tl-year">{{ item.year }}</span>
          <h3 class="tl-role">{{ item.role }}</h3>
        </div>
        <div v-if="item.tags.length" class="tl-tags">
          <span v-for="t in item.tags" :key="t" class="tl-tag">{{ t }}</span>
        </div>
        <div v-if="item.projects.length" class="tl-projects">
          <span class="tl-label">代表项目</span>
          <ul class="tl-list">
            <li v-for="p in item.projects" :key="p">{{ p }}</li>
          </ul>
        </div>
        <div v-if="item.highlights" class="tl-highlights">
          <span class="tl-label">关键成果</span>
          <ul class="tl-list">
            <li v-for="h in item.highlights" :key="h">{{ h }}</li>
          </ul>
        </div>
        <p class="tl-insight">{{ item.insight }}</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <h2 class="section-title">Current Focus</h2>
  <div class="focus-grid">
    <div v-for="f in currentFocus" :key="f.title" class="focus-item">
      <h3 class="focus-title">{{ f.title }}</h3>
      <p class="focus-desc">{{ f.desc }}</p>
    </div>
  </div>
</section>

<section class="section">
  <h2 class="section-title">Tech Landscape</h2>
  <div class="landscape">
    <div v-for="g in techLandscape" :key="g.group" class="landscape-group">
      <h3 class="landscape-group-title">{{ g.group }}</h3>
      <div class="landscape-tags">
        <span v-for="t in g.items" :key="t" class="landscape-tag">{{ t }}</span>
      </div>
    </div>
  </div>
</section>

<section class="section philosophy-section">
  <h2 class="section-title">Why I Build</h2>
  <div class="philosophy-text">
    <p>我相信：</p>
    <p>软件开发不仅是完成需求。</p>
    <p>真正有价值的工程，</p>
    <p>是将经验沉淀为作品，</p>
    <p>将创意演化为体系。</p>
    <p class="philosophy-slogan">
      <span>从想法到作品，</span>
      <span>从创意到体系。</span>
    </p>
  </div>
</section>

</div>

<style scoped>
.page {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 24px 120px;
}

.hero {
  padding: 120px 0 40px;
}
.hero-title {
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: var(--text-primary);
  margin: 0;
}
.hero-sub {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin: 12px 0 0;
}
.hero-desc {
  font-size: 0.9375rem;
  color: var(--text-tertiary);
  margin: 8px 0 0;
  line-height: 1.8;
}

.section {
  padding-top: 100px;
}
.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin: 0 0 48px;
}

/* Timeline */
.timeline {
  display: flex;
  flex-direction: column;
}
.tl-item {
  display: flex;
  gap: 24px;
}
.tl-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 12px;
  padding-top: 6px;
}
.tl-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--gold);
  flex-shrink: 0;
}
.tl-line {
  width: 1px;
  flex: 1;
  background: var(--border-default);
  margin-top: 8px;
  min-height: 24px;
}
.tl-content {
  flex: 1;
  padding-bottom: 56px;
  min-width: 0;
}
.tl-head {
  margin-bottom: 12px;
}
.tl-year {
  font-size: 0.75rem;
  color: var(--gold);
  font-family: var(--font-mono);
  font-weight: 500;
}
.tl-role {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 4px 0 0;
  letter-spacing: -0.02em;
}
.tl-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}
.tl-tag {
  font-size: 0.6875rem;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  padding: 2px 8px;
  background: var(--bg-elevated);
  border-radius: 3px;
}
.tl-projects,
.tl-highlights {
  margin-bottom: 12px;
}
.tl-label {
  font-size: 0.6875rem;
  color: var(--text-disabled);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-family: var(--font-mono);
}
.tl-list {
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
}
.tl-list li {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.7;
  padding-left: 14px;
  position: relative;
}
.tl-list li::before {
  content: '-';
  position: absolute;
  left: 0;
  color: var(--text-disabled);
}
.tl-insight {
  font-size: 0.8125rem;
  color: var(--text-tertiary);
  line-height: 1.7;
  margin: 12px 0 0;
  font-style: italic;
}

/* Focus */
.focus-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  border: 1px solid var(--border-subtle);
  overflow: hidden;
  background: var(--border-subtle);
}
.focus-item {
  padding: 28px;
  background: var(--bg-base);
}
.focus-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 6px;
  letter-spacing: -0.01em;
}
.focus-desc {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* Landscape */
.landscape {
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.landscape-group-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-tertiary);
  margin: 0 0 10px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-family: var(--font-mono);
}
.landscape-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.landscape-tag {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  padding: 4px 12px;
  background: var(--bg-surface);
  border-radius: 4px;
}

/* Philosophy */
.philosophy-section {
  padding-bottom: 0;
}
.philosophy-text p {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 2;
  margin: 0;
}
.philosophy-slogan {
  margin-top: 24px !important;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.philosophy-slogan span {
  font-size: 1.0625rem !important;
  color: var(--gold) !important;
  font-weight: 500 !important;
}

@media (max-width: 640px) {
  .tl-item { gap: 16px; }
  .tl-content { padding-bottom: 40px; }
  .focus-grid { grid-template-columns: 1fr; }
  .focus-item { padding: 22px; }
}
</style>

