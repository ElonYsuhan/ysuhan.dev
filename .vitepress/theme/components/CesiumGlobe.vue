<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Viewer } from 'cesium'

// Cesium Ion token — replace with your own from https://ion.cesium.com
const CESIUM_ION_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjMjFkZDk4OGQiLCJpZCI6NTc3MzMsImlhdCI6MTYyNzg0NTE4Mn0.XcKpgANiY19MC4bdFUXMVEBToBmqS8kuYpUlxJHYZxk'

const container = ref<HTMLDivElement>()
let viewer: Viewer | null = null

onMounted(async () => {
  const { Ion, Viewer, Cartesian3, Math: CesiumMath } = await import('cesium')

  Ion.defaultAccessToken = CESIUM_ION_TOKEN

  viewer = new Viewer(container.value!, {
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

  // Remove default imagery — we want a dark aesthetic
  viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString('#0a0f1a')
  viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('#0a0a0f')
  viewer.scene.globe.enableLighting = false
  viewer.scene.globe.showGroundAtmosphere = false

  // Subtle atmosphere glow
  viewer.scene.globe.atmosphereHueShift = 0.1
  viewer.scene.globe.atmosphereSaturationShift = 0.1
  viewer.scene.globe.atmosphereBrightnessShift = 0.15

  // Add a subtle emissive wireframe overlay for sci-fi look
  viewer.scene.globe.material = undefined // use default with no imagery

  // Position camera
  viewer.camera.setView({
    destination: Cartesian3.fromDegrees(0, 20, 25000000),
  })

  // Slow auto-rotate
  viewer.clock.multiplier = 0.05
  viewer.scene.postProcessStages.fxaa.enabled = true

  // Continuous slow spin
  let lastTime = performance.now()
  function spin() {
    if (!viewer) return
    const now = performance.now()
    const dt = (now - lastTime) / 1000
    lastTime = now
    viewer.scene.camera.rotate(Cartesian3.UNIT_Z, 0.0003 * dt)
    requestAnimationFrame(spin)
  }
  spin()
})

onBeforeUnmount(() => {
  if (viewer) {
    viewer.destroy()
    viewer = null
  }
})
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

/* Hide Cesium credit — attribution still in footer */
.cesium-viewer .cesium-widget-credits {
  display: none !important;
}
</style>

