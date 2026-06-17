<script setup lang="ts">
interface Post {
  title: string
  date: string
  excerpt: string
  tags: string[]
  url: string
}

defineProps<{ posts: Post[] }>()

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

function animDelay(i: number): string {
  return `${i * 0.06}s`
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
    </article>
  </div>
</template>

<style scoped>
.blog-list {
  display: flex;
  flex-direction: column;
}

.blog-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 18px 0;
  border-bottom: 1px solid var(--border-subtle);
  transition: padding 0.2s;
}

.blog-item:first-child { padding-top: 0; }

.blog-date {
  flex-shrink: 0;
  width: 110px;
  font-size: 0.75rem;
  color: var(--text-tertiary);
  font-variant-numeric: tabular-nums;
  font-family: var(--font-mono);
  padding-top: 2px;
}

.blog-content { flex: 1; min-width: 0; }

.blog-title-link { text-decoration: none; color: inherit; }

.blog-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 4px;
  transition: color 0.2s;
}

.blog-item:hover .blog-title { color: var(--gold); }

.blog-excerpt {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 8px;
}

.blog-tags { display: flex; gap: 6px; flex-wrap: wrap; }

.blog-tag {
  font-size: 0.6875rem;
  padding: 1px 6px;
  border-radius: 4px;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
}

@media (max-width: 640px) {
  .blog-item { flex-direction: column; gap: 6px; }
  .blog-date { width: auto; }
}
</style>

