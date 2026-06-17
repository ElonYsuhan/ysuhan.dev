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
    presetIcons({ scale: 1.2 }),
    presetTypography(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      gold: '#d4a574',
      'gold-hover': '#e0b989',
      'gold-dim': '#b8915e',
      'gold-subtle': 'rgba(212,165,116,0.08)',
      'bg-base': '#080808',
      'bg-surface': '#0d0d0d',
      'bg-elevated': '#111111',
      'text-primary': '#ececec',
      'text-secondary': '#999999',
      'text-tertiary': '#666666',
      'border-subtle': 'rgba(255,255,255,0.06)',
      'border-default': 'rgba(255,255,255,0.08)',
    },
  },
})

