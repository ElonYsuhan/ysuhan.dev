<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { computed } from 'vue'

const { Layout: DefaultLayout } = DefaultTheme
const { page, frontmatter } = useData()

// Determine if we're on the home page
const isHome = computed(() => frontmatter.value.layout === 'home')
</script>

<template>
  <div class="app-shell" :class="{ 'layout-home': isHome, 'layout-page': !isHome }">
    <CustomNav />
    <DefaultLayout>
      <template #doc-footer-before>
        <slot name="doc-footer-before" />
      </template>
      <template #layout-bottom>
        <CustomFooter />
      </template>
    </DefaultLayout>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  position: relative;
}
</style>
