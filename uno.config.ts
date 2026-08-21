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
    // UnoCSS utility palette — mirrors .vitepress/theme/styles/custom.css dark
    // tokens for parity. Light theme is handled via CSS variables in
    // custom.css; Uno colors are currently unused by utility classes, so the
    // light palette is intentionally not duplicated here.
    colors: {
      accent: '#22d3ee',
      'accent-hover': '#67e8f9',
      'accent-dim': '#0891b2',
      'accent-subtle': 'rgba(34,211,238,0.08)',
      'bg-primary': '#05070d',
      'bg-secondary': '#0a0f1a',
      'bg-elevated': '#101725',
      'text-primary': '#eaf4ff',
      'text-secondary': '#9db4cc',
      'text-tertiary': '#6f8fae',
      'border-subtle': 'rgba(34,211,238,0.1)',
      'border-default': 'rgba(34,211,238,0.14)',
    },
    borderRadius: {
      sm: '12px',
      md: '20px',
      lg: '28px',
      pill: '999px',
    },
  },
})
