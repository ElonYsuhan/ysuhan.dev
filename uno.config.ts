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
      accent: '#d4a574',
      'accent-hover': '#e0b989',
      'accent-dim': '#b8915e',
      'accent-subtle': 'rgba(212,165,116,0.08)',
      'bg-primary': '#0d0f12',
      'bg-secondary': '#15181d',
      'bg-elevated': '#1c2028',
      'text-primary': '#f5f5f5',
      'text-secondary': '#9ca3af',
      'text-tertiary': '#6b7280',
      'border-subtle': 'rgba(255,255,255,0.06)',
      'border-default': 'rgba(255,255,255,0.10)',
    },
    borderRadius: {
      sm: '12px',
      md: '20px',
      lg: '28px',
      pill: '999px',
    },
  },
})
