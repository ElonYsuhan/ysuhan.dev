<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null = null
let animId = 0
let w = 0, h = 0
let dpr = 1

// ── Colors ──
const GOLD = '212,165,116'  // #D4A574

// ── State ──
let mouse = { x: -500, y: -500, tx: -500, ty: -500 }
let visible = true
let t = 0

// ── Center of the "universe" — where the logo is ──
let centerX = 0
let centerY = 0

// ═══════════ Orbital arcs — labels placed on arcs ═══════════
interface OrbitNode { label: string; angle: number; orbit: number; ox: number; oy: number }
let orbitNodes: OrbitNode[] = []

const LABELS = ['Vue', 'Cesium', 'GIS', 'Engine', 'Open Source', 'Digital Twin']

function buildOrbits() {
  orbitNodes = []
  // 3 elliptical orbits with different sizes and tilts
  // Each orbit gets 2 labels at different angles
  const orbits = [
    { rx: w * 0.16, ry: w * 0.10, tilt: -0.15, nodes: [0.3, 0.7] },
    { rx: w * 0.24, ry: w * 0.14, tilt: 0.1,  nodes: [0.1, 0.55] },
    { rx: w * 0.32, ry: w * 0.18, tilt: -0.05, nodes: [0.0, 0.45] },
  ]

  let li = 0
  for (const o of orbits) {
    for (const angleFrac of o.nodes) {
      const angle = Math.PI * 2 * angleFrac + o.tilt
      orbitNodes.push({
        label: LABELS[li % LABELS.length],
        angle,
        orbit: orbits.indexOf(o),
        ox: centerX + Math.cos(angle) * o.rx,
        oy: centerY + Math.sin(angle) * o.ry,
      })
      li++
    }
  }
}

// ═══════════ Render ═══════════
function draw(time: number) {
  if (!ctx || !canvas.value) return
  ctx.clearRect(0, 0, w, h)
  if (!visible) { animId = requestAnimationFrame(draw); return }

  mouse.x += (mouse.tx - mouse.x) * 0.04
  mouse.y += (mouse.ty - mouse.y) * 0.04
  t = time * 0.001

  const orbits = [
    { rx: w * 0.16, ry: w * 0.10, tilt: -0.15 },
    { rx: w * 0.24, ry: w * 0.14, tilt: 0.1 },
    { rx: w * 0.32, ry: w * 0.18, tilt: -0.05 },
  ]

  // ═══════════ Layer 1: Spatial coordinate grid (ultra-faint) ═══════════
  const gridSpacing = 140
  ctx.strokeStyle = `rgba(${GOLD},0.018)`
  ctx.lineWidth = 0.25
  ctx.beginPath()
  for (let x = gridSpacing; x < w; x += gridSpacing) {
    ctx.moveTo(x, 0); ctx.lineTo(x, h)
  }
  for (let y = gridSpacing; y < h; y += gridSpacing) {
    ctx.moveTo(0, y); ctx.lineTo(w, y)
  }
  ctx.stroke()

  // A few subtle "latitude" arcs near center
  for (let i = 0; i < 2; i++) {
    const r = w * (0.10 + i * 0.08)
    ctx.beginPath()
    ctx.arc(centerX, centerY, r, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${GOLD},0.025)`
    ctx.lineWidth = 0.25
    ctx.stroke()
  }

  // ═══════════ Layer 2: Orbital arcs ═══════════
  for (const o of orbits) {
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(o.tilt)
    ctx.beginPath()
    ctx.ellipse(0, 0, o.rx, o.ry, 0, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${GOLD},0.05)`
    ctx.lineWidth = 0.5
    ctx.stroke()
    ctx.restore()
  }

  // ═══════════ Layer 3: Nodes on orbits ═══════════
  for (const node of orbitNodes) {
    const o = orbits[node.orbit]
    const angle = node.angle + t * 0.03  // very slow orbit drift
    const x = centerX + Math.cos(angle) * o.rx
    const y = centerY + Math.sin(angle) * o.ry

    // Distance from mouse
    const dx = x - mouse.x, dy = y - mouse.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const hoverGlow = Math.max(0, 1 - dist / 160)

    const baseAlpha = 0.25
    const alpha = baseAlpha + hoverGlow * 0.3

    // Glow
    const glowR = 16 + hoverGlow * 14
    const glow = ctx!.createRadialGradient(x, y, 0, x, y, glowR)
    glow.addColorStop(0, `rgba(${GOLD},${alpha * 0.7})`)
    glow.addColorStop(1, `rgba(${GOLD},0)`)
    ctx!.beginPath()
    ctx!.arc(x, y, glowR, 0, Math.PI * 2)
    ctx!.fillStyle = glow
    ctx!.fill()

    // Core dot
    ctx!.beginPath()
    ctx!.arc(x, y, 1.4 + hoverGlow, 0, Math.PI * 2)
    ctx!.fillStyle = `rgba(${GOLD},${Math.min(0.7, alpha + 0.2)})`
    ctx!.fill()

    // Label on hover or if nearby
    if (hoverGlow > 0.3) {
      ctx!.font = '10px Inter, sans-serif'
      ctx!.fillStyle = `rgba(${GOLD},${hoverGlow})`
      ctx!.textAlign = 'center'
      ctx!.fillText(node.label, x, y - 12)
    }
  }

  // ── Subtle parallax ──
  if (canvas.value) {
    const px = (mouse.x / w - 0.5) * 6
    const py = (mouse.y / h - 0.5) * 6
    canvas.value.style.transform = `translate(${px}px, ${py}px)`
  }

  animId = requestAnimationFrame(draw)
}

// ═══════════ Events ═══════════
function resize() {
  if (!canvas.value) return
  w = window.innerWidth
  h = window.innerHeight
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.value.width = w * dpr
  canvas.value.height = h * dpr
  canvas.value.style.width = w + 'px'
  canvas.value.style.height = h + 'px'
  ctx = canvas.value.getContext('2d')!
  ctx.scale(dpr, dpr)
  centerX = w / 2
  centerY = h * 0.38
  buildOrbits()
}

function onMouseMove(e: MouseEvent) { mouse.tx = e.clientX; mouse.ty = e.clientY }
function onVisibility() { visible = document.visibilityState === 'visible' }

onMounted(() => {
  resize()
  animId = requestAnimationFrame(draw)
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouseMove)
  document.addEventListener('visibilitychange', onVisibility)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMouseMove)
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
