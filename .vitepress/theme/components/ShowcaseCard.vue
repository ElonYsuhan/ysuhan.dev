<script setup lang="ts">
interface Showcase {
  title: string
  description: string
  image?: string
  link: string
  category: string
}

defineProps<{
  items: Showcase[]
}>()

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
      class="showcase-card animate-scale-in"
      :style="{ animationDelay: animDelay(i) }"
    >
      <div class="showcase-image-wrap">
        <div class="showcase-image-placeholder">
          <span class="showcase-category">{{ item.category }}</span>
        </div>
      </div>
      <div class="showcase-body">
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
  gap: 24px;
}

.showcase-card {
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-bg-soft-up);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s var(--ease-out-expo);
}

.showcase-card:hover {
  border-color: var(--brand);
  box-shadow: 0 8px 30px rgba(37, 99, 235, 0.1);
  transform: translateY(-3px);
}

.showcase-image-wrap {
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.showcase-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--brand-light), #ede9fe);
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 16px;
}

.dark .showcase-image-placeholder {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.3), rgba(124, 58, 237, 0.3));
}

.showcase-category {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--brand);
  background: rgba(255, 255, 255, 0.8);
  padding: 4px 12px;
  border-radius: 9999px;
}

.dark .showcase-category {
  background: rgba(0, 0, 0, 0.4);
  color: #93c5fd;
}

.showcase-body {
  padding: 20px;
}

.showcase-title {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 6px;
}

.showcase-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 480px) {
  .showcase-grid {
    grid-template-columns: 1fr;
  }
}
</style>

