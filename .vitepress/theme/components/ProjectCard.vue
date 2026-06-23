<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Project {
  title: string
  description: string
  tech: string[]
  link: string
  github?: string
  image?: string
  status?: string
  highlights?: string[]
}

const props = defineProps<{ projects: Project[] }>()
const visible = ref<boolean[]>(props.projects.map(() => false))

onMounted(() => {
  props.projects.forEach((_, i) => {
    setTimeout(() => { visible.value[i] = true }, i * 80)
  })
})
</script>

<template>
  <div class="project-showcase">
    <a
      v-for="(p, i) in projects"
      :key="p.title"
      :href="p.link"
      class="showcase-card card-stagger"
      :class="{ show: visible[i] }"
      target="_blank"
      rel="noopener noreferrer"
    >
      <!-- Full-bleed background screenshot -->
      <div
        class="showcase-bg"
        :style="p.image ? { backgroundImage: `url(${p.image})` } : {}"
      />

      <!-- Gradient overlays -->
      <div class="showcase-gradient" />
      <div class="showcase-gradient-top" />

      <!-- Floating glass info layer -->
      <div class="showcase-info">
        <div class="showcase-info-header">
          <h3 class="showcase-name">{{ p.title }}</h3>
          <span v-if="p.status" class="showcase-status">{{ p.status }}</span>
        </div>
        <p class="showcase-desc">{{ p.description }}</p>
        <div class="showcase-tags">
          <span v-for="t in p.tech" :key="t" class="showcase-tag">{{ t }}</span>
        </div>
      </div>

      <!-- Hover highlights -->
      <div v-if="p.highlights?.length" class="showcase-highlights">
        <ul class="highlights-list">
          <li v-for="h in p.highlights" :key="h" class="highlights-item">
            <span class="highlights-check">✓</span>
            <span>{{ h }}</span>
          </li>
        </ul>
      </div>
    </a>
  </div>
</template>

<style scoped>
.project-showcase {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.showcase-card {
  display: block;
  position: relative;
  height: 200px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  isolation: isolate;
  transition: box-shadow 300ms var(--ease-out);
}

.showcase-card:hover {
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
}

/* Background screenshot */
.showcase-bg {
  position: absolute;
  inset: 0;
  background: var(--bg-secondary);
  background-size: cover;
  background-position: center;
  transition: transform 400ms var(--ease-out);
}

.showcase-card:hover .showcase-bg {
  transform: scale(1.03);
}

/* Gradients for text readability */
.showcase-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.25) 50%,
    transparent 100%
  );
  z-index: 1;
  pointer-events: none;
}

.showcase-gradient-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    transparent
  );
  z-index: 1;
  pointer-events: none;
}

/* Floating glass info layer */
.showcase-info {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 14px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-md);
  z-index: 2;
  transition: transform 300ms var(--ease-out);
}

.showcase-card:hover .showcase-info {
  transform: translateY(-4px);
}

.showcase-info-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 2px;
}

.showcase-name {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;
  margin: 0;
}

.showcase-status {
  font-size: 0.625rem;
  font-weight: 500;
  color: var(--accent);
  background: rgba(212, 165, 116, 0.15);
  padding: 2px 8px;
  border-radius: 999px;
  font-family: var(--font-mono);
  white-space: nowrap;
  border: 1px solid rgba(212, 165, 116, 0.25);
}

.showcase-desc {
  font-size: 0.6875rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.4;
  margin: 0 0 8px;
}

.showcase-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.showcase-tag {
  font-size: 0.625rem;
  color: rgba(255, 255, 255, 0.6);
  font-family: var(--font-mono);
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
}

/* Hover highlights overlay */
.showcase-highlights {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  opacity: 0;
  transition: opacity 300ms var(--ease-out);
  pointer-events: none;
}

.showcase-card:hover .showcase-highlights {
  opacity: 1;
}

.highlights-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.highlights-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #fff;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.highlights-check {
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 600;
}

@media (max-width: 640px) {
  .project-showcase { grid-template-columns: 1fr; }
  .showcase-card { height: 200px; }
  .showcase-info { left: 12px; right: 12px; bottom: 12px; padding: 12px 14px; }
  .showcase-name { font-size: 0.875rem; }
}
</style>
