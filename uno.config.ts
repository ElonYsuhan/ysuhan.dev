import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import presetTypography from '@unocss/preset-typography'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: [
    {
      'btn': 'inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-medium transition-all duration-200 cursor-pointer no-underline select-none',
      'btn-primary': 'btn bg-brand text-white hover:bg-brand-hover shadow-sm hover:shadow-md',
      'btn-outline': 'btn border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800',
      'card': 'rounded-xl bg-card border border-card-border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
      'section': 'max-w-7xl mx-auto px-6 py-16 sm:px-8',
      'section-title': 'text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8',
      'gradient-text': 'bg-gradient-to-r from-brand to-brand-alt bg-clip-text text-transparent',
    },
  ],
  theme: {
    colors: {
      brand: '#2563eb',
      'brand-hover': '#1d4ed8',
      'brand-alt': '#7c3aed',
      'brand-light': '#dbeafe',
      'brand-dark': '#1e3a5f',
      card: 'var(--vp-c-bg-soft)',
      'card-border': 'var(--vp-c-bg-soft-up)',
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
})

