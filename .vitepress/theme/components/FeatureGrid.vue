<script setup lang="ts">
interface Feature {
  icon: string
  title: string
  description: string
}

defineProps<{
  features: Feature[]
}>()

function animDelay(i: number): string {
  return `${i * 0.1}s`
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
      <div class="feature-icon" v-html="item.icon" />
      <h3 class="feature-title">{{ item.title }}</h3>
      <p class="feature-desc">{{ item.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.feature-item {
  padding: 28px;
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-bg-soft-up);
  transition: all 0.3s var(--ease-out-expo);
  opacity: 0;
}

.feature-item:hover {
  border-color: var(--brand);
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.08);
  transform: translateY(-2px);
}

.feature-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--brand-light), #ede9fe);
  margin-bottom: 16px;
  font-size: 1.25rem;
}

.dark .feature-icon {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(124, 58, 237, 0.2));
}

.feature-title {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}

.feature-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}
</style>

