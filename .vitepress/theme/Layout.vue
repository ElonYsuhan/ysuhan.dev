<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import VoiceChat from './components/VoiceChat.vue'

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

  <VoiceChat />
</template>
