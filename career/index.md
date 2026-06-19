---
title: Career
description: 从 GIS 开发者到系统构建者的成长档案
layout: page
---

<script setup>
const timeline = [
  { en: 'Seeing Maps', zh: '看见地图', period: 'Early', tags: ['React', 'OpenLayers', 'GeoServer'], saw: '理解 GIS 不是画图，是对空间数据的建模与表达。', learned: '空间数据模型、地图可视化、政务 GIS 系统设计。', thinking: '地图只是载体。真正的价值在于数据如何组织、如何关联、如何被理解。' },
  { en: 'Seeing Scenes', zh: '看见场景', period: '2022 - 2023', tags: ['Vue 3', 'Cesium', 'TypeScript'], saw: '场景不是地图的放大版。场景有自己的节奏。', learned: 'Cesium 渲染管线、实体系统架构、Off-Screen Rendering。', thinking: '地图是静态的载体，场景是动态的系统。' },
  { en: 'Seeing Platforms', zh: '看见平台', period: '2023 - 2024', tags: ['GIS Engine', 'Animation', 'Component'], saw: '单项目开发的天花板。可复用的能力需要抽象为平台层。', learned: 'GIS 引擎封装、动画控制体系、通用组件体系。', thinking: '平台不是产品。平台是让产品能以更低成本被构建的基础设施。' },
  { en: 'Seeing Engines', zh: '看见引擎', period: 'Now', tags: ['Engine', 'Framework', 'Architecture'], saw: '平台解决复用，引擎解决抽象。Entity、Command、Timeline 这些才是本质。', learned: '引擎设计范式、DSL 设计、工作流编排、Monorepo 工程体系。', thinking: '引擎不是代码库。引擎是可执行的领域模型。' },
  { en: 'Seeing Systems', zh: '看见体系', period: 'Future', tags: ['GIS', 'Simulation', 'AI', 'System'], saw: '引擎之上是体系。AirGIS + Tactics + Workflow 是同一个世界观。', learned: '', thinking: '体系不是产品组合。体系是让每一块拼图独立存在又能无缝协作。' },
]

const whatIBuild = [
  { title: 'AirGIS', goal: '构建自己的 GIS 引擎体系', core: ['Entity', 'Layer', 'Visualization', 'Interaction', 'Timeline'], status: 'Building' },
  { title: 'Tactics Simulation', goal: '构建仿真推演平台', core: ['Scenario', 'Action', 'Track', 'Trajectory', 'Command'], status: 'Building' },
  { title: 'Workflow Engine', goal: '构建工作流引擎', core: ['DSL', 'Orchestration', 'Node Graph'], status: 'Researching' },
  { title: 'Monorepo Engineering', goal: '统一工程体系', core: ['pnpm', 'Monorepo', 'Libs + Apps'], status: 'Building' },
]

const techLandscape = [
  { group: 'GIS', items: ['Cesium', 'OpenLayers', 'GeoServer', 'PostGIS'] },
  { group: 'Simulation', items: ['Entity', 'Scenario', 'Timeline', 'Trajectory'] },
  { group: 'Engineering', items: ['Monorepo', 'pnpm', 'Node.js', 'Docker'] },
  { group: 'Architecture', items: ['Engine Design', 'Workflow', 'DSL', 'System Design'] },
]

const coreThinking = [
  { title: '抽象优于重复', body: '每一个业务需求背后，都隐藏着可复用模型。' },
  { title: '作品优于概念', body: '不能运行的创意毫无价值。' },
  { title: '体系优于工具', body: '工具解决问题。体系解决一类问题。' },
  { title: '长期主义', body: '持续建设比短期爆发更重要。' },
]
</script>

<div class="page">

<div class="hero">
  <h1 class="hero-title">Career</h1>
  <p class="hero-sub">从 GIS 开发者到系统构建者</p>
  <p class="hero-desc">持续探索 GIS, Simulation, Architecture 与 AI.</p>
  <p class="hero-desc">将复杂问题沉淀为作品, 将零散创意演化为体系.</p>
</div>

<div class="section">
  <h2 class="section-title">Evolution</h2>
  <div class="timeline">
    <div v-for="(item, i) in timeline" :key="i" class="tl-item">
      <div class="tl-marker">
        <span class="tl-dot"></span>
        <span v-if="i < timeline.length - 1" class="tl-line"></span>
      </div>
      <div class="tl-content">
        <div class="tl-head">
          <span class="tl-period">{{ item.period }}</span>
          <h3 class="tl-zh">{{ item.zh }}</h3>
          <p class="tl-en">{{ item.en }}</p>
        </div>
        <div v-if="item.tags.length" class="tl-tags">
          <span v-for="t in item.tags" :key="t" class="tl-tag">{{ t }}</span>
        </div>
        <div class="tl-insight">
          <p class="tl-insight-label">看见了什么</p>
          <p class="tl-insight-text">{{ item.saw }}</p>
        </div>
        <div v-if="item.learned" class="tl-insight">
          <p class="tl-insight-label">学会了什么</p>
          <p class="tl-insight-text">{{ item.learned }}</p>
        </div>
        <div class="tl-insight">
          <p class="tl-insight-label">开始思考</p>
          <p class="tl-insight-text tl-thinking">{{ item.thinking }}</p>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="section">
  <h2 class="section-title">What I Build</h2>
  <div class="build-grid">
    <div v-for="b in whatIBuild" :key="b.title" class="build-card">
      <div class="build-head">
        <h3 class="build-title">{{ b.title }}</h3>
        <span class="build-status" :class="b.status === 'Building' ? 'status-building' : 'status-researching'">{{ b.status }}</span>
      </div>
      <p class="build-goal">{{ b.goal }}</p>
      <div class="build-core">
        <span v-for="c in b.core" :key="c" class="build-core-tag">{{ c }}</span>
      </div>
    </div>
  </div>
</div>

<div class="section">
  <h2 class="section-title">Current Focus</h2>
  <div class="focus-list">
    <div class="focus-row"><span class="focus-name">AirGIS</span><span class="focus-tag status-building">Building</span></div>
    <div class="focus-row"><span class="focus-name">Tactics Simulation</span><span class="focus-tag status-building">Building</span></div>
    <div class="focus-row"><span class="focus-name">Workflow Engine</span><span class="focus-tag status-researching">Researching</span></div>
    <div class="focus-row"><span class="focus-name">Spatial Intelligence</span><span class="focus-tag status-exploring">Exploring</span></div>
  </div>
</div>

<div class="section">
  <h2 class="section-title">Technology Landscape</h2>
  <div class="landscape">
    <div v-for="g in techLandscape" :key="g.group" class="landscape-group">
      <h3 class="landscape-group-title">{{ g.group }}</h3>
      <div class="landscape-tags">
        <span v-for="t in g.items" :key="t" class="landscape-tag">{{ t }}</span>
      </div>
    </div>
  </div>
</div>

<div class="section">
  <h2 class="section-title">Core Thinking</h2>
  <div class="thinking-grid">
    <div v-for="c in coreThinking" :key="c.title" class="thinking-item">
      <h3 class="thinking-title">{{ c.title }}</h3>
      <p class="thinking-body">{{ c.body }}</p>
    </div>
  </div>
</div>

<div class="section">
  <h2 class="section-title">Current Organization</h2>
  <div class="org-card">
    <p class="org-name">中国科学院空天信息创新研究院</p>
    <p class="org-desc">参与空天领域 GIS、仿真与时空信息系统研发。</p>
    <p class="org-fields"><span>Spatial Intelligence</span><span class="org-sep"> . </span><span>Simulation</span><span class="org-sep"> . </span><span>Architecture</span></p>
  </div>
</div>

<div class="section vision-section">
  <h2 class="section-title">Vision</h2>
  <div class="vision-text">
    <p>我相信：</p>
    <p>软件开发不仅是完成需求。</p>
    <p>真正有价值的工程，</p>
    <p>是将经验沉淀为作品，</p>
    <p>将创意演化为体系。</p>
    <p class="vision-slogan"><span>从想法到作品，</span><span>从创意到体系。</span></p>
  </div>
</div>

</div>

<style scoped>
.page { max-width: 720px; margin: 0 auto; padding: 0 24px 120px; }

.hero { padding: 120px 0 60px; }
.hero-title { font-size: 3rem; font-weight: 700; letter-spacing: -0.04em; color: var(--text-primary); margin: 0; }
.hero-sub { font-size: 1.125rem; color: var(--text-secondary); margin: 12px 0 0; }
.hero-desc { font-size: 0.9375rem; color: var(--text-tertiary); margin: 8px 0 0; line-height: 1.9; }

.section { padding-top: 120px; }
.section-title { font-size: 1.5rem; font-weight: 700; letter-spacing: -0.03em; color: var(--text-primary); margin: 0 0 56px; }

.timeline { display: flex; flex-direction: column; }
.tl-item { display: flex; gap: 28px; }
.tl-marker { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; width: 10px; padding-top: 8px; }
.tl-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
.tl-line { width: 1px; flex: 1; background: var(--border-default); margin-top: 8px; }
.tl-content { flex: 1; padding-bottom: 64px; min-width: 0; }
.tl-head { margin-bottom: 14px; }
.tl-period { font-size: 0.6875rem; color: var(--gold); font-family: var(--font-mono); font-weight: 500; text-transform: uppercase; letter-spacing: 0.06em; }
.tl-zh { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 6px 0 2px; letter-spacing: -0.02em; }
.tl-en { font-size: 0.8125rem; color: var(--text-tertiary); font-family: var(--font-mono); margin: 0; }
.tl-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; }
.tl-tag { font-size: 0.6875rem; color: var(--text-tertiary); font-family: var(--font-mono); padding: 2px 8px; background: var(--bg-elevated); border-radius: 3px; }
.tl-insight { margin-bottom: 14px; }
.tl-insight-label { font-size: 0.625rem; color: var(--text-disabled); text-transform: uppercase; letter-spacing: 0.08em; font-family: var(--font-mono); margin: 0 0 4px; }
.tl-insight-text { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.8; margin: 0; }
.tl-thinking { color: var(--gold); font-style: italic; }

.build-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; border: 1px solid var(--border-subtle); overflow: hidden; background: var(--border-subtle); }
.build-card { padding: 28px; background: var(--bg-base); }
.build-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.build-title { font-size: 1rem; font-weight: 600; color: var(--text-primary); margin: 0; letter-spacing: -0.01em; }
.build-status { font-size: 0.625rem; font-weight: 500; padding: 2px 8px; border-radius: 3px; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.04em; }
.status-building { background: rgba(212,165,116,0.12); color: var(--gold); }
.status-researching { background: rgba(212,165,116,0.06); color: var(--text-tertiary); }
.build-goal { font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.6; margin: 0 0 14px; }
.build-core { display: flex; gap: 6px; flex-wrap: wrap; }
.build-core-tag { font-size: 0.6875rem; color: var(--text-tertiary); font-family: var(--font-mono); }

.focus-list { display: flex; flex-direction: column; }
.focus-row { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid var(--border-subtle); }
.focus-row:first-child { padding-top: 0; }
.focus-name { font-size: 0.9375rem; color: var(--text-primary); font-weight: 500; }
.focus-tag { font-size: 0.625rem; font-weight: 500; padding: 3px 10px; border-radius: 3px; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.04em; }
.status-exploring { background: rgba(212,165,116,0.04); color: var(--text-disabled); }

.landscape { display: flex; flex-direction: column; gap: 32px; }
.landscape-group-title { font-size: 0.75rem; font-weight: 600; color: var(--text-tertiary); margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.06em; font-family: var(--font-mono); }
.landscape-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.landscape-tag { font-size: 0.8125rem; color: var(--text-secondary); font-family: var(--font-mono); padding: 4px 12px; background: var(--bg-surface); border-radius: 4px; }

.thinking-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; border: 1px solid var(--border-subtle); overflow: hidden; background: var(--border-subtle); }
.thinking-item { padding: 28px; background: var(--bg-base); }
.thinking-title { font-size: 0.9375rem; font-weight: 600; color: var(--text-primary); margin: 0 0 6px; }
.thinking-body { font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.6; margin: 0; }

.org-card { padding: 28px; background: var(--bg-surface); border-radius: 8px; }
.org-name { font-size: 0.9375rem; font-weight: 600; color: var(--text-primary); margin: 0 0 6px; }
.org-desc { font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.6; margin: 0 0 10px; }
.org-fields { font-size: 0.75rem; color: var(--text-tertiary); font-family: var(--font-mono); }
.org-sep { margin: 0 6px; color: var(--text-disabled); }

.vision-section { padding-bottom: 0; }
.vision-text p { font-size: 0.9375rem; color: var(--text-secondary); line-height: 2.1; margin: 0; }
.vision-slogan { margin-top: 28px; display: flex; flex-direction: column; gap: 2px; }
.vision-slogan span { font-size: 1.0625rem; color: var(--gold); font-weight: 500; }

@media (max-width: 640px) {
  .tl-item { gap: 18px; }
  .tl-content { padding-bottom: 48px; }
  .tl-zh { font-size: 1.125rem; }
  .build-grid { grid-template-columns: 1fr; }
  .build-card { padding: 22px; }
  .thinking-grid { grid-template-columns: 1fr; }
  .thinking-item { padding: 22px; }
}
</style>

