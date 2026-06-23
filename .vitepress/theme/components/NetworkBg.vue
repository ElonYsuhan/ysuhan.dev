<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null = null
let animId = 0
let w = 0, h = 0
let dpr = 1

// ── Colors ──
const C = '100,180,255'  // bright sky blue

// ── State ──
let mouse = { x: -500, y: -500, tx: -500, ty: -500 }
let visible = true

// ── Center of the "universe" ──
let centerX = 0
let centerY = 0

// ═══════════ Orbits & nodes ═══════════
interface OrbitNode { label: string; angle: number; orbit: number }
let orbitNodes: OrbitNode[] = []

const LABELS = ['Vue', 'Cesium', 'GIS', 'Engine', 'Open Source', 'Digital Twin']

function buildOrbits() {
  orbitNodes = []
  const orbits = [
    { rx: w * 0.20, ry: w * 0.06, nodes: [0.3, 0.7] },
    { rx: w * 0.30, ry: w * 0.10, nodes: [0.1, 0.55] },
    { rx: w * 0.40, ry: w * 0.14, nodes: [0.0, 0.45] },
  ]

  let li = 0
  for (const o of orbits) {
    for (const frac of o.nodes) {
      orbitNodes.push({
        label: LABELS[li % LABELS.length],
        angle: Math.PI * 2 * frac,
        orbit: orbits.indexOf(o),
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

  const orbits = [
    { rx: w * 0.20, ry: w * 0.06 },
    { rx: w * 0.30, ry: w * 0.10 },
    { rx: w * 0.40, ry: w * 0.14 },
  ]
  const mouseDistFromCenter = Math.hypot(mouse.x - centerX, mouse.y - centerY)

  // ═══════════ Layer 1: Grid ═══════════
  const gridSpacing = 140
  ctx.strokeStyle = `rgba(${C},0.03)`
  ctx.lineWidth = 0.3
  ctx.beginPath()
  for (let x = gridSpacing; x < w; x += gridSpacing) {
    ctx.moveTo(x, 0); ctx.lineTo(x, h)
  }
  for (let y = gridSpacing; y < h; y += gridSpacing) {
    ctx.moveTo(0, y); ctx.lineTo(w, y)
  }
  ctx.stroke()

  // Latitude arcs
  for (let i = 0; i < 2; i++) {
    const r = w * (0.10 + i * 0.08)
    ctx.beginPath()
    ctx.arc(centerX, centerY, r, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${C},0.04)`
    ctx.lineWidth = 0.3
    ctx.stroke()
  }

  // ═══════════ Layer 2: Orbits ═══════════
  for (const o of orbits) {
    const avgR = (o.rx + o.ry) / 2
    const distFromOrbit = Math.abs(mouseDistFromCenter - avgR)
    const orbitGlow = Math.max(0, 1 - distFromOrbit / 120)

    ctx.beginPath()
    ctx.ellipse(centerX, centerY, o.rx, o.ry, 0, 0, Math.PI * 2)
    const orbitAlpha = 0.06 + orbitGlow * 0.1
    ctx.strokeStyle = `rgba(${C},${orbitAlpha})`
    ctx.lineWidth = 0.5 + orbitGlow * 0.8
    ctx.stroke()
  }

  // ═══════════ Layer 3: Nodes (on orbits, no drift off) ═══════════
  for (const node of orbitNodes) {
    // Nodes stay exactly on the orbit — angle only changes with time for slow orbit animation
    // but we keep them on the ellipse by using the proper parametric equation
    const t = time * 0.0001  // barely perceptible drift
    const o = orbits[node.orbit]
    // Point on ellipse: x = cx + rx*cos(θ), y = cy + ry*sin(θ)
    const angle = node.angle + t
    const x = centerX + Math.cos(angle) * o.rx
    const y = centerY + Math.sin(angle) * o.ry

    const dx = x - mouse.x, dy = y - mouse.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const hoverGlow = Math.max(0, 1 - dist / 160)

    const baseAlpha = 0.3
    const alpha = baseAlpha + hoverGlow * 0.4

    // Glow
    const glowR = 16 + hoverGlow * 14
    const glow = ctx!.createRadialGradient(x, y, 0, x, y, glowR)
    glow.addColorStop(0, `rgba(${C},${alpha * 0.7})`)
    glow.addColorStop(1, `rgba(${C},0)`)
    ctx!.beginPath()
    ctx!.arc(x, y, glowR, 0, Math.PI * 2)
    ctx!.fillStyle = glow
    ctx!.fill()

    // Core dot
    ctx!.beginPath()
    ctx!.arc(x, y, 1.4 + hoverGlow, 0, Math.PI * 2)
    ctx!.fillStyle = `rgba(${C},${Math.min(0.7, alpha + 0.2)})`
    ctx!.fill()

    // Label — always visible on desktop, placed outside the orbit
    if (w >= 768) {
      const isDark = document.documentElement.classList.contains('dark')
      const textColor = isDark ? '255,255,255' : '20,20,20'
      const shadowColor = isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)'
      const labelAlpha = Math.min(0.9, 0.35 + hoverGlow * 0.4)
      // Push label radially outward from center
      const dirX = (x - centerX) / (o.rx || 1)
      const dirY = (y - centerY) / (o.ry || 1)
      const dist = Math.sqrt(dirX * dirX + dirY * dirY) || 1
      const nx = dirX / dist
      const ny = dirY / dist
      const labelX = x + nx * 42
      const labelY = y + ny * 42
      ctx!.font = '600 11px Inter, sans-serif'
      ctx!.textAlign = 'center'
      ctx!.shadowColor = shadowColor
      ctx!.shadowBlur = 4
      ctx!.fillStyle = `rgba(${textColor},${labelAlpha})`
      ctx!.fillText(node.label, labelX, labelY)
      ctx!.shadowBlur = 0
    }
  }

  // ── Parallax ──
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
