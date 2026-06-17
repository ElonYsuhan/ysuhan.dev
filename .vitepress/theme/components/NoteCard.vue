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
  border-radius: 10px;
  background: rgba(10, 14, 23, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 229, 255, 0.06);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.garden-card:hover {
  border-color: rgba(0, 229, 255, 0.25);
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.08);
  transform: translateY(-2px);
}

.garden-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.garden-stage { font-size: 0.75rem; color: #4a5b6e; }
.garden-date {
  font-size: 0.75rem;
  color: #4a5b6e;
  font-variant-numeric: tabular-nums;
  font-family: var(--font-mono);
}

.garden-title {
  font-size: 1rem;
  font-weight: 600;
  color: #e0e8f0;
  margin: 0 0 6px;
  transition: color 0.2s;
}

.garden-card:hover .garden-title { color: #00e5ff; }

.garden-excerpt {
  font-size: 0.8125rem;
  color: #60758a;
  line-height: 1.6;
  margin: 0 0 12px;
  flex: 1;
}

.garden-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.garden-tag { font-size: 0.75rem; color: #4a5b6e; transition: color 0.2s; }
.garden-tag:hover { color: #00e5ff; }

@media (max-width: 480px) {
  .garden-grid { grid-template-columns: 1fr; }
}
</style>

