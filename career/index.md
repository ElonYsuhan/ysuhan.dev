---
title: 成长
description: 从 GIS 开发者到系统构建者的成长档案
layout: page
---

<script setup>
const timeline = [
  {
    zh: '地图',
    period: '早期',
    tags: ['React', 'OpenLayers', 'GeoServer'],
    insight: '地图不是终点。它只是理解空间世界的入口。',
    narrative: '这一阶段，我开始接触 GIS 系统建设，理解空间数据、地图渲染与业务场景之间的关系。参与松阳县民情地图、云森防松材线虫病平台等项目，积累了政务 GIS 系统的实战经验。',
    closing: '那时我逐渐意识到：地图的价值不在于展示，而在于组织空间世界。',
  },
  {
    zh: '场景',
    period: '2022 - 2023',
    tags: ['Vue 3', 'Cesium', 'TypeScript'],
    insight: '地图描述位置。场景描述变化。当实体开始运动，时间开始流动，空间便拥有了生命。',
    narrative: '这一阶段，我深入 Cesium 与仿真领域，研究实体系统、动画体系、多窗口渲染以及复杂场景性能优化。解决 Cesium 多窗口渲染问题，引入 Off-Screen Rendering 方案。',
    closing: '也是在这里，我第一次真正接触：时间、空间与行为共同构成的系统。',
  },
  {
    zh: '平台',
    period: '2023 - 2024',
    tags: ['GIS Engine', 'Animation', 'Component System'],
    insight: '项目总会结束。能力不会。',
    narrative: '随着参与项目越来越多，我开始发现大量能力在重复建设。地图能力在重复，动画能力在重复，组件能力也在重复。于是开始尝试将这些经验抽象为平台能力，构建统一的 GIS 引擎封装、动画体系、组件体系与数据交换规范。',
    closing: '我开始相信：好的工程，不是不断重写，而是持续沉淀。',
  },
  {
    zh: '引擎',
    period: '现在',
    tags: ['Engine', 'Framework', 'Architecture'],
    insight: '平台解决复用。引擎解决抽象。',
    narrative: '当越来越多问题开始重复出现时，我开始追问：什么是实体？什么是行为？什么是时间？什么是系统状态？于是开始研究 Entity、Command、Timeline、Trajectory、Workflow 等核心模型。',
    closing: '我逐渐发现：引擎并不是代码的集合，而是对领域规律的表达。',
  },
  {
    zh: '体系',
    period: '未来',
    tags: ['GIS', 'Simulation', 'AI', 'System Engineering'],
    insight: '单个系统解决问题。体系创造可能性。',
    narrative: '未来关注的不再是单个产品，而是多个系统之间如何协同演化。AirGIS、Tactics Simulation、Workflow Engine——它们不是孤立产品，而是同一个空间智能世界观下的不同组成部分。',
    closing: '我希望最终构建的：不是一个系统，而是一套能够持续生长的生态。',
  },
]

const whatIBuild = [
  { title: 'AirGIS', desc: '构建面向时空数据与仿真场景的新一代 GIS 引擎。', core: ['Entity', 'Layer', 'Visualization', 'Interaction', 'Timeline'], status: '构建中' },
  { title: 'Tactics Simulation', desc: '构建面向态势推演与场景构建的仿真框架。', core: ['Scenario', 'Action', 'Track', 'Trajectory', 'Command'], status: '构建中' },
  { title: 'Workflow Engine', desc: '探索复杂业务流程的 DSL 与编排体系。', core: ['DSL', 'Orchestration', 'Node Graph'], status: '研究中' },
  { title: 'Monorepo Engineering', desc: '统一产品、项目与引擎的工程基础设施。', core: ['pnpm', 'Monorepo', 'Libs + Apps'], status: '构建中' },
]

const techLandscape = [
  { group: 'GIS', items: ['Cesium', 'OpenLayers', 'GeoServer', 'PostGIS'] },
  { group: '仿真', items: ['Entity', 'Scenario', 'Timeline', 'Trajectory'] },
  { group: '工程', items: ['Monorepo', 'pnpm', 'Node.js', 'Docker'] },
  { group: '架构', items: ['Engine Design', 'Workflow', 'DSL', 'System Design'] },
]

const coreThinking = [
  { title: '抽象优于重复', body: '每一个业务需求背后，都隐藏着一个可复用模型。' },
  { title: '作品优于概念', body: '创意只有被实现，才拥有价值。' },
  { title: '体系优于工具', body: '工具解决问题。体系解决一类问题。' },
  { title: '长期主义', body: '持续建设，比短期爆发更重要。' },
]
</script>

<div class="page">

<!-- ═══════════ Hero ═══════════ -->
<div class="hero">
  <h1 class="hero-title">成长</h1>
  <p class="hero-sub">从 GIS 开发者到系统构建者</p>
  <p class="hero-desc">持续探索 GIS、仿真、架构与智能。</p>
  <p class="hero-desc">将复杂问题沉淀为作品，将零散创意演化为体系。</p>
</div>

<!-- ═══════════ Evolution ═══════════ -->
<div class="section">
  <h2 class="section-title">演进</h2>
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
        </div>
        <div v-if="item.tags.length" class="tl-tags">
          <span v-for="t in item.tags" :key="t" class="tl-tag">{{ t }}</span>
        </div>
        <p class="tl-insight-text">{{ item.insight }}</p>
        <p class="tl-narrative">{{ item.narrative }}</p>
        <p class="tl-closing">{{ item.closing }}</p>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════ Current Organization ═══════════ -->
<div class="section">
  <h2 class="section-title">所在组织</h2>
  <div class="org-card glass-card">
    <p class="org-name">中国科学院空天信息创新研究院</p>
    <p class="org-desc">参与空天领域 GIS、仿真与时空信息系统研发。</p>
    <p class="org-fields"><span>空间智能</span><span class="org-sep"> . </span><span>仿真</span><span class="org-sep"> . </span><span>架构</span><span class="org-sep"> . </span><span>AI</span></p>
  </div>
</div>

<!-- ═══════════ What I Build ═══════════ -->
<div class="section">
  <h2 class="section-title">正在构建</h2>
  <div class="build-list">
    <div v-for="b in whatIBuild" :key="b.title" class="build-item glass-card">
      <div class="build-left">
        <h3 class="build-title">{{ b.title }}</h3>
        <p class="build-desc">{{ b.desc }}</p>
        <div class="build-core">
          <span v-for="c in b.core" :key="c" class="build-core-tag">{{ c }}</span>
        </div>
      </div>
      <div class="build-right">
        <span class="build-status" :class="b.status === '构建中' ? 'status-building' : 'status-researching'">{{ b.status }}</span>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════ Current Focus ═══════════ -->
<div class="section">
  <h2 class="section-title">当前聚焦</h2>
  <div class="focus-list">
    <div class="focus-row"><span class="focus-name">AirGIS</span><span class="focus-tag status-building">构建中</span></div>
    <div class="focus-row"><span class="focus-name">Tactics Simulation</span><span class="focus-tag status-building">构建中</span></div>
    <div class="focus-row"><span class="focus-name">Workflow Engine</span><span class="focus-tag status-researching">研究中</span></div>
    <div class="focus-row"><span class="focus-name">空间智能</span><span class="focus-tag status-exploring">探索中</span></div>
  </div>
</div>

<!-- ═══════════ Core Thinking ═══════════ -->
<div class="section">
  <h2 class="section-title">核心信条</h2>
  <div class="thinking-list">
    <div v-for="c in coreThinking" :key="c.title" class="thinking-item glass-card">
      <h3 class="thinking-title">{{ c.title }}</h3>
      <p class="thinking-body">{{ c.body }}</p>
    </div>
  </div>
</div>

<!-- ═══════════ Technology Landscape ═══════════ -->
<div class="section">
  <h2 class="section-title">技术版图</h2>
  <div class="landscape">
    <div v-for="g in techLandscape" :key="g.group" class="landscape-group">
      <h3 class="landscape-group-title">{{ g.group }}</h3>
      <div class="landscape-tags">
        <span v-for="t in g.items" :key="t" class="landscape-tag">{{ t }}</span>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════ Vision ═══════════ -->
<div class="section">
  <h2 class="section-title">愿景</h2>

  <div class="eco-map">
    <div class="eco-top">
      <span class="eco-node eco-ai">AI</span>
    </div>
    <div class="eco-lines">
      <span class="eco-line-v"></span>
    </div>
    <div class="eco-middle">
      <span class="eco-node eco-wf">工作流</span>
      <span class="eco-node eco-core">空间<br>智能</span>
      <span class="eco-node eco-ag">AirGIS</span>
    </div>
    <div class="eco-lines">
      <span class="eco-line-v"></span>
    </div>
    <div class="eco-bottom">
      <span class="eco-node eco-sim">仿真</span>
    </div>
  </div>

  <p class="eco-label">空间智能生态</p>

  <p class="vision-statement">构建面向空间智能的系统生态。</p>
</div>

<!-- ═══════════ Builder Manifesto ═══════════ -->
<div class="section manifesto-section">
  <h2 class="section-title">构建者宣言</h2>
  <div class="manifesto-text">
    <p>我不擅长追逐热点。</p>
    <p>我更喜欢长期构建。</p>
    <p>从地图到场景，</p>
    <p>从平台到引擎，</p>
    <p>从项目到体系。</p>
    <p class="manifesto-slogan">
      <span>将复杂问题沉淀为作品，</span>
      <span>将零散创意演化为体系。</span>
    </p>
  </div>
</div>

</div>

<style scoped>
.page { max-width: 720px; margin: 0 auto; padding: 0 24px 120px; position: relative; z-index: 1; }

/* Hero */
.hero { padding: 120px 0 60px; }
.hero-title { font-size: 3rem; font-weight: 700; letter-spacing: -0.04em; color: var(--text-primary); margin: 0; }
.hero-sub { font-size: 1.125rem; color: var(--text-secondary); margin: 12px 0 0; }
.hero-desc { font-size: 0.9375rem; color: var(--text-tertiary); margin: 8px 0 0; line-height: 1.9; }

/* Section */
.section { padding-top: 120px; }
.section-title { font-size: 1.5rem; font-weight: 700; letter-spacing: -0.03em; color: var(--text-primary); margin: 0 0 56px; }

/* Evolution Timeline */
.timeline { display: flex; flex-direction: column; }
.tl-item { display: flex; gap: 28px; }
.tl-marker { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; width: 10px; padding-top: 8px; }
.tl-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }
.tl-line { width: 1px; flex: 1; background: var(--border-default); margin-top: 8px; }
.tl-content { flex: 1; padding-bottom: 64px; min-width: 0; }
.tl-head { margin-bottom: 14px; }
.tl-period { font-size: 0.6875rem; color: var(--accent); font-family: var(--font-mono); font-weight: 500; text-transform: uppercase; letter-spacing: 0.06em; }
.tl-zh { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 6px 0 2px; letter-spacing: -0.02em; }
.tl-en { font-size: 0.8125rem; color: var(--text-tertiary); font-family: var(--font-mono); margin: 0; }
.tl-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; }
.tl-tag { font-size: 0.6875rem; color: var(--text-tertiary); font-family: var(--font-mono); padding: 2px 10px; background: var(--bg-elevated); border-radius: 999px; }
.tl-insight-text { font-size: 0.9375rem; color: var(--text-primary); line-height: 1.75; margin: 16px 0 0; font-weight: 500; letter-spacing: -0.01em; }
.tl-narrative { font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.85; margin: 12px 0 0; }
.tl-closing { font-size: 0.875rem; color: var(--text-primary); line-height: 1.8; margin: 14px 0 0; font-weight: 500; }

/* Organization */
.org-card { padding: 32px; }
.org-name { font-size: 1rem; font-weight: 600; color: var(--text-primary); margin: 0 0 8px; }
.org-desc { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin: 0 0 12px; }
.org-fields { font-size: 0.75rem; color: var(--text-tertiary); font-family: var(--font-mono); }
.org-sep { margin: 0 8px; color: var(--text-disabled); }

/* What I Build */
.build-list { display: flex; flex-direction: column; gap: 16px; }
.build-item { display: flex; align-items: flex-start; justify-content: space-between; padding: 32px; gap: 24px; }
.build-left { flex: 1; min-width: 0; }
.build-right { flex-shrink: 0; padding-top: 2px; }
.build-title { font-size: 1.0625rem; font-weight: 600; color: var(--text-primary); margin: 0 0 6px; letter-spacing: -0.01em; }
.build-desc { font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.6; margin: 0 0 14px; }
.build-core { display: flex; gap: 6px; flex-wrap: wrap; }
.build-core-tag { font-size: 0.6875rem; color: var(--text-tertiary); font-family: var(--font-mono); }
.build-status { font-size: 0.625rem; font-weight: 500; padding: 3px 10px; border-radius: 999px; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.04em; white-space: nowrap; }
.status-building { background: var(--accent-subtle); color: var(--accent); }
.status-researching { background: rgba(212,165,116,0.04); color: var(--text-tertiary); }

/* Current Focus */
.focus-list { display: flex; flex-direction: column; }
.focus-row { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid var(--border-subtle); }
.focus-row:first-child { padding-top: 0; }
.focus-name { font-size: 0.9375rem; color: var(--text-primary); font-weight: 500; }
.focus-tag { font-size: 0.625rem; font-weight: 500; padding: 3px 10px; border-radius: 999px; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.04em; }
.status-exploring { background: rgba(212,165,116,0.03); color: var(--text-disabled); }

/* Core Thinking */
.thinking-list { display: flex; flex-direction: column; gap: 16px; }
.thinking-item { padding: 32px; }
.thinking-title { font-size: 0.9375rem; font-weight: 600; color: var(--text-primary); margin: 0 0 6px; }
.thinking-body { font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.6; margin: 0; }

/* Technology Landscape */
.landscape { display: flex; flex-direction: column; gap: 36px; }
.landscape-group-title { font-size: 0.75rem; font-weight: 600; color: var(--accent); margin: 0 0 14px; text-transform: uppercase; letter-spacing: 0.06em; font-family: var(--font-mono); }
.landscape-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.landscape-tag { font-size: 0.8125rem; color: var(--text-secondary); font-family: var(--font-mono); padding: 4px 14px; background: var(--bg-elevated); border-radius: 999px; border: 1px solid var(--border-subtle); }

/* Vision — Ecosystem Map */
.eco-map { display: flex; flex-direction: column; align-items: center; gap: 8px; margin-bottom: 32px; }
.eco-top, .eco-middle, .eco-bottom { display: flex; align-items: center; gap: 24px; }
.eco-lines { display: flex; justify-content: center; }
.eco-line-v { width: 1px; height: 24px; background: var(--border-default); }
.eco-node { font-size: 0.75rem; font-weight: 500; padding: 8px 16px; border-radius: 999px; font-family: var(--font-mono); text-align: center; line-height: 1.4; }
.eco-ai { border: 1px solid var(--border-default); color: var(--text-tertiary); }
.eco-wf { border: 1px solid var(--accent-border); color: var(--text-secondary); }
.eco-core { border: 1px solid var(--accent); color: var(--accent); font-weight: 600; }
.eco-ag { border: 1px solid var(--accent-border); color: var(--text-secondary); }
.eco-sim { border: 1px solid var(--border-default); color: var(--text-tertiary); }
.eco-label { text-align: center; font-size: 0.75rem; color: var(--text-tertiary); font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 12px; }
.vision-statement { text-align: center; font-size: 1rem; color: var(--text-primary); font-weight: 500; letter-spacing: -0.01em; }

/* Builder Manifesto */
.manifesto-section { padding-bottom: 0; }
.manifesto-text p { font-size: 0.9375rem; color: var(--text-secondary); line-height: 2.1; margin: 0; }
.manifesto-slogan { margin-top: 28px; display: flex; flex-direction: column; gap: 2px; }
.manifesto-slogan span { font-size: 1.0625rem; color: var(--accent); font-weight: 500; }

@media (max-width: 640px) {
  .tl-item { gap: 18px; }
  .tl-content { padding-bottom: 48px; }
  .tl-zh { font-size: 1.125rem; }
  .build-item { flex-direction: column; padding: 24px; gap: 16px; }
  .thinking-item { padding: 24px; }
  .eco-middle { gap: 12px; }
  .eco-node { font-size: 0.6875rem; padding: 6px 12px; }
}
</style>
