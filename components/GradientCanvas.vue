<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRafFn } from '@vueuse/core'

const props = defineProps({
  start: {
    type: Boolean,
    default: false,
  },
  stop: {
    type: Boolean,
    default: false,
  },
})
// Constants
const BORDER_WIDTH = 10
const BLUR_AMOUNT = '5px'
const COLOR_STOPS = [
  { offset: 0, color: 'purple' },
  { offset: 0.25, color: 'pink' },
  { offset: 0.5, color: 'orange' },
  { offset: 0.75, color: 'blue' },
  { offset: 1, color: 'purple' },
]
const INITIAL_INCREMENT = 0.1
const MIN_INCREMENT = 0.01
const INCREMENT_DECREASE = 0.0005

const canvasRef = ref(null)
const ctx = ref(null)
const startAngle = ref(0)
const increment = ref(INITIAL_INCREMENT)

const canvasSize = computed(() => ({
  width: window.innerWidth,
  height: window.innerHeight,
}))

function setCanvasSize() {
  const canvas = canvasRef.value
  canvas.width = canvasSize.value.width
  canvas.height = canvasSize.value.height
}

// Functions for the gradient and drawing
function createGradient(angle) {
  const { width, height } = canvasSize.value
  const gradient = ctx.value.createConicGradient(angle, width / 2, height / 2)
  COLOR_STOPS.forEach(({ offset, color }) => gradient.addColorStop(offset, color))
  return gradient
}

function fillTransparentArea() {
  const { width, height } = canvasSize.value
  ctx.value.fillStyle = 'rgba(0, 0, 0, 1)'
  ctx.value.fillRect(BORDER_WIDTH, BORDER_WIDTH, width - BORDER_WIDTH * 2, height - BORDER_WIDTH * 2)
}

function draw() {
  const { width, height } = canvasSize.value
  ctx.value.clearRect(0, 0, width, height)

  const gradient = createGradient(startAngle.value)
  ctx.value.fillStyle = gradient
  ctx.value.fillRect(0, 0, width, height)

  ctx.value.filter = `blur(${BLUR_AMOUNT})`
  fillTransparentArea()

  startAngle.value += increment.value

  if (increment.value > MIN_INCREMENT) {
    increment.value -= INCREMENT_DECREASE
  }
}

// Use animation function
const { pause, resume } = useRafFn(draw)

watchEffect(() => {
  if (props.start) {
    console.warn('gradient started')
    resume()
  }
  else {
    pause()
  }
})

watchEffect(() => {
  if (props.stop) {
    console.warn('gradient stopped')
    pause()
    ctx.value.clearRect(0, 0, canvasSize.value.width, canvasSize.value.height) // Clear canvas when stopped
  }
})

onMounted(() => {
  ctx.value = canvasRef.value.getContext('2d')
  setCanvasSize()
  if (props.start) {
    resume()
  }
  window.addEventListener('resize', setCanvasSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', setCanvasSize)
  pause()
})
</script>

<template>
  <div class="canvas-container">
    <canvas ref="canvasRef" class="gradient-canvas" />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.canvas-container {
  position: relative;
}

.gradient-canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

}
</style>
