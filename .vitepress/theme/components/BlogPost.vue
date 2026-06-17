<script setup lang="ts">
interface Post {
  title: string
  date: string
  excerpt: string
  tags: string[]
  url: string
}

defineProps<{
  posts: Post[]
}>()

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function animDelay(i: number): string {
  return `${i * 0.1}s`
}
</script>

<template>
  <div class="blog-list">
    <article
      v-for="(post, i) in posts"
      :key="i"
      class="blog-item animate-fade-in-up"
      :style="{ animationDelay: animDelay(i) }"
    >
      <time class="blog-date">{{ formatDate(post.date) }}</time>
      <div class="blog-content">
        <a :href="post.url" class="blog-title-link">
          <h2 class="blog-title">{{ post.title }}</h2>
        </a>
        <p class="blog-excerpt">{{ post.excerpt }}</p>
        <div class="blog-tags">
          <span v-for="tag in post.tags" :key="tag" class="blog-tag">{{ tag }}</span>
        </div>
      </div>
      <a :href="post.url" class="blog-read-link">
        阅读
        <span class="read-arrow">→</span>
      </a>
    </article>
  </div>
</template>

<style scoped>
.blog-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.blog-item {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 20px 24px;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.25s var(--ease-out-expo);
  border: 1px solid transparent;
}

.blog-item:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-bg-soft-up);
}

.blog-date {
  flex-shrink: 0;
  width: 120px;
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
  padding-top: 3px;
}

.blog-content {
  flex: 1;
  min-width: 0;
}

.blog-title-link {
  text-decoration: none;
  color: inherit;
}

.blog-title {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 6px;
  transition: color 0.2s;
}

.blog-item:hover .blog-title {
  color: var(--brand);
}

.blog-excerpt {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 10px;
}

.blog-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.blog-tag {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 9999px;
  background: var(--vp-c-bg-soft-up);
  color: var(--vp-c-text-2);
}

.blog-read-link {
  flex-shrink: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--brand);
  text-decoration: none;
  padding-top: 3px;
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.blog-item:hover .blog-read-link {
  opacity: 1;
  transform: translateX(0);
}

.read-arrow {
  display: inline-block;
  transition: transform 0.2s ease;
}

.blog-read-link:hover .read-arrow {
  transform: translateX(3px);
}

@media (max-width: 640px) {
  .blog-item {
    flex-direction: column;
    gap: 8px;
    padding: 16px;
  }

  .blog-date {
    width: auto;
  }

  .blog-read-link {
    display: none;
  }
}
</style>

