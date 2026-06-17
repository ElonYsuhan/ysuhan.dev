<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Cesium Ion token — replace with your own from https://ion.cesium.com
const CESIUM_ION_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjMjFkZDk4OGQiLCJpZCI6NTc3MzMsImlhdCI6MTYyNzg0NTE4Mn0.XcKpgANiY19MC4bdFUXMVEBToBmqS8kuYpUlxJHYZxk'

const container = ref<HTMLDivElement>()
let viewer: any = null
let animationId = 0

onMounted(async () => {
  // Load Cesium from CDN
  await loadCesiumCSS()
  const Cesium = await loadCesiumJS()
  if (!Cesium) return

  Cesium.Ion.defaultAccessToken = CESIUM_ION_TOKEN

  viewer = new Cesium.Viewer(container.value!, {
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    scene3DOnly: true,
    skyBox: false,
    skyAtmosphere: false,
    baseLayer: false,
    requestRenderMode: true,
    maximumRenderTimeChange: Infinity,
  })

  const scene = viewer.scene
  scene.globe.baseColor = Cesium.Color.fromCssColorString('#0a0f1a')
  scene.backgroundColor = Cesium.Color.fromCssColorString('#0a0a0f')
  scene.globe.enableLighting = false
  scene.globe.showGroundAtmosphere = false
  scene.globe.atmosphereHueShift = 0.1
  scene.globe.atmosphereSaturationShift = 0.1
  scene.globe.atmosphereBrightnessShift = 0.15
  scene.postProcessStages.fxaa.enabled = true

  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(0, 20, 25000000),
  })

  // Slow spin
  let lastTime = performance.now()
  function spin() {
    animationId = requestAnimationFrame(spin)
    const now = performance.now()
    const dt = (now - lastTime) / 1000
    lastTime = now
    scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, 0.0003 * dt)
  }
  spin()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  if (viewer) {
    viewer.destroy()
    viewer = null
  }
})

function loadCesiumCSS(): Promise<void> {
  return new Promise((resolve) => {
    if (document.querySelector('link[href*="widgets.css"]')) return resolve()
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cesium.com/downloads/cesiumjs/releases/1.125/Build/Cesium/Widgets/widgets.css'
    link.onload = () => resolve()
    link.onerror = () => resolve()
    document.head.appendChild(link)
  })
}

function loadCesiumJS(): Promise<any> {
  return new Promise((resolve) => {
    if ((window as any).Cesium) return resolve((window as any).Cesium)
    const script = document.createElement('script')
    script.src = 'https://cesium.com/downloads/cesiumjs/releases/1.125/Build/Cesium/Cesium.js'
    script.onload = () => resolve((window as any).Cesium)
    script.onerror = () => resolve(null)
    document.head.appendChild(script)
  })
}
</script>

<template>
  <div class="cesium-container" ref="container" />
</template>

<style>
.cesium-container {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.cesium-viewer,
.cesium-widget,
.cesium-widget canvas {
  pointer-events: none !important;
}

.cesium-viewer .cesium-widget-credits {
  display: none !important;
}
</style>

