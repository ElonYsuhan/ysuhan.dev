<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null = null
let animId = 0
let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 }
let clickRipples: { x: number; y: number; r: number; opacity: number; color: string }[] = []

const rippleColors = [
  'rgba(212,165,116,',   // warm gold
  'rgba(200,180,140,',   // champagne
  'rgba(180,150,110,',   // bronze
  'rgba(220,190,150,',   // light amber
  'rgba(190,160,130,',   // muted tan
  'rgba(210,175,135,',   // honey
]

interface Node {
  x: number; y: number; ox: number; oy: number; r: number; opacity: number
  hoverOpacity: number; connections: number[]
}
interface Edge { a: number; b: number }

let nodes: Node[] = []
let edges: Edge[] = []
let w = 0, h = 0

function buildGraph() {
  nodes = []
  edges = []
  const cx = w / 2
  const cy = h / 2

  // Central node
  nodes.push({ x: cx, y: cy, ox: cx, oy: cy, r: 3, opacity: 0.5, hoverOpacity: 0.5, connections: [] })

  // Ring 1: 6 nodes
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI * 2 / 6) * i - Math.PI / 2
    const dist = w * 0.12 + Math.random() * w * 0.04
    nodes.push({
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist,
      ox: cx + Math.cos(angle) * dist,
      oy: cy + Math.sin(angle) * dist,
      r: 1.8,
      opacity: 0.25 + Math.random() * 0.15,
      hoverOpacity: 0.25 + Math.random() * 0.15,
      connections: [0],
    })
    edges.push({ a: 0, b: nodes.length - 1 })
  }

  // Ring 2: 10 nodes
  const ring1Start = 1
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI * 2 / 10) * i + Math.random() * 0.3
    const dist = w * 0.2 + Math.random() * w * 0.08
    const idx = nodes.length
    nodes.push({
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist,
      ox: cx + Math.cos(angle) * dist,
      oy: cy + Math.sin(angle) * dist,
      r: 1.2,
      opacity: 0.12 + Math.random() * 0.1,
      hoverOpacity: 0.12 + Math.random() * 0.1,
      connections: [],
    })
    // Connect to 1-2 ring 1 nodes
    const c1 = ring1Start + Math.floor(Math.random() * 6)
    const c2 = ring1Start + Math.floor(Math.random() * 6)
    edges.push({ a: idx, b: c1 })
    if (c2 !== c1) edges.push({ a: idx, b: c2 })
  }

  // Outer ring: 16 scattered nodes
  for (let i = 0; i < 16; i++) {
    const angle = (Math.PI * 2 / 16) * i + Math.random() * 0.4
    const dist = w * 0.3 + Math.random() * w * 0.12
    const idx = nodes.length
    nodes.push({
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist,
      ox: cx + Math.cos(angle) * dist,
      oy: cy + Math.sin(angle) * dist,
      r: 0.9,
      opacity: 0.06 + Math.random() * 0.08,
      hoverOpacity: 0.06 + Math.random() * 0.08,
      connections: [],
    })
    // Connect to 1-2 previous nodes
    const poolStart = 7 // ring 2 start
    const poolEnd = idx - 1
    if (poolEnd >= poolStart) {
      const c = poolStart + Math.floor(Math.random() * (poolEnd - poolStart + 1))
      edges.push({ a: idx, b: c })
    }
  }
}

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

function dist(a: Node, b: { x: number; y: number }) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

function draw() {
  if (!ctx || !canvas.value) return
  ctx.clearRect(0, 0, w, h)

  // Smooth mouse follow
  mouse.x += (mouse.targetX - mouse.x) * 0.08
  mouse.y += (mouse.targetY - mouse.y) * 0.08

  const mx = mouse.x
  const my = mouse.y
  const hoverR = 120

  // Update node hover states
  for (const n of nodes) {
    const d = dist(n, { x: mx, y: my })
    const t = Math.max(0, 1 - d / hoverR)
    n.hoverOpacity += (n.opacity + t * 0.6 - n.hoverOpacity) * 0.1
  }

  // Update + draw ripples
  clickRipples = clickRipples.filter(r => r.opacity > 0)
  for (const r of clickRipples) {
    r.r += 2.5
    r.opacity -= 0.015
    ctx.beginPath()
    ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2)
    ctx.strokeStyle = `${r.color}${r.opacity})`
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // Draw edges
  for (const e of edges) {
    const a = nodes[e.a], b = nodes[e.b]
    const avgOpacity = (a.hoverOpacity + b.hoverOpacity) / 2
    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.strokeStyle = `rgba(212,165,116,${0.04 + avgOpacity * 0.15})`
    ctx.lineWidth = 0.5
    ctx.stroke()
  }

  // Draw nodes
  for (const n of nodes) {
    // Glow
    const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4)
    glow.addColorStop(0, `rgba(212,165,116,${n.hoverOpacity * 0.5})`)
    glow.addColorStop(1, 'rgba(212,165,116,0)')
    ctx.beginPath()
    ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2)
    ctx.fillStyle = glow
    ctx.fill()

    // Core
    ctx.beginPath()
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(212,165,116,${0.3 + n.hoverOpacity * 1.2})`
    ctx.fill()
  }

  // Subtle drift
  const t = performance.now() * 0.0001
  for (let i = 1; i < nodes.length; i++) {
    const n = nodes[i]
    n.x = n.ox + Math.sin(t + i * 0.7) * 3
    n.y = n.oy + Math.cos(t + i * 0.5) * 3
  }
  // Center stays still
  nodes[0].x = nodes[0].ox
  nodes[0].y = nodes[0].oy

  animId = requestAnimationFrame(draw)
}

function onMove(e: MouseEvent) {
  mouse.targetX = e.clientX
  mouse.targetY = e.clientY
}
function onClick(e: MouseEvent) {
  const color = rippleColors[Math.floor(Math.random() * rippleColors.length)]
  clickRipples.push({ x: e.clientX, y: e.clientY, r: 0, opacity: 0.5, color })
  if (clickRipples.length > 5) clickRipples.shift()
}
function onParallax(e: MouseEvent) {
  // Subtle shift of entire canvas
  if (!canvas.value) return
  const px = (e.clientX / w - 0.5) * 16
  const py = (e.clientY / h - 0.5) * 16
  canvas.value.style.transform = `translate(${px}px, ${py}px)`
}

onMounted(() => {
  resize()
  draw()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mousemove', onParallax)
  window.addEventListener('click', onClick)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mousemove', onParallax)
  window.removeEventListener('click', onClick)
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
  transition: transform 0.3s ease-out;
}
</style>

