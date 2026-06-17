<script setup lang="ts">
import { SITE } from '../../constants'

const currentYear = new Date().getFullYear()

const footerLinks = [
  {
    group: 'Content',
    items: [
      { text: 'Projects', link: '/projects/' },
      { text: 'Showcase', link: '/showcase/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Notes', link: '/notes/' },
    ],
  },
  {
    group: 'About',
    items: [
      { text: 'About Me', link: '/about/' },
      { text: 'GitHub', link: SITE.social.github },
    ],
  },
  {
    group: 'Subscribe',
    items: [
      { text: 'RSS Feed', link: '/feed.xml' },
    ],
  },
]
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-grid">
        <!-- Brand column -->
        <div class="footer-brand">
          <span class="footer-logo">Ysuhan</span>
          <p class="footer-tagline">
            {{ SITE.description }}
          </p>
        </div>

        <!-- Link columns -->
        <div
          v-for="group in footerLinks"
          :key="group.group"
          class="footer-group"
        >
          <h4 class="footer-group-title">{{ group.group }}</h4>
          <ul class="footer-links">
            <li v-for="item in group.items" :key="item.text">
              <a
                :href="item.link"
                :target="item.link.startsWith('http') ? '_blank' : undefined"
                :rel="item.link.startsWith('http') ? 'noopener noreferrer' : undefined"
              >
                {{ item.text }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="footer-bottom">
        <p class="footer-copyright">
          © {{ currentYear }} Ysuhan. Built with VitePress.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 80px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
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
  border-bottom: 1px solid var(--vp-c-divider);
}

.footer-logo {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--vp-c-brand);
}

.footer-tagline {
  margin-top: 8px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  max-width: 280px;
}

.footer-group-title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--vp-c-brand);
}

.footer-bottom {
  margin-top: 24px;
}

.footer-copyright {
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 480px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>

