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
      accent: '#00e5ff',
      'accent-hover': '#67f0ff',
      'accent-dim': '#00b8d4',
      'accent-subtle': 'rgba(0,229,255,0.08)',
      'bg-primary': '#05070d',
      'bg-secondary': '#0a0f1a',
      'bg-elevated': '#101725',
      'text-primary': '#eaf4ff',
      'text-secondary': '#9db4cc',
      'text-tertiary': '#5f7c99',
      'border-subtle': 'rgba(148,197,255,0.08)',
      'border-default': 'rgba(148,197,255,0.12)',
    },
    borderRadius: {
      sm: '12px',
      md: '20px',
      lg: '28px',
      pill: '999px',
    },
  },
})
