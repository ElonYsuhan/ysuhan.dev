<script setup lang="ts">
interface Project {
  title: string
  description: string
  tech: string[]
  link: string
  github?: string
}

defineProps<{
  projects: Project[]
}>()

function animDelay(i: number): string {
  return `${i * 0.08}s`
}
</script>

<template>
  <div class="project-grid">
    <a
      v-for="(p, i) in projects"
      :key="i"
      :href="p.link"
      class="project-card animate-scale-in"
      :style="{ animationDelay: animDelay(i) }"
    >
      <div class="project-body">
        <h3 class="project-title">
          {{ p.title }}
          <span class="project-arrow">→</span>
        </h3>
        <p class="project-desc">{{ p.description }}</p>
      </div>
      <div class="project-footer">
        <span
          v-for="t in p.tech"
          :key="t"
          class="project-tag"
        >{{ t }}</span>
        <a
          v-if="p.github"
          :href="p.github"
          target="_blank"
          rel="noopener noreferrer"
          class="project-gh-link"
          title="View on GitHub"
          @click.stop
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
      </div>
    </a>
  </div>
</template>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.project-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-bg-soft-up);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s var(--ease-out-expo);
  min-height: 180px;
  opacity: 0;
}

.project-card:hover {
  border-color: var(--brand);
  box-shadow: 0 4px 24px rgba(37, 99, 235, 0.1);
  transform: translateY(-3px);
}

.project-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.project-arrow {
  font-size: 0.875rem;
  opacity: 0;
  transform: translateX(-4px);
  transition: all 0.2s ease;
  color: var(--brand);
}

.project-card:hover .project-arrow {
  opacity: 1;
  transform: translateX(0);
}

.project-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

.project-footer {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.project-tag {
  display: inline-block;
  padding: 3px 10px;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  background: var(--brand-light);
  color: var(--brand);
}

.dark .project-tag {
  background: rgba(37, 99, 235, 0.15);
  color: #93c5fd;
}

.project-gh-link {
  margin-left: auto;
  color: var(--vp-c-text-2);
  transition: color 0.2s;
  display: flex;
  align-items: center;
}

.project-gh-link:hover {
  color: var(--vp-c-text-1);
}

@media (max-width: 480px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>

