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
  border-radius: 12px;
  background: rgba(10, 14, 23, 0.55);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  border: 1px solid rgba(0, 229, 255, 0.08);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.showcase-card:hover {
  border-color: rgba(0, 229, 255, 0.35);
  box-shadow: 0 0 25px rgba(0, 229, 255, 0.1);
  transform: translateY(-3px);
}

.showcase-image-wrap {
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.showcase-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 229, 255, 0.15), rgba(180, 77, 255, 0.15));
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 16px;
}

.showcase-category {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #00e5ff;
  background: rgba(10, 14, 23, 0.7);
  padding: 4px 12px;
  border-radius: 9999px;
  border: 1px solid rgba(0, 229, 255, 0.2);
}

.showcase-body {
  padding: 20px;
}

.showcase-title {
  font-size: 1.0625rem;
  font-weight: 600;
  color: #e0e8f0;
  margin: 0 0 6px;
}

.showcase-desc {
  font-size: 0.875rem;
  color: #60758a;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 480px) {
  .showcase-grid { grid-template-columns: 1fr; }
}
</style>

