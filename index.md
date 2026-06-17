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

<div class="home-section home-cta">
  <div class="cta-card">
    <h2 class="cta-title">一起创造有趣的东西。</h2>
    <p class="cta-desc">
      对技术保持好奇，对产品保持热情。如果你有有趣的想法或项目，欢迎交流。
    </p>
    <div class="cta-actions">
      <a href="/projects/" class="cta-btn cta-btn-primary">探索项目 →</a>
      <a href="/about/" class="cta-btn cta-btn-secondary">关于我 →</a>
    </div>
  </div>
</div>

<style scoped>
.home-section {
  max-width: 1152px;
  margin: 0 auto;
  padding: 80px 24px 0;
}

.home-cta {
  padding-bottom: 60px;
}

.cta-card {
  text-align: center;
  padding: 48px 32px;
  border-radius: 24px;
  background: linear-gradient(135deg, var(--brand-light), #ede9fe);
  border: 1px solid rgba(37, 99, 235, 0.15);
}

.dark .cta-card {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(124, 58, 237, 0.12));
  border-color: rgba(37, 99, 235, 0.25);
}

.cta-title {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
  margin: 0 0 12px;
}

.cta-desc {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  max-width: 500px;
  margin: 0 auto 28px;
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 24px;
  border-radius: 10px;
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s var(--ease-out-expo);
}

.cta-btn-primary {
  background: linear-gradient(135deg, var(--brand) 0%, var(--brand-alt) 100%);
  color: #fff;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
}

.cta-btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);
}

.cta-btn-secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.cta-btn-secondary:hover {
  border-color: var(--brand);
  color: var(--brand);
  transform: translateY(-1px);
}
</style>

