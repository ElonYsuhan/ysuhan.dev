<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

const { Layout: DefaultLayout } = DefaultTheme
</script>

<template>
  <DefaultLayout>
    <template #layout-top>
      <CustomNav />
    </template>
    <template #doc-footer-before>
      <slot name="doc-footer-before" />
    </template>
    <template #layout-bottom>
      <CustomFooter />
    </template>
  </DefaultLayout>
</template>
