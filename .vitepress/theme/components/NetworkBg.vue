<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null = null
let animId = 0
let w = 0, h = 0
let dpr = 1
let isMobile = false

// ── Colors ──
const C = {
  gold: '212,165,116',       // #D4A574
  goldLight: '232,213,183',  // #E8D5B7
}

// ── State ──
let mouse = { x: -500, y: -500, tx: -500, ty: -500 }
let scrollY = 0
let targetScrollY = 0
let visible = true
let loadProgress = 0  // 0→1 over 1.5s
const loadStart = performance.now()
const LOAD_DURATION = 1500
const HOVER_RADIUS = 150

// ═══════════ Layer 1: Noise particles ═══════════
interface Particle {
  x: number; y: number; r: number; phase: number; speed: number
}
let particles: Particle[] = []

function buildParticles() {
  particles = []
  const count = isMobile ? 30 : 60
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.2 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.7,
    })
  }
}

// ═══════════ Layer 2: Constellation nodes ═══════════
interface Star {
  x: number; y: number; ox: number; oy: number; r: number; label: string
  phase: number; speed: number; amplitude: number
}
let stars: Star[] = []
let starLinks: [number, number][] = []

const STAR_LABELS = [
  'Vue', 'TypeScript', 'Cesium', 'WebGIS',
  'Digital Twin', 'Open Source', 'Engine', 'AI',
  'Scenario', 'Architecture', 'ECS', 'DSL',
  'Simulation', 'GIS SDK', 'C2', 'Timeline',
]

function buildConstellation() {
  stars = []
  starLinks = []
  const cx = w / 2
  const cy = h * 0.4
  const count = isMobile ? 10 : 16
  const labels = shuffle([...STAR_LABELS]).slice(0, count)

  // Place stars in irregular but aesthetically pleasing positions
  // They form a loose cluster around the center, not uniform
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.6
    // Vary distance significantly — some close, some far
    const distBase = w * 0.12 + Math.random() * w * 0.22
    const ox = cx + Math.cos(angle) * distBase
    const oy = cy + Math.sin(angle) * distBase * 0.6
    stars.push({
      x: ox, y: oy,
      ox, oy,
      r: 1 + Math.random() * 3,
      label: labels[i],
      phase: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.02,
      amplitude: 0.3 + Math.random() * 1.0,
    })
  }

  // Connect nearby stars only (not full mesh)
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].ox - stars[j].ox
      const dy = stars[i].oy - stars[j].oy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < w * 0.18 && Math.random() > 0.4) {
        starLinks.push([i, j])
      }
    }
  }
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// ═══════════ Layer 3: Growth path (bezier curves) ═══════════
// Representing: Frontend → Vue → GIS → Cesium → Digital Twin → Engine → Scenario
interface PathPoint { x: number; y: number; label: string }
let growthPath: PathPoint[] = []

function buildGrowthPath() {
  const cx = w / 2
  const cy = h * 0.4
  // Path flows from left/bottom toward the center (logo area)
  // Each point is a milestone along the journey
  growthPath = [
    { x: cx - w * 0.18, y: cy + h * 0.22,  label: 'Frontend' },
    { x: cx - w * 0.12, y: cy + h * 0.14,  label: 'Vue' },
    { x: cx - w * 0.06, y: cy + h * 0.1,   label: 'GIS' },
    { x: cx - w * 0.01, y: cy + h * 0.06,  label: 'Cesium' },
    { x: cx + w * 0.04, y: cy + h * 0.02,  label: 'Digital\nTwin' },
    { x: cx + w * 0.08, y: cy - h * 0.04,  label: 'Engine' },
    { x: cx + w * 0.10, y: cy - h * 0.10,  label: 'Scenario' },
  ]
}

// ═══════════ Render ═══════════
function draw(time: number) {
  if (!ctx || !canvas.value) return
  ctx.clearRect(0, 0, w, h)

  if (!visible) { animId = requestAnimationFrame(draw); return }

  // Smooth state
  mouse.x += (mouse.tx - mouse.x) * 0.05
  mouse.y += (mouse.ty - mouse.y) * 0.05
  scrollY += (targetScrollY - scrollY) * 0.04
  const t = time * 0.001
  const mx = mouse.x
  const my = mouse.y

  // Load progress (0→1)
  loadProgress = Math.min(1, (time - loadStart) / LOAD_DURATION)

  // ── Compute per-star hover brightness ──
  const hoverBright: number[] = stars.map(s => {
    const dx = s.x - mx, dy = s.y - my
    return Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / HOVER_RADIUS)
  })

  // ── Update star positions (subtle drift + scroll parallax) ──
  const parallax = scrollY * 0.03
  for (const s of stars) {
    s.x = s.ox + Math.sin(t * s.speed + s.phase) * s.amplitude
    s.y = s.oy + Math.cos(t * s.speed * 0.6 + s.phase) * s.amplitude
    s.y += parallax * (1 - s.oy / h) // slight parallax
  }
  for (const p of particles) {
    p.y += parallax * 0.5
    if (p.y > h + 10) { p.y = -10; p.x = Math.random() * w }
    if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w }
  }
  for (const gp of growthPath) {
    gp.y += parallax * 0.6
  }

  // ═══════════ Draw Layer 1: Noise particles ═══════════
  for (const p of particles) {
    const twinkle = 0.3 + 0.7 * Math.abs(Math.sin(t * 0.8 + p.phase))
    const alpha = twinkle * 0.15 * loadProgress
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${C.gold},${alpha})`
    ctx.fill()
  }

  // ═══════════ Draw Layer 3: Growth path (under stars) ═══════════
  if (growthPath.length > 1 && loadProgress > 0.1) {
    ctx.save()
    // Draw bezier curves connecting path points
    for (let i = 0; i < growthPath.length - 1; i++) {
      const a = growthPath[i]
      const b = growthPath[i + 1]
      const cp1x = a.x + (b.x - a.x) * 0.35
      const cp1y = a.y
      const cp2x = a.x + (b.x - a.x) * 0.65
      const cp2y = b.y

      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, b.x, b.y)
      // Fade in progressively along the path
      const segProgress = Math.max(0, Math.min(1, (loadProgress - 0.1 - i * 0.1) / 0.5))
      ctx.strokeStyle = `rgba(${C.goldLight},${0.06 * segProgress})`
      ctx.lineWidth = 0.6
      ctx.stroke()

      // Small dot at each waypoint
      const alpha = 0.15 * segProgress
      ctx.beginPath()
      ctx.arc(b.x, b.y, 1.2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${C.gold},${alpha})`
      ctx.fill()
    }
    ctx.restore()
  }

  // ═══════════ Draw Layer 2: Constellation links ═══════════
  if (!isMobile && loadProgress > 0.2) {
    for (const [ai, bi] of starLinks) {
      const a = stars[ai], b = stars[bi]
      const hb = Math.max(hoverBright[ai], hoverBright[bi])
      const distMidX = (a.x + b.x) / 2
      const distMidY = (a.y + b.y) / 2
      const distFromMouse = Math.hypot(distMidX - mx, distMidY - my)
      const mouseGlow = Math.max(0, 1 - distFromMouse / HOVER_RADIUS)
      const linkAlpha = 0.04 + mouseGlow * 0.08
      const linkOpacity = Math.min(0.15, linkAlpha * loadProgress)

      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.strokeStyle = `rgba(${C.gold},${linkOpacity})`
      ctx.lineWidth = 0.4 + mouseGlow * 0.4
      ctx.stroke()
    }
  }

  // ═══════════ Draw Layer 2: Constellation stars ═══════════
  stars.forEach((s, i) => {
    const hb = hoverBright[i]
    const nodeProgress = Math.max(0, Math.min(1, (loadProgress - i * 0.06)))
    if (nodeProgress <= 0) return

    const baseAlpha = 0.25
    const hoverAlpha = hb * 0.35
    const alpha = (baseAlpha + hoverAlpha) * nodeProgress

    // Glow
    if (alpha > 0.05) {
      const glowR = s.r * 5 + hb * 8
      const glow = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR)
      glow.addColorStop(0, `rgba(${C.gold},${alpha * 0.8})`)
      glow.addColorStop(1, `rgba(${C.gold},0)`)
      ctx!.beginPath()
      ctx!.arc(s.x, s.y, glowR, 0, Math.PI * 2)
      ctx!.fillStyle = glow
      ctx!.fill()
    }

    // Core
    ctx!.beginPath()
    ctx!.arc(s.x, s.y, s.r + hb * 1.5, 0, Math.PI * 2)
    ctx!.fillStyle = `rgba(${C.gold},${Math.min(0.8, alpha + 0.25)})`
    ctx!.fill()

    // Label (only on hover or if prominent)
    if (hb > 0.5 || s.r > 2) {
      const labelAlpha = Math.max(0.3, hb) * nodeProgress
      ctx!.font = `${10}px Inter, sans-serif`
      ctx!.fillStyle = `rgba(${C.gold},${labelAlpha})`
      ctx!.textAlign = 'center'
      ctx!.fillText(s.label, s.x, s.y - s.r - 8)
    }
  })

  // ── Subtle canvas parallax ──
  if (canvas.value) {
    const px = (mx / w - 0.5) * 4
    const py = (my / h - 0.5) * 4
    canvas.value.style.transform = `translate(${px}px, ${py}px)`
  }

  animId = requestAnimationFrame(draw)
}

// ═══════════ Event handlers ═══════════
function resize() {
  if (!canvas.value) return
  w = window.innerWidth
  h = window.innerHeight
  isMobile = w < 768
  dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2)
  canvas.value.width = w * dpr
  canvas.value.height = h * dpr
  canvas.value.style.width = w + 'px'
  canvas.value.style.height = h + 'px'
  ctx = canvas.value.getContext('2d')!
  ctx.scale(dpr, dpr)
  buildParticles()
  buildConstellation()
  buildGrowthPath()
}

function onMouseMove(e: MouseEvent) { mouse.tx = e.clientX; mouse.ty = e.clientY }
function onScroll() { targetScrollY = window.scrollY }
function onVisibility() { visible = document.visibilityState === 'visible' }

onMounted(() => {
  resize()
  animId = requestAnimationFrame(draw)
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
  <canvas ref="canvas" class="universe-bg" />
</template>

<style>
.universe-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  transition: transform 0.4s ease-out;
}
</style>
