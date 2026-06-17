<script setup lang="ts">
interface Feature {
  icon: string
  title: string
  description: string
}

defineProps<{ features: Feature[] }>()

function animDelay(i: number): string {
  return `${i * 0.08}s`
}
</script>

<template>
  <div class="feature-grid">
    <div
      v-for="(item, i) in features"
      :key="i"
      class="feature-item animate-fade-in-up"
      :style="{ animationDelay: animDelay(i) }"
    >
      <h3 class="feature-title">{{ item.title }}</h3>
      <p class="feature-desc">{{ item.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1px;
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  overflow: hidden;
  background: var(--border-subtle);
}

.feature-item {
  padding: 32px 28px;
  background: var(--bg-base);
  transition: background 0.25s var(--ease-out);
}

.feature-item:hover {
  background: var(--bg-surface);
}

.feature-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 6px;
  letter-spacing: -0.01em;
}

.feature-desc {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 640px) {
  .feature-item { padding: 24px 20px; }
}
</style>

