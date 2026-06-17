<script setup lang="ts">
interface Showcase {
  title: string
  description: string
  image?: string
  link: string
  category: string
}

defineProps<{ items: Showcase[] }>()

function animDelay(i: number): string {
  return `${i * 0.06}s`
}
</script>

<template>
  <div class="showcase-grid">
    <a
      v-for="(item, i) in items"
      :key="i"
      :href="item.link"
      class="showcase-card animate-fade-in-up"
      :style="{ animationDelay: animDelay(i) }"
    >
      <div class="showcase-image-wrap" />
      <div class="showcase-body">
        <span class="showcase-category">{{ item.category }}</span>
        <h3 class="showcase-title">{{ item.title }}</h3>
        <p class="showcase-desc">{{ item.description }}</p>
      </div>
    </a>
  </div>
</template>

<style scoped>
.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1px;
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  overflow: hidden;
  background: var(--border-subtle);
}

.showcase-card {
  background: var(--bg-base);
  text-decoration: none;
  color: inherit;
  transition: background 0.25s var(--ease-out);
}

.showcase-card:hover {
  background: var(--bg-surface);
}

.showcase-image-wrap {
  aspect-ratio: 16 / 10;
  background: var(--bg-elevated);
}

.showcase-body {
  padding: 20px 24px 24px;
}

.showcase-category {
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--gold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: var(--font-mono);
}

.showcase-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 8px 0 4px;
}

.showcase-desc {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 480px) {
  .showcase-grid { grid-template-columns: 1fr; }
}
</style>

