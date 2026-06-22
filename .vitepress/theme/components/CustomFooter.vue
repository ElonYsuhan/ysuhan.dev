<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand-col">
          <a href="/" class="footer-brand">Ysuhan</a>
          <p class="footer-tagline">构建面向空间计算与数字孪生的前端系统</p>
        </div>
        <div class="footer-status">
          <div class="footer-status-row">
            <span>WebGIS / Digital Twin</span>
          </div>
          <div class="footer-status-row">
            <span>Building Tactics Engine</span>
          </div>
          <div class="footer-status-row footer-status-updated">
            <span>最近更新：2026.06</span>
          </div>
        </div>
        <nav class="footer-nav">
          <a href="/projects/">项目</a>
          <a href="/showcase/">案例</a>
          <a href="/blog/">博客</a>
          <a href="/career/">成长</a>
          <a href="https://github.com/ysuhan" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="/about/">关于</a>
        </nav>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">© {{ currentYear }} Ysuhan</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 120px;
  border-top: 1px solid var(--border-subtle);
  background: var(--bg-secondary);
}

.footer-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 24px 28px;
}

.footer-top {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr;
  gap: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border-subtle);
}

.footer-brand {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  letter-spacing: -0.02em;
}

.footer-tagline {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  margin: 8px 0 0;
  line-height: 1.6;
}

.footer-status {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-status-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.footer-status-icon {
  flex-shrink: 0;
  font-size: 0.875rem;
}

.footer-status-updated {
  color: var(--text-tertiary);
  font-size: 0.75rem;
  font-family: var(--font-mono);
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-nav a {
  font-size: 0.8125rem;
  color: var(--text-tertiary);
  text-decoration: none;
  transition: color 300ms var(--ease-out);
}

.footer-nav a:hover { color: var(--text-primary); }

.footer-bottom {
  margin-top: 20px;
}

.footer-copy {
  font-size: 0.6875rem;
  color: var(--text-disabled);
  margin: 0;
}

@media (max-width: 768px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }
  .footer-brand-col { grid-column: 1 / -1; }
}

@media (max-width: 480px) {
  .footer-top { grid-template-columns: 1fr; gap: 24px; }
  .footer-inner { padding: 36px 24px 24px; }
}
</style>
