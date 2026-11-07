import { onMounted, onUnmounted, ref } from 'vue'

export function useCursor() {
  const position = ref({ x: -100, y: -100 })
  const isVisible = ref(false)
  const isInteractive = ref(false)

  function handlePointerMove(event) {
    position.value = { x: event.clientX, y: event.clientY }
  }

  function handlePointerOver(event) {
    isVisible.value = true
    isInteractive.value = event.target instanceof Element &&
      Boolean(event.target.closest('a, button'))
  }

  onMounted(() => {
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerover', handlePointerOver)
  })

  onUnmounted(() => {
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerover', handlePointerOver)
  })

  return { position, isVisible, isInteractive }
}
