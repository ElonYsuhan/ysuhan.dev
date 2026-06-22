<script setup lang="ts">
import { useRoute, useData } from 'vitepress'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const route = useRoute()
const { isDark } = useData()
const scrolled = ref(false)
const mobileOpen = ref(false)

function toggleTheme(e: MouseEvent) {
  const x = e.clientX
  const y = e.clientY
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  if (document.startViewTransition) {
    const transition = document.startViewTransition(() => {
      isDark.value = !isDark.value
    })
    transition.ready.then(() => {
      try {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0 at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`
            ]
          },
          {
            duration: 500,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        )
      } catch (_) { /* fallback to default crossfade */ }
    })
  } else {
    isDark.value = !isDark.value
  }
}

const navItems = [
  { text: '首页', link: '/' },
  { text: '项目', link: '/projects/' },
  { text: '案例', link: '/showcase/' },
  { text: '博客', link: '/blog/' },
  { text: '成长', link: '/career/' },
  { text: '开源', link: 'https://github.com/ysuhan', external: true },
  { text: '关于', link: '/about/' },
]

function isActive(link: string): boolean {
  if (link === '/') return route.path === '/'
  return route.path.startsWith(link)
}

function onScroll(): void {
  scrolled.value = window.scrollY > 80
}

function closeMobile(): void {
  mobileOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <nav class="custom-nav" :class="{ scrolled }">
    <div class="nav-inner">
      <a href="/" class="nav-brand" @click="closeMobile">
        <span class="brand-text">Ysuhan</span>
      </a>
      <div class="nav-links" :class="{ open: mobileOpen }">
        <a
          v-for="item in navItems"
          :key="item.link"
          :href="item.link"
          :class="{ active: isActive(item.link) }"
          :target="item.external ? '_blank' : undefined"
          :rel="item.external ? 'noopener noreferrer' : undefined"
          class="nav-link"
          @click="closeMobile"
        >
          {{ item.text }}
          <svg
            v-if="item.external"
            class="nav-external-icon"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <path d="M7 17L17 7" /><path d="M7 7h10v10" />
          </svg>
        </a>
      </div>
      <button
        class="theme-toggle"
        @click="toggleTheme"
        :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
        :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
      >
        <!-- Sun icon -->
        <svg v-if="isDark" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/>
        </svg>
        <!-- Moon icon -->
        <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      </button>
      <button
        class="mobile-toggle"
        :class="{ open: mobileOpen }"
        @click="mobileOpen = !mobileOpen"
        aria-label="Toggle navigation"
      >
        <span class="toggle-bar" />
        <span class="toggle-bar" />
        <span class="toggle-bar" />
      </button>
    </div>
  </nav>
</template>

<style scoped>
.custom-nav {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  transition: all 300ms var(--ease-out);
}

.nav-inner {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px;
  padding-left: 16px;
  background: var(--glass-bg);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--glass-border);
  border-radius: 999px;
  transition: all 300ms var(--ease-out);
}

.scrolled .nav-inner {
  background: var(--nav-scrolled-bg);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: var(--nav-scrolled-shadow);
}

.nav-brand {
  display: flex;
  align-items: center;
  padding-right: 10px;
  margin-right: 4px;
  border-right: 1px solid var(--border-subtle);
  text-decoration: none;
}

.brand-text {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: -0.02em;
  padding: 0 6px;
}

.nav-links {
  display: flex;
  gap: 2px;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 300ms var(--ease-out);
  white-space: nowrap;
}

.nav-link:hover {
  color: var(--accent);
  background: var(--accent-subtle);
}

.nav-link.active {
  color: var(--accent);
  background: var(--accent-subtle);
}

.nav-external-icon {
  opacity: 0.4;
  flex-shrink: 0;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  margin-left: 2px;
  background: none;
  border: none;
  border-radius: 999px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 300ms var(--ease-out);
}

.theme-toggle:hover {
  color: var(--accent);
  background: var(--accent-subtle);
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 999px;
}

.toggle-bar {
  display: block;
  width: 16px;
  height: 1.5px;
  background: var(--text-secondary);
  border-radius: 1px;
  transition: all 300ms var(--ease-out);
}

.mobile-toggle.open .toggle-bar:nth-child(1) {
  transform: translateY(5.5px) rotate(45deg);
}
.mobile-toggle.open .toggle-bar:nth-child(2) {
  opacity: 0;
}
.mobile-toggle.open .toggle-bar:nth-child(3) {
  transform: translateY(-5.5px) rotate(-45deg);
}

@media (max-width: 768px) {
  .custom-nav {
    top: 12px;
  }

  .nav-inner {
    padding: 6px 10px;
    padding-left: 14px;
  }

  .nav-links {
    display: none;
  }

  .nav-links.open {
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: var(--bg-elevated);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-md);
    padding: 8px;
    min-width: 180px;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  }

  .nav-links.open .nav-link {
    padding: 10px 16px;
    font-size: 0.875rem;
  }

  .mobile-toggle {
    display: flex;
  }
}
</style>
