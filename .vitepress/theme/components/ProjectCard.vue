<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Project {
  title: string
  description: string
  tech: string[]
  link: string
  github?: string
  image?: string
}

const props = defineProps<{ projects: Project[] }>()
const visible = ref<boolean[]>(props.projects.map(() => false))

onMounted(() => {
  props.projects.forEach((_, i) => {
    setTimeout(() => { visible.value[i] = true }, i * 60)
  })
})
</script>

<template>
  <div class="project-grid">
    <a
      v-for="(p, i) in projects"
      :key="p.title"
      :href="p.link"
      class="project-card glass-card card-stagger"
      :class="{ show: visible[i], 'has-bg': p.image }"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div v-if="p.image" class="project-bg" :style="{ backgroundImage: `url(${p.image})` }" />
      <div class="project-body">
        <h3 class="project-title">{{ p.title }}</h3>
        <p class="project-desc">{{ p.description }}</p>
      </div>
      <div class="project-footer">
        <span v-for="t in p.tech" :key="t" class="project-tag">{{ t }}</span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
}

.project-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 28px;
  text-decoration: none;
  color: inherit;
  min-height: 160px;
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.project-card.has-bg {
  min-height: 220px;
}

.project-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.2;
  transition: opacity 300ms var(--ease-out);
  pointer-events: none;
  z-index: 0;
}

.project-card.has-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(13,15,18,0.85) 0%, rgba(13,15,18,0.4) 100%);
  pointer-events: none;
  z-index: 0;
}

:root .project-card.has-bg::after {
  background: linear-gradient(135deg, rgba(250,250,249,0.85) 0%, rgba(250,250,249,0.4) 100%);
}

.dark .project-card.has-bg::after {
  background: linear-gradient(135deg, rgba(13,15,18,0.85) 0%, rgba(13,15,18,0.4) 100%);
}

.project-card:hover .project-bg {
  opacity: 0.3;
}

.project-body { position: relative; z-index: 1; }

.project-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px;
  letter-spacing: -0.01em;
}

.project-desc {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.project-footer {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.project-tag {
  display: inline-block;
  padding: 3px 10px;
  font-size: 0.6875rem;
  font-weight: 500;
  border-radius: 999px;
  background: var(--accent-subtle);
  color: var(--accent);
  font-family: var(--font-mono);
  letter-spacing: 0.02em;
}

@media (max-width: 480px) {
  .project-grid { grid-template-columns: 1fr; }
  .project-card { padding: 22px 20px; }
}
</style>
