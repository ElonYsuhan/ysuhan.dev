<script setup lang="ts">
interface Project {
  title: string
  description: string
  tech: string[]
  link: string
  github?: string
}

defineProps<{ projects: Project[] }>()

function animDelay(i: number): string {
  return `${i * 0.06}s`
}
</script>

<template>
  <div class="project-grid">
    <a
      v-for="(p, i) in projects"
      :key="i"
      :href="p.link"
      class="project-card glass-card animate-fade-in-up"
      :style="{ animationDelay: animDelay(i) }"
      target="_blank"
      rel="noopener noreferrer"
    >
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
}

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
