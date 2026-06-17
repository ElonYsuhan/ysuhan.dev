<script setup lang="ts">
import { SITE } from '../../constants'

const currentYear = new Date().getFullYear()

const footerLinks = [
  {
    group: '内容',
    items: [
      { text: '产品', link: '/projects/' },
      { text: '展示', link: '/showcase/' },
      { text: '博客', link: '/blog/' },
      { text: '笔记', link: '/notes/' },
    ],
  },
  {
    group: '关于',
    items: [
      { text: '关于我', link: '/about/' },
      { text: 'GitHub', link: SITE.social.github },
    ],
  },
  {
    group: '订阅',
    items: [
      { text: 'RSS 订阅', link: '/feed.xml' },
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
          <p class="footer-tagline">
            {{ SITE.description }}
          </p>
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
  position: relative;
  z-index: 1;
  margin-top: 80px;
  border-top: 1px solid rgba(0, 229, 255, 0.08);
  background: rgba(10, 14, 23, 0.7);
  backdrop-filter: blur(16px);
}

.footer-inner {
  max-width: 1152px;
  margin: 0 auto;
  padding: 48px 24px 24px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(0, 229, 255, 0.06);
}

.footer-logo {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #00e5ff;
  text-shadow: 0 0 15px rgba(0, 229, 255, 0.3);
}

.footer-tagline {
  margin-top: 8px;
  font-size: 0.875rem;
  color: #60758a;
  line-height: 1.6;
  max-width: 280px;
}

.footer-group-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #00e5ff;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li { margin-bottom: 8px; }

.footer-links a {
  font-size: 0.875rem;
  color: #8699ad;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover { color: #00e5ff; }

.footer-bottom { margin-top: 24px; }

.footer-copyright {
  font-size: 0.8125rem;
  color: #4a5b6e;
}

@media (max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
  .footer-brand { grid-column: 1 / -1; }
}
@media (max-width: 480px) {
  .footer-grid { grid-template-columns: 1fr; }
}
</style>

