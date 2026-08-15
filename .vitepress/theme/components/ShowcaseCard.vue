<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Showcase {
  title: string
  description: string
  image?: string
  link: string
  category: string
}

const props = defineProps<{ items: Showcase[] }>()
const visible = ref<boolean[]>(props.items.map(() => false))

onMounted(() => {
  props.items.forEach((_, i) => {
    setTimeout(() => { visible.value[i] = true }, i * 60)
  })
})
</script>

<template>
  <div class="showcase-grid">
    <a
      v-for="(item, i) in items"
      :key="item.title"
      :href="item.link"
      class="showcase-card glass-card card-stagger"
      :class="{ show: visible[i] }"
    >
      <div
        class="showcase-image-wrap"
        :class="{ 'has-image': item.image }"
        :style="item.image ? { backgroundImage: `url(${item.image})` } : {}"
      >
        <span v-if="!item.image" class="showcase-placeholder" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </span>
      </div>
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
  position: relative;
  aspect-ratio: 16 / 10;
  background: var(--bg-secondary);
  background-size: cover;
  background-position: center;
  border-bottom: 1px solid var(--border-subtle);
  overflow: hidden;
  transition: transform 400ms var(--ease-out);
}

.showcase-card:hover .showcase-image-wrap.has-image {
  transform: scale(1.03);
}

/* Branded placeholder — HUD grid + accent wash, shown when no image is set */
.showcase-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  opacity: 0.55;
  background:
    linear-gradient(135deg, var(--accent-subtle), transparent 55%),
    repeating-linear-gradient(0deg, transparent 0 23px, var(--accent-border) 23px 24px),
    repeating-linear-gradient(90deg, transparent 0 23px, var(--accent-border) 23px 24px),
    var(--bg-secondary);
}

.showcase-placeholder svg {
  width: 34px;
  height: 34px;
  filter: drop-shadow(0 0 8px var(--accent-glow));
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
