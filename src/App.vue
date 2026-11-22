<template>
  <MagicParticles />
  <MagicCursor />
  <AppHeader />
  <RouterView />
  <BackToTop />
</template>

<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import MagicCursor from './components/ui/MagicCursor.vue'
import MagicParticles from './components/ui/MagicParticles.vue'
import BackToTop from './components/ui/BackToTop.vue'

import { useSeo } from './composables/useSeo'

useSeo()
</script>
