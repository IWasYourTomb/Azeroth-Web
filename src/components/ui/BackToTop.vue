<template>
  <Transition name="back-to-top">
    <button
      v-if="isVisible"
      class="back-to-top"
      type="button"
      aria-label="Back to top"
      title="Back to top"
      @click="scrollToTop"
    >
      <ArrowUp :size="21" />

      <span class="back-to-top__glow"></span>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { ArrowUp } from 'lucide-vue-next'

const isVisible = ref(false)

function handleScroll() {
  isVisible.value = window.scrollY > 500
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches ? 'instant' : 'smooth'
  })
}

onMounted(() => {
  handleScroll()

  window.addEventListener('scroll', handleScroll, {
    passive: true
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  z-index: 95;

  right: 32px;
  bottom: 32px;

  width: 52px;
  height: 52px;

  display: grid;
  place-items: center;

  color: var(--accent-light);

  background: var(--surface-glass);

  border: 1px solid var(--border-gold);
  border-radius: 17px;

  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  box-shadow:
    0 8px 30px rgba(0, 0, 0, .2),
    0 0 20px rgba(201, 166, 107, .08);

  cursor: pointer;
  overflow: hidden;

  transition:
    transform .3s ease,
    background .3s ease,
    border-color .3s ease,
    box-shadow .3s ease;
}

.back-to-top:hover {
  transform: translateY(-5px);

  background: rgba(201, 166, 107, .15);
  border-color: var(--accent-light);

  box-shadow:
    0 12px 35px rgba(0, 0, 0, .25),
    0 0 25px rgba(201, 166, 107, .2);
}

.back-to-top svg {
  position: relative;
  z-index: 2;
}

.back-to-top__glow {
  position: absolute;

  width: 35px;
  height: 35px;

  border-radius: 50%;

  background: var(--accent-glow);
  filter: blur(18px);

  opacity: 0;
  transition: opacity .3s ease;
}

.back-to-top:hover .back-to-top__glow {
  opacity: 1;
}

/* Transition */

.back-to-top-enter-active,
.back-to-top-leave-active {
  transition:
    opacity .25s ease,
    transform .3s ease;
}

.back-to-top-enter-from,
.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

/* Mobile */

@media (max-width: 760px) {
  .back-to-top {
    right: 18px;
    bottom: 20px;

    width: 46px;
    height: 46px;

    border-radius: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .back-to-top,
  .back-to-top-enter-active,
  .back-to-top-leave-active {
    transition: none;
  }
}
</style>