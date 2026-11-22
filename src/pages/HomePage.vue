<template>
  <main>
    <section id="home" class="hero">
      <div class="hero-background"></div>
      <div class="hero-overlay"></div>

      <div class="hero-content">
        <div class="hero-badge">
          <Sparkles :size="14" />
          <span>{{ t('hero.eyebrow') }}</span>
        </div>

        <h1>
          AZEROTH
          <span>LAUNCHER</span>
        </h1>

        <div class="hero-divider">
          <span></span>
          <div class="divider-diamond"></div>
          <span></span>
        </div>

        <p class="hero-description">
          {{ t('hero.description') }}
        </p>

        <div class="hero-actions">
          <a :href="releaseUrl" target="_blank" class="primary-button">
            <Download :size="18" />
            {{ t('hero.download') }}
            <ArrowRight :size="17" />
          </a>

          <a :href="githubUrl" target="_blank" class="secondary-button">
            <Github :size="18" />
            {{ t('hero.github') }}
          </a>
        </div>

        <div class="hero-platform">
          <span class="platform-dot"></span>
          macOS
          <span class="platform-separator">/</span>
          Apple Silicon & Intel
        </div>
      </div>

      <a href="#expansions" class="hero-scroll">
        <span></span>
        SCROLL TO EXPLORE
        <ChevronDown :size="13" />
      </a>
    </section>

    <section id="expansions" class="expansions-section">
      <div class="section-heading">
        <div class="section-eyebrow">
          <span></span>
          {{ t('expansions.eyebrow') }}
          <span></span>
        </div>

        <h2>{{ t('expansions.title') }}</h2>

        <p>{{ t('expansions.description') }}</p>
      </div>

      <div class="expansions-grid">
        <ExpansionCard
          v-for="(expansion, index) in expansions"
          :key="expansion.key"
          :index="index"
          :theme="expansion.theme"
          :image="expansion.image"
          :name="t(`expansions.${expansion.key}.name`)"
          :subtitle="t(`expansions.${expansion.key}.subtitle`)"
          :version="t(`expansions.${expansion.key}.version`)"
        />
      </div>
    </section>

<section id="features" class="features-section">
  <div class="section-heading">
    <div class="section-eyebrow">
      <span></span>
      {{ t('features.eyebrow') }}
      <span></span>
    </div>

    <h2>{{ t('features.title') }}</h2>

    <p>{{ t('features.description') }}</p>
  </div>

  <div class="features-grid">
    <article
      v-for="(feature, index) in features"
      :key="feature.key"
      class="feature-card"
      :style="{ '--feature-delay': `${index * 120}ms` }"
    >
      <div class="feature-card__top">
        <span class="feature-number">{{ feature.number }}</span>

        <component
          :is="feature.icon"
          :size="25"
          :stroke-width="1.4"
          class="feature-icon"
        />
      </div>

      <div class="feature-card__content">
        <h3>{{ t(`features.${feature.key}.title`) }}</h3>

        <p>
          {{ t(`features.${feature.key}.description`) }}
        </p>
      </div>

      <div class="feature-card__decoration"></div>
    </article>
    </div>
    </section>

    <HowItWorksSection />
    
    <ScreenshotGallery />
    <CompatibilitySection />
    <DownloadSection />
  </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import {
  ArrowRight,
  Download,
  Github,
  Sparkles,
  ChevronDown,
  Wine,
  Layers3,
  SlidersHorizontal,
  RefreshCw
} from 'lucide-vue-next'
import ScreenshotGallery from '../components/sections/ScreenshotGallery.vue'
import DownloadSection from '../components/sections/DownloadSection.vue'
import CompatibilitySection from '../components/sections/CompatibilitySection.vue'
import ExpansionCard from '../components/sections/ExpansionCard.vue'
import { useInteractiveEffects } from '../composables/useInteractiveEffects'

const { t } = useI18n()
import { useReveal } from '../composables/useReveal'
import HowItWorksSection from '../components/sections/HowItWorksSection.vue'

useReveal()
useInteractiveEffects()

const githubUrl = 'https://github.com/IWasYourTomb/Azeroth-Launcher'
const releaseUrl = `${githubUrl}/releases/latest`

const expansions = [
  {
    key: 'wotlk',
    theme: 'ice' as const,
    image: '/images/expansions/wotlk.jpg'
  },
  {
    key: 'cataclysm',
    theme: 'fire' as const,
    image: '/images/expansions/cataclysm.jpg'
  },
  {
    key: 'pandaria',
    theme: 'nature' as const,
    image: '/images/expansions/pandaria.jpg'
  }
]

const features = [
  {
    key: 'runtime',
    icon: Wine,
    number: '01'
  },
  {
    key: 'installations',
    icon: Layers3,
    number: '02'
  },
  {
    key: 'graphics',
    icon: SlidersHorizontal,
    number: '03'
  },
  {
    key: 'updates',
    icon: RefreshCw,
    number: '04'
  }
]
</script>

<style scoped>
.feature-card,
.gallery-item {
  opacity: 0;
  transform: translate3d(0, 30px, 0);

  transition:
    opacity .7s ease,
    transform .7s cubic-bezier(.2, .8, .2, 1);
}

.feature-card.is-visible,
.gallery-item.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.feature-card {
  transition-delay: var(--feature-delay, 0ms);
}
</style>