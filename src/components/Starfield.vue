<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { THEMES } from '../constants/app'
import { STARFIELD_CONFIG } from '../constants/starfield'
import { THEME_COLORS } from '../constants/theme'

const canvas = ref(null)
let animationFrame = null
let context = null
let stars = []
let pointer = { x: -1000, y: -1000 }

function createStars(width, height) {
  const { baseAlpha, alphaVariation, baseRadius, radiusVariation } = STARFIELD_CONFIG
  const { base: baseDriftSpeed, variation: driftSpeedVariation } = STARFIELD_CONFIG.driftSpeed
  const { xBase, xVariation, yBase, yVariation } = STARFIELD_CONFIG.driftDistance

  stars = Array.from({ length: STARFIELD_CONFIG.count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * radiusVariation + baseRadius,
    alpha: Math.random() * alphaVariation + baseAlpha,
    phase: Math.random() * Math.PI * 2,
    driftPhase: Math.random() * Math.PI * 2,
    driftSpeed: Math.random() * driftSpeedVariation + baseDriftSpeed,
    driftX: Math.random() * xVariation + xBase,
    driftY: Math.random() * yVariation + yBase
  }))
}

function resizeCanvas() {
  if (!canvas.value) return

  const pixelRatio = Math.min(
    window.devicePixelRatio || 1,
    STARFIELD_CONFIG.maxPixelRatio
  )
  const width = window.innerWidth
  const height = window.innerHeight

  canvas.value.width = width * pixelRatio
  canvas.value.height = height * pixelRatio
  canvas.value.style.width = `${width}px`
  canvas.value.style.height = `${height}px`
  context = canvas.value.getContext('2d')
  context?.scale(pixelRatio, pixelRatio)
  createStars(width, height)
}

function updatePointer(event) {
  pointer = { x: event.clientX, y: event.clientY }
}

function render(time = 0) {
  if (!context || !canvas.value) return

  const width = window.innerWidth
  const height = window.innerHeight
  context.clearRect(0, 0, width, height)

  stars.forEach((star) => {
    const driftTime = time * star.driftSpeed + star.driftPhase
    const baseX = star.x + Math.sin(driftTime) * star.driftX
    const baseY = star.y + Math.cos(driftTime * 0.8) * star.driftY
    const deltaX = baseX - pointer.x
    const deltaY = baseY - pointer.y
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)
    const influence = Math.max(
      0,
      1 - distance / STARFIELD_CONFIG.interactionRadius
    )
    const directionX = distance > 0 ? deltaX / distance : 0
    const directionY = distance > 0 ? deltaY / distance : 0
    const x = baseX + directionX * influence * STARFIELD_CONFIG.maxDisplacement
    const y = baseY + directionY * influence * STARFIELD_CONFIG.maxDisplacement
    const twinkle = Math.sin(
      time * STARFIELD_CONFIG.twinkle.timeScale + star.phase
    ) * STARFIELD_CONFIG.twinkle.variation
    const themeName = document.documentElement.dataset.theme === THEMES.LIGHT
      ? THEMES.LIGHT
      : THEMES.DARK
    const starColor = THEME_COLORS[themeName].star

    context.beginPath()
    context.fillStyle = `rgba(${starColor}, ${Math.max(0.08, star.alpha + twinkle)})`
    context.arc(x, y, star.radius + influence * 0.8, 0, Math.PI * 2)
    context.fill()
  })

  animationFrame = requestAnimationFrame(render)
}

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  window.addEventListener('pointermove', updatePointer, { passive: true })
  animationFrame = requestAnimationFrame(render)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('pointermove', updatePointer)
  if (animationFrame) cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <canvas ref="canvas" class="starfield" aria-hidden="true"></canvas>
</template>
