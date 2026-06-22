<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Note {
  title: string
  date: string
  excerpt: string
  tags: string[]
  url: string
  stage: 'seedling' | 'budding' | 'evergreen'
}

const props = defineProps<{ notes: Note[] }>()
const visible = ref<boolean[]>(props.notes.map(() => false))

const stageLabel: Record<string, string> = {
  seedling: 'seedling',
  budding: 'budding',
  evergreen: 'evergreen',
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })
}

onMounted(() => {
  props.notes.forEach((_, i) => {
    setTimeout(() => { visible.value[i] = true }, i * 40)
  })
})
</script>

<template>
  <div class="garden-grid">
    <a
      v-for="(note, i) in notes"
      :key="note.title"
      :href="note.url"
      class="garden-card glass-card card-stagger"
      :class="{ show: visible[i] }"
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
  gap: 16px;
}

.garden-card {
  display: flex;
  flex-direction: column;
  padding: 22px;
  text-decoration: none;
  color: inherit;
}

.garden-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.garden-stage {
  font-size: 0.625rem;
  color: var(--accent);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 2px 8px;
  background: var(--accent-subtle);
  border-radius: 999px;
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
  transition: color 300ms var(--ease-out);
}

.garden-card:hover .garden-title { color: var(--accent); }

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
  padding: 2px 8px;
  background: var(--bg-elevated);
  border-radius: 999px;
}

@media (max-width: 480px) {
  .garden-grid { grid-template-columns: 1fr; }
}
</style>
