<script setup lang="ts">
import { SITE } from '../../constants'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <a href="/" class="footer-brand">Ysuhan</a>
      <nav class="footer-nav">
        <a href="/projects/">项目</a>
        <a href="/blog/">博客</a>
        <a href="https://github.com/ysuhan" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="/about/">关于</a>
      </nav>
      <p class="footer-copy">© {{ currentYear }} Ysuhan</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 120px;
  border-top: 1px solid var(--border-subtle);
  background: transparent;
}

.footer-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.footer-brand {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  letter-spacing: -0.02em;
}

.footer-nav {
  display: flex;
  gap: 24px;
}

.footer-nav a {
  font-size: 0.8125rem;
  color: var(--text-tertiary);
  text-decoration: none;
  transition: color 300ms var(--ease-out);
}

.footer-nav a:hover { color: var(--text-primary); }

.footer-copy {
  font-size: 0.75rem;
  color: var(--text-disabled);
  margin: 0;
}

@media (max-width: 640px) {
  .footer-inner {
    flex-direction: column;
    text-align: center;
    gap: 16px;
    padding: 32px 24px;
  }

  .footer-nav { gap: 20px; }
}
</style>
