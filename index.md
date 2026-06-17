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
const highlights = [
  {
    icon: '',
    title: '产品构建',
    description: '从零到一打造面向真实用户的产品，关注架构、性能与用户体验的每一个细节。',
  },
  {
    icon: '',
    title: '框架与引擎',
    description: '设计并实现可复用的技术框架与引擎，追求抽象的表达力与工程的可维护性。',
  },
  {
    icon: '',
    title: '体系化思考',
    description: '从单点问题提炼系统方案，建立可持续迭代的知识体系与工作方法。',
  },
]
</script>

<div class="home-section">
  <h2 class="section-heading">能力领域</h2>
  <FeatureGrid :features="highlights" />
</div>

<div class="home-section home-cta">
  <p class="cta-text">
    对技术保持好奇，对产品保持热情。<br>
    欢迎交流与合作。
  </p>
  <a href="mailto:ysuhan@yeah.net" class="cta-link">ysuhan@yeah.net</a>
</div>

<style scoped>
.home-section {
  max-width: 960px;
  margin: 0 auto;
  padding: 100px 24px 0;
}

.section-heading {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-tertiary);
  margin-bottom: 24px;
  text-align: left;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.home-cta {
  padding-bottom: 80px;
  text-align: center;
}

.cta-text {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0 0 16px;
}

.cta-link {
  font-size: 0.875rem;
  color: var(--gold);
  text-decoration: none;
  font-family: var(--font-mono);
  transition: color 0.2s;
}

.cta-link:hover {
  color: var(--gold-hover);
}
</style>

