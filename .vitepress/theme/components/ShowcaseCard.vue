<script setup lang="ts">
interface Showcase {
  title: string
  description: string
  image?: string
  link: string
  category: string
}

defineProps<{ items: Showcase[] }>()
</script>

<template>
  <div class="showcase-grid">
    <a
      v-for="(item, i) in items"
      :key="item.title"
      :href="item.link"
      class="showcase-card glass-card animate-fade-in-up"
      :style="{ opacity: 0, animationDelay: `${i * 0.06}s` }"
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
  gap: 16px;
}

.showcase-card {
  text-decoration: none;
  color: inherit;
  overflow: hidden;
}

.showcase-image-wrap {
  aspect-ratio: 16 / 10;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-subtle);
}

.showcase-body {
  padding: 20px 24px 24px;
}

.showcase-category {
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--accent);
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
