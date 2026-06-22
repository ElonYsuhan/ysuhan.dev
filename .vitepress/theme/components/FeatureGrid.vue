<script setup lang="ts">
interface Feature {
  icon: string
  title: string
  description: string
}

defineProps<{ features: Feature[] }>()
</script>

<template>
  <div class="feature-grid">
    <div
      v-for="item in features"
      :key="item.title"
      class="feature-item glass-card animate-fade-in-up"
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
  gap: 16px;
}

.feature-item {
  padding: 32px 28px;
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
