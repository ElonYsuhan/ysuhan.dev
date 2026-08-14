<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null = null
let animId = 0
let w = 0, h = 0
let dpr = 1

// ── Colors (per theme — reassigned in draw) ──
let C = '34,211,238'       // dark: cyan (matches --accent #22d3ee)
const C_LIGHT = '14,116,144' // light: deep cyan-teal (matches --accent #0e7490)
let STAR_C = '190,232,255'  // dark: pale blue-white
const STAR_C_LIGHT = '71,105,140' // light: slate blue
let VIG_RGB = '2,4,10'      // dark vignette
let VIG_A = 0.5
const VIG_LIGHT_A = 0.12

// ── State ──
let mouse = { x: -500, y: -500, tx: -500, ty: -500 }
let visible = true

// ── Starfield ──
interface Star { x: number; y: number; r: number; phase: number; speed: number }
let stars: Star[] = []

function buildStars() {
  stars = []
  const count = Math.min(180, Math.floor((w * h) / 8000))
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.3 + Math.random() * 0.9,
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 1.6,
    })
  }
}

// ── Center of the "universe" ──
let centerX = 0
let centerY = 0

// ═══════════ Orbits & nodes ═══════════
interface OrbitNode {
  label: string
  angle: number      // base angle on the (unrotated) orbit ellipse
  orbit: number      // orbit index 0..2
  speed: number      // angular speed (rad/ms) — differential rotation
  trail: { x: number; y: number }[]
  maxTrail: number
}
let orbitNodes: OrbitNode[] = []

const LABELS = ['Vue', 'Cesium', 'GIS', 'Engine', 'Open Source', 'Digital Twin']

// Differential rotation: inner orbits revolve faster than outer ones (Kepler-like).
// Full revolution: orbit 0 ≈ 45s, orbit 1 ≈ 70s, orbit 2 ≈ 110s.
const ORBIT_SPEEDS = [
  (Math.PI * 2) / 45000,
  (Math.PI * 2) / 70000,
  (Math.PI * 2) / 110000,
]
// Slow precession of each orbit plane's major axis (~150–240s per revolution),
// giving the whole system a gentle "holographic solar system" wobble.
const PRECESSION_SPEEDS = [
  (Math.PI * 2) / 150000,
  (Math.PI * 2) / 190000,
  (Math.PI * 2) / 240000,
]
// Energy-flow speed along orbit lines (px/ms of dash offset).
const FLOW_SPEEDS = [0.02, 0.014, 0.01]
// Radar sweep speed (rad/ms) — one revolution ≈ 7.85s.
const SWEEP_SPEED = 0.0008
// Trail history budget — faster nodes leave longer comet tails.
const TRAIL_FACTOR = 380000

const isMobile = () => w < 768

function buildOrbits() {
  orbitNodes = []
  const orbitFracs = [
    [0.3, 0.7],
    [0.1, 0.55],
    [0.0, 0.45],
  ]
  let li = 0
  for (let oi = 0; oi < orbitFracs.length; oi++) {
    for (const frac of orbitFracs[oi]) {
      orbitNodes.push({
        label: LABELS[li % LABELS.length],
        angle: Math.PI * 2 * frac,
        orbit: oi,
        speed: ORBIT_SPEEDS[oi] * (0.92 + Math.random() * 0.16),
        trail: [],
        maxTrail: Math.max(6, Math.round(ORBIT_SPEEDS[oi] * TRAIL_FACTOR * (isMobile() ? 0.5 : 1))),
      })
      li++
    }
  }
}

// Point on a precessing orbit ellipse — shared by orbit drawing, links and nodes,
// so nodes can never drift off their tracks.
function orbitPoint(o: { rx: number; ry: number }, angle: number, phi: number) {
  const lx = Math.cos(angle) * o.rx
  const ly = Math.sin(angle) * o.ry
  const cos = Math.cos(phi)
  const sin = Math.sin(phi)
  return {
    x: centerX + lx * cos - ly * sin,
    y: centerY + lx * sin + ly * cos,
  }
}

// ═══════════ Render ═══════════
function draw(time: number) {
  if (!ctx || !canvas.value) return
  ctx.clearRect(0, 0, w, h)
  if (!visible) { animId = requestAnimationFrame(draw); return }

  mouse.x += (mouse.tx - mouse.x) * 0.04
  mouse.y += (mouse.ty - mouse.y) * 0.04

  // Theme-aware palette — keep the system legible in both themes
  const isDark = document.documentElement.classList.contains('dark')
  C = isDark ? '34,211,238' : C_LIGHT
  STAR_C = isDark ? '190,232,255' : STAR_C_LIGHT
  VIG_RGB = isDark ? '2,4,10' : '15,23,42'
  VIG_A = isDark ? 0.5 : VIG_LIGHT_A

  const orbits = [
    { rx: w * 0.20, ry: w * 0.06 },
    { rx: w * 0.30, ry: w * 0.10 },
    { rx: w * 0.40, ry: w * 0.14 },
  ]
  const mouseDistFromCenter = Math.hypot(mouse.x - centerX, mouse.y - centerY)
  const mobile = isMobile()

  // ═══════════ Layer 0: Starfield ═══════════
  for (const s of stars) {
    const tw = 0.3 + 0.45 * Math.abs(Math.sin(time * 0.001 * s.speed + s.phase))
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${STAR_C},${tw * 0.55})`
    ctx.fill()
  }

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

  // ═══════════ Layer 2: Core pulse ═══════════
  const pulse = 0.5 + 0.5 * Math.sin(time * 0.002)
  const coreR = Math.max(20, w * 0.045 * (0.85 + 0.3 * pulse))
  const core = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreR)
  core.addColorStop(0, `rgba(${C},${0.16 + 0.1 * pulse})`)
  core.addColorStop(0.55, `rgba(${C},${0.05 + 0.04 * pulse})`)
  core.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.beginPath()
  ctx.arc(centerX, centerY, coreR, 0, Math.PI * 2)
  ctx.fillStyle = core
  ctx.fill()

  // ═══════════ Layer 3: Radar sweep ═══════════
  if (!mobile) {
    const sweepA = time * SWEEP_SPEED
    const sweepR = Math.max(w, h) * 0.85
    // Trailing wedge
    const wedge = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, sweepR)
    wedge.addColorStop(0, `rgba(${C},0.05)`)
    wedge.addColorStop(1, `rgba(${C},0.01)`)
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, sweepR, sweepA - 0.55, sweepA)
    ctx.closePath()
    ctx.fillStyle = wedge
    ctx.fill()
    // Leading scan line
    const scan = ctx.createLinearGradient(
      centerX, centerY,
      centerX + Math.cos(sweepA) * sweepR,
      centerY + Math.sin(sweepA) * sweepR,
    )
    scan.addColorStop(0, `rgba(${C},0.16)`)
    scan.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX + Math.cos(sweepA) * sweepR, centerY + Math.sin(sweepA) * sweepR)
    ctx.strokeStyle = scan
    ctx.lineWidth = 1.2
    ctx.stroke()
  }

  // ═══════════ Layer 4: Orbits — precessing + energy flow ═══════════
  for (let oi = 0; oi < orbits.length; oi++) {
    const o = orbits[oi]
    const phi = time * PRECESSION_SPEEDS[oi]
    const avgR = (o.rx + o.ry) / 2
    const distFromOrbit = Math.abs(mouseDistFromCenter - avgR)
    const orbitGlow = Math.max(0, 1 - distFromOrbit / 120)

    // Base ellipse (with precession rotation)
    ctx.beginPath()
    ctx.ellipse(centerX, centerY, o.rx, o.ry, phi, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${C},${0.05 + orbitGlow * 0.1})`
    ctx.lineWidth = 0.5 + orbitGlow * 0.8
    ctx.stroke()

    // Energy flow — animated dashes travelling along the orbit
    ctx.beginPath()
    ctx.ellipse(centerX, centerY, o.rx, o.ry, phi, 0, Math.PI * 2)
    ctx.setLineDash([14, 26])
    ctx.lineDashOffset = -time * FLOW_SPEEDS[oi]
    ctx.strokeStyle = `rgba(${C},${0.05 + orbitGlow * 0.12})`
    ctx.lineWidth = 0.7 + orbitGlow * 0.6
    ctx.stroke()
    ctx.setLineDash([])
  }

  // ═══════════ Rotating node positions — shared by links, trails and dots ═══════════
  const positions = orbitNodes.map((n) =>
    orbitPoint(orbits[n.orbit], n.angle + time * n.speed, time * PRECESSION_SPEEDS[n.orbit]),
  )

  // ═══════════ Layer 5: Constellation links ═══════════
  const linkCount = positions.length
  for (let i = 0; i < linkCount; i++) {
    const a = positions[i]
    const b = positions[(i + 1) % linkCount]
    const linkPulse = 0.5 + 0.5 * Math.sin(time * 0.0015 + i * 1.1)
    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.strokeStyle = `rgba(${C},${0.06 + 0.1 * linkPulse})`
    ctx.lineWidth = 0.6
    ctx.stroke()
    // Soft glow pass
    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.strokeStyle = `rgba(${C},${0.03 * linkPulse})`
    ctx.lineWidth = 2.4
    ctx.stroke()
  }

  // ═══════════ Layer 6: Nodes — differential rotation + comet trails ═══════════
  for (let ni = 0; ni < orbitNodes.length; ni++) {
    const node = orbitNodes[ni]
    const o = orbits[node.orbit]
    const p = positions[ni]

    // Trail — remember this frame's position, keep history capped
    node.trail.push({ x: p.x, y: p.y })
    if (node.trail.length > node.maxTrail) node.trail.shift()

    // Fading comet tail — alpha grows toward the newest point
    const tl = node.trail.length
    for (let ti = 0; ti < tl - 1; ti++) {
      const f = (ti + 1) / tl
      ctx.beginPath()
      ctx.moveTo(node.trail[ti].x, node.trail[ti].y)
      ctx.lineTo(node.trail[ti + 1].x, node.trail[ti + 1].y)
      ctx.strokeStyle = `rgba(${C},${0.3 * f * f})`
      ctx.lineWidth = 0.4 + 1.1 * f
      ctx.stroke()
    }

    const dx = p.x - mouse.x, dy = p.y - mouse.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const hoverGlow = Math.max(0, 1 - dist / 160)

    const baseAlpha = 0.3
    const alpha = baseAlpha + hoverGlow * 0.4

    // Glow
    const glowR = 16 + hoverGlow * 14
    const glow = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR)
    glow.addColorStop(0, `rgba(${C},${alpha * 0.7})`)
    glow.addColorStop(1, `rgba(${C},0)`)
    ctx!.beginPath()
    ctx!.arc(p.x, p.y, glowR, 0, Math.PI * 2)
    ctx!.fillStyle = glow
    ctx!.fill()

    // Core dot
    ctx!.beginPath()
    ctx!.arc(p.x, p.y, 1.4 + hoverGlow, 0, Math.PI * 2)
    ctx!.fillStyle = `rgba(${C},${Math.min(0.7, alpha + 0.2)})`
    ctx!.fill()

    // Label — hover only on desktop
    if (hoverGlow > 0.15 && w >= 768) {
      const textColor = isDark ? '255,255,255' : '20,20,20'
      const shadowColor = isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)'
      const labelAlpha = Math.min(0.9, 0.35 + hoverGlow * 0.4)
      // Push label radially outward from center
      const dirX = (p.x - centerX) / (o.rx || 1)
      const dirY = (p.y - centerY) / (o.ry || 1)
      const dirDist = Math.sqrt(dirX * dirX + dirY * dirY) || 1
      const nx = dirX / dirDist
      const ny = dirY / dirDist
      const labelX = p.x + nx * 60
      const labelY = p.y + ny * 60 - 4
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

  // ── Vignette — deep-space edge falloff ──
  const vig = ctx.createRadialGradient(w / 2, h * 0.4, Math.min(w, h) * 0.3, w / 2, h * 0.5, Math.max(w, h) * 0.72)
  vig.addColorStop(0, 'rgba(0,0,0,0)')
  vig.addColorStop(1, `rgba(${VIG_RGB},${VIG_A})`)
  ctx.fillStyle = vig
  ctx.fillRect(0, 0, w, h)

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
  buildStars()
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
