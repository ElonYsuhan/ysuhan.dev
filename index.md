---
layout: home

hero:
  name: Ysuhan
  text: 从想法到作品，从创意到体系
  tagline: Build Ideas Into Reality.
  image:
    src: /logo.png
    alt: Ysuhan
  actions:
    - theme: brand
      text: 查看产品
      link: /projects/
    - theme: alt
      text: 了解更多
      link: /about/
---

<script setup>
import CesiumGlobe from './.vitepress/theme/components/CesiumGlobe.vue'

const highlights = [
  {
    icon: '🚀',
    title: '项目展示',
    description: '精心打磨的每一个项目，从构思到落地的完整记录，涵盖工具、框架与应用的工程实践。',
  },
  {
    icon: '✨',
    title: '作品集',
    description: '交互设计、视觉实验与创意工程的精选合集，每一次尝试都是对边界的探索。',
  },
  {
    icon: '📝',
    title: '技术博客',
    description: '深度技术文章，从底层原理到上层架构，分享开发过程中的思考与沉淀。',
  },
  {
    icon: '🌱',
    title: '数字花园',
    description: '持续生长的知识笔记，半成型的想法、阅读摘要和即兴洞见在此自由生长。',
  },
  {
    icon: '🎯',
    title: '开源精神',
    description: '相信开放协作的力量，所有项目代码公开可查，欢迎交流与共建。',
  },
  {
    icon: '⚡',
    title: '极致性能',
    description: '关注 Web 性能与用户体验，追求毫秒级加载、零感知延迟的极致体验。',
  },
]
</script>

<CesiumGlobe />

<div class="home-section">
  <h2 class="section-heading">能力领域</h2>
  <FeatureGrid :features="highlights" />
</div>

<div class="home-section home-cta">
  <div class="cta-card">
    <h2 class="cta-title">一起创造有趣的东西。</h2>
    <p class="cta-desc">
      对技术保持好奇，对产品保持热情。如果你有有趣的想法或项目，欢迎交流。
    </p>
  </div>
</div>

<style scoped>
.home-section {
  max-width: 1152px;
  margin: 0 auto;
  padding: 80px 24px 0;
  position: relative;
  z-index: 1;
}

.section-heading {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #e0e8f0;
  margin-bottom: 32px;
  text-align: center;
  text-shadow: 0 0 30px rgba(0, 229, 255, 0.2);
}

@media (min-width: 640px) {
  .section-heading { font-size: 2.25rem; }
}

.home-cta { padding-bottom: 60px; }

.cta-card {
  text-align: center;
  padding: 48px 32px;
  border-radius: 16px;
  background: rgba(10, 14, 23, 0.5);
  backdrop-filter: blur(16px) saturate(150%);
  -webkit-backdrop-filter: blur(16px) saturate(150%);
  border: 1px solid rgba(0, 229, 255, 0.1);
}

.cta-title {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #e0e8f0;
  margin: 0 0 12px;
}

.cta-desc {
  font-size: 1rem;
  color: #60758a;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
}
</style>

