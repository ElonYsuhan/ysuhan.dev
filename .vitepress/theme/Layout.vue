<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { computed, nextTick, provide } from 'vue'

const { Layout: DefaultLayout } = DefaultTheme

const { page, frontmatter, isDark } = useData()

// Provide dark mode state to all components
provide('isDark', isDark)

// Determine if we're on the home page
const isHome = computed(() => frontmatter.value.layout === 'home')

// Layout class for custom styling hooks
const layoutClass = computed(() => ({
  'layout-home': isHome.value,
  'layout-page': !isHome.value,
  'dark': isDark.value,
}))
</script>

<template>
  <div class="app-shell" :class="layoutClass">
    <!-- Default VitePress layout, but we replace the footer -->
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
}
</style>

