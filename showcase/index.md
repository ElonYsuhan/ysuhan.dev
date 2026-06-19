---
title: 案例
description: 真实案例与系统展示
layout: page
---

<script setup>
const showcaseItems = [
  {
    title: '卫星星座可视化',
    description: '大规模卫星星座轨道计算与三维可视化平台。支持 TLE 解析、轨道预报与实时星下点追踪。',
    category: 'Satellite',
    link: '#',
  },
  {
    title: '空中对抗态势',
    description: '实时空中作战态势感知与交战推演系统。支持多批次目标跟踪、武器包线计算与战果评估。',
    category: 'Air Combat',
    link: '#',
  },
  {
    title: '数字孪生城市',
    description: '城市级数字孪生平台。融合 BIM、IoT 与实时数据流，支持全要素可视化与智能分析。',
    category: 'Digital Twin',
    link: '#',
  },
  {
    title: 'GIS 基础平台',
    description: '二三维一体化 GIS 平台。支持多源数据接入、空间查询、时空分析与服务发布。',
    category: 'GIS Platform',
    link: '#',
  },
  {
    title: '态势标绘系统',
    description: 'Web 端军标标绘与态势管理系统。支持 MIL-STD-2525 符号体系与协同标绘。',
    category: 'C2 System',
    link: '#',
  },
  {
    title: '时空数据引擎',
    description: '面向海量时空数据的存储、索引与查询引擎。支持轨迹回放、热力分析与时空聚合。',
    category: 'Data Engine',
    link: '#',
  },
]
</script>

<div class="page-container">

# 案例

<p class="page-subtitle">真实案例与系统展示</p>

<ShowcaseCard :items="showcaseItems" />

</div>

<style scoped>
.page-container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}
.page-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 4px 0 40px;
  line-height: 1.6;
}
</style>

