<template>
  <div
    v-if="enabled"
    ref="cursor"
    class="magic-cursor"
    aria-hidden="true"
  >
    <div class="magic-cursor__core"></div>
    <div class="magic-cursor__ring"></div>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  ref
} from 'vue'

const cursor = ref<HTMLDivElement | null>(null)
const enabled = ref(false)

let animationFrame = 0
let mouseX = 0
let mouseY = 0

let isHovering = false

function handleMouseMove(event: MouseEvent) {
  mouseX = event.clientX
  mouseY = event.clientY

  const target = event.target

  isHovering = target instanceof Element &&
    !!target.closest(
      'a, button, input, select, textarea, [role="button"]'
    )

  if (animationFrame) return

  animationFrame = requestAnimationFrame(() => {
    if (!cursor.value) {
      animationFrame = 0
      return
    }

    cursor.value.style.transform = `
      translate3d(${mouseX}px, ${mouseY}px, 0)
      translate(-50%, -50%)
    `

    cursor.value.classList.toggle(
      'is-hovering',
      isHovering
    )

    animationFrame = 0
  })
}

function handleMouseLeave() {
  cursor.value?.classList.add('is-hidden')
}

function handleMouseEnter() {
  cursor.value?.classList.remove('is-hidden')
}

function handleVisibilityChange() {
  if (document.hidden) {
    cursor.value?.classList.add('is-hidden')
  }
}

let mediaQuery: MediaQueryList | null = null

function handleMediaChange(event: MediaQueryListEvent) {
  enabled.value = event.matches

  if (event.matches) {
    addListeners()
  } else {
    removeListeners()
  }
}

function addListeners() {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseleave', handleMouseLeave)
  document.addEventListener('mouseenter', handleMouseEnter)
  document.addEventListener('visibilitychange', handleVisibilityChange)

  document.documentElement.classList.add('has-magic-cursor')
}

function removeListeners() {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseleave', handleMouseLeave)
  document.removeEventListener('mouseenter', handleMouseEnter)
  document.removeEventListener('visibilitychange', handleVisibilityChange)

  document.documentElement.classList.remove('has-magic-cursor')

  cursor.value?.classList.remove('is-hovering', 'is-hidden')

  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = 0
  }
}

onMounted(() => {
  mediaQuery = window.matchMedia(
    '(pointer: fine) and (hover: hover)'
  )

  enabled.value = mediaQuery.matches

  if (enabled.value) {
    addListeners()
  }

  mediaQuery.addEventListener('change', handleMediaChange)
})

onUnmounted(() => {
  removeListeners()

  mediaQuery?.removeEventListener('change', handleMediaChange)
})
</script>

<style scoped>
.magic-cursor {
  position: fixed;
  top: 0;
  left: 0;

  z-index: 99999;

  width: 34px;
  height: 34px;

  pointer-events: none;

  will-change: transform;

  opacity: 1;

  transition: opacity .2s ease;
}


.magic-cursor.is-hidden {
  opacity: 0;
}


.magic-cursor__core {
  position: absolute;

  top: 50%;
  left: 50%;

  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: var(--cursor-color);

  transform: translate(-50%, -50%);

  box-shadow:
    0 0 0 2px var(--cursor-shadow),
    0 0 9px var(--cursor-color),
    0 0 20px var(--cursor-glow);

  transition:
    transform .2s ease,
    background-color .2s ease;
}


.magic-cursor__ring {
  position: absolute;
  inset: 0;

  border: 1.5px solid var(--cursor-ring);
  border-radius: 50%;

  box-shadow:
    0 0 0 1px var(--cursor-shadow),
    0 0 12px var(--cursor-glow);

  background: transparent;

  transition:
    transform .25s cubic-bezier(.2, .8, .2, 1),
    background-color .25s ease,
    border-color .25s ease,
    box-shadow .25s ease;
}

.magic-cursor.is-hovering .magic-cursor__ring {
  transform: scale(1.55);

  background: var(--cursor-hover);

  border-color: var(--cursor-color);

  box-shadow:
    0 0 0 1px var(--cursor-shadow),
    0 0 18px var(--cursor-glow);
}

.magic-cursor.is-hovering .magic-cursor__core {
  transform: translate(-50%, -50%) scale(.7);
}


@media (prefers-reduced-motion: reduce) {
  .magic-cursor,
  .magic-cursor__core,
  .magic-cursor__ring {
    transition: none;
  }
}
</style>