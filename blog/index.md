---
title: 博客
description: 技术文章与思考
layout: page
---

<script setup>
const posts = []
</script>

<div class="page-container">

# 博客

<p class="page-subtitle">暂无文章，敬请期待。</p>

<BlogPost :posts="posts" />

</div>

<style scoped>
.page-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 80px 24px 80px;
  position: relative;
  z-index: 1;
}

.page-subtitle {
  font-size: 1.0625rem;
  color: var(--vp-c-text-2);
  margin: 4px 0 40px;
  line-height: 1.6;
}
</style>

