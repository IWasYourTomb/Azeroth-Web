<template>
  <section id="screenshots" class="gallery-section">
    <div class="section-heading">
      <div class="section-eyebrow">
        <span></span>
        {{ t('screenshots.eyebrow') }}
        <span></span>
      </div>

      <h2>{{ t('screenshots.title') }}</h2>

      <p>{{ t('screenshots.description') }}</p>
    </div>

    <div class="gallery-grid">
      <button
        v-for="(item, index) in screenshots"
        :key="item.key"
        class="gallery-item"
        :class="{ 'gallery-item--featured': index === 0 }"
        @click="openScreenshot(index)"
        :aria-label="t('screenshots.view')"
      >
        <div class="gallery-image">
          <img :src="item.image" :alt="t(`screenshots.items.${item.key}.title`)" />

          <div class="gallery-image-overlay">
            <Maximize2 :size="24" />
          </div>
        </div>

        <div class="gallery-caption">
          <div>
            <h3>{{ t(`screenshots.items.${item.key}.title`) }}</h3>
            <p>{{ t(`screenshots.items.${item.key}.description`) }}</p>
          </div>

          <span class="gallery-number">
            0{{ index + 1 }}
          </span>
        </div>
      </button>
    </div>

    <Transition name="lightbox">
      <div
        v-if="activeScreenshot"
        class="lightbox"
        @click.self="closeScreenshot"
      >
        <button
          class="lightbox-close"
          @click="closeScreenshot"
          :aria-label="t('screenshots.close')"
        >
          <X :size="24" />
        </button>

        <button
          class="lightbox-navigation lightbox-prev"
          @click="previousScreenshot"
          aria-label="Previous screenshot"
        >
          <ChevronLeft :size="28" />
        </button>

        <div class="lightbox-content">
          <img
            :src="activeScreenshot.image"
            :alt="t(`screenshots.items.${activeScreenshot.key}.title`)"
          />

          <div class="lightbox-caption">
            <h3>
              {{ t(`screenshots.items.${activeScreenshot.key}.title`) }}
            </h3>

            <span>
              {{ activeIndex! + 1 }} / {{ screenshots.length }}
            </span>
          </div>
        </div>

        <button
          class="lightbox-navigation lightbox-next"
          @click="nextScreenshot"
          aria-label="Next screenshot"
        >
          <ChevronRight :size="28" />
        </button>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-vue-next'

const { t } = useI18n()

const screenshots = [
  {
    key: 'home',
    image: '/screenshots/home.png'
  },
  {
    key: 'games',
    image: '/screenshots/games.png'
  },
  {
    key: 'launch',
    image: '/screenshots/launch-settings.png'
  },
  {
    key: 'settings',
    image: '/screenshots/app-settings.png'
  }
]

const activeIndex = ref<number | null>(null)

const activeScreenshot = computed(() => {
  if (activeIndex.value === null) return null

  return screenshots[activeIndex.value]
})

function openScreenshot(index: number) {
  activeIndex.value = index
  document.body.style.overflow = 'hidden'
}

function closeScreenshot() {
  activeIndex.value = null
  document.body.style.overflow = ''
}

function previousScreenshot() {
  if (activeIndex.value === null) return

  activeIndex.value =
    (activeIndex.value - 1 + screenshots.length) % screenshots.length
}

function nextScreenshot() {
  if (activeIndex.value === null) return

  activeIndex.value =
    (activeIndex.value + 1) % screenshots.length
}

function handleKeydown(event: KeyboardEvent) {
  if (activeIndex.value === null) return

  if (event.key === 'Escape') closeScreenshot()
  if (event.key === 'ArrowLeft') previousScreenshot()
  if (event.key === 'ArrowRight') nextScreenshot()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>