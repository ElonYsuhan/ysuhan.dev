<script setup lang="ts">
interface Note {
  title: string
  date: string
  excerpt: string
  tags: string[]
  url: string
  stage: 'seedling' | 'budding' | 'evergreen'
}

defineProps<{ notes: Note[] }>()

const stageLabel: Record<string, string> = {
  seedling: 'seedling',
  budding: 'budding',
  evergreen: 'evergreen',
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })
}

function animDelay(i: number): string {
  return `${i * 0.04}s`
}
</script>

<template>
  <div class="garden-grid">
    <a
      v-for="(note, i) in notes"
      :key="i"
      :href="note.url"
      class="garden-card animate-fade-in-up"
      :style="{ animationDelay: animDelay(i) }"
    >
      <div class="garden-header">
        <span class="garden-stage">{{ stageLabel[note.stage] }}</span>
        <time class="garden-date">{{ formatDate(note.date) }}</time>
      </div>
      <h3 class="garden-title">{{ note.title }}</h3>
      <p class="garden-excerpt">{{ note.excerpt }}</p>
      <div class="garden-tags">
        <span v-for="tag in note.tags" :key="tag" class="garden-tag">{{ tag }}</span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.garden-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1px;
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  overflow: hidden;
  background: var(--border-subtle);
}

.garden-card {
  display: flex;
  flex-direction: column;
  padding: 22px;
  background: var(--bg-base);
  text-decoration: none;
  color: inherit;
  transition: background 0.25s var(--ease-out);
}

.garden-card:hover {
  background: var(--bg-surface);
}

.garden-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.garden-stage {
  font-size: 0.625rem;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.garden-date {
  font-size: 0.6875rem;
  color: var(--text-tertiary);
  font-variant-numeric: tabular-nums;
  font-family: var(--font-mono);
}

.garden-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 4px;
  transition: color 0.2s;
}

.garden-card:hover .garden-title { color: var(--gold); }

.garden-excerpt {
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 12px;
  flex: 1;
}

.garden-tags { display: flex; gap: 6px; flex-wrap: wrap; }

.garden-tag {
  font-size: 0.6875rem;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
}

@media (max-width: 480px) {
  .garden-grid { grid-template-columns: 1fr; }
}
</style>

