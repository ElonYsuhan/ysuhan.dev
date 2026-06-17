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
  shortcuts: {
    'btn': 'inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-medium transition-all duration-200 cursor-pointer no-underline select-none',
    'btn-primary': 'btn bg-gradient-to-r from-cyan-400 to-cyan-500 text-black hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:-translate-y-0.5',
    'btn-outline': 'btn border border-cyan-500/25 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,229,255,0.25)]',
    'card': 'rounded-xl bg-[rgba(10,14,23,0.6)] backdrop-blur-md border border-cyan-500/10 p-6 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_25px_rgba(0,229,255,0.1)] hover:-translate-y-1',
    'section': 'max-w-7xl mx-auto px-6 py-16 sm:px-8',
    'section-title': 'text-3xl sm:text-4xl font-bold text-[#e0e8f0] mb-8',
    'gradient-text': 'bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent',
    'glow-text': 'text-cyan-400 [text-shadow:0_0_20px_rgba(0,229,255,0.3)]',
  },
  theme: {
    colors: {
      brand: '#00e5ff',
      'brand-hover': '#00b8d4',
      'brand-alt': '#b44dff',
      'brand-light': 'rgba(0,229,255,0.12)',
      'brand-dark': '#0a1628',
      card: 'rgba(10,14,23,0.6)',
      'card-border': 'rgba(0,229,255,0.1)',
      surface: 'rgba(10,14,23,0.5)',
      bg: '#0a0a0f',
      'bg-alt': '#0d1117',
      'text-primary': '#e0e8f0',
      'text-dim': '#60758a',
    },
  },
})

