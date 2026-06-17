<script setup lang="ts">
interface Note {
  title: string
  date: string
  excerpt: string
  tags: string[]
  url: string
  stage: 'seedling' | 'budding' | 'evergreen'
}

defineProps<{
  notes: Note[]
}>()

const stageLabel: Record<string, string> = {
  seedling: '🌱 seedling',
  budding: '🌿 budding',
  evergreen: '🌲 evergreen',
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function animDelay(i: number): string {
  return `${i * 0.06}s`
}
</script>

<template>
  <div class="garden-grid">
    <a
      v-for="(note, i) in notes"
      :key="i"
      :href="note.url"
      class="garden-card animate-scale-in"
      :style="{ animationDelay: animDelay(i) }"
    >
      <div class="garden-header">
        <span class="garden-stage">{{ stageLabel[note.stage] || stageLabel.seedling }}</span>
        <time class="garden-date">{{ formatDate(note.date) }}</time>
      </div>
      <h3 class="garden-title">{{ note.title }}</h3>
      <p class="garden-excerpt">{{ note.excerpt }}</p>
      <div class="garden-tags">
        <span v-for="tag in note.tags" :key="tag" class="garden-tag">#{{ tag }}</span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.garden-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.garden-card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-bg-soft-up);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s var(--ease-out-expo);
  opacity: 0;
}

.garden-card:hover {
  border-color: var(--brand);
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.08);
  transform: translateY(-2px);
}

.garden-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.garden-stage {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.garden-date {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

.garden-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 6px;
  transition: color 0.2s;
}

.garden-card:hover .garden-title {
  color: var(--brand);
}

.garden-excerpt {
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 12px;
  flex: 1;
}

.garden-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.garden-tag {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  transition: color 0.2s;
}

.garden-tag:hover {
  color: var(--brand);
}

@media (max-width: 480px) {
  .garden-grid {
    grid-template-columns: 1fr;
  }
}
</style>

