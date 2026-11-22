<template>
  <div class="magic-particles" aria-hidden="true">
    <span
      v-for="particle in particles"
      :key="particle.id"
      class="magic-particle"
      :style="{
        '--x': `${particle.x}%`,
        '--delay': `${particle.delay}s`,
        '--duration': `${particle.duration}s`,
        '--size': `${particle.size}px`,
        '--drift': `${particle.drift}px`
      }"
    />
  </div>
</template>

<script setup lang="ts">
const particles = Array.from({ length: 35 }, (_, index) => ({
  id: index,
  x: (index * 37 + 13) % 100,
  delay: -((index * 1.7) % 20),
  duration: 18 + ((index * 3) % 14),
  size: 2 + (index % 3),
  drift: ((index * 17) % 60) - 30
}))
</script>

<style scoped>
.magic-particles {
  position: fixed;
  inset: 0;

  z-index: 90;
  overflow: hidden;

  pointer-events: none;
}

.magic-particle {
  position: absolute;

  left: var(--x);
  bottom: -15px;

  width: var(--size);
  height: var(--size);

  border-radius: 50%;
  background: var(--particle-color);
  opacity: var(--particle-opacity);
  box-shadow:
    0 0 8px var(--particle-glow),
    0 0 18px var(--particle-glow-secondary);

  animation: particleFloat var(--duration) var(--delay) linear infinite;
}

@keyframes particleFloat {
  0% {
    transform: translate3d(0, 0, 0) scale(.4);
    opacity: 0;
  }

  15% {
    opacity: .55;
  }

  50% {
    transform: translate3d(var(--drift), -50vh, 0) scale(1);
    opacity: .7;
  }

  85% {
    opacity: .25;
  }

  100% {
    transform: translate3d(
      calc(var(--drift) * -0.5),
      -105vh,
      0
    ) scale(.3);

    opacity: 0;
  }
}

@media (max-width: 760px), (prefers-reduced-motion: reduce) {
  .magic-particles {
    display: none;
  }
}
</style>