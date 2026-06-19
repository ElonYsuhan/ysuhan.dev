<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null = null
let animId = 0
let w = 0, h = 0

// ── State ──
let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 }
let scrollY = 0
let targetScrollY = 0
let pulses: { x: number; y: number; r: number; opacity: number }[] = []
let signals: { nodeIdx: number; progress: number; opacity: number }[] = []

// ── Colors ──
const C = {
  node: '184,161,120',     // warm bronze
  nodeAlt: '201,176,118',  // champagne
  edge: '184,161,120',
  pulse: '184,161,120',
}

// ── Network data ──
interface Node { x: number; y: number; ox: number; oy: number; r: number; phase: number; speed: number; amplitude: number }
interface Edge { a: number; b: number; phase: number }

let nodes: Node[] = []
let edges: Edge[] = []
let centerIdx = 0

function buildGraph() {
  nodes = []
  edges = []
  const cx = w / 2
  const cy = h * 0.42

  // Center node — double ring visual
  centerIdx = 0
  nodes.push({ x: cx, y: cy, ox: cx, oy: cy, r: 4, phase: Math.random() * Math.PI * 2, speed: 0.15, amplitude: 0 })

  // Ring 1: 6 nodes — Works
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI * 2 / 6) * i - Math.PI / 2
    const d = w * 0.11
    nodes.push({
      x: cx + Math.cos(angle) * d, y: cy + Math.sin(angle) * d,
      ox: cx + Math.cos(angle) * d, oy: cy + Math.sin(angle) * d,
      r: 1.6, phase: Math.random() * Math.PI * 2, speed: 0.04 + Math.random() * 0.03, amplitude: 0.6 + Math.random() * 1.2,
    })
    edges.push({ a: 0, b: nodes.length - 1, phase: Math.random() * Math.PI * 2 })
  }

  // Ring 2: 10 nodes — Modules
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI * 2 / 10) * i + (Math.random() - 0.5) * 0.25
    const d = w * 0.19 + Math.random() * w * 0.04
    const idx = nodes.length
    nodes.push({
      x: cx + Math.cos(angle) * d, y: cy + Math.sin(angle) * d,
      ox: cx + Math.cos(angle) * d, oy: cy + Math.sin(angle) * d,
      r: 1.1, phase: Math.random() * Math.PI * 2, speed: 0.02 + Math.random() * 0.02, amplitude: 0.4 + Math.random() * 0.8,
    })
    const c1 = 1 + Math.floor(Math.random() * 6)
    edges.push({ a: idx, b: c1, phase: Math.random() * Math.PI * 2 })
    if (Math.random() > 0.5) {
      const c2 = 1 + Math.floor(Math.random() * 6)
      if (c2 !== c1) edges.push({ a: idx, b: c2, phase: Math.random() * Math.PI * 2 })
    }
  }

  // Ring 3: 16 nodes — Systems
  for (let i = 0; i < 16; i++) {
    const angle = (Math.PI * 2 / 16) * i + (Math.random() - 0.5) * 0.3
    const d = w * 0.29 + Math.random() * w * 0.08
    const idx = nodes.length
    nodes.push({
      x: cx + Math.cos(angle) * d, y: cy + Math.sin(angle) * d,
      ox: cx + Math.cos(angle) * d, oy: cy + Math.sin(angle) * d,
      r: 0.8, phase: Math.random() * Math.PI * 2, speed: 0.015 + Math.random() * 0.015, amplitude: 0.3 + Math.random() * 0.5,
    })
    const ring2Start = 7
    const pool = nodes.length - 1 - ring2Start
    if (pool > 0) {
      const c = ring2Start + Math.floor(Math.random() * pool)
      edges.push({ a: idx, b: c, phase: Math.random() * Math.PI * 2 })
    }
  }
}

// ── Scroll → spread factor ──
function spreadFactor(): number {
  // 0 at top (compact), 1 when scrolled past hero
  return Math.min(1, Math.max(0, scrollY / (h * 0.8)))
}

// ── Visibility ──
let visible = true
function onVisibility() { visible = document.visibilityState === 'visible' }

// ── Resize ──
function resize() {
  if (!canvas.value) return
  w = window.innerWidth
  h = window.innerHeight
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.value.width = w * dpr
  canvas.value.height = h * dpr
  canvas.value.style.width = w + 'px'
  canvas.value.style.height = h + 'px'
  ctx = canvas.value.getContext('2d')!
  ctx.scale(dpr, dpr)
  buildGraph()
}

// ── Mouse ──
function onMouseMove(e: MouseEvent) { mouse.targetX = e.clientX; mouse.targetY = e.clientY }
function onClick(e: MouseEvent) {
  // Pulse
  pulses.push({ x: e.clientX, y: e.clientY, r: 0, opacity: 0.45 })
  if (pulses.length > 5) pulses.shift()

  // Signal propagation: find nearest node
  let nearest = 0, minD = Infinity
  for (let i = 0; i < nodes.length; i++) {
    const dx = nodes[i].x - e.clientX, dy = nodes[i].y - e.clientY
    const d = dx * dx + dy * dy
    if (d < minD) { minD = d; nearest = i }
  }
  // Initiate wave
  signals.push({ nodeIdx: nearest, progress: 0, opacity: 0.4 })
}
function onScroll() { targetScrollY = window.scrollY }

// ── Draw ──
function draw(time: number) {
  if (!ctx || !canvas.value) return
  ctx.clearRect(0, 0, w, h)

  if (!visible) { animId = requestAnimationFrame(draw); return }

  // Smooth state
  mouse.x += (mouse.targetX - mouse.x) * 0.06
  mouse.y += (mouse.targetY - mouse.y) * 0.06
  scrollY += (targetScrollY - scrollY) * 0.05
  const spread = spreadFactor()
  const t = time * 0.001
  const hoverR = 110
  const mx = mouse.x, my = mouse.y

  // ── Update node positions (drift) ──
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i]
    if (i === centerIdx) continue
    n.x = n.ox + Math.sin(t * n.speed + n.phase) * n.amplitude
    n.y = n.oy + Math.cos(t * n.speed * 0.7 + n.phase) * n.amplitude
    // Spread: nodes drift outward with scroll
    if (spread > 0) {
      const dx = n.ox - nodes[centerIdx].ox
      const dy = n.oy - nodes[centerIdx].oy
      n.x += dx * spread * 0.15
      n.y += dy * spread * 0.15
    }
  }

  // ── Center breathing ──
  const c = nodes[centerIdx]
  const breathe = 1 + Math.sin(t * 0.9) * 0.03
  const centerR = c.r * breathe
  const centerAlpha = 0.45 + Math.sin(t * 0.9) * 0.08

  // ── Compute hover brightness per node ──
  const hoverBright: number[] = nodes.map(n => {
    const dx = n.x - mx, dy = n.y - my
    const d = Math.sqrt(dx * dx + dy * dy)
    return Math.max(0, 1 - d / hoverR)
  })

  // ── Propagate signals ──
  const signalBright: number[] = new Array(nodes.length).fill(0)
  for (let s = signals.length - 1; s >= 0; s--) {
    const sig = signals[s]
    sig.progress += 0.008
    sig.opacity -= 0.0025
    if (sig.opacity <= 0) { signals.splice(s, 1); continue }

    // BFS one hop per progress step
    const hop = Math.floor(sig.progress)
    let frontier = [sig.nodeIdx]
    const visited = new Set<number>([sig.nodeIdx])
    for (let h = 0; h < hop; h++) {
      const next: number[] = []
      for (const fidx of frontier) {
        for (const e of edges) {
          const other = e.a === fidx ? e.b : e.b === fidx ? e.a : -1
          if (other >= 0 && !visited.has(other)) {
            visited.add(other)
            next.push(other)
          }
        }
      }
      frontier = next
    }
    for (const idx of visited) {
      signalBright[idx] = Math.max(signalBright[idx], sig.opacity * Math.max(0, 1 - (sig.progress % 1) * 0.3))
    }
  }

  // ── Draw edges ──
  for (const e of edges) {
    const a = nodes[e.a], b = nodes[e.b]
    const hb = Math.max(hoverBright[e.a], hoverBright[e.b])
    const sb = Math.max(signalBright[e.a], signalBright[e.b])
    const baseAlpha = 0.04 + Math.sin(t * 0.3 + e.phase) * 0.015
    const alpha = baseAlpha + hb * 0.12 + sb * 0.2

    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.strokeStyle = `rgba(${C.edge},${Math.min(0.3, alpha)})`
    ctx.lineWidth = 0.5
    ctx.stroke()
  }

  // ── Draw nodes ──
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i]
    const hb = hoverBright[i]
    const sb = signalBright[i]
    const alpha = i === centerIdx
      ? centerAlpha
      : 0.12 + n.amplitude * 0.08 + hb * 0.4 + sb * 0.5

    // Glow
    if (alpha > 0.08) {
      const glowR = i === centerIdx ? centerR * 5 : n.r * 5
      const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR)
      glow.addColorStop(0, `rgba(${C.node},${alpha * 0.5})`)
      glow.addColorStop(1, 'rgba(184,161,120,0)')
      ctx.beginPath()
      ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2)
      ctx.fillStyle = glow
      ctx.fill()
    }

    // Core
    ctx.beginPath()
    ctx.arc(n.x, n.y, i === centerIdx ? centerR : n.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${C.node},${Math.min(0.7, alpha + 0.2)})`
    ctx.fill()

    // Center outer ring
    if (i === centerIdx) {
      ctx.beginPath()
      ctx.arc(n.x, n.y, centerR * 1.8, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${C.node},${0.08 + Math.sin(t * 0.9 + Math.PI) * 0.03})`
      ctx.lineWidth = 1
      ctx.stroke()
    }
  }

  // ── Draw pulses ──
  for (let i = pulses.length - 1; i >= 0; i--) {
    const p = pulses[i]
    p.r += 2
    p.opacity -= 0.012
    if (p.opacity <= 0) { pulses.splice(i, 1); continue }
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${C.pulse},${p.opacity})`
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // ── Parallax ──
  if (canvas.value) {
    const px = (mx / w - 0.5) * 8
    const py = (my / h - 0.5) * 8
    canvas.value.style.transform = `translate(${px}px, ${py}px)`
  }

  animId = requestAnimationFrame(draw)
}

onMounted(() => {
  resize()
  animId = requestAnimationFrame(draw)
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('click', onClick)
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('click', onClick)
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
  <canvas ref="canvas" class="network-bg" />
</template>

<style>
.network-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  transition: transform 0.4s ease-out;
}
</style>

