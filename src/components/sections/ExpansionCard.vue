<template>
  <article
    class="expansion-card"
    :class="`expansion-card--${theme}`"
    :style="cardStyle"
  >
    <div class="expansion-card__image"></div>
    <div class="expansion-card__overlay"></div>

    <div class="expansion-card__content">
      <div class="expansion-card__top">
        <span class="expansion-card__edition">
          <Sparkles :size="13" />
          WORLD OF WARCRAFT
        </span>

        <ArrowUpRight :size="20" class="expansion-card__arrow" />
      </div>

      <div class="expansion-card__bottom">
        <span class="expansion-card__subtitle">
          {{ subtitle }}
        </span>

        <h3>{{ name }}</h3>

        <span class="expansion-card__version">
          {{ version }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUpRight, Sparkles } from 'lucide-vue-next'

interface Props {
  name: string
  subtitle: string
  version: string
  image: string
  theme: 'ice' | 'fire' | 'nature'
  index: number
}

const props = defineProps<Props>()

const cardStyle = computed(() => ({
  '--card-image': `url("${props.image}")`,
  '--card-delay': `${props.index * 120}ms`
}))
</script>