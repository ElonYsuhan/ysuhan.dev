<script setup lang="ts">
import { SITE } from '../../constants'

const currentYear = new Date().getFullYear()

const footerLinks = [
  {
    group: '内容',
    items: [
      { text: '项目', link: '/projects/' },
      { text: '案例', link: '/showcase/' },
      { text: '博客', link: '/blog/' },
    ],
  },
  {
    group: '关于',
    items: [
      { text: '关于我', link: '/about/' },
      { text: 'GitHub', link: SITE.social.github },
    ],
  },
]
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <span class="footer-logo">Ysuhan</span>
          <p class="footer-tagline">{{ SITE.description }}</p>
        </div>
        <div v-for="group in footerLinks" :key="group.group" class="footer-group">
          <h4 class="footer-group-title">{{ group.group }}</h4>
          <ul class="footer-links">
            <li v-for="item in group.items" :key="item.text">
              <a
                :href="item.link"
                :target="item.link.startsWith('http') ? '_blank' : undefined"
                :rel="item.link.startsWith('http') ? 'noopener noreferrer' : undefined"
              >{{ item.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copyright">
          © {{ currentYear }} Ysuhan
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 100px;
  border-top: 1px solid var(--border-subtle);
  background: var(--bg-surface);
}

.footer-inner {
  max-width: 1152px;
  margin: 0 auto;
  padding: 56px 24px 28px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 48px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--border-subtle);
}

.footer-logo {
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.footer-tagline {
  margin-top: 8px;
  font-size: 0.8125rem;
  color: var(--text-tertiary);
  line-height: 1.6;
  max-width: 280px;
}

.footer-group-title {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 14px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li { margin-bottom: 8px; }

.footer-links a {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover { color: var(--text-primary); }

.footer-bottom { margin-top: 24px; }

.footer-copyright { font-size: 0.75rem; color: var(--text-disabled); }

@media (max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
  .footer-brand { grid-column: 1 / -1; }
}
@media (max-width: 480px) {
  .footer-grid { grid-template-columns: 1fr; }
}
</style>

