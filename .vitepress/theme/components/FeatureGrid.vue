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
  gap: 20px;
  position: relative;
  z-index: 1;
}

.feature-item {
  padding: 28px;
  border-radius: 12px;
  background: rgba(10, 14, 23, 0.6);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  border: 1px solid rgba(0, 229, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.feature-item:hover {
  border-color: rgba(0, 229, 255, 0.4);
  background: rgba(10, 18, 28, 0.75);
  box-shadow:
    0 0 20px rgba(0, 229, 255, 0.1),
    inset 0 0 20px rgba(0, 229, 255, 0.03);
  transform: translateY(-2px);
}

.feature-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(0, 229, 255, 0.15), rgba(180, 77, 255, 0.15));
  border: 1px solid rgba(0, 229, 255, 0.2);
  margin-bottom: 16px;
  font-size: 1.3rem;
}

.feature-title {
  font-size: 1.0625rem;
  font-weight: 600;
  color: #e0e8f0;
  margin-bottom: 6px;
  letter-spacing: 0.01em;
}

.feature-desc {
  font-size: 0.875rem;
  color: #60758a;
  line-height: 1.6;
  margin: 0;
}
</style>

